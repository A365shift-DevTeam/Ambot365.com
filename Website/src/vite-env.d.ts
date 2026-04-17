/// <reference types="vite/client" />

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.enc' {
  const src: string;
  export default src;
}

declare module 'cobe' {
  interface GlobeOptions {
    devicePixelRatio?: number;
    width?: number;
    height?: number;
    phi?: number;
    theta?: number;
    dark?: number;
    diffuse?: number;
    mapSamples?: number;
    mapBrightness?: number;
    baseColor?: [number, number, number];
    markerColor?: [number, number, number];
    glowColor?: [number, number, number];
    markers?: Array<{
      location: [number, number];
      size?: number;
    }>;
    onRender?: (state: {
      phi: number;
      theta: number;
      width: number;
      height: number;
    }) => void;
  }

  interface GlobeInstance {
    destroy: () => void;
  }

  function createGlobe(canvas: HTMLCanvasElement, options: GlobeOptions): GlobeInstance;
  export default createGlobe;
}
