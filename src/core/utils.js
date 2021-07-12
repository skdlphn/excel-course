export function capitalize(string) {
  if (typeof string !== 'string') {
    return '';
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const range = (start, end) => {
  if (start > end) {
    [start, end] = [end, start];
  }
  return new Array(end - start + 1)
      .fill(0)
      .map((_, index) => start + index);
};
