const { scheduleChecker } = require('./schedule_checker');
const { notifyForIfttt, notifyForZapier } = require('./notifier');

let notifiedSchedules = [];

const mainProcess = async () => {
  const schedules = await scheduleChecker();

  if (schedules.length !== notifiedSchedules.length && schedules.length > 0) {
    await notifyForIfttt(schedules);
    await notifyForZapier(schedules);
    notifiedSchedules = schedules;
  }
};

setInterval(mainProcess, 60000);
