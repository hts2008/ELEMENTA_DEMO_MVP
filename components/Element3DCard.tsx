import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { useTexture, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// --- CUSTOM SHADER MATERIAL ---
// This shader handles the "burn away" effect using noise
const DissolveMaterial = shaderMaterial(
  {
    uTime: 0,
    uProgress: 0, // 0 = Cover (Concrete), 1 = Reveal (Image)
    uTexture: new THREE.Texture(),
    uColor: new THREE.Color('#171717'), // Concrete Dark
    uEdgeColor: new THREE.Color('#FFB300'), // Amber Burn
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform float uProgress;
    uniform sampler2D uTexture;
    uniform vec3 uColor;
    uniform vec3 uEdgeColor;
    varying vec2 vUv;

    // Simplex Noise function
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec4 imgColor = texture2D(uTexture, vUv);
      
      // Noise scale
      float noise = snoise(vUv * 4.0 + uTime * 0.1); 
      
      // Calculate mix value
      // We shift the noise range based on uProgress to create the transition
      float limit = uProgress * 2.5 - 1.0; 
      
      // Smooth edge for the dissolve
      float edgeWidth = 0.1;
      float alpha = smoothstep(limit, limit + edgeWidth, noise);
      
      // Burning Edge Calculation
      float border = smoothstep(limit + edgeWidth, limit + edgeWidth + 0.05, noise) - 
                     smoothstep(limit + edgeWidth + 0.05, limit + edgeWidth + 0.15, noise);
                     
      // Final Mix: 
      // If alpha is 1 -> Show Concrete (uColor)
      // If alpha is 0 -> Show Image (imgColor)
      
      vec3 finalColor = mix(imgColor.rgb, uColor, alpha);
      
      // Add the glowing edge only where the transition happens
      finalColor += uEdgeColor * border * 2.0; // Boost intensity
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

extend({ DissolveMaterial });

const CardScene = ({ image, hovered }: { image: string, hovered: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Load texture
  const texture = useTexture(image);
  texture.wrapS = THREE.MirroredRepeatWrapping;
  texture.wrapT = THREE.MirroredRepeatWrapping;

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Smoothly interpolate progress
      // hovered = true -> progress goes to 1 (Reveal)
      // hovered = false -> progress goes to 0 (Cover)
      const target = hovered ? 1 : 0;
      // Lerp logic: current + (target - current) * speed
      materialRef.current.uniforms.uProgress.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uProgress.value,
        target,
        delta * 2.5 // Speed of dissolve
      );
    }
  });

  return (
    <mesh ref={meshRef} scale={[7, 4.5, 1]}> 
      <planeGeometry args={[1, 1, 32, 32]} />
      {/* @ts-ignore */}
      <dissolveMaterial ref={materialRef} uTexture={texture} transparent />
    </mesh>
  );
};

interface Element3DCardProps {
  image: string;
  isHovered: boolean;
}

export const Element3DCard: React.FC<Element3DCardProps> = ({ image, isHovered }) => {
  return (
    <div className="absolute inset-0 w-full h-full bg-concrete-900">
      <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
        <CardScene image={image} hovered={isHovered} />
      </Canvas>
    </div>
  );
};