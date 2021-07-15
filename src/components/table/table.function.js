import { range } from '@core/utils';
import { $ } from '@core/dom';

export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return event.target.dataset.type === 'cell';
}

export function matrix($target, $current) {
  const target = $target.id(true);
  const current = $current.id(true);

  const colRange = range(target.col, current.col);
  const rowRange = range(target.row, current.row);

  return rowRange.reduce( (acc, row) => {
    colRange.forEach( col => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}

export function getIdOnKeydown(event) {
  const keys = [
    'Enter',
    'Tab',
    'ArrowDown',
    'ArrowUp',
    'ArrowLeft',
    'ArrowRight',
  ];
  const $target = $(event.target);
  const id = $target.id(true);
  if (keys.includes(event.key) && !event.shiftKey) {
    event.preventDefault();
    switch (event.key) {
      case 'ArrowUp':
        id.row = id.row > 0 ? --id.row : id.row;
        break;
      case 'ArrowDown':
      case 'Enter':
        id.row = id.row < 14 ? ++id.row : id.row;
        break;
      case 'ArrowLeft':
        id.col = id.col > 0 ? --id.col : id.col;
        break;
      case 'ArrowRight':
      case 'Tab':
        id.col = id.col < 24 ? ++id.col : id.col;
        break;
    }
  }
  return id;
}
