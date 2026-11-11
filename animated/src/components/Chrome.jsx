import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, Float } from '@react-three/drei';
import { useInView, useReducedMotion } from 'framer-motion';
import { MathUtils } from 'three';
import { usePalette } from '../lib/palette';

/** Two interlocking chrome rings: the company and its investors. */
function Rings({ still, variant }) {
  const group = useRef();
  useFrame((state, dt) => {
    if (!group.current) return;
    if (!still) group.current.rotation.y += dt * 0.25;
    // follow the pointer gently
    const { x, y } = state.pointer;
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, -y * 0.35 + 0.2, 3, dt);
    group.current.rotation.z = MathUtils.damp(group.current.rotation.z, x * 0.2, 3, dt);
  });
  const mat = <meshPhysicalMaterial color="#d9d9d9" metalness={1} roughness={0.12} clearcoat={1} clearcoatRoughness={0.08} />;
  return (
    <Float speed={still ? 0 : 1.2} rotationIntensity={still ? 0 : 0.25} floatIntensity={still ? 0 : 0.6}>
      <group ref={group} scale={variant === 'small' ? 0.8 : 1}>
        <mesh position={[0, 0.62, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.95, 0.27, 64, 160]} />{mat}
        </mesh>
        <mesh position={[0, -0.62, 0]} rotation={[0, Math.PI / 2, Math.PI / 2]}>
          <torusGeometry args={[0.95, 0.27, 64, 160]} />{mat}
        </mesh>
      </group>
    </Float>
  );
}

function Env({ tint }) {
  // Tinted reflections: built from light panels, so no HDR file is downloaded.
  return (
    <Environment resolution={256}>
        <Lightformer intensity={3} position={[0, 4, 3]} scale={[8, 2, 1]} />
        <Lightformer intensity={2} position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} />
        <Lightformer intensity={4} color={tint} position={[5, -1, 1]} rotation-y={-Math.PI / 2} scale={[6, 4, 1]} />
        <Lightformer intensity={1.5} color={tint} position={[0, -4, -2]} rotation-x={-Math.PI / 2} scale={[10, 10, 1]} />
        <Lightformer form="ring" intensity={2} position={[2, 2, 4]} scale={1.5} />
    </Environment>
  );
}

export default function Chrome({ className = '', variant = 'hero', label }) {
  const wrap = useRef(null);
  const inView = useInView(wrap, { margin: '100px' });
  const reduce = useReducedMotion();
  const { p } = usePalette();
  return (
    <div ref={wrap} className={className} role="img" aria-label={label}>
      <Canvas
        frameloop={inView ? 'always' : 'never'}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Rings still={reduce} variant={variant} />
        <Env tint={p.tint} />
      </Canvas>
    </div>
  );
}
