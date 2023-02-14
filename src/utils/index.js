import colors from "../assets/theme/colors";

const MAX_DEPTH = 24;
const MIN_SHADOW_OPACITY = 0.2;
const MAX_SHADOW_OPACITY = 0.6;
const MAX_SHADOW_RADIUS = 16;

const SHADOW_OPACITY_PER_DEPTH = (MAX_SHADOW_OPACITY * 100 - MIN_SHADOW_OPACITY * 100) / MAX_DEPTH;
const SHADOW_RADIUS_PER_DEPTH = MAX_SHADOW_RADIUS / MAX_DEPTH;

export const shadowGenerator = (depth, shadowColor = colors.black) => ({
  shadowColor,
  shadowOffset: {
    width: 0,
    height: depth ? Math.floor(depth / 2) : 0,
  },
  shadowOpacity:
    Math.ceil((depth ? MIN_SHADOW_OPACITY : 0) * 100 + SHADOW_OPACITY_PER_DEPTH * depth) / 100,
  shadowRadius: SHADOW_RADIUS_PER_DEPTH * depth,
  elevation: depth,
});

export const alphaHexColor = (hexColor, opacity) => {
  const MIN_OPACITY = 0.066;
  // Limit the opacity from 0 to 1
  const opacityRange = Math.min(Math.max(opacity, 0), 1);
  const safeOpacityValue =
    opacityRange > 0 && opacityRange < MIN_OPACITY ? MIN_OPACITY : opacityRange;
  const alpha = `${(safeOpacityValue * 255).toString(16)}0`.slice(0, 2);

  return `${hexColor}${alpha}`;
};
