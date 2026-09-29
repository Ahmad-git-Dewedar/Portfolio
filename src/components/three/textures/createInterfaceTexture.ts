import { CanvasTexture, SRGBColorSpace } from "three";
import { sceneTheme } from "../theme";

export const INTERFACE_TEXTURE_ASPECT = 1.58;

/**
 * Paints an abstract, brand-neutral app interface onto a canvas and returns it as a texture.
 * Procedural so the hero ships with no image assets; replace with a real screenshot later if desired.
 */
export function createInterfaceTexture(width = 1600): CanvasTexture {
  const height = Math.round(width / INTERFACE_TEXTURE_ASPECT);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new CanvasTexture(canvas);

  const u = width / 1000; // layout unit so the drawing scales with resolution
  const box = (x: number, y: number, w: number, h: number, r: number, fill: string | CanvasGradient) => {
    ctx.beginPath();
    ctx.roundRect(x * u, y * u, w * u, h * u, r * u);
    ctx.fillStyle = fill;
    ctx.fill();
  };

  // Base and ambient glows
  const base = ctx.createLinearGradient(0, 0, 0, height);
  base.addColorStop(0, sceneTheme.screenTop);
  base.addColorStop(1, sceneTheme.screenBottom);
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, width, height);

  const glow = (x: number, y: number, r: number, color: string) => {
    const g = ctx.createRadialGradient(x * u, y * u, 0, x * u, y * u, r * u);
    g.addColorStop(0, color);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);
  };
  glow(720, 120, 520, "rgba(41,151,255,0.45)");
  glow(160, 600, 460, "rgba(139,108,255,0.28)");

  // Window chrome
  ["#ff5f57", "#febc2e", "#28c840"].forEach((color, i) => {
    ctx.beginPath();
    ctx.arc((32 + i * 22) * u, 30 * u, 6 * u, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.75;
    ctx.fill();
    ctx.globalAlpha = 1;
  });
  box(380, 18, 240, 24, 12, "rgba(255,255,255,0.07)");

  // Sidebar
  box(20, 64, 170, 548, 16, "rgba(255,255,255,0.04)");
  for (let i = 0; i < 7; i++) {
    const active = i === 1;
    if (active) box(30, 88 + i * 44, 150, 32, 10, "rgba(41,151,255,0.22)");
    box(44, 100 + i * 44, 16, 8, 4, active ? sceneTheme.accent : "rgba(255,255,255,0.22)");
    box(70, 100 + i * 44, 70 + ((i * 37) % 40), 8, 4, active ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.18)");
  }

  // Headline
  box(214, 84, 330, 26, 8, "rgba(255,255,255,0.9)");
  box(214, 124, 220, 12, 6, "rgba(255,255,255,0.28)");
  box(846, 84, 128, 36, 18, sceneTheme.accent);

  // Metric cards
  const cardWidth = 244;
  for (let i = 0; i < 3; i++) {
    const x = 214 + i * (cardWidth + 14);
    box(x, 164, cardWidth, 120, 16, "rgba(255,255,255,0.06)");
    box(x + 18, 184, 70, 8, 4, "rgba(255,255,255,0.3)");
    box(x + 18, 206, 110 - i * 18, 22, 6, "rgba(255,255,255,0.88)");
    const bar = ctx.createLinearGradient(x * u, 0, (x + cardWidth) * u, 0);
    bar.addColorStop(0, sceneTheme.accent);
    bar.addColorStop(1, sceneTheme.accentAlt);
    box(x + 18, 252, (cardWidth - 36) * (0.45 + i * 0.18), 8, 4, bar);
  }

  // Chart panel
  box(214, 300, 760, 312, 18, "rgba(255,255,255,0.045)");
  const points = [0.62, 0.55, 0.6, 0.42, 0.47, 0.3, 0.36, 0.22, 0.28, 0.14, 0.18];
  const chartX = 244;
  const chartW = 700;
  const chartY = 340;
  const chartH = 240;
  const toXY = (v: number, i: number): [number, number] => [
    (chartX + (chartW / (points.length - 1)) * i) * u,
    (chartY + chartH * v) * u,
  ];

  ctx.beginPath();
  points.forEach((v, i) => {
    const [x, y] = toXY(v, i);
    if (i === 0) ctx.moveTo(x, y);
    else {
      const [px, py] = toXY(points[i - 1], i - 1);
      const mx = (px + x) / 2;
      ctx.bezierCurveTo(mx, py, mx, y, x, y);
    }
  });
  const line = ctx.createLinearGradient(chartX * u, 0, (chartX + chartW) * u, 0);
  line.addColorStop(0, sceneTheme.accent);
  line.addColorStop(1, sceneTheme.accentAlt);

  ctx.save();
  ctx.lineTo((chartX + chartW) * u, (chartY + chartH) * u);
  ctx.lineTo(chartX * u, (chartY + chartH) * u);
  ctx.closePath();
  const area = ctx.createLinearGradient(0, chartY * u, 0, (chartY + chartH) * u);
  area.addColorStop(0, "rgba(41,151,255,0.35)");
  area.addColorStop(1, "rgba(41,151,255,0)");
  ctx.fillStyle = area;
  ctx.fill();
  ctx.restore();

  ctx.beginPath();
  points.forEach((v, i) => {
    const [x, y] = toXY(v, i);
    if (i === 0) ctx.moveTo(x, y);
    else {
      const [px, py] = toXY(points[i - 1], i - 1);
      const mx = (px + x) / 2;
      ctx.bezierCurveTo(mx, py, mx, y, x, y);
    }
  });
  ctx.strokeStyle = line;
  ctx.lineWidth = 4 * u;
  ctx.lineCap = "round";
  ctx.stroke();

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}
