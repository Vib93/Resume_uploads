import React, { useRef } from 'react'
import { easing } from 'maath'
import { useFrame } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';

const Backdrop = () => {
  const shadows = useRef();

  return (
    <AccumulativeShadows
      useRef={shadows}
      temporal
      frames={60}
      alphaTest={0.7}
      scale={10}
      rotation={[Math.PI/2 , 0, 0]}
      position={[0, 0, -0.2]}
    >
      <RandomizedLight 
        amount={10}
        radius={22 }
        intensity={0.75}
        ambient={0}
        position={[8,8, 1]}
      />
      <RandomizedLight 
        amount={4}
        radius={9}
        intensity={0.15}
        ambient={0.25}
        position={[5, -5, 1]}
      />
      
    </AccumulativeShadows>
  )
}

export default Backdrop