"use client";
import { useEffect, useRef } from "react";

export default function BackgroundGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadThreeJS = async () => {
      try {
        const THREE = await import('three');
        
        let scene: any, camera: any, renderer: any, icoSphere: any, icoMaterial: any;
        let clock: any, mouse = { x: 0, y: 0, sx: 0, sy: 0, dx: 0, dy: 0 };
        let rotX = 0, rotY = 0, prevRotX = 0, prevRotY = 0, rotXEase = 0, rotYEase = 0;

        // Configuration
        const isMobile = typeof window.orientation !== 'undefined';
        const isIOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
        const width = window.innerWidth;
        const height = window.innerHeight;
        const icoQuality = isMobile ? 6 : 7;

        // Palette alignée à la capture: magenta, vert, cyan, jaune, bleu
        const palleteRed = {
          colors: [
            { c: "#FF3CAC", l: 2 }, // magenta
            { c: "#7CFF9E", l: 2 }, // vert
            { c: "#1DE5FF", l: 2 }, // cyan
            { c: "#F9EA00", l: 1 }, // jaune
            { c: "#5AA8FF", l: 1 }  // bleu
          ],
          topColor: "#FFFFFF",
          topColorL: 4,
          repeat: 18,
          shuffle: true
        };

        const theme = {
          roughness: isIOS ? 0.3 : 0.5,
          metalness: 0.1,
          mapIntensity: isMobile ? (isIOS ? 2 : 6) : 12
        };

        function createPalleteImg(palleteObj: any) {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const pallete = expandPallete(palleteObj);
          const texH = 1024;
          const colorH = texH / pallete.length;

          canvas.width = 1;
          canvas.height = texH;
          
          for (let i = 0; i < pallete.length; i++) {
            ctx!.fillStyle = pallete[i];
            ctx!.fillRect(0, colorH * i, canvas.width, colorH);
          }

          return canvas.toDataURL();
        }

        function expandPallete(palleteObj: any) {
          const pallete: string[] = [];
          for (let x = 0; x < palleteObj.repeat; x++) {
            for (let i = 0; i < palleteObj.colors.length; i++) {
              const colors = palleteObj.shuffle ? shuffle(palleteObj.colors.slice()) : palleteObj.colors;
              const c = colors[i];
              for (let j = 0; j < c.l; j++) {
                pallete.push(c.c);
              }
            }
          }
          if (palleteObj.topColor) {
            for (let i = 0; i < palleteObj.topColorL; i++)
              pallete.push(palleteObj.topColor);
          }
          return pallete;
        }

        function shuffle(o: any[]) {
          for (let j, x, i = o.length; i; j = parseInt((Math.random() * i).toString()), x = o[--i], o[i] = o[j], o[j] = x);
          return o;
        }

        function init() {
          clock = new THREE.Clock(true);

          scene = new THREE.Scene();
          camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
          camera.position.z = 60;

          const ambLight = new THREE.AmbientLight(0xaaaaaa, 2);
          scene.add(ambLight);

          renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
          renderer.autoClear = false;
          renderer.setPixelRatio = window.devicePixelRatio;
          renderer.setSize(width, height);

          if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
          }

          // Création de la texture de palette
          const palleteImg = createPalleteImg(palleteRed);
          const textureLoader = new THREE.TextureLoader();
          const palleteTexture = textureLoader.load(palleteImg);

          // Géométrie icosaèdre
          const geometry = new THREE.IcosahedronGeometry(width > height ? 22 : 15, icoQuality);

          // Matériau personnalisé avec shaders
          icoMaterial = MeshCustomMaterial({
            roughness: theme.roughness,
            metalness: theme.metalness,
            envMapIntensity: theme.mapIntensity
          }, {
            tExplosion: {
              type: "t",
              value: palleteTexture
            },
            time: {
              type: "f",
              value: 0.0
            }
          }, getVertexShader(), getFragmentShader());

          icoSphere = new THREE.Mesh(geometry, icoMaterial);
          scene.add(icoSphere);

          // Événements
          if (isMobile) {
            window.addEventListener("touchstart", inputstart, { passive: false });
            window.addEventListener("touchmove", inputmove, { passive: false });
            window.addEventListener("touchend", inputend, { passive: false });
          } else {
            window.addEventListener("mousedown", inputstart);
            window.addEventListener("mousemove", inputmove);
            window.addEventListener("mouseup", inputend);
          }

          window.addEventListener("resize", resize);
          resize();
        }

        function getVertexShader() {
          return `
            //
            // GLSL textureless classic 3D noise "cnoise",
            // with an RSL-style periodic variant "pnoise".
            // Author:  Stefan Gustavson (stefan.gustavson@liu.se)
            // Version: 2011-10-11
            //
            // Many thanks to Ian McEwan of Ashima Arts for the
            // ideas for permutation and gradient selection.
            //
            // Copyright (c) 2011 Stefan Gustavson. All rights reserved.
            // Distributed under the MIT license. See LICENSE file.
            // https://github.com/stegu/webgl-noise
            //

            vec3 mod289(vec3 x) {
              return x - floor(x * (1.0 / 289.0)) * 289.0;
            }

            vec4 mod289(vec4 x) {
              return x - floor(x * (1.0 / 289.0)) * 289.0;
            }

            vec4 permute(vec4 x) {
              return mod289(((x*34.0)+1.0)*x);
            }

            vec4 taylorInvSqrt(vec4 r) {
              return 1.79284291400159 - 0.85373472095314 * r;
            }

            vec3 fade(vec3 t) {
              return t*t*t*(t*(t*6.0-15.0)+10.0);
            }

            // Classic Perlin noise
            float cnoise(vec3 P) {
              vec3 Pi0 = floor(P);
              vec3 Pi1 = Pi0 + vec3(1.0);
              Pi0 = mod289(Pi0);
              Pi1 = mod289(Pi1);
              vec3 Pf0 = fract(P);
              vec3 Pf1 = Pf0 - vec3(1.0);
              vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
              vec4 iy = vec4(Pi0.yy, Pi1.yy);
              vec4 iz0 = Pi0.zzzz;
              vec4 iz1 = Pi1.zzzz;

              vec4 ixy = permute(permute(ix) + iy);
              vec4 ixy0 = permute(ixy + iz0);
              vec4 ixy1 = permute(ixy + iz1);

              vec4 gx0 = ixy0 * (1.0 / 7.0);
              vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
              gx0 = fract(gx0);
              vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
              vec4 sz0 = step(gz0, vec4(0.0));
              gx0 -= sz0 * (step(0.0, gx0) - 0.5);
              gy0 -= sz0 * (step(0.0, gy0) - 0.5);

              vec4 gx1 = ixy1 * (1.0 / 7.0);
              vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
              gx1 = fract(gx1);
              vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
              vec4 sz1 = step(gz1, vec4(0.0));
              gx1 -= sz1 * (step(0.0, gx1) - 0.5);
              gy1 -= sz1 * (step(0.0, gy1) - 0.5);

              vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
              vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
              vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
              vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
              vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
              vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
              vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
              vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

              vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
              g000 *= norm0.x;
              g010 *= norm0.y;
              g100 *= norm0.z;
              g110 *= norm0.w;
              vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
              g001 *= norm1.x;
              g011 *= norm1.y;
              g101 *= norm1.z;
              g111 *= norm1.w;

              float n000 = dot(g000, Pf0);
              float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
              float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
              float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
              float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
              float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
              float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
              float n111 = dot(g111, Pf1);

              vec3 fade_xyz = fade(Pf0);
              vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
              vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
              float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
              return 2.2 * n_xyz;
            }

            // Classic Perlin noise, periodic variant
            float pnoise(vec3 P, vec3 rep) {
              vec3 Pi0 = mod(floor(P), rep);
              vec3 Pi1 = mod(Pi0 + vec3(1.0), rep);
              Pi0 = mod289(Pi0);
              Pi1 = mod289(Pi1);
              vec3 Pf0 = fract(P);
              vec3 Pf1 = Pf0 - vec3(1.0);
              vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
              vec4 iy = vec4(Pi0.yy, Pi1.yy);
              vec4 iz0 = Pi0.zzzz;
              vec4 iz1 = Pi1.zzzz;

              vec4 ixy = permute(permute(ix) + iy);
              vec4 ixy0 = permute(ixy + iz0);
              vec4 ixy1 = permute(ixy + iz1);

              vec4 gx0 = ixy0 * (1.0 / 7.0);
              vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
              gx0 = fract(gx0);
              vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
              vec4 sz0 = step(gz0, vec4(0.0));
              gx0 -= sz0 * (step(0.0, gx0) - 0.5);
              gy0 -= sz0 * (step(0.0, gy0) - 0.5);

              vec4 gx1 = ixy1 * (1.0 / 7.0);
              vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
              gx1 = fract(gx1);
              vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
              vec4 sz1 = step(gz1, vec4(0.0));
              gx1 -= sz1 * (step(0.0, gx1) - 0.5);
              gy1 -= sz1 * (step(0.0, gy1) - 0.5);

              vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
              vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
              vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
              vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
              vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
              vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
              vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
              vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

              vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
              g000 *= norm0.x;
              g010 *= norm0.y;
              g100 *= norm0.z;
              g110 *= norm0.w;
              vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
              g001 *= norm1.x;
              g011 *= norm1.y;
              g101 *= norm1.z;
              g111 *= norm1.w;

              float n000 = dot(g000, Pf0);
              float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
              float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
              float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
              float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
              float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
              float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
              float n111 = dot(g111, Pf1);

              vec3 fade_xyz = fade(Pf0);
              vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
              vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
              float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
              return 2.2 * n_xyz;
            }

            #define PHYSICAL
            varying vec3 vViewPosition;
            #ifndef FLAT_SHADED
              varying vec3 vNormal;
            #endif
            #include <common>
            #include <uv_pars_vertex>
            #include <uv2_pars_vertex>
            #include <displacementmap_pars_vertex>
            #include <color_pars_vertex>
            #include <fog_pars_vertex>
            #include <morphtarget_pars_vertex>
            #include <skinning_pars_vertex>
            #include <shadowmap_pars_vertex>
            #include <logdepthbuf_pars_vertex>
            #include <clipping_planes_pars_vertex>

            varying float noise;
            uniform float time;
            varying float vDisplacement;

            void main() {
              noise = pnoise(position * 0.08 + time * 0.5, vec3(100.0));
              noise = clamp(noise, 0.0, 1.0);
              float displacement = (noise) * 20.0;

              vDisplacement = noise;

              #include <uv_vertex>
              #include <uv2_vertex>
              #include <color_vertex>
              #include <beginnormal_vertex>
              #include <morphnormal_vertex>
              #include <skinbase_vertex>
              #include <skinnormal_vertex>
              #include <defaultnormal_vertex>

            #ifndef FLAT_SHADED
              vNormal = normalize(transformedNormal);
            #endif

              #include <begin_vertex>
              #include <morphtarget_vertex>
              #include <skinning_vertex>
              #include <displacementmap_vertex>

              #include <project_vertex>
              #include <logdepthbuf_vertex>
              #include <clipping_planes_vertex>

              vViewPosition = -mvPosition.xyz;

              #include <worldpos_vertex>
              #include <shadowmap_vertex>
              #include <fog_vertex>

              vec3 newPosition = position - normal * displacement;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
            }
          `;
        }

        function getFragmentShader() {
          return `
            #define PHYSICAL
            uniform vec3 diffuse;
            uniform vec3 emissive;
            uniform float roughness;
            uniform float metalness;
            uniform float opacity;

            #ifndef STANDARD
              uniform float clearCoat;
              uniform float clearCoatRoughness;
            #endif

            varying vec3 vViewPosition;

            #ifndef FLAT_SHADED
              varying vec3 vNormal;
            #endif

            #include <common>
            #include <packing>
            #include <dithering_pars_fragment>
            #include <color_pars_fragment>
            #include <uv_pars_fragment>
            #include <uv2_pars_fragment>
            #include <map_pars_fragment>
            #include <alphamap_pars_fragment>
            #include <aomap_pars_fragment>
            #include <lightmap_pars_fragment>
            #include <emissivemap_pars_fragment>
            #include <bsdfs>
            #include <cube_uv_reflection_fragment>
            #include <envmap_pars_fragment>
            #include <envmap_physical_pars_fragment>
            #include <fog_pars_fragment>
            #include <lights_pars_begin>
            #include <lights_physical_pars_fragment>
            #include <shadowmap_pars_fragment>
            #include <bumpmap_pars_fragment>
            #include <normalmap_pars_fragment>
            #include <roughnessmap_pars_fragment>
            #include <metalnessmap_pars_fragment>
            #include <logdepthbuf_pars_fragment>
            #include <clipping_planes_pars_fragment>

            varying float vDisplacement;
            uniform sampler2D tExplosion;

            void main() {
              #include <clipping_planes_fragment>

              vec4 diffuseColor = vec4(diffuse, opacity);
              ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));
              vec3 totalEmissiveRadiance = emissive;

              #include <logdepthbuf_fragment>
              #include <map_fragment>
              #include <color_fragment>
              #include <alphamap_fragment>
              #include <alphatest_fragment>
              #include <roughnessmap_fragment>
              #include <metalnessmap_fragment>
              #include <normal_fragment_begin>
              #include <normal_fragment_maps>
              #include <emissivemap_fragment>
              #include <lights_physical_fragment>
              #include <lights_fragment_begin>
              #include <lights_fragment_maps>
              #include <lights_fragment_end>
              #include <aomap_fragment>

              vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
              gl_FragColor = vec4(outgoingLight, diffuseColor.a);

              #include <tonemapping_fragment>
              #include <encodings_fragment>
              #include <fog_fragment>
              #include <premultiplied_alpha_fragment>
              #include <dithering_fragment>

              vec2 stripPos = vec2(0.0, vDisplacement);
              vec4 stripColor = texture2D(tExplosion, stripPos);
              stripColor *= pow(0.1, vDisplacement);

              gl_FragColor *= vec4(stripColor.rgb, 1.0);
            }
          `;
        }

        function MeshCustomMaterial(parameters: any, uniforms: any, vertexShader: string, fragmentShader: string) {
          const material = new THREE.ShaderMaterial();
          material.uniforms = THREE.UniformsUtils.merge([
            THREE.ShaderLib.standard.uniforms,
            uniforms
          ]);
          material.vertexShader = vertexShader;
          material.fragmentShader = fragmentShader;
          material.setValues(parameters);
          return material;
        }

        function inputstart(e: any) {
          inputmove(e);
          mouse.dx = 0;
          mouse.dy = 0;
          mouse.sx = mouse.x;
          mouse.sy = mouse.y;
          
          prevRotX = rotX;
          prevRotY = rotY;
        }

        function inputmove(e: any) {
          if (e.type === "touchmove")
            e.preventDefault();

          let x, y;
          if (e.type.indexOf("mouse") >= 0) {
            x = e.clientX;
            y = e.clientY;
          } else {
            x = e.changedTouches[0].clientX;
            y = e.changedTouches[0].clientY;
          }
          
          mouse.x = (x / window.innerWidth) - 0.5;
          mouse.y = (y / window.innerHeight) - 0.5;

          mouse.dx = mouse.x - mouse.sx;
          mouse.dy = mouse.y - mouse.sy;
        }

        function inputend(e: any) {
          // e.preventDefault();
        }

        function resize() {
          const width = window.innerWidth;
          const height = window.innerHeight;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }

        function render() {
          requestAnimationFrame(render);

          const dt = clock.getDelta();
          const time = clock.getElapsedTime();

          rotX = mouse.dy * 2 + prevRotX;
          rotY = mouse.dx * 2 + prevRotY;
          rotXEase += (rotX - rotXEase) * 0.1;
          rotYEase += (rotY - rotYEase) * 0.1;
          icoSphere.rotation.x = rotXEase;
          icoSphere.rotation.y = rotYEase;

          icoMaterial.uniforms['time'].value = time * 0.4;

          renderer.render(scene, camera);
        }

        init();
        render();

        // Cleanup
        return () => {
          if (isMobile) {
            window.removeEventListener("touchstart", inputstart);
            window.removeEventListener("touchmove", inputmove);
            window.removeEventListener("touchend", inputend);
          } else {
            window.removeEventListener("mousedown", inputstart);
            window.removeEventListener("mousemove", inputmove);
            window.removeEventListener("mouseup", inputend);
          }
          window.removeEventListener("resize", resize);
          
          if (mountRef.current && renderer.domElement) {
            mountRef.current.removeChild(renderer.domElement);
          }
          renderer.dispose();
        };

      } catch (error) {
        console.error('Erreur lors du chargement de Three.js:', error);
      }
    };

    loadThreeJS();
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 -z-10 pointer-events-none"
      style={{ 
        background: 'radial-gradient(circle, #12002b 0%, #000000 100%)',
        overflow: 'hidden'
      }}
    />
  );
} 