
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000; //Line 3
const routes = require('./routes/api');
const morgan = require('morgan')
require('dotenv').config();
const app = express();

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err,'WHYY'));

// Since mongoose's Promise is deprecated, we override it with Node's Promise
mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());
app.use(morgan('dev'))
app.use('/api', routes);
app.get('/', function(req, res){
  res.send({message:'Connected to base'})
});

app.use((err, req, res, next) => {
  next();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});