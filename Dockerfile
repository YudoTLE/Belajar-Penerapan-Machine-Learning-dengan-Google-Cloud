FROM node:18-slim

WORKDIR /app

ENV env=prod
ENV PORT=8080
ENV FRONTEND_URL='https://submissionmlgc-ariyudopertama.et.r.appspot.com'
ENV MODEL_URL='https://storage.googleapis.com/submissionmlgc-ariyudopertama-bucket/submissions-model/model.json'

COPY . .

RUN npm install --production

EXPOSE 8080

CMD ["npm", "run", "prod"]