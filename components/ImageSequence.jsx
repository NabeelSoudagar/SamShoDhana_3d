import { useRef, useMemo, useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Preload all texture URLs
const frameCount = 184;
const getFrameUrl = (index) => `/background/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

export default function ImageSequence() {
    const meshRef = useRef();
    const { viewport } = useThree();
    const [currentFrame, setCurrentFrame] = useState(0);

    // Create texture loader
    const textureLoader = useMemo(() => new THREE.TextureLoader(), []);
    const [textures, setTextures] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Load first frame immediately
        const loadTextures = async () => {
            // Load all frames
            const promises = Array.from({ length: frameCount }, (_, i) =>
                new Promise(resolve => {
                    textureLoader.load(getFrameUrl(i), (tex) => {
                        tex.colorSpace = THREE.SRGBColorSpace;
                        resolve(tex);
                    });
                })
            );

            const loadedTextures = await Promise.all(promises);
            setTextures(loadedTextures);
            setLoaded(true);
        };

        loadTextures();
    }, [textureLoader]);

    useEffect(() => {
        if (!loaded || !meshRef.current) return;

        // Create scroll trigger
        const trigger = ScrollTrigger.create({
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5, // smooth scrubbing
            onUpdate: (self) => {
                const frameIndex = Math.floor(self.progress * (frameCount - 1));
                setCurrentFrame(frameIndex);
            }
        });

        return () => {
            trigger.kill();
        };
    }, [loaded]);

    // Update texture on frame change
    useFrame(() => {
        if (meshRef.current && textures[currentFrame]) {
            meshRef.current.material.map = textures[currentFrame];
            meshRef.current.material.needsUpdate = true;
        }
    });

    if (!loaded) return null;

    return (
        <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial map={textures[0]} transparent={true} opacity={0.5} />
        </mesh>
    );
}
