import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { MeshStandardMaterial } from 'three';

function Model(props) {
  // Use GLTFLoader to load the model
  const {lowerBack, handAndWrist, upperArm, shoulder, thigh, neck, lowerLeg, cognitive, lowerBackHighlightLevel, cognitiveLevel} = props.props 
  const modelRef = useRef();

  const getColorByNumber = (num) => {
    if (num > 8) return 'red';
    if (num > 5) return 'yellow';
    return 'green';
  };

  const lowerBackHighlightColor = getColorByNumber(lowerBackHighlightLevel);
  const cognitiveLevelColor = getColorByNumber(cognitiveLevel);
  
  const gltf = useLoader(GLTFLoader, '/images/Char_Base.blend2.glb');
  const headNode = gltf.scene.getObjectByName('Brain');
  const legOneNode = gltf.scene.getObjectByName('leg1');
  const legTwoNode = gltf.scene.getObjectByName('leg2');
  const handOneNode = gltf.scene.getObjectByName('hand1');
  const handTwoNode = gltf.scene.getObjectByName('hand2');
  const heartNode = gltf.scene.getObjectByName('heart');
  const backNode = gltf.scene.getObjectByName('back');
  const wristOneNode = gltf.scene.getObjectByName('wrist1');
  const wristTwoNode = gltf.scene.getObjectByName('wrist2');


  return (
    <>
      <primitive object={gltf.scene} ref={modelRef} scale={[2, 1.6, 2]}>;
      {
        lowerBack && 
        <mesh position={backNode?.position}>
            <sphereGeometry args={[0.1, 32, 32]} />
            <meshStandardMaterial color={lowerBackHighlightColor} />
        </mesh>
      }
      {
        cognitive && 
        <mesh position={headNode?.position}>
            <sphereGeometry args={[0.1, 32, 32]} />
            <meshStandardMaterial color={cognitiveLevelColor} />
        </mesh>
      }
      {
        handAndWrist && 
        <mesh position={[-1.7, 1, 1]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial color="red" />
        </mesh>
      }
      {
        upperArm && 
        <mesh position={[-1.7, 1, 1]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial color="red" />
        </mesh>
      }
       {
        shoulder && 
        <mesh position={[-1.7, 1, 1]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial color="red" />
        </mesh>
      }
       {
        thigh && 
        <mesh position={[-1.7, 1, 1]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial color="red" />
        </mesh>
      }
       {
        neck && 
        <mesh position={[-1.7, 1, 1]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial color="red" />
        </mesh>
      }
       {
        lowerLeg && 
        <mesh position={[-1.7, 1, 1]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial color="red" />
        </mesh>
      }
      </primitive>
    </>
  )
}

const ModelViewer = (props) => {
  return (
    <Canvas camera={{ position: [-30.5, 20, 15.25], fov: 10 }}>
      <ambientLight intensity={1.25} />
      <ambientLight intensity={0.1} />
      <directionalLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} /> 
      <OrbitControls />
      <Suspense fallback={null}>
       <Model position={[0.025, -0.9, 1]} props={props} />
      </Suspense>
    </Canvas>
  );
};

export default ModelViewer;
