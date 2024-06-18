class Star {
  x;
  y;
  size;
  opacity;
  fadeInHour;
  fadeOutHour;

  constructor(
    x: number,
    y: number,
    size: number,
    fadeInHour: number,
    fadeOutHour: number
  ) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.opacity = 0; // Start fully transparent
    this.fadeInHour = fadeInHour;
    this.fadeOutHour = fadeOutHour;
  }
}

export const createStars = (
  containerWidth: number,
  containerHeight: number
) => {
  const numStars = (containerWidth * containerHeight) / 2500;

  const stars: Star[] = [];

  const weightedRandom = () => Math.pow(Math.random(), 2);

  for (let index = 0; index < numStars; index++) {
    const x = Math.random() * containerWidth;
    const y =
      (Math.random() > 0.5 ? weightedRandom() : Math.random()) *
      containerHeight;
    const size = Math.random() > 0.7 ? 2 : 1;
    const fadeInHour = Math.random() > 0.8 ? 21 : Math.random() > 0.3 ? 20 : 19;
    const fadeOutHour = Math.random() > 0.8 ? 7 : Math.random() > 0.3 ? 6 : 5;

    stars.push(new Star(x, y, size, fadeInHour, fadeOutHour));
  }

  return stars;
};
