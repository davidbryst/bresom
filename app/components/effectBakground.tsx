import { useEffect } from "react";

export default function EffectBackground() {

  return (
    <div className="absolute inset-0 pointer-events-none -z-20 overflow-hidden " aria-hidden>
<shader-art autoplay>
  <script type="buffer" name="position" data-size="2">
    [-1, 1, -1,-1, 1,1, 1, 1, -1,-1, 1,-1]
  </script>
  <script type="buffer" name="uv" data-size="2">
    [ 0, 0,  0, 1, 1,0, 1, 0,  0, 1, 1, 1]
  </script>
  <script type="vert">{String.raw`
    precision highp float;
    attribute vec4 position;
    attribute vec2 uv;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = position;
    }
  `}</script>
  <script type="frag">{String.raw`
    precision highp float;
    varying vec2 vUv;
    uniform vec2 resolution;
    uniform float time;
    // Remplacement des uniforms personnalisés par des constantes
    const float ZOOM = 5.0;
    const float X_SPEED = 0.2;
    const float Y_SPEED = 0.5;
    const float PI = 3.141592654;
    
    float lowcostnoise(vec3 p) {
      return mix(sin(1. + p.x + float(1.4 * p.z) + p.y),
                 sin(p.x + float(2.4 * p.y) + p.z) * cos(p.y + sin(3.5 * p.x) + p.z), 
                 .5 + .5 * sin(4. * p.x + sin(p.y * .2) * 2. + p.z) * cos(3. * p.y + sin(p.y * .3 + p.x * .4) * 2.));
    }
    
    void main() { 
      vec2 aspect = vec2(resolution.x / resolution.y, 1.);
      vec2 p0 = vUv.xy * aspect * ZOOM;
      vec2 p = mod(p0, 1.);
      float border = smoothstep(.0,.1,sin(p.x * PI) * sin(p.y * PI));
      vec2 k = floor(p0) * 2.;
      float n = lowcostnoise(vec3(p.xy, time + k.x * X_SPEED + k.y * Y_SPEED));
      float shade = border * smoothstep(.4, .5, n);
      float hue = fract(n * 0.25 + time * 0.02 + (k.x + k.y) * 0.05);
      vec3 base = 0.6 + 0.4 * cos(2.0 * PI * (hue + vec3(0.0, 0.33, 0.66)));
      vec3 color = base * shade;
      gl_FragColor = vec4(color, 1.);
    }
    `}</script>
    </shader-art>
    <style>{String.raw`shader-art{display:block;width:100%;height:100%}shader-art canvas{display:block;width:100%;height:100%}`}</style>
    </div>
  );
}


