/// <reference path="../types/shader-art.d.ts" />
import { useEffect } from "react";

export default function ShaderPrismBackground() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (customElements.get("shader-art")) return;
    const register = async () => {
      try {
        const { ShaderArt } = await import("https://esm.sh/shader-art");
        const { UniformPlugin } = await import("https://esm.sh/@shader-art/plugin-uniform");
        (ShaderArt as any).register([() => new (UniformPlugin as any)()]);
      } catch (_) {
        // Ignorer l'erreur réseau: le composant restera silencieux
      }
    };
    register();
  }, []);

  return (
    <div
      className="absolute inset-0 -z-10 pointer-events-none overflow-hidden"
      aria-hidden
      suppressHydrationWarning
    >
      {/* Le web component shader-art occupe tout l'écran */}
      {/* Les scripts internes sont fournis comme contenu texte brut */}
      <shader-art autoplay controls="false">
        <script type="buffer" name="position" data-size="2">{String.raw`[-1, 1, -1,-1, 1,1, 1, 1, -1,-1, 1,-1]`}</script>
        <script type="buffer" name="uv" data-size="2">{String.raw`[ 0, 0,  0, 1, 1,0, 1, 0,  0, 1, 1, 1]`}</script>

        <script type="vert">{String.raw`precision highp float;
attribute vec4 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = position;
}`}</script>

        <script type="frag">{String.raw`precision highp float;
varying vec2 vUv;
uniform float time;
uniform float scale;
uniform vec2 resolution;
uniform vec3 color1, color2, color3, color4;
uniform int numOctaves;
const float PI = 3.141592654;
uniform float ax, ay, az, aw;
uniform float bx, by;

float cheapNoise(vec3 stp) {
  vec3 p = vec3(stp.st, stp.p);
  vec4 a = vec4(ax, ay, az, aw);
  return mix(
    sin(p.z + p.x * a.x + cos(p.x * a.x - p.z)) *
    cos(p.z + p.y * a.y + cos(p.y * a.x + p.z)),
    sin(1. + p.x * a.z + p.z + cos(p.y * a.w - p.z)) *
    cos(1. + p.y * a.w + p.z + cos(p.x * a.x + p.z)),
    .436
  );
}

void main() {
  vec2 aR = vec2(resolution.x/resolution.y, 1.);
  vec2 st = vUv * aR * scale;
  float S = sin(time * .005);
  float C = cos(time * .005);
  vec2 v1 = vec2(cheapNoise(vec3(st, 2.)), cheapNoise(vec3(st, 1.)));
  vec2 v2 = vec2(
    cheapNoise(vec3(st + bx*v1 + vec2(C * 1.7, S * 9.2), 0.15 * time)),
    cheapNoise(vec3(st + by*v1 + vec2(S * 8.3, C * 2.8), 0.126 * time))
  );
  float n = .5 + .5 * cheapNoise(vec3(st + v2, 0.));

  vec3 color = mix(color1, color2, clamp((n*n)*8.,0.0,1.0));
  color = mix(color, color3, clamp(length(v1),0.0,1.0));
  color = mix(color, color4, clamp(length(v2.x),0.0,1.0));
  color /= n*n + n * 7.;
  gl_FragColor = vec4(color,1.);
}`}</script>

        <uniform type="float" name="scale" value=".4" />
        <uniform type="float" name="ax" value="5" />
        <uniform type="float" name="ay" value="7" />
        <uniform type="float" name="az" value="9" />
        <uniform type="float" name="aw" value="13" />
        <uniform type="float" name="bx" value="1" />
        <uniform type="float" name="by" value="1" />
        <uniform type="color" name="color1" value="#ffffff" />
        <uniform type="color" name="color2" value="#000000" />
        <uniform type="color" name="color3" value="#ffffff" />
        <uniform type="color" name="color4" value="#000000" />
      </shader-art>

      {/* Style de secours si Tailwind n'est pas appliqué à l'élément canvas interne */}
      <style>{String.raw`shader-art{display:block;width:100%;height:100%}shader-art canvas{display:block;width:100%;height:100%}`}</style>
    </div>
  );
}


