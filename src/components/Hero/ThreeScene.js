import React, { useRef, useEffect, Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, useAnimations, PerspectiveCamera} from '@react-three/drei';
import newtextalembic from '../../assets/newtextalembic.gltf';
// import { TextureLoader } from 'three/src/loaders/TextureLoader';
import * as THREE from 'three';

const chromeMaterial = new THREE.MeshPhysicalMaterial({
  metalness: 0,
  roughness: 0.4,
  color: 0x000000,
  receiveShadow: true,
  envMapIntensity: 1,
  clearcoat: 0.5,
  clearcoatRoughness: 0.1,
});

const cell_shade_material = new THREE.MeshToonMaterial({
  color: 0x000000,
  specular: 0x111111,
  shininess: 0,
  reflectivity: 0,

});

const textMaterial = new THREE.MeshPhysicalMaterial({
  thickness: 0.4,
  reflectivity: 0.2,
  // color: 0x000000,
  // receiveShadow: false,
  roughness: 0.01,
  transmission: 1,
  ior: 1.2,
  dispersion: 0.9,
  envMapIntensity: 1,
  clearcoat: 0.5,
  clearcoatRoughness: 0.1,
  attenuationDistance: 0.1,
  backside: true,

});

const AnimatedModel = () => {
  const group = useRef();
  const { scene, animations } = useGLTF(newtextalembic);
  
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    if (names.length === 0) {
      console.warn('No animations found in the model. Check your GLTF export settings.');
      return;
    }
    scene.traverse((child) => {
      if (child.isMesh && (child.name.startsWith('1') || child.name.startsWith('2'))) {
        child.material = textMaterial;
      } else {
        child.material = chromeMaterial;
      }
      child.castShadow = true;
      child.receiveShadow = true;
    });
    const action = actions[names[0]]; // Play the first animation by default
    action.play();
  }, [actions, names, scene]);

  return (
    <group ref={group} dispose={null} scale={2} position={[-3.5, -1, 1]}>
      <primitive object={scene} />
    </group>
  );
};

const PortfolioScene = () => {
  const [isClicked, setIsClicked] = useState(false);
  
  const handleInteraction = () => {
    setIsClicked(true);
  };

  return (
    <div 
      style={{ 
        width: '65vh', 
        height: '40vh', 
        display: 'block', 
        overflow: 'hidden', 
        margin: 0, 
        padding: 0, 
        position: 'relative', 
        top: 0, 
        left: 0
      }}
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
    >
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 1, 15]} fov={20} />
        <Suspense fallback={null}>
          <OrbitControls
            enableDamping
            dampingFactor={0.25}
            rotateSpeed={0.5}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
          <spotLight intensity={3} position={[0, 1, 3]} />
          <ambientLight intensity={2} />  
          <AnimatedModel />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
      {!isClicked && (
        <div style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          color: 'white',
          backgroundColor: 'rgba(0,0,0,0.5)',
          fontSize: '8px',
          padding: '10px',
          borderRadius: '5px'
        }}>
          Click and drag to rotate the model
        </div>
      )}
    </div>
  );
};

export default PortfolioScene;