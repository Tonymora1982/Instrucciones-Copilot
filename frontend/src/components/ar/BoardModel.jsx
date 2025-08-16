import React from 'react';
import { Box, Text } from '@react-three/drei';

// Define the board layout (e.g., 6x6 grid)
const BOARD_SIZE = 6;
const TILE_SIZE = 0.1; // 10cm
const TILE_GAP = 0.02; // 2cm
const TOTAL_TILES = BOARD_SIZE * BOARD_SIZE;

// Function to get the 3D position of a tile index
export function getTilePosition(index) {
  const col = index % BOARD_SIZE;
  const row = Math.floor(index / BOARD_SIZE);

  // Center the board
  const x = (col - (BOARD_SIZE - 1) / 2) * (TILE_SIZE + TILE_GAP);
  const z = (row - (BOARD_SIZE - 1) / 2) * (TILE_SIZE + TILE_GAP);

  // The y position is slightly above the board base
  const y = 0.01;

  return [x, y, z];
}

function Tile({ position, number }) {
  return (
    <group position={position}>
      <Box args={[TILE_SIZE, 0.01, TILE_SIZE]}>
        <meshStandardMaterial color={number % 2 === 0 ? '#4A4A4A' : '#3A3A3A'} />
      </Box>
      <Text
        position={[0, 0.01, 0]}
        fontSize={0.03}
        color="white"
        rotation={[-Math.PI / 2, 0, 0]}
        anchorX="center"
        anchorY="middle"
      >
        {number}
      </Text>
    </group>
  );
}

export default function BoardModel(props) {
  const boardWidth = BOARD_SIZE * TILE_SIZE + (BOARD_SIZE - 1) * TILE_GAP;
  const tiles = [];
  for (let i = 0; i < TOTAL_TILES; i++) {
    tiles.push(<Tile key={i} position={getTilePosition(i)} number={i} />);
  }

  return (
    <group {...props}>
      {/* Base for the board */}
      <Box args={[boardWidth + 0.05, 0.01, boardWidth + 0.05]}>
        <meshStandardMaterial color="#222222" />
      </Box>
      {tiles}
    </group>
  );
}
