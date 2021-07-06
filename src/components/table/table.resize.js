import { $ } from '@core/dom';

export function resizeHandler($root, event) {
  const type = event.target.dataset.resize;
  const tableHeight = $root.getCoords().height;
  const tableWidth = $root.getCoords().width;
  const $resizer = $(event.target);
  const $resizingLine = $resizer.closest('[data-type=resizeble]');
  const coords = $resizingLine.getCoords();
  const resizingColNumber = $resizingLine.data.colNumber;
  if (type === 'col') {
    $resizer.css({ height: tableHeight + 'px' });
  }

  let mousemovePageX;
  let mousemovePageY;
  document.onmousemove = e => {
    if (type === 'row') {
      mousemovePageY = e.pageY;
      $resizer.css({ bottom: event.pageY - e.pageY + 'px', width: tableWidth + 'px' });
    } else {
      mousemovePageX = e.pageX;
      $resizer.css({ right: -(e.pageX - event.pageX) + 'px', height: tableHeight + 'px' });
    }
  };

  document.onmouseup = () => {
    if (type === 'col') {
      const width = (coords.width + mousemovePageX - event.pageX) + 'px';
      $resizer.css({ right: 0 + 'px', height: '' });
      $root.findAll(`[data-col-number="${resizingColNumber}"]`)
          .forEach(el => el.style.width = width);
    } else {
      $resizingLine.css({ height: (coords.height + mousemovePageY - event.pageY) + 'px' });
      $resizer.css({ bottom: '', width: '' });
    }
    document.onmousemove = null;
    document.onmouseup = null;
  };
}
