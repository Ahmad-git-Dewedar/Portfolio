import { CanvasTexture, LinearFilter, SRGBColorSpace } from "three";

export interface TextTextureOptions {
  text: string;
  /** CSS font-family list, e.g. the page's computed body font. */
  fontFamily: string;
  fontWeight?: number;
  /** Rendered glyph size in canvas pixels; larger is sharper. */
  fontSize?: number;
  color: string;
  /** Color at the bottom of the glyphs, for a soft metallic falloff. Defaults to `color`. */
  shade?: string;
  /** Soft glow in the page color behind the glyphs, keeping them legible over the model. */
  halo?: string;
  direction: "ltr" | "rtl";
}

export interface TextTexture {
  texture: CanvasTexture;
  /** Width / height of the drawn line, for sizing the plane. */
  aspect: number;
}

/**
 * Draws one line of display type onto a transparent canvas. Uses the browser's
 * own text shaping, so Arabic joins and runs right-to-left correctly. The
 * canvas is padded generously so ascenders, descenders and diacritics are never
 * clipped.
 */
export function createTextTexture({
  text,
  fontFamily,
  fontWeight = 800,
  fontSize = 180,
  color,
  shade = color,
  halo,
  direction,
}: TextTextureOptions): TextTexture {
  const font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  const probe = document.createElement("canvas").getContext("2d");
  let width = fontSize * text.length * 0.6;
  if (probe) {
    probe.font = font;
    width = probe.measureText(text).width;
  }

  const padX = fontSize * 0.25;
  const height = Math.ceil(fontSize * 1.7);
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(width + padX * 2);
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.font = font;
    ctx.direction = direction;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const gradient = ctx.createLinearGradient(0, height * 0.25, 0, height * 0.75);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, shade);
    ctx.fillStyle = gradient;
    if (halo) {
      ctx.shadowColor = halo;
      ctx.shadowBlur = fontSize * 0.2;
      ctx.fillText(text, canvas.width / 2, height / 2);
      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";
    }
    ctx.fillText(text, canvas.width / 2, height / 2);
  }

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.minFilter = LinearFilter;
  texture.generateMipmaps = false;
  texture.anisotropy = 4;
  return { texture, aspect: canvas.width / canvas.height };
}

/** Greedy word wrap into lines of at most `maxChars` (never splits a word). */
export function wrapWords(text: string, maxChars: number): string[] {
  const lines: string[] = [];
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const last = lines[lines.length - 1];
    if (last && (last + " " + word).length <= maxChars) lines[lines.length - 1] = `${last} ${word}`;
    else lines.push(word);
  }
  return lines;
}
