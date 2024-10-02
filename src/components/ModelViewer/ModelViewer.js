import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

function Model() {
  // Use GLTFLoader to load the model
  const gltf = useLoader(GLTFLoader, '/images/Char_Base.blend2.glb');
  return <primitive object={gltf.scene} scale={[2, 1.6, 2]} />;
}

const ModelViewer = () => {
  return (
    <Canvas>
      <ambientLight intensity={1.25} />
      <ambientLight intensity={0.1} />
      <directionalLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} /> 
      <OrbitControls />
      <Suspense fallback={null}>
       <Model position={[0.025, -0.9, 1]} />
      </Suspense>
    </Canvas>
  );
};

export default ModelViewer;
