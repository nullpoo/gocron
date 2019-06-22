const fetch = require('node-fetch');
const config = require('../config.json');

const fetchSchedules = async () => {
  const response = await fetch(`https://form.goku-nokimochi.com/form/getReservation4.php?shop_id=${config.SHOP_ID}&course_id=${config.COURSE_ID}`, {
    headers: { 'Referer': 'https://form.goku-nokimochi.com/' },
  });
  const responseText = await response.text();

  // Dummy response
  // const responseText = '{"20171230":["1100"],"20171231":[],"20180101":[],"20180102":[],"20180103":[],"20180104":[],"20180105":[],"20180106":[],"20180107":[],"20180108":[],"20180109":[],"20180110":[],"20180111":[],"20180112":[],"20180113":[],"20180114":[],"20180115":[],"20180116":[],"20180117":[],"20180118":[],"20180119":[],"20180120":[],"20180121":[],"20180122":[],"20180123":[],"20180124":[],"20180125":[],"20180126":[],"20180127":[],"20180128":[],"20180129":[],"20180130":[],"20180131":[],"20180201":[],"20180202":[],"20180203":[],"20180204":[],"20180205":[],"20180206":[],"20180207":[],"20180208":[],"20180209":[],"20180210":[],"20180211":[],"20180212":[],"20180213":[],"20180214":[],"20180215":[],"20180216":[],"20180217":[],"20180218":[],"20180219":[],"20180220":[],"20180221":[],"20180222":[],"20180223":[],"20180224":[],"20180225":[],"20180226":[],"20180227":[],"20180228":[],"20180301":[],"20180302":[],"20180303":[],"20180304":[],"20180305":[],"20180306":[],"20180307":[],"20180308":[],"20180309":[],"20180310":[],"20180311":[],"20180312":[],"20180313":[],"20180314":[],"20180315":[],"20180316":[],"20180317":[],"20180318":[],"20180319":[],"20180320":[],"20180321":[],"20180322":[],"20180323":[],"20180324":[],"20180325":[],"20180326":[],"20180327":[],"20180328":[],"20180329":[],"20180330":[],"20180331":[]}';

  let schedules = null;
  try {
    schedules = JSON.parse(responseText);
  } catch (e) {
    console.warn('Response is strange...');
    schedules = {};
  }
  return schedules;
};

const filterFreeSchedules = (schedules) => {
  const freeSchedules = [];

  Object.entries(schedules).forEach(entry => {
    const date = entry[0];
    const timeList = entry[1];
    timeList.forEach(time => {
      freeSchedules.push(`${date}${time}`);
    });
  });

  return freeSchedules;
};

const scheduleChecker = async () => {
  const schedules = await fetchSchedules();
  const filteredSchedules = filterFreeSchedules(schedules);
  if (filteredSchedules.length === 0) {
    console.info('Do not have free time.');
  } else {
    console.info('Have free time!!')
  }
  return filteredSchedules;
};

exports.scheduleChecker = scheduleChecker;
