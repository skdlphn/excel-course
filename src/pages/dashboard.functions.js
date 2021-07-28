function toHtml(key) {
  const tableProps = JSON.parse(getTableProps(key));
  const dateObj = new Date(parseInt(key.slice(6)));
  const month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  return `
        <li class="db__record">
          <a href="#">${ tableProps.title }</a>
          <strong>${ day } ${ month } ${ year }</strong>
        </li>
    `;
}

function getTableProps(key) {
  return localStorage[key];
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
        ${ keys.map(key => toHtml(key)).join('') }
      </ul>
  `;
}
