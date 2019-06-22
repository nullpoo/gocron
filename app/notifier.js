const fetch = require('node-fetch');
const qs = require('query-string');

const config = require('../config.json');

const notifyForIfttt = async (freeSchedules) => {
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
      console.log('IFTTT notify success.')
    } else {
      console.warn('IFTTT notify fail.');
    }
  } catch (e) {
    console.warn('IFTTT notify fail.');
  }
};

const notifyForZapier = async (freeSchedules) => {
  try {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    };
    const body = {
      value1: JSON.stringify(freeSchedules),
    };
    const response = await fetch(config.ZAPIER_WEBHOOK_URL, {
      method: 'POST',
      headers,
      body: qs.stringify(body),
    });
    if (response.ok) {
      console.log('Zapier notify success.')
    } else {
      console.warn('Zapier notify fail.');
    }
  } catch (e) {
    console.warn('Zapier notify fail.');
  }
};

exports.notifyForIfttt = notifyForIfttt;
exports.notifyForZapier = notifyForZapier;
