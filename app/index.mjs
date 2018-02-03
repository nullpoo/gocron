import { scheduleChecker } from './schedule_checker';
import { notifyForIfttt } from './notifier';
import { initialize } from './server';

const mainProcess = async () => {
  const schedules = await scheduleChecker();
  if (schedules.length > 0) {
    await notifyForIfttt(schedules);
  }
};

setInterval(mainProcess, 60000);
initialize();
