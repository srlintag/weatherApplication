const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
  });

var apiCalls = require ('./routes/apiCallRoute');
app.use('/api-calls/', apiCalls);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening at http://localhost:`+process.env.PORT)
})