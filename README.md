# gocron

---

Auto reserve script for http://goku-nokimochi.com/

## Setup

please install gcloud sdk
https://cloud.google.com/functions/docs/quickstart?hl=ja

Setup `.env.yaml` with env vars.
You can deploy to cloud functions.
`gcloud beta functions deploy mainProcess --runtime nodejs10 --trigger-topic gocron --env-vars-file .env.yaml`

## Run

Node v9.3.0 or higher.

`IFTTT_WEBHOOK_URL=hoge SHOP_ID=fuga COURSE_ID=piyo npm start`
