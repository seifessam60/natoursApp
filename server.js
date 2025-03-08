const mongoose = require('mongoose');
const dotenv = require('dotenv');
<<<<<<< HEAD
const app = require('./app');

dotenv.config({ path: './config.env' });
=======
dotenv.config({ path: './config.env' });
const app = require('./app');
>>>>>>> 7c472ef91854f1656565e13e1d7e1e605e1cdcb7

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
<<<<<<< HEAD

mongoose.connect(DB).then(con => {
  // console.log(con.connections);
=======
mongoose.connect(DB).then(() => {
>>>>>>> 7c472ef91854f1656565e13e1d7e1e605e1cdcb7
  console.log('DB connection successful!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
