import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { ARButton, XR, useHitTest, Controllers } from '@react-three/xr';
import { Ring, Text } from '@react-three/drei';
import BoardModel, { getTilePosition } from './ar/BoardModel';
import PawnModel from './ar/PawnModel';

function Reticle() {
  const ref = useRef();
  useHitTest((hitMatrix) => {
    hitMatrix.decompose(ref.current.position, ref.current.quaternion, ref.current.scale);
  });
  return (
    <mesh ref={ref}>
      <Ring args={[0.05, 0.07, 32]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="white" />
      </Ring>
    </mesh>
  );
}

function ARContent({ gameState }) {
  const [boardPosition, setBoardPosition] = useState(null);

  const handleSelect = (event) => {
    if (!boardPosition) {
      const { position } = event.target.matrixWorld;
      setBoardPosition(position.clone());
    }
  };

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[5, 5, 5]} />
      <Controllers onSelect={handleSelect} />

      {!boardPosition && (
        <>
          <Reticle />
          <Text
            position={[0, 0.2, -1]}
            fontSize={0.05}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            Busque una superficie y toque para colocar el tablero.
          </Text>
        </>
      )}

      {boardPosition && (
        <group position={boardPosition}>
          <BoardModel />
          {gameState.players.map((player) => (
            <PawnModel
              key={player.id}
              color={player.color}
              position={getTilePosition(player.position)}
            />
          ))}
        </group>
      )}
    </>
  );
}

// The main AR Scene component
export default function ARScene({ gameState, onClose }) {
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
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 100,
          padding: '12px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          lineHeight: 1,
        }}
      >
        X
      </button>
      <Canvas>
        <XR>
          <ARContent gameState={gameState} />
        </XR>
      </Canvas>
    </div>
  );
}
