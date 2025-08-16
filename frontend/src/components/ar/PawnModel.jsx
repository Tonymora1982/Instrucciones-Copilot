import React from 'react';
import { Cylinder } from '@react-three/drei';

const PAWN_HEIGHT = 0.08;
const PAWN_RADIUS = 0.03;

export default function PawnModel({ color = 'red', position }) {
  // Position the pawn to sit on top of a tile
  const finalPosition = [
    position[0],
    position[1] + PAWN_HEIGHT / 2,
    position[2],
  ];

  return (
    <group position={finalPosition}>
      <Cylinder args={[PAWN_RADIUS, PAWN_RADIUS, PAWN_HEIGHT, 16]}>
        <meshStandardMaterial color={color} />
      </Cylinder>
    </group>
  );
}
