export const createStarCoords = (containerWidth = 2000) => {
  console.log({ containerWidth });
  return Array.from({ length: 50 }, () => {
    const maxLeft = containerWidth;
    const maxTop = 450;
    const fadeInHour = Math.random() > 0.8 ? 21 : Math.random() > 0.3 ? 20 : 19;
    const fadeOutHour = Math.random() > 0.8 ? 7 : Math.random() > 0.3 ? 6 : 5;
    return {
      left: Math.floor(Math.random() * maxLeft),
      top: Math.floor(Math.random() * maxTop),
      big: Math.random() > 0.7,
      fadeInHour,
      fadeOutHour,
    };
  });
};
