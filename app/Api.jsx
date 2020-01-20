import * as Utils from './Utils';
import { createUrl, deleteUrl, scheduleUrl } from './Constants';

export const sendProfile = values => (
  fetch(createUrl, {
    method: 'POST',
    body: JSON.stringify(Utils.formatProfileValues(values)),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .then(data => data)
    .catch(err => err)
);

export const deleteProfile = name => (
  fetch(`${deleteUrl}/${name}?key=kobajers`)
    .then(res => res.json())
    .then((res) => {
      if (res.success === true) {
        console.log('The profile has been deleted');
      }
    })
    .catch(err => console.log(err))
);

export const startTest = name => (
  fetch(`${scheduleUrl}/${name}?key=kobajers`)
    .then(res => res.json())
    .then((res) => {
      if (res.success === true) {
        console.log(`next run at ${new Date(res.nextRun)}`);
      }
    })
    .catch(err => console.log(err))
);
