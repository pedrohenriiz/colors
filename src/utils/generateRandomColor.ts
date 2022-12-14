export function generateRandomColor() {
  const generatedColor = Math.random().toString(16).substring(2, 8);

  return `#${generatedColor}`;
}
