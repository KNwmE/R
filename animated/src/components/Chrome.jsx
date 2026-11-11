import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, RoundedBox } from '@react-three/drei';
import { useInView, useReducedMotion } from 'framer-motion';
import { CatmullRomCurve3, MathUtils, Quaternion, TubeGeometry, Vector3 } from 'three';
import { usePalette } from '../lib/palette';

/**
 * A chrome candlestick chart in a bull run: candles rise from the baseline one by one,
 * then a trend line draws across their tops and ends in an upward arrow.
 * Mostly up candles with two small pullbacks, so it reads as a real market, not a cartoon.
 */
// [open, close, low, high] in scene units above the baseline
const candles = [
  [0.20, 0.62, 0.10, 0.78],
  [0.62, 0.98, 0.52, 1.12],
  [0.98, 0.78, 0.66, 1.06],
  [0.78, 1.38, 0.72, 1.52],
  [1.38, 1.22, 1.06, 1.46],
  [1.22, 1.88, 1.16, 2.02],
  [1.88, 2.55, 1.80, 2.70],
];
const BASE = -1.35;
const GAP = 0.66;
const X0 = -((candles.length - 1) * GAP) / 2;
const easeOut = (x) => 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 3);

function Candle({ c, i, time, still }) {
  const ref = useRef();
  const [o, cl, lo, hi] = c;
  const up = cl >= o;
  const bodyH = Math.max(Math.abs(cl - o), 0.06);
  const bodyY = (o + cl) / 2;
  useFrame(() => {
    if (!ref.current) return;
    const p = still ? 1 : easeOut((time.current - 0.35 - i * 0.12) / 0.9);
    ref.current.scale.y = Math.max(p, 0.0001);
  });
  return (
    <group ref={ref} position={[X0 + i * GAP, BASE, 0]}>
      {/* wick */}
      <mesh position={[0, (lo + hi) / 2, 0]}>
        <cylinderGeometry args={[0.025, 0.025, hi - lo, 16]} />
        <meshPhysicalMaterial color="#d6d6d6" metalness={0.6} roughness={0.25} />
      </mesh>
      {/* body: bright pearl silver when up, smoked chrome when down (like a real chart's up and down days) */}
      <RoundedBox args={[0.36, bodyH, 0.36]} radius={0.05} smoothness={4} position={[0, bodyY, 0]}>
        {up
          ? <meshPhysicalMaterial color="#f4f4f2" metalness={0.35} roughness={0.22} clearcoat={1} clearcoatRoughness={0.08} sheen={0.4} />
          : <meshPhysicalMaterial color="#3a3a3a" metalness={1} roughness={0.3} clearcoat={0.6} />}
      </RoundedBox>
    </group>
  );
}

function Trend({ time, still }) {
  const tube = useRef();
  const arrow = useRef();
  const { geometry, end, quat } = useMemo(() => {
    const pts = candles.map(([, cl], i) => new Vector3(X0 + i * GAP, BASE + cl + 0.42, 0.32));
    pts.unshift(new Vector3(X0 - 0.45, BASE + 0.55, 0.32));
    pts.push(new Vector3(X0 + (candles.length - 1) * GAP + 0.42, BASE + 3.45, 0.32)); // finish pointing up
    const curve = new CatmullRomCurve3(pts, false, 'catmullrom', 0.3);
    const g = new TubeGeometry(curve, 240, 0.032, 12, false);
    const tangent = curve.getTangentAt(1).normalize();
    const q = new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), tangent);
    return { geometry: g, end: curve.getPointAt(1), quat: q };
  }, []);
  const total = geometry.index.count;

  useFrame(() => {
    const p = still ? 1 : easeOut((time.current - 1.2) / 1.4);
    geometry.setDrawRange(0, Math.floor((total * p) / 6) * 6);
    if (arrow.current) arrow.current.scale.setScalar(still ? 1 : easeOut((time.current - 2.45) / 0.45));
  });

  return (
    <group>
      <mesh ref={tube} geometry={geometry}>
        <meshPhysicalMaterial color="#ffffff" metalness={1} roughness={0.08} clearcoat={1} />
      </mesh>
      <mesh ref={arrow} position={end} quaternion={quat} scale={0.0001}>
        <coneGeometry args={[0.13, 0.32, 32]} />
        <meshPhysicalMaterial color="#ffffff" metalness={1} roughness={0.08} clearcoat={1} />
      </mesh>
    </group>
  );
}

function Chart({ still, variant }) {
  const group = useRef();
  // fit the chart (about 5.4 units wide) inside narrow canvases
  const vw = useThree((st) => st.viewport.width);
  const fit = Math.min(1, vw / 5.8) * 0.94 * (variant === 'small' ? 0.88 : 1);
  const time = useRef(0); // advances only while rendering, so the intro plays when it comes into view
  useFrame((state, dt) => {
    time.current += Math.min(dt, 0.1);
    if (!group.current) return;
    const { x, y } = state.pointer;
    const sway = still ? 0 : Math.sin(time.current * 0.35) * 0.18;
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, -0.45 + sway + x * 0.25, 3, dt);
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, 0.12 - y * 0.12, 3, dt);
    if (!still) group.current.position.y = -0.2 + Math.sin(time.current * 0.8) * 0.05;
  });
  return (
    <group ref={group} scale={fit} position-y={-0.2}>
      {/* baseline */}
      <mesh position={[0, BASE - 0.02, 0]}>
        <boxGeometry args={[candles.length * GAP + 0.5, 0.02, 0.5]} />
        <meshPhysicalMaterial color="#c8c8c8" metalness={0.55} roughness={0.35} transparent opacity={0.55} />
      </mesh>
      {candles.map((c, i) => <Candle key={i} c={c} i={i} time={time} still={still} />)}
      <Trend time={time} still={still} />
    </group>
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
        camera={{ position: [0, 0.3, 6.2], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Chart still={reduce} variant={variant} />
        <Env tint={p.tint} />
      </Canvas>
    </div>
  );
}
