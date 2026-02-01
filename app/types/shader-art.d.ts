import type * as React from "react";

declare module "https://esm.sh/shader-art" {
  export const ShaderArt: any;
}

declare module "https://esm.sh/@shader-art/plugin-uniform" {
  export const UniformPlugin: any;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'shader-art': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'uniform': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      script: any; // pour name, data-size, etc.
    }
  }
}

export {};
