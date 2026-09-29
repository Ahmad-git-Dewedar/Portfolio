import { Path, Shape, ShapeGeometry } from "three";

type Outline = Shape | Path;

/** Traces a rounded rectangle centered on the origin into a shape or hole path. */
function traceRoundedRect<T extends Outline>(outline: T, width: number, height: number, radius: number): T {
  const x = -width / 2;
  const y = -height / 2;
  const r = Math.min(radius, width / 2, height / 2);
  outline.moveTo(x + r, y);
  outline.lineTo(x + width - r, y);
  outline.quadraticCurveTo(x + width, y, x + width, y + r);
  outline.lineTo(x + width, y + height - r);
  outline.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  outline.lineTo(x + r, y + height);
  outline.quadraticCurveTo(x, y + height, x, y + height - r);
  outline.lineTo(x, y + r);
  outline.quadraticCurveTo(x, y, x + r, y);
  return outline;
}

/** Remaps ShapeGeometry UVs from shape units to 0..1 across the outer bounds. */
function normalizeUVs(geometry: ShapeGeometry, width: number, height: number): ShapeGeometry {
  const position = geometry.attributes.position;
  const uv = geometry.attributes.uv;
  for (let i = 0; i < uv.count; i++) {
    uv.setXY(i, (position.getX(i) + width / 2) / width, (position.getY(i) + height / 2) / height);
  }
  uv.needsUpdate = true;
  return geometry;
}

/** Flat rounded rectangle centered on the origin, with UVs spanning 0..1. */
export function createRoundedRectGeometry(width: number, height: number, radius: number, segments = 8): ShapeGeometry {
  const shape = traceRoundedRect(new Shape(), width, height, radius);
  return normalizeUVs(new ShapeGeometry(shape, segments), width, height);
}

interface RoundedRectSize {
  width: number;
  height: number;
  radius: number;
}

/**
 * Flat rounded frame (outer rectangle minus an inner one). Used for bezels so
 * no surface sits coplanar behind the content it surrounds.
 */
export function createRoundedFrameGeometry(outer: RoundedRectSize, inner: RoundedRectSize, segments = 8): ShapeGeometry {
  const shape = traceRoundedRect(new Shape(), outer.width, outer.height, outer.radius);
  shape.holes.push(traceRoundedRect(new Path(), inner.width, inner.height, inner.radius));
  return normalizeUVs(new ShapeGeometry(shape, segments), outer.width, outer.height);
}
