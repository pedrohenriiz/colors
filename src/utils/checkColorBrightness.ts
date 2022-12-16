type CheckColorBrightnessProps = string;

export function checkColorBrightnessProps(
  color: CheckColorBrightnessProps
): boolean {
  const hex = color.replace('#', '');

  const redColor = parseInt(hex.substring(0, 0 + 2), 16);
  const greenColor = parseInt(hex.substring(2, 2 + 2), 16);
  const blueColor = parseInt(hex.substring(4, 4 + 2), 16);

  const brightness =
    (redColor * 299 + greenColor * 587 + blueColor * 114) / 1000;

  return brightness > 130;
}
