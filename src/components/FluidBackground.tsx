"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// --------------------------------------------------------
// SHADER MATERIAL
// --------------------------------------------------------
const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
varying vec2 vUv;

// SIMPLEX NOISE FUNCTION (Standard GLSL implementation)
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
    vec2 st = vUv;
    
    // Mouse Interaction: Distort UV based on distance to mouse
    float dist = distance(st, uMouse);
    float mouseForce = smoothstep(0.4, 0.0, dist); // Ripple radius
    
    // Noise Generation
    float n = snoise(vec2(st.x * 2.0 + uTime * 0.1, st.y * 2.0 - uTime * 0.15));
    float n2 = snoise(vec2(st.x * 4.0 - uTime * 0.2 + mouseForce * 0.5, st.y * 4.0 + uTime * 0.1));
    
    // Mix Noise Layers
    float mixed = n * 0.5 + n2 * 0.5;
    
    // Color Palette: Deep Black/Grey/White
    vec3 colorA = vec3(0.05, 0.05, 0.05); // Dark Grey
    vec3 colorB = vec3(0.0, 0.0, 0.0);    // Black
    vec3 colorC = vec3(0.1, 0.1, 0.1);    // Lighter Highlight
    
    vec3 color = mix(colorB, colorA, mixed + mouseForce * 0.2);
    color += mix(vec3(0.0), colorC, smoothstep(0.4, 0.6, mixed)); // Highlights
    
    // Vignette
    float vig = 1.0 - distance(st, vec2(0.5));
    color *= smoothstep(0.0, 0.8, vig);

    gl_FragColor = vec4(color, 1.0);
}
`;

function FluidMesh() {
    const mesh = useRef<THREE.Mesh>(null);
    const { viewport, size } = useThree(); // Get viewport dimensions

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uResolution: { value: new THREE.Vector2(size.width, size.height) },
        }),
        []
    );

    useFrame((state) => {
        if (mesh.current) {
            // Update Time
            (mesh.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.getElapsedTime();

            // Interaction: Lerp mouse position for smoothness
            const targetX = (state.pointer.x + 1) / 2; // Normalize to 0-1
            const targetY = (state.pointer.y + 1) / 2;

            // Simple Lerp
            uniforms.uMouse.value.x += (targetX - uniforms.uMouse.value.x) * 0.05;
            uniforms.uMouse.value.y += (targetY - uniforms.uMouse.value.y) * 0.05;
        }
    });

    return (
        <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1, 64, 64]} /> {/* Standard Plane */}
            <shaderMaterial
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={uniforms}
            />
        </mesh>
    );
}

export default function FluidBackground() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
                <FluidMesh />
            </Canvas>
        </div>
    );
}
