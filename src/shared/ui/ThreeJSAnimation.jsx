import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ThreeJSAnimation.css';

const ThreeJSAnimation = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene 설정
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera 설정
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer 설정
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // 햄스터 지오메트리 (간단한 구체)
    const hamsterGeometry = new THREE.SphereGeometry(0.3, 8, 6);
    const hamsterMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x8B4513,
      transparent: true,
      opacity: 0.8
    });

    // 주먹 지오메트리 (간단한 박스)
    const fistGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    const fistMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xFF6B6B,
      transparent: true,
      opacity: 0.7
    });

    // 왼쪽 햄스터들
    const leftHamsters = [];
    for (let i = 0; i < 3; i++) {
      const hamster = new THREE.Mesh(hamsterGeometry, hamsterMaterial.clone());
      hamster.position.set(-8 - i * 2, Math.random() * 4 - 2, 0);
      hamster.userData = {
        speed: 0.02 + Math.random() * 0.03,
        direction: 1,
        originalY: hamster.position.y
      };
      scene.add(hamster);
      leftHamsters.push(hamster);
    }

    // 오른쪽 햄스터들
    const rightHamsters = [];
    for (let i = 0; i < 3; i++) {
      const hamster = new THREE.Mesh(hamsterGeometry, hamsterMaterial.clone());
      hamster.position.set(8 + i * 2, Math.random() * 4 - 2, 0);
      hamster.userData = {
        speed: 0.02 + Math.random() * 0.03,
        direction: -1,
        originalY: hamster.position.y
      };
      scene.add(hamster);
      rightHamsters.push(hamster);
    }

    // 왼쪽 주먹들
    const leftFists = [];
    for (let i = 0; i < 2; i++) {
      const fist = new THREE.Mesh(fistGeometry, fistMaterial.clone());
      fist.position.set(-6 - i * 3, Math.random() * 3 - 1.5, 0);
      fist.userData = {
        speed: 0.03 + Math.random() * 0.02,
        direction: 1,
        rotationSpeed: 0.05 + Math.random() * 0.05
      };
      scene.add(fist);
      leftFists.push(fist);
    }

    // 오른쪽 주먹들
    const rightFists = [];
    for (let i = 0; i < 2; i++) {
      const fist = new THREE.Mesh(fistGeometry, fistMaterial.clone());
      fist.position.set(6 + i * 3, Math.random() * 3 - 1.5, 0);
      fist.userData = {
        speed: 0.03 + Math.random() * 0.02,
        direction: -1,
        rotationSpeed: 0.05 + Math.random() * 0.05
      };
      scene.add(fist);
      rightFists.push(fist);
    }

    // 애니메이션 함수
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      // 햄스터들 애니메이션
      [...leftHamsters, ...rightHamsters].forEach(hamster => {
        // 좌우 이동
        hamster.position.x += hamster.userData.speed * hamster.userData.direction;
        
        // 위아래 부드러운 움직임
        hamster.position.y = hamster.userData.originalY + Math.sin(Date.now() * 0.003) * 0.5;
        
        // 회전
        hamster.rotation.y += 0.02;
        
        // 경계에 도달하면 방향 전환
        if (hamster.position.x > 10 || hamster.position.x < -10) {
          hamster.userData.direction *= -1;
        }
      });

      // 주먹들 애니메이션
      [...leftFists, ...rightFists].forEach(fist => {
        // 좌우 이동
        fist.position.x += fist.userData.speed * fist.userData.direction;
        
        // 회전
        fist.rotation.x += fist.userData.rotationSpeed;
        fist.rotation.y += fist.userData.rotationSpeed * 0.5;
        
        // 경계에 도달하면 방향 전환
        if (fist.position.x > 12 || fist.position.x < -12) {
          fist.userData.direction *= -1;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // 윈도우 리사이즈 핸들러
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // 클린업
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="threejs-animation" />;
};

export default ThreeJSAnimation;
