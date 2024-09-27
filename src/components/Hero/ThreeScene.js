import React, { useRef, useEffect, Suspense  } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, useAnimations } from '@react-three/drei';
import newtextalembic from '../../assets/newtextalembic.gltf';
// import { TextureLoader } from 'three/src/loaders/TextureLoader';
import * as THREE from 'three';

const chromeMaterial = new THREE.MeshPhysicalMaterial({
  metalness: 0,
  roughness: 0.4,
  color: 0xffffff,
  envMapIntensity: 1,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
});

const glowingPastelMaterial = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color(0x222222),
  emissive: new THREE.Color(0x222222),
  emissiveIntensity: 2,
  metalness: 0.5,
  roughness: 0.5,
  clearcoat: 0.8,
  clearcoatRoughness: 0.2,
  reflectivity: 0.5,  
});

const AnimatedModel = () => {
  const group = useRef();
  const { scene, animations } = useGLTF(newtextalembic);
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000,);
  camera.position.set(0, 2, 0 );
  camera.lookAt(0, 0, 0);
  scene.add( camera );
  // const axesHelper = new THREE.AxesHelper( 5 );
  // scene.add( axesHelper );
  
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    if (names.length === 0) {
      console.warn('No animations found in the model. Check your GLTF export settings.');
      return;
    }
    scene.traverse((child) => {
      // console.log(child.name);
      // Replace 'YourObjectName' with the actual name of the object you want to apply the material to
      if (child.isMesh &&  (child.name.startsWith('1') || child.name.startsWith('2'))) {
        child.material = chromeMaterial;
      }
      else {
        child.material = glowingPastelMaterial;
      }
      child.castShadow = true;
      child.receiveShadow = true;
    });
    const action = actions[names[0]]; // Play the first animation by default
    action.play();

  }, [actions, names, scene]);
  

  return (
    <group ref={group} dispose={null} scale={2} position={[-3.5 , -1, 1]}>
      <primitive object={scene} />
    </group>
  );
};


const PortfolioScene = () => {
  

  // const handleMouseDown = () => {
  //   setIsPlaying(!isPlaying);
  // };

  return (
<div 
  style={{ 
    width: '60vh', 
    height: '38vh', 
    display: 'block', 
    overflow: 'hidden', 
    margin: 0, 
    padding: 0, 
    position: 'relative', 
    top: 0, 
    left: 0
  }}

>
  <Canvas>
    <Suspense fallback={null}>
      {/* <CameraSetup /> */}
      <OrbitControls
        enableDamping
        dampingFactor={0.25}
        // rotateSpeed={0.5}
        // enablePan={false}
        // enableZoom={false}
        attach={'AnimatedModel'}
          // Limit horizontal rotation (azimuth)
  //       minAzimuthAngle={-Math.PI / 2} // -45 degrees
  //       maxAzimuthAngle={Math.PI / 4}  // 45 degrees
  // // Limit vertical rotation (polar)
  //       minPolarAngle={-Math.PI / 2}    // 60 degrees
  //       maxPolarAngle={Math.PI / 4}    // 90 degrees
      />
      <ambientLight intensity={0.5} />
      <AnimatedModel/>
      {/* <Sky/> */}
      <Environment preset="sunset" />
    </Suspense>
  </Canvas>
</div>
);
};
export default PortfolioScene;
