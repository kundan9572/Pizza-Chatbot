const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bearerToken = require('express-bearer-token');
const events = require('./events');
var path = require('path');

const connection = mysql.createConnection({
  host     : 'braiyys6vkurzuwhekaj-mysql.services.clever-cloud.com',
  port     :  3306,
  user     : 'ucxxtgrfhuvq5pc4',
  password : '3ZdfQy6qfBJBc6dfpijv',
  database : 'braiyys6vkurzuwhekaj',

});

connection.connect();

const port = process.env.PORT || 3000;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(bearerToken())
  .use(events(connection));

app.use(express.static(path.join(__dirname,'public')));
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'public/index.html'));
})

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});