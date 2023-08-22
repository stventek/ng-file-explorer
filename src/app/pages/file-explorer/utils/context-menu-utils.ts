import { ElementRef } from '@angular/core';

export function calculateContextMenuPosition(
  event: MouseEvent,
  contextMenuRef: ElementRef
) {
  const bodyWidth = document.body.clientWidth;
  const bodyHeight = document.body.clientHeight;
  const contextMenuElement = contextMenuRef.nativeElement as HTMLElement;

  const contextMenuWidth = contextMenuElement.offsetWidth;
  const contextMenuHeight = contextMenuElement.offsetHeight;

  const x = event.clientX;
  const y = event.clientY;

  const availableSpaceRight = bodyWidth - x;
  const availableSpaceLeft = x;
  const availableSpaceBottom = bodyHeight - y;
  const availableSpaceTop = y;

  let position: string = 'bottom-right';

  if (
    availableSpaceBottom < contextMenuHeight &&
    availableSpaceTop >= contextMenuHeight
  ) {
    position = 'top-right';
  }

  if (
    availableSpaceRight < contextMenuWidth &&
    availableSpaceLeft >= contextMenuWidth
  ) {
    position = position.replace('right', 'left');
  }

  const styles: { [key: string]: string } = {};

  if (position.includes('top')) {
    styles['top'] = `${Math.max(0, y - contextMenuHeight)}px`;
  } else {
    styles['top'] = `${y}px`;
  }

  if (position.includes('left')) {
    styles['left'] = `${Math.max(0, x - contextMenuWidth)}px`;
  } else {
    styles['left'] = `${x}px`;
  }
  return styles;
}
