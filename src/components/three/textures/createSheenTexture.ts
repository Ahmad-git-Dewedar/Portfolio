import { CanvasTexture, ClampToEdgeWrapping, SRGBColorSpace } from "three";

/**
 * A diagonal light band on a transparent field. With clamped wrapping, offsetting
 * the texture sweeps the band across a surface and fully off it at either end.
 */
export function createSheenTexture(size = 256): CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createLinearGradient(size * 0.35, 0, size * 0.65, size);
    gradient.addColorStop(0, "rgba(255,255,255,0)");
    gradient.addColorStop(0.4, "rgba(255,255,255,0)");
    gradient.addColorStop(0.5, "rgba(255,255,255,0.22)");
    gradient.addColorStop(0.6, "rgba(255,255,255,0)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = ClampToEdgeWrapping;
  texture.wrapT = ClampToEdgeWrapping;
  return texture;
}
