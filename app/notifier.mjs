import fetch from 'node-fetch';
import qs from 'query-string';
import publicIp from 'public-ip';

import config from '../config.json';

export const notifyForIfttt = async (freeSchedules) => {
  try {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    };
    const ownPublicIp = await publicIp.v4();
    const body = {
      value1: JSON.stringify(freeSchedules),
      value2: freeSchedules.reduce((accumulator, currentValue) => {
        const params = {
          date: currentValue.slice(0, 8),
          time: currentValue.slice(8, 12),
        };
        return accumulator + `http://${ownPublicIp}/reservation?${qs.stringify(params)}` + ' , ';
      }, ''),
    };
    const response = await fetch(config.IFTTT_WEBHOOK_URL, {
      method: 'POST',
      headers,
      body: qs.stringify(body),
    });
    if (response.ok) {
      console.log('Notify success.')
    } else {
      console.warn('Notify fail.');
    }
  } catch (e) {
    console.warn('Notify fail.');
  }
};
