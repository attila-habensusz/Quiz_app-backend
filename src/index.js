const express = require('express');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors');

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useCreateIndex: true,
  dbName: 'Quiz',
});

mongoose.set('useFindAndModify', false);

app.use(cors());
app.options('*', cors());
app.use(express.json());

const router = require('./routes/index');

app.use(router);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Port is listening on ${process.env.PORT || 3000}`);
});

module.exports = app;