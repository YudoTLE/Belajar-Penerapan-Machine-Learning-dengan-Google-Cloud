#!/bin/bash

docker build -t web-server .
gcloud builds submit --tag gcr.io/submissionmlgc-ariyudopertama/web-server .
gcloud run deploy web-server --image gcr.io/submissionmlgc-ariyudopertama/web-server --region asia-southeast2