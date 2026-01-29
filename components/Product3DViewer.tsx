import React, { useState, useRef, Suspense, ReactNode, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float, Box as DreiBox, Icosahedron, Cylinder, Torus, RoundedBox } from '@react-three/drei';
import { RotateCcw, Layers, Scan } from 'lucide-react';
import * as THREE from 'three';

interface Product3DViewerProps {
  imageUrl: string; 
}

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Error Boundary for 3D components
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// High-Fidelity Procedural Polo Shirt Model
const PoloModel = ({ wireframe }: { wireframe: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Slower breathing animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
  });

  const shirtColor = "#FFC107"; // Yellow
  const accentColor = "#374151"; // Dark Grey for Collar/Cuffs (Tech look)
  
  const mainMaterialProps = {
     color: wireframe ? "#000000" : shirtColor,
     wireframe: wireframe,
     roughness: 0.8, // Fabric-like
     metalness: 0.1,
     emissive: wireframe ? "#FFB300" : "#000000",
     emissiveIntensity: wireframe ? 0.5 : 0
  };

  const accentMaterialProps = {
    color: wireframe ? "#000000" : accentColor,
    wireframe: wireframe,
    roughness: 0.9,
    metalness: 0.0,
  };

  return (
    <group ref={groupRef} scale={1.2} position={[0, -0.2, 0]}>
       {/* --- MAIN TORSO --- */}
       {/* Upper Chest */}
       <RoundedBox args={[1.1, 0.6, 0.45]} radius={0.1} position={[0, 0.3, 0]} castShadow receiveShadow>
          <meshStandardMaterial {...mainMaterialProps} />
       </RoundedBox>
       {/* Lower Body (Tapered slightly) */}
       <group position={[0, -0.4, 0]}>
           <Cylinder args={[0.53, 0.50, 1, 32]} castShadow receiveShadow scale={[1, 1, 0.4]}>
                <meshStandardMaterial {...mainMaterialProps} />
           </Cylinder>
       </group>
       
       {/* --- SLEEVES --- */}
       {/* Left Arm */}
       <group position={[-0.65, 0.25, 0]} rotation={[0, 0, 0.5]}>
          <Cylinder args={[0.22, 0.18, 0.6, 32]} position={[0, -0.1, 0]} castShadow receiveShadow>
             <meshStandardMaterial {...mainMaterialProps} />
          </Cylinder>
          {/* Cuff */}
          <Torus args={[0.19, 0.03, 16, 32]} position={[0, -0.4, 0]} rotation={[Math.PI/2, 0, 0]}>
             <meshStandardMaterial {...accentMaterialProps} />
          </Torus>
       </group>
       
       {/* Right Arm */}
       <group position={[0.65, 0.25, 0]} rotation={[0, 0, -0.5]}>
          <Cylinder args={[0.22, 0.18, 0.6, 32]} position={[0, -0.1, 0]} castShadow receiveShadow>
             <meshStandardMaterial {...mainMaterialProps} />
          </Cylinder>
          {/* Cuff */}
          <Torus args={[0.19, 0.03, 16, 32]} position={[0, -0.4, 0]} rotation={[Math.PI/2, 0, 0]}>
             <meshStandardMaterial {...accentMaterialProps} />
          </Torus>
       </group>

       {/* --- NECK & COLLAR AREA --- */}
       <group position={[0, 0.6, 0]}>
           {/* Neck hole filler */}
           <Cylinder args={[0.20, 0.25, 0.1, 32]} position={[0, -0.05, 0]}>
               <meshStandardMaterial color="#1a1a1a" side={THREE.DoubleSide} />
           </Cylinder>
           
           {/* The Polo Collar (Torus Segment) */}
           <group position={[0, -0.05, 0]} rotation={[0.2, 0, 0]}>
               <mesh castShadow receiveShadow position={[0, 0.05, -0.05]}>
                   <torusGeometry args={[0.28, 0.06, 16, 48, 4.5]} />
                   <meshStandardMaterial {...accentMaterialProps} />
               </mesh>
               {/* Rotate the torus to open at the front */}
               <mesh position={[0, 0.05, -0.05]} rotation={[0, 0, Math.PI + 0.9]}>
                    {/* Invisible mesh to handle rotation logic if needed */}
               </mesh>
           </group>
       </group>

       {/* --- PLACKET & BUTTONS (The Polo Detail) --- */}
       <group position={[0, 0.35, 0.23]}>
           {/* Placket Strip */}
           <RoundedBox args={[0.12, 0.5, 0.02]} radius={0.01} castShadow receiveShadow>
               <meshStandardMaterial {...mainMaterialProps} color={wireframe ? "#000" : "#EAB308"} /> {/* Slightly darker yellow for placket */}
           </RoundedBox>
           
           {/* Buttons */}
           {[0.15, 0, -0.15].map((yPos, i) => (
               <Cylinder key={i} args={[0.02, 0.02, 0.01, 16]} position={[0, yPos, 0.02]} rotation={[Math.PI/2, 0, 0]}>
                   <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
               </Cylinder>
           ))}
       </group>

       {/* --- POCKET --- */}
       <group position={[0.3, 0.2, 0.23]}>
           <RoundedBox args={[0.25, 0.28, 0.01]} radius={0.02} castShadow receiveShadow>
               <meshStandardMaterial {...mainMaterialProps} />
           </RoundedBox>
           {/* Pocket Accent Line - Use DreiBox here instead of lucide Box */}
           <DreiBox args={[0.25, 0.01, 0.015]} position={[0, 0.12, 0]}>
               <meshStandardMaterial {...accentMaterialProps} />
           </DreiBox>
       </group>

       {/* --- TECH OVERLAY DETAILS --- */}
       {wireframe && (
         <group>
            {/* Holographic rings around the model */}
            <Torus args={[0.8, 0.005, 16, 64]} rotation={[Math.PI/2, 0, 0]} position={[0, -0.5, 0]}>
                 <meshBasicMaterial color="#FFB300" transparent opacity={0.3} />
            </Torus>
            <Torus args={[1.0, 0.005, 16, 64]} rotation={[Math.PI/2, 0, 0]} position={[0, 0.8, 0]}>
                 <meshBasicMaterial color="#FFB300" transparent opacity={0.3} />
            </Torus>
         </group>
       )}
    </group>
  );
};

// Fallback Model (Abstract Sci-Fi Shape)
const FallbackModel = ({ wireframe }: { wireframe: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group>
        <Icosahedron ref={meshRef} args={[0.8, 0]}>
           <meshStandardMaterial 
              color="#333" 
              wireframe={true} 
              emissive="#FFB300"
              emissiveIntensity={1}
           />
        </Icosahedron>
    </group>
  );
};

export const Product3DViewer: React.FC<Product3DViewerProps> = ({ imageUrl }) => {
  const [mode, setMode] = useState<'render' | 'wireframe'>('render');
  const orbitRef = useRef<any>(null);

  const handleReset = () => {
    if (orbitRef.current) {
        orbitRef.current.reset();
    }
  };

  return (
    <div className="relative w-full h-[600px] bg-concrete-100 dark:bg-concrete-900 overflow-hidden border border-concrete-300 dark:border-concrete-800 rounded-lg group select-none">
      {/* CAD Grid Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{
             backgroundImage: 'linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }}
      ></div>

      {/* Axis Lines */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-amber-500/30 pointer-events-none"></div>
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-amber-500/30 pointer-events-none"></div>

      {/* 3D Canvas */}
      <div className="w-full h-full relative z-10 cursor-move">
         <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4.5], fov: 40 }}>
            <Suspense fallback={null}>
               <Environment preset="city" />
               <ambientLight intensity={0.7} />
               <spotLight position={[5, 10, 5]} angle={0.15} penumbra={1} intensity={1} shadow-mapSize={2048} castShadow />
               <spotLight position={[-5, 5, 5]} angle={0.15} penumbra={1} intensity={0.5} />
               
               {/* Slowed down Float animation */}
               <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
                  <ErrorBoundary fallback={<FallbackModel wireframe={true} />}>
                     <PoloModel wireframe={mode === 'wireframe'} />
                  </ErrorBoundary>
               </Float>

               <ContactShadows position={[0, -1.4, 0]} opacity={0.4} scale={10} blur={2} far={1} />
               
               {/* Slower auto-rotation */}
               <OrbitControls 
                  ref={orbitRef} 
                  minPolarAngle={Math.PI / 2.5} 
                  maxPolarAngle={Math.PI / 1.8} 
                  enableZoom={true} 
                  enablePan={false} 
                  autoRotate={mode === 'render'} 
                  autoRotateSpeed={0.5} 
               />
            </Suspense>
         </Canvas>
      </div>

      {/* Loading State Overlay (Simulated) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 animate-fade-out-delay">
         <div className="text-amber-500 font-mono text-[10px] animate-pulse">
             INITIALIZING NEURAL RENDERER...
         </div>
      </div>

      {/* HUD Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 bg-black/80 backdrop-blur-md p-2 rounded-full border border-concrete-700 shadow-[0_0_20px_rgba(0,0,0,0.5)] z-20">
        <button onClick={handleReset} className="p-2 hover:text-amber-500 text-white transition-colors" title="Reset View"><RotateCcw size={18} /></button>
        <div className="w-[1px] h-8 bg-concrete-700 mx-1"></div>
        <button 
           onClick={() => setMode(mode === 'render' ? 'wireframe' : 'render')} 
           className={`p-2 transition-colors flex items-center gap-2 font-mono text-xs font-bold ${mode === 'wireframe' ? 'text-amber-500 bg-amber-500/10 rounded' : 'text-white hover:text-amber-500'}`}
        >
           {mode === 'wireframe' ? <Scan size={18} /> : <Layers size={18} />}
           {mode === 'wireframe' ? 'WIREFRAME' : 'RENDER'}
        </button>
      </div>

      {/* Overlay Info */}
      <div className="absolute top-4 left-4 font-mono text-[10px] text-amber-500 bg-black/80 backdrop-blur px-3 py-2 border border-amber-500/30 z-20 pointer-events-none">
        <p>TYPE: POLO_STD_YELLOW</p>
        <p>MAT: PIQUE_COTTON</p>
        <p>MODE: {mode.toUpperCase()}</p>
        <div className="mt-2 h-1 w-full bg-concrete-800 rounded-full overflow-hidden">
           <div className="h-full bg-amber-500 animate-pulse w-full"></div>
        </div>
      </div>
      
      {/* Schematic Overlay (Only in Wireframe) */}
      {mode === 'wireframe' && (
         <div className="absolute inset-0 pointer-events-none z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTEwIDB2MjBNMCAxMGgyMCIgc3Ryb2tlPSIjRkZCMzAwIiBzdHJva2Utd2lkdGg9IjAuNSIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==')] opacity-10 mix-blend-overlay">
            <div className="absolute top-0 w-full h-1 bg-amber-500 shadow-[0_0_15px_#FFB300] animate-scan"></div>
         </div>
      )}
    </div>
  );
};