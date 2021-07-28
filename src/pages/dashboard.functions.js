import { storage } from '@core/utils';

function toHtml(key) {
  const model = storage(key);
  const id = key.split(':')[1];
  const lastOpen = storage(key).lastOpen;
  const dateObj = new Date(parseInt(lastOpen));
  const month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const hours = dateObj.getUTCHours();
  const minutes = dateObj.getUTCMinutes();
  return `
        <li class="db__record">
          <a href="#excel/${id}">${ model.title }</a>
          <strong>${ day }.${ month }.${ year } ${ hours }:${ minutes }</strong>
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
        ${ keys.map(key => toHtml(key)).join('') }
      </ul>
  `;
}
