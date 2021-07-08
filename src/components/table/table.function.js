export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return !event.target.dataset.type && event.target.dataset.colNumber;
}

export function isCellWithShift(event) {
  return isCell(event) && event.shiftKey;
}
