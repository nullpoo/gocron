import { scheduleChecker } from './schedule_checker';
import { notifyForIfttt, notifyForZapier } from './notifier';

const mainProcess = async () => {
  const schedules = await scheduleChecker();
  if (schedules.length > 0) {
    await notifyForIfttt(schedules);
    await notifyForZapier(schedules);
  }
};

setInterval(mainProcess, 60000);
