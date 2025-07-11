import React, { Suspense, useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

function Model(props) {
  const { data, cognitive, cognitiveLevel, stability = 0 } = props; // Default stability to 1 (no tilt)
  const [hoveredPart, setHoveredPart] = useState(null);
  const [modelNodes, setModelNodes] = useState({});
  const [allMeshes, setAllMeshes] = useState([]);
  const [wireframeMode, setWireframeMode] = useState(false);

  const modelRef = useRef();
  const originalMaterials = useRef(new Map());

  // Calculate tilt angle based on stability (0-0.5 = stable, 0.5-1 = unstable)
  const getTiltAngle = (stability) => {
    // Clamp stability between 0 and 1
    const clampedStability = Math.max(0, Math.min(1, stability));
    // No tilt for stable range (0-0.5), gradual tilt for unstable range (0.5-1)
    if (clampedStability <= 0.5) {
      return 0; // No tilt for stable range
    } else {
      // Map 0.5-1 range to 0-15 degrees
      const instabilityLevel = (clampedStability - 0.5) / 0.5; // Convert to 0-1 range
      const maxTiltAngle = Math.PI / 24; // 5 degrees in radians
      return maxTiltAngle * instabilityLevel;
    }
  };

  // Color mapping functions
  const getColorByNumber = (num, percentDiff) => {
    if (percentDiff) {
      if (!num && num !== 0) return "grey";
      if (num > 15) return "red";
      if (num > 11) return "orange";
      return "green";
    }

    if (!num && num !== 0) return "grey";
    if (num > 6) return "red";
    if (num > 3) return "orange";
    return "green";
  };

  const getThreeColor = (colorString) => {
    switch (colorString) {
      case "red":
        return new THREE.Color(0xff0000);
      case "orange":
        return new THREE.Color(0xff9800);
      case "green":
        return new THREE.Color(0x4caf50);
      default:
        return new THREE.Color(0xd3d3d3);
    }
  };

  const getCognitiveColor = (num) => {
    if (!num && num !== 0) return "grey";
    if (num >= 70) return "red";
    if (num >= 31) return "orange";
    return "green";
  };

  const gltf = useLoader(GLTFLoader, "/images/DT.glb");

  const clonedScene = useMemo(() => {
    const clone = gltf.scene.clone(true);

    clone.traverse((node) => {
      if (node.isMesh) {
        node.geometry = node.geometry.clone();
        node.material = node.material.clone();
        node.material.needsUpdate = true;
      }
    });

    return clone;
  }, [gltf]);

  useEffect(() => {
    if (!clonedScene) return;

    const nodes = {};
    const meshes = [];

    clonedScene.traverse((child) => {
      if (child.name && child.name.trim() !== "") {
        nodes[child.name.toLowerCase()] = child;
      }

      if (child.isMesh) {
        meshes.push(child);
        originalMaterials.current.set(child.uuid, child.material.clone());
      }
    });

    setModelNodes(nodes);
    setAllMeshes(meshes);
  }, [clonedScene]);

  // Apply tilt based on stability
  useEffect(() => {
    if (modelRef.current && stability !== undefined) {
      const tiltAngle = getTiltAngle(stability);
      modelRef.current.rotation.x = tiltAngle;
      
      // Optional: Add a slight Y-axis adjustment for more realistic posture
      // modelRef.current.rotation.y = tiltAngle * 0.1; // Slight side lean
    }
  }, [stability]);

  // Apply color changes to actual model materials
  useEffect(() => {
    if (allMeshes.length > 0 && (data || cognitive || cognitiveLevel)) {
      allMeshes.forEach((mesh) => {
        const meshName = mesh.name.toLowerCase();
        let targetColor = null;
        let bodyPart = null;
        let dataValue = null;

        // COGNITIVE LOAD -> BRAIN ONLY (not whole head)
        if (
          meshName.includes("brain") &&
          cognitiveLevel !== undefined
        ) {
          targetColor = getThreeColor(getCognitiveColor(cognitiveLevel));
          bodyPart = "brain (cognitive load)";
          dataValue = cognitiveLevel;
        }
        // EXERTION -> HEART ONLY
         else if (meshName.includes("heart") && data?.exertion !== undefined) {
          targetColor = getThreeColor(getColorByNumber(data.exertion, "20%"));
          bodyPart = "heart (exertion)";
          dataValue = data.exertion;
        }
        // DISCOMFORT DATA -> BODY PARTS
        else if (data) {
          // Check for hand/wrist meshes
          if (
            (meshName.includes("hand") ||
              meshName.includes("wrist") ||
              meshName.includes("finger")) &&
            !meshName.includes("upper")
          ) {
            targetColor = getThreeColor(getColorByNumber(data.hand_wrist));
            bodyPart = "hand_wrist";
            dataValue = data.hand_wrist;
          }
          // Check for upper arm meshes
          else if (
            meshName.includes("upper") &&
            (meshName.includes("hand") ||
              meshName.includes("arm") ||
              meshName.includes("bicep"))
          ) {
            targetColor = getThreeColor(getColorByNumber(data.upper_arm));
            bodyPart = "upper_arm";
            dataValue = data.upper_arm;
          }
          // Check for general arm meshes
          else if (
            meshName.includes("arm") &&
            !meshName.includes("upper") &&
            !meshName.includes("hand") &&
            !meshName.includes("lower")
          ) {
            targetColor = getThreeColor(getColorByNumber(data.upper_arm));
            bodyPart = "upper_arm";
            dataValue = data.upper_arm;
          }
          // Check for shoulder meshes
          else if (
            meshName.includes("shoulder") ||
            meshName.includes("clavicle")
          ) {
            targetColor = getThreeColor(getColorByNumber(data.shoulder));
            bodyPart = "shoulder";
            dataValue = data.shoulder;
          }
          // Check for chest/torso meshes
          else if (
            (meshName.includes("chest") ||
              meshName.includes("torso") ||
              meshName.includes("body")) &&
            !meshName.includes("back") &&
            !meshName.includes("heart")
          ) {
            targetColor = getThreeColor(getColorByNumber(data.chest));
            bodyPart = "chest";
            dataValue = data.chest;
          }
          // Check for back/spine meshes
          else if (
            meshName.includes("back") ||
            meshName.includes("spine") ||
            meshName.includes("pelvis")
          ) {
            targetColor = getThreeColor(getColorByNumber(data.lower_back));
            bodyPart = "lower_back";
            dataValue = data.lower_back;
          }
          // Check for thigh/upper leg meshes
          else if (
            (meshName.includes("leg") ||
              meshName.includes("thigh") ||
              meshName.includes("femur")) &&
            !meshName.includes("lower")
          ) {
            targetColor = getThreeColor(getColorByNumber(data.thigh));
            bodyPart = "thigh";
            dataValue = data.thigh;
          }
          // Check for lower leg meshes
          else if (
            meshName.includes("lower") &&
            (meshName.includes("leg") ||
              meshName.includes("calf") ||
              meshName.includes("shin"))
          ) {
            targetColor = getThreeColor(getColorByNumber(data.lower_leg_foot));
            bodyPart = "lower_leg_foot";
            dataValue = data.lower_leg_foot;
          }
          // Check for foot meshes
          else if (meshName.includes("foot") || meshName.includes("ankle")) {
            targetColor = getThreeColor(getColorByNumber(data.lower_leg_foot));
            bodyPart = "lower_leg_foot";
            dataValue = data.lower_leg_foot;
          }
          // Check for head meshes
          else if (
            meshName.includes("head") &&
            (!meshName.includes("neck") || !meshName.includes("brain"))
          ) {
            targetColor = getThreeColor(getColorByNumber(data.head));
            bodyPart = "head";
            dataValue = data.head;
          }
          // Check for neck meshes
          else if (
            meshName.includes("neck") &&
            !meshName.includes("head") &&
            !meshName.includes("brain")
          ) {
            targetColor = getThreeColor(getColorByNumber(data.neck));
            bodyPart = "neck";
            dataValue = data.neck;
          }
        }

        // Apply color if we found a match
        if (targetColor && bodyPart) {
          const originalMaterial = originalMaterials.current.get(mesh.uuid);
          if (originalMaterial) {
            mesh.material = originalMaterial.clone();
            mesh.material.color = targetColor;
            mesh.material.emissive = targetColor.clone().multiplyScalar(0.1);
            mesh.material.wireframe = wireframeMode;
            mesh.material.transparent = true;
            mesh.material.opacity = wireframeMode ? 1.0 : 0.8;
            mesh.material.needsUpdate = true;

            console.log(
              `✅ Colored mesh "${mesh.name}" as ${bodyPart} with value ${dataValue}`
            );
          }
        } else {
          // Apply wireframe to unmapped meshes too for consistency
          const originalMaterial = originalMaterials.current.get(mesh.uuid);
          if (originalMaterial && wireframeMode) {
            mesh.material = originalMaterial.clone();
            mesh.material.wireframe = wireframeMode;
            mesh.material.transparent = true;
            mesh.material.opacity = 0.3;
            mesh.material.needsUpdate = true;
          }
        }
      });
    }
  }, [allMeshes, data, cognitive, cognitiveLevel, wireframeMode]);

  // Toggle wireframe mode
  const toggleWireframe = () => {
    setWireframeMode(!wireframeMode);
  };

  return (
    <>
      <primitive 
        object={clonedScene} 
        ref={modelRef} 
        scale={[9, 7, 9]}  
        position={[0.025, -0.9, 1]}
      />
      
      {/* Wireframe Toggle Button */}
      <Html position={[-1.5, 1.5, 1]} style={{ pointerEvents: "all" }}>
        <button
          onClick={toggleWireframe}
          style={{
            background: wireframeMode
              ? "rgba(76, 175, 80, 0.9)"
              : "rgba(244, 67, 54, 0.9)",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          {wireframeMode ? "🔍 Wireframe ON" : "👤 Normal View"}
        </button>
      </Html>

      {/* Stability Indicator */}
      {/* <Html position={[1.5, -1.5, 1]} style={{ pointerEvents: "none" }}>
        <div
          style={{
            background: "rgba(0,0,0,0.8)",
            color: "white",
            padding: "8px 12px",
            borderRadius: "6px",
            fontSize: "12px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
            Stability: {(1 - stability * 100).toFixed(1)}%
          </div>
          <div style={{ fontSize: "10px", opacity: 0.8 }}>
            Tilt: {(getTiltAngle(stability) * 180 / Math.PI).toFixed(1)}°
          </div>
        </div>
      </Html> */}

      {/* Hover tooltip */}
      {hoveredPart && (
        <Html position={[1.5, 1, 1]} style={{ pointerEvents: "none" }}>
          <div
            style={{
              background: "rgba(0,0,0,0.9)",
              color: "white",
              padding: "8px 12px",
              borderRadius: "6px",
              fontSize: "12px",
              whiteSpace: "nowrap",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
              {hoveredPart.label}
            </div>
            <div>Value: {hoveredPart.value?.toFixed(1)}</div>
            <div>
              Risk:{" "}
              {hoveredPart.color === "red"
                ? "High"
                : hoveredPart.color === "orange"
                ? "Medium"
                : "Low"}
            </div>
          </div>
        </Html>
      )}
    </>
  );
}

// Updated AnalysisPanel to show stability
function AnalysisPanel({ data, cognitive, cognitiveLevel, stability, seeLess, onClick }) {
  if (!data && !cognitive && stability === undefined) return null;

  const getColorByNumber = (num, percentDiff) => {
    if (percentDiff) {
      if (!num && num !== 0) return "#4CAF50";
      if (num > 15) return "#F44336";
      if (num > 11) return "#FF9800";
      return "#4CAF50";
    }

    if (!num && num !== 0) return "#4CAF50";
    if (num > 6) return "#F44336";
    if (num > 3) return "#FF9800";
    return "#4CAF50";
  };

  const getRiskLevel = (num, percentDiff) => {
    if (percentDiff) {
      if (!num && num !== 0) return "Low";
      if (num > 15) return "High";
      if (num > 11) return "Medium";
      return "Low";
    }

    if (!num && num !== 0) return "Low";
    if (num > 6) return "High";
    if (num > 3) return "Medium";
    return "Low";
  };

  const getStabilityColor = (stability) => {
    if (stability < 0.5) return "#4CAF50"; // Good/Stable (50-100%)
    return "#F44336"; // Poor/Unstable (0-49%)
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        background: "rgba(255,255,255,0.95)",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        maxWidth: "300px",
        fontSize: "14px",
        zIndex: 100,
      }}
    >
      <div
        style={
          seeLess
            ? {
                height: "40px",
                overflow: "hidden",
              }
            : {}
        }
      >
        <h3
          style={{ margin: "0 0 12px 0", fontSize: "16px", fontWeight: "bold" }}
        >
          Digital Twin Analysis
        </h3>

        {/* Stability/Instability Section */}
        {stability !== undefined && (
          <div style={{ marginBottom: "12px" }}>
            <h4
              style={{
                margin: "0 0 8px 0",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              {/* {stability <= 0.5 ? "Postural Stability" : "Postural Instability"} */}
              Postural Stability
            </h4>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>Level: {((1 - stability) * 100).toFixed(1)}%</span>
              {/* {stability <= 0.5 ? (
                <span>Level: {((0.5 - stability) / 0.5 * 100).toFixed(1)}%</span>
               ) : ( 
                  <span>Level: {((stability - 0.5) / 0.5 * 100).toFixed(1)}%</span> 
                )}  */}
              <span
                style={{
                  padding: "2px 8px",
                  borderRadius: "4px",
                  color: "white",
                  fontSize: "12px",
                  backgroundColor: getStabilityColor(stability),
                }}
              >
                {stability >= 0.5 ? "Unstable" : "Stable"}
              </span>
            </div>
          </div>
        )}

        {/* Rest of the existing analysis panel code */}
        {cognitive && (
          <div style={{ marginBottom: "12px" }}>
            <h4
              style={{
                margin: "0 0 8px 0",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Cognitive Load
            </h4>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>Level: {cognitiveLevel?.toFixed(1)}%</span>
              <span
                style={{
                  padding: "2px 8px",
                  borderRadius: "4px",
                  color: "white",
                  fontSize: "12px",
                  backgroundColor:
                    cognitiveLevel >= 70
                      ? "#F44336"
                      : cognitiveLevel >= 31
                      ? "#FF9800"
                      : "#4CAF50",
                }}
              >
                {cognitiveLevel >= 70
                  ? "High"
                  : cognitiveLevel >= 31
                  ? "Medium"
                  : "Low"}
              </span>
            </div>
          </div>
        )}
        {/* Exertion Analysis Panel */}
        
        {data && (
          <div style={{ marginBottom: "12px" }}>
            <h4
              style={{
                margin: "0 0 8px 0",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Exertion
            </h4>
            <div style={{ display: "grid", gap: "4px" }}>
              {Object.entries(data)
                .filter(([part, value]) => ["exertion"].includes(part))
                .map(([part, value]) => (
                  <div
                    key={part}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "12px",
                    }}
                  >
                    <span style={{ textTransform: "capitalize" }}>
                      {part.replace("_", " ")}:
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span>{value?.toFixed(1)}</span>
                      <span
                        style={{
                          padding: "1px 6px",
                          borderRadius: "3px",
                          color: "white",
                          fontSize: "10px",
                          backgroundColor: getColorByNumber(value, part === "exertion"),
                        }}
                      >
                        {getRiskLevel(value, part === "exertion")}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {data && (
          <div>
            <h4
              style={{
                margin: "0 0 8px 0",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Body Part Discomfort
            </h4>
            <div style={{ display: "grid", gap: "4px" }}>
              {Object.entries(data)
                .filter(
                  ([part, value]) => !["shoulder", "exertion"].includes(part)
                )
                .map(([part, value]) => (
                  <div
                    key={part}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "12px",
                    }}
                  >
                    <span style={{ textTransform: "capitalize" }}>
                      {part.replace("_", " ")}:
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span>{value?.toFixed(1)}</span>
                      <span
                        style={{
                          padding: "1px 6px",
                          borderRadius: "3px",
                          color: "white",
                          fontSize: "10px",
                          backgroundColor: getColorByNumber(
                            value,
                            part === "exertion"
                          ),
                        }}
                      >
                        {getRiskLevel(value, part === "exertion")}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onClick}
        style={{
          marginTop: "12px",
          padding: "8px 12px",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "15px",
          cursor: "pointer",
          fontSize: "14px",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#1976D2")}
      >
        See {seeLess ? "More" : "Less"}
      </button>
    </div>
  );
}

const ModelViewer = (props) => {
  const { data, cognitive, cognitiveLevel, stability } = props;
  const [state, setState] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, position: 'relative' }}>
        <Canvas
          camera={{ position: [-55.5, 0, 10.25], fov: 45 }}
          style={{ height: "1300px", width: "100%", marginTop: "0px" }}
        >
          <ambientLight intensity={1.25} />
          <ambientLight intensity={0.1} />
          <directionalLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls />
          <Suspense fallback={null}>
            <Model position={[0.025, -0.19, 1]} {...props} />
          </Suspense>
        </Canvas>

        <AnalysisPanel
          data={data}
          cognitive={cognitive}
          cognitiveLevel={cognitiveLevel}
          stability={stability}
          onClick={() => setState((prev) => !prev)}
          seeLess={state}
        />

        <div
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            background: "rgba(255,255,255,0.9)",
            padding: "12px",
            borderRadius: "6px",
            fontSize: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
        </div>
      </div>
    </div>
  );
};

export default ModelViewer;