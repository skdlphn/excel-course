export class TableSelection {
  selectedCell = null;

  constructor() {
    this.group = [];
  }

  select($el) {
    const $lastElement = this.group.pop();
    if ($lastElement) {
      $lastElement.removeClass('selected');
    }
    this.group.push($el);
    $el.addClass('selected');
  }

  selectGroup() {
  }
}
