import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import qs from "query-string";

import config from '../config.json';

/**
 * @param date yyyyMMdd
 * @param time HHmm
 * @returns {Promise<string>}
 */
const makeReservation = async (date, time) => {
  try {
    const headers = {
      'Accept': 'text/html',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    };
    const body = {
      must_id: '(必須)',
      input_time: '0',
      sitein_referrer: '',
      mailform_confirm_mode: '0',
      errorlog: '',
      mode: 'pc',
      shop_id: config.SHOP_ID,
      menu: config.COURSE_ID,
      reserve_date: `${date.slice(0, 4)}/${date.slice(4, 6)}/${date.slice(6, 8)}`,
      r_time: time,
      persons: '1',
      repeat: '0',
      sei: config.SEI,
      mei: config.MEI,
      tel: config.TEL,
      mail: config.MAIL,
      comment: config.COMMENT,
    };
    const response = await fetch('https://form.goku-nokimochi.com/form/sendmail2.php', {
      method: 'POST',
      headers,
      body: qs.stringify(body),
    });
    const redirectLocation = response.headers.get('location');
    if (!redirectLocation) {
      throw new Error();
    }
    console.log('Reservation success.');
    return redirectLocation;
  } catch (e) {
    console.warn('Reservation fail.');
    throw e;
  }
};

export const initialize = () => {
  const app = express();

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  app.set('view engine', 'ejs');
  app.set('views', process.cwd() + '/app/views');

  const server = app.listen(3000, () => {
    console.log("Express server is listening to PORT:" + server.address().port);
  });

  app.get("/reservation", (req, res, next) => {
    res.render('reservation', {
      date: req.query.date,
      time: req.query.time,
    });
  });

  app.post("/reservation", async (req, res, next) => {
    try {
      const redirectUrl = await makeReservation(req.body.date, req.body.time);
      res.redirect(redirectUrl);
    } catch (e) {
      const params = {
        date: req.body.date,
        time: req.body.time,
      };
      res.redirect(301, `/reservation?${qs.stringify(params)}`);
    }
  });
};
