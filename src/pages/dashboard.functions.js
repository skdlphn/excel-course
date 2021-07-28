function toHtml() {
  return `
        <li class="db__record">
          <a href="#">Таблица номер 1</a>
          <strong>12.06.2020</strong>
        </li>
    `;
}

// excel:123123
function getAllKeys() {
  return Object.keys(localStorage).filter(key => key.includes('excel'));
}

export function createRecordsTables() {
  const keys = getAllKeys();
  if (!keys.length) {
    return 'Records are missing';
  }

  return `
      <div class="db__list-header">
        <span>Название</span>
        <span>Дата открытия</span>
      </div>

      <ul class="db__list">
        ${ keys.map(toHtml).join('') }
      </ul>
  `;
}
