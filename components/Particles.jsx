import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticlesComponent({ count = 2000 }) {
  const ref = useRef();

  const [sphere] = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }

    const sphereGeometry = new THREE.BufferGeometry();
    sphereGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    return [sphereGeometry];
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime / 4) / 2;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime / 2) / 2;
    }
  });

  return (
    <Points ref={ref} positions={sphere.attributes.position.array} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#7c3aed"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

export default function Particles() {
  return <ParticlesComponent />;
}
