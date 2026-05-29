import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, RoundedBox, Environment, Image } from '@react-three/drei';
import * as THREE from 'three';
import ProfileImg from '../assets/profil.jpeg';

function InteractiveCard() {
  const groupRef = useRef();

  useFrame((state) => {
    // Interactive tilt based on mouse pointer
    const targetX = -(state.pointer.y * Math.PI) / 8; // Inverted for natural feel
    const targetY = (state.pointer.x * Math.PI) / 8;
    
    // Smoothly interpolate rotation
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      {/* The Base Metallic Phone-like Body */}
      <RoundedBox 
        args={[3, 4, 0.2]} // Width, Height, Depth
        radius={0.15}
        smoothness={4}
      >
        <meshStandardMaterial 
          color="#0f172a" 
          roughness={0.2} 
          metalness={0.8} 
        />
      </RoundedBox>

      {/* The Profile Photo using drei's Image which handles object-fit: cover automatically */}
      <Image 
        url={ProfileImg} 
        position={[0, 0, 0.101]} 
        scale={[2.8, 3.8]} // Acts like a bounding box for cover
      />

      {/* Glowing Border Frame */}
      <mesh position={[0, 0, 0.09]}>
        <planeGeometry args={[3.1, 4.1]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} wireframe />
      </mesh>
    </group>
  );
}

function WireframeTorus() {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.y += delta * 0.2;
    meshRef.current.rotation.z -= delta * 0.05;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -3]}>
      <torusKnotGeometry args={[2.5, 0.8, 100, 16]} />
      <meshStandardMaterial color="#2563eb" wireframe opacity={0.15} transparent />
    </mesh>
  );
}

function SceneReadyNotifier({ onReady }) {
  useEffect(() => {
    // When this component mounts, Suspense has resolved and textures are loaded
    onReady();
  }, [onReady]);
  return null;
}

export default function ThreeProfile() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="w-full h-full relative cursor-crosshair flex items-center justify-center">
      
      {/* LCP Optimization: Static HTML Image Placeholder */}
      <div 
        className={`absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-1000 pointer-events-none ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="w-56 h-72 sm:w-72 sm:h-96 md:w-80 md:h-[28rem] rounded-[1.5rem] overflow-hidden shadow-2xl relative">
           <img 
             src={ProfileImg} 
             alt="Haidar Profile Loading" 
             className="w-full h-full object-cover"
             fetchPriority="high"
           />
           <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay" />
           <div className="absolute inset-0 border border-blue-500/30 rounded-[1.5rem]" />
        </div>
      </div>

      {/* The 3D Canvas */}
      <Canvas 
        camera={{ position: [0, 0, 7], fov: 40 }}
        dpr={[1, 2]} // Optimize performance for high DPI screens
        performance={{ min: 0.5 }} // Allows dropping resolution on slow devices
        className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <Suspense fallback={null}>
          {/* Lighting setup */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
          <directionalLight position={[-10, -10, -5]} intensity={1} color="#60a5fa" />
          <pointLight position={[0, 0, 2]} intensity={0.5} color="#3b82f6" />
          
          <Environment preset="city" />

          {/* The Card */}
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <InteractiveCard />
          </Float>

          <WireframeTorus />
          
          <Sparkles count={150} scale={12} size={3} speed={0.4} opacity={0.6} color="#60a5fa" />
          <Sparkles count={50} scale={8} size={6} speed={0.8} opacity={0.8} color="#93c5fd" />
          
          <SceneReadyNotifier onReady={() => setIsLoaded(true)} />
        </Suspense>
      </Canvas>
    </div>
  );
}
