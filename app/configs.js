const envVars = {
  IFTTT_WEBHOOK_URL: process.env.IFTTT_WEBHOOK_URL ? process.env.IFTTT_WEBHOOK_URL : null,
  ZAPIER_WEBHOOK_URL: process.env.ZAPIER_WEBHOOK_URL ? process.env.ZAPIER_WEBHOOK_URL : null,
  SHOP_ID: process.env.SHOP_ID ? process.env.SHOP_ID : null,
  COURSE_ID: process.env.COURSE_ID ? process.env.COURSE_ID : null,
};

exports.envVars = envVars;
