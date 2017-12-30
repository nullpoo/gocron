import fetch from 'node-fetch';
import qs from 'query-string';

import config from '../config.json';

export const notifyForIfttt = async (freeSchedules) => {
  try {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    };
    const body = {
      value1: JSON.stringify(freeSchedules),
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
