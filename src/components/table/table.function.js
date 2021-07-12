import { range } from '@core/utils';

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
