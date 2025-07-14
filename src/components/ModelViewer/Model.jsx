import React, { Suspense, useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

function Model(props) {
  const { data, cognitive, cognitiveLevel, stability = 0, isLoaded } = props;
  const [hoveredPart, setHoveredPart] = useState(null);
  const [modelNodes, setModelNodes] = useState({});
  const [allMeshes, setAllMeshes] = useState([]);
  const [wireframeMode, setWireframeMode] = useState(false);

  const modelRef = useRef();
  const originalMaterials = useRef(new Map());

  // Calculate tilt angle based on stability (0-0.5 = stable, 0.5-1 = unstable)
  const getTiltAngle = (stability) => {
    const clampedStability = Math.max(0, Math.min(1, stability));
    if (clampedStability <= 0.5) {
      return 0;
    } else {
      const instabilityLevel = (clampedStability - 0.5) / 0.5;
      const maxTiltAngle = Math.PI / 24; // 7.5 degrees in radians
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

  // Enhanced scene processing with stability-based squatting transform
  const processedScene = useMemo(() => {
    // Deep clone scene & materials
    const sceneClone = gltf.scene.clone(true);
    sceneClone.traverse((node) => {
      if (node.isMesh) {
        node.geometry = node.geometry.clone();
        node.material = node.material.clone();
        node.material.needsUpdate = true;
      }
    });

    // Only apply squatting transform if stability indicates instability (> 0.5)
    if (stability > 0.5) {
      // Compute average Z to find knee pivot point
      let sumZ = 0, count = 0;
      sceneClone.traverse((node) => {
        if (node.isMesh) {
          const positions = node.geometry.attributes.position.array;
          for (let i = 2; i < positions.length; i += 3) {
            sumZ += positions[i]; 
            count++;
          }
        }
      });
      
      const kneeHeight = (sumZ / count) * 0.5; // Knee pivot height
      
      // Calculate bend angle based on stability level (0.5-1 maps to 0-25 degrees)
      const instabilityLevel = (stability - 0.5) / 0.5; // Convert 0.5-1 to 0-1
      const maxBendAngle = 25; // Maximum bend angle in degrees
      const bendAngle = (maxBendAngle * instabilityLevel * Math.PI) / 180;
      const cosAngle = Math.cos(bendAngle);
      const sinAngle = Math.sin(bendAngle);

      // Apply squatting transform to vertices below knee height
      sceneClone.traverse((node) => {
        if (node.isMesh) {
          const positionAttribute = node.geometry.attributes.position;
          const positions = positionAttribute.array;
          
          for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];
            const z = positions[i + 2];
            
            // Only transform vertices below knee height
            if (z <= kneeHeight) {
              const relativeZ = z - kneeHeight;
              
              // Apply rotation around knee pivot
              const newY = y * cosAngle - relativeZ * sinAngle;
              const newZ = y * sinAngle + relativeZ * cosAngle + kneeHeight;
              
              positions[i + 1] = newY;
              positions[i + 2] = newZ;
            }
          }
          
          positionAttribute.needsUpdate = true;
          node.geometry.computeVertexNormals(); // Recalculate normals for lighting
        }
      });
    }

    return sceneClone;
  }, [gltf, stability]);

  // Collect meshes and store original materials
  useEffect(() => {
    if (!processedScene) return;

    const nodes = {};
    const meshes = [];

    processedScene.traverse((child) => {
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
  }, [processedScene]);

  // Apply postural tilt based on stability
  useEffect(() => {
    if (modelRef.current && stability !== undefined) {
      const tiltAngle = getTiltAngle(stability);
      modelRef.current.rotation.x = tiltAngle;
    }
  }, [stability]);

  // Apply color changes to model materials
  useEffect(() => {
    if (allMeshes.length > 0 && (data || cognitive || cognitiveLevel)) {
      allMeshes.forEach((mesh) => {
        const meshName = mesh.name.toLowerCase();
        let targetColor = null;
        let bodyPart = null;
        let dataValue = null;

        // COGNITIVE LOAD -> BRAIN ONLY
        if (meshName.includes("brain") && cognitiveLevel !== undefined) {
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
          // Hand/wrist meshes
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
          // Upper arm meshes
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
          // General arm meshes
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
          // Shoulder meshes
          else if (
            meshName.includes("shoulder") ||
            meshName.includes("clavicle")
          ) {
            targetColor = getThreeColor(getColorByNumber(data.shoulder));
            bodyPart = "shoulder";
            dataValue = data.shoulder;
          }
          // Chest/torso meshes
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
          // Back/spine meshes
          else if (
            meshName.includes("back") ||
            meshName.includes("spine") ||
            meshName.includes("pelvis")
          ) {
            targetColor = getThreeColor(getColorByNumber(data.lower_back));
            bodyPart = "lower_back";
            dataValue = data.lower_back;
          }
          // Thigh/upper leg meshes
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
          // Lower leg meshes
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
          // Foot meshes
          else if (meshName.includes("foot") || meshName.includes("ankle")) {
            targetColor = getThreeColor(getColorByNumber(data.lower_leg_foot));
            bodyPart = "lower_leg_foot";
            dataValue = data.lower_leg_foot;
          }
          // Head meshes
          else if (
            meshName.includes("head") &&
            (!meshName.includes("neck") || !meshName.includes("brain"))
          ) {
            targetColor = getThreeColor(getColorByNumber(data.head));
            bodyPart = "head";
            dataValue = data.head;
          }
          // Neck meshes
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
          // Apply wireframe to unmapped meshes for consistency
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
        object={processedScene} 
        ref={modelRef} 
        scale={[9, 7, 9]}  
        position={[0.025, -0.9, 1]}
      />
      
      {/* Wireframe Toggle Button */}
      {isLoaded && (
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
      )}

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
    if (stability < 0.5) return "#4CAF50"; // Good/Stable
    return "#F44336"; // Poor/Unstable
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

        {/* Stability Section */}
        {stability !== undefined && (
          <div style={{ marginBottom: "12px" }}>
            <h4
              style={{
                margin: "0 0 8px 0",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
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

        {/* Cognitive Load Section */}
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

        {/* Exertion Section */}
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

        {/* Body Part Discomfort Section */}
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
        onMouseOut={(e) => (e.target.style.backgroundColor = "#0070f3")}
      >
        See {seeLess ? "More" : "Less"}
      </button>
    </div>
  );
}

const ModelViewer = (props) => {
  const { data, cognitive, cognitiveLevel, stability, isLoaded } = props;
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

        {isLoaded && (
          <AnalysisPanel
            data={data}
            cognitive={cognitive}
            cognitiveLevel={cognitiveLevel}
            stability={stability}
            onClick={() => setState((prev) => !prev)}
            seeLess={state}
          />
        )}

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