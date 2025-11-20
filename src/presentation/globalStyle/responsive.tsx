export const adjustingImage = (percentage: number) => {
  const screenHeight = window.innerHeight;
  const imageHeightPercentage = percentage;
  const imageHeight = (screenHeight * imageHeightPercentage) / 100;
  return imageHeight;
};
