import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ARButton, XR, Controllers, Hands } from '@react-three/xr';
import { useFrame } from '@react-three/fiber';

// A spinning 3D object to show in the AR scene
function SpinningBox(props) {
  const ref = React.useRef();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta;
      ref.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={ref} {...props}>
      <torusKnotGeometry args={[0.2, 0.05, 128, 16]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

// The main AR Scene component
export default function ARScene() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50 }}>
      <ARButton
        sessionInit={{
          requiredFeatures: ['hit-test'],
        }}
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          padding: '12px 24px',
          backgroundColor: 'white',
          color: 'black',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      />
      <Canvas>
        <XR>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} />

          <Controllers />
          <Hands />

          {/* A simple object placed at the origin */}
          <SpinningBox position={[0, 1, -1]} />
        </XR>
      </Canvas>
    </div>
  );
}
