const app = require('./app');
const dotenv = require('dotenv');
const port = 3000;
const mongoose = require('mongoose');


dotenv.config({ path: './config.env' });
console.log(process.env.DATABASE);

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log(res.connections);
    console.log('DB connected');
  });

app.listen(port, () => {
  console.log('Api is listening port is: ' + port);
});
