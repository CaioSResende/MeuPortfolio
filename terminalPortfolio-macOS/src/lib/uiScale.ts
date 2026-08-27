export const BASE_WIDTH = 1440;
export const BASE_HEIGHT = 900;

export function getUIScale() {
  return Math.min(window.innerWidth / BASE_WIDTH, window.innerHeight / BASE_HEIGHT);
}
