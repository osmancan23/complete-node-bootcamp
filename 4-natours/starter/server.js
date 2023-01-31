const app = require('./app');
const port = 3000;

app.listen(port, () => {
  console.log('Api is listening port is: ' + port);
});
