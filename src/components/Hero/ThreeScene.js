import React, { useRef, useEffect, useState, Suspense  } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, useAnimations, Sky } from '@react-three/drei';

import { TextureLoader } from 'three/src/loaders/TextureLoader';
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
});

const AnimatedModel = ({ isPlaying, setProgress }) => {

  const group = useRef();
  const { scene, animations } = useGLTF('/src/assets/newtext alembic.gltf');
  const { actions, names, mixer } = useAnimations(animations, group);

  useEffect(() => {
    if (names.length === 0) {
      console.warn('No animations found in the model. Check your GLTF export settings.');
      return;
    }
    scene.traverse((child) => {
      console.log(child.name);
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

    names.forEach((name) => {
      const action = actions[name];
      if (action) {
        action.play();
        action.paused = !isPlaying;
      }
    });
  }, [actions, names, isPlaying, scene]);

  useFrame((state, delta) => {
    if (isPlaying && mixer) {
      mixer.update(delta);
      // Assuming the first animation is the main one we want to track
      if (names.length > 0 && actions[names[0]]) {
        const progress = (actions[names[0]].time / actions[names[0]].getClip().duration) % 1;
        setProgress(progress);
      }
    }
  });
  return (
    <group ref={group} dispose={null} scale={1} position={[-2, -0.5, 1]}>
      <primitive object={scene} />
    </group>
  );
};
// const SkyboxWithBlur = () => {
//   const texture = useThree(() => new TextureLoader().load('/src/assets/texture1.png'));

//   return (
//     <mesh >
//       <sphereGeometry args={[100, 100, 100]} />
//       <meshBasicMaterial map={texture} side={THREE.BackSide}/>
//     </mesh>
//   );
// };

const CameraSetup = () => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
};


const PortfolioScene = () => {
  const rotationRef = useRef({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleMouseDown = () => {
    setIsPlaying(true);
  };

  const handleMouseUp = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);


  return (
<div 
  style={{ 
    width: '20vh', 
    height: '20vh', 
    display: 'block', 
    overflow: 'hidden', 
    margin: 0, 
    padding: 0, 
    position: 'fixed', 
    top: 0, 
    left: 0,
    backgroundColor: 'black'  
  }}
  onMouseDown={handleMouseDown}
  onMouseUp={handleMouseUp}
>
  <Canvas>
    <Suspense fallback={null}>
      <CameraSetup />
      <OrbitControls
        enableDamping
        dampingFactor={0.25}
        rotateSpeed={0.5}
        enablePan={false}
        enableZoom={false}
          // Limit horizontal rotation (azimuth)
  minAzimuthAngle={-Math.PI / 2} // -45 degrees
  maxAzimuthAngle={Math.PI / 4}  // 45 degrees
  
  // Limit vertical rotation (polar)
  minPolarAngle={Math.PI / 2}    // 60 degrees
  maxPolarAngle={Math.PI / 4}    // 90 degrees
  
        target={[0, 0, 0]}
        onChange={(e) => {
          rotationRef.current.x = e.target.object.rotation.x;
          rotationRef.current.y = e.target.object.rotation.y;
        }}
      />
      <ambientLight intensity={0.5} />
      <AnimatedModel isPlaying={isPlaying} setProgress={setProgress} />
      {/* <Sky/> */}
      <Environment preset="sunset" />
    </Suspense>
  </Canvas>
  <div style={{
    position: 'absolute',
    bottom: 20,
    left: 20,
    color: 'white',
    fontSize: '18px',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: '10px',
    borderRadius: '5px'
  }}>
    Progress: {(progress * 100).toFixed(2)}%
  </div>
</div>
);
};
export default PortfolioScene;
