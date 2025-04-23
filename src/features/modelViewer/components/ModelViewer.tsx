import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Scene({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 1, 1]} intensity={0.5} />
      <primitive object={scene} />
      <OrbitControls />
    </>
  );
}

export function ModelViewer({ url }: { url: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={{ background: 'transparent' }}>
      <Scene url={url} />
    </Canvas>
  );
}
