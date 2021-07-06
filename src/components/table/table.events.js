function onMouseMove(event, $resizer, type, mousemovePageX, mousemovePageY, tableWidth, tableHeight) {
  // document.onmousemove = e => {
  //   if (type === 'row') {
  //     mousemovePageY = e.pageY;
  //     $resizer.css({ bottom: event.pageY - e.pageY + 'px', width: tableWidth + 'px' });
  //   } else {
  //     mousemovePageX = e.pageX;
  //     $resizer.css({ right: -(e.pageX - event.pageX) + 'px', height: tableHeight + 'px' });
  //   }
  // };
  // return { mousemovePageY, mousemovePageX };
}

export default onMouseMove;
