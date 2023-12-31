// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// if no date specified getting actual Date()
app.get("/api/", function (req, res) {
  let date = new Date();
  res.json({unix: date.valueOf(), utc: date.toUTCString()});
});

// getting date in url
app.get("/api/:date", function (req, res) {
  // checking if date format is valid string
  let date = new Date(req.params.date);
  // if not a valid string
  if (date.toString() == "Invalid Date") {
    // checking unix format (integer)
    let intDate = new Date(parseInt(req.params.date, 10))
    // if invalid unix format
    if (intDate.toString() == "Invalid Date") {
      res.json({error: date.toString()});
    }
      // if valid unix format
    else {
      res.json({unix: intDate.valueOf(), utc: intDate.toUTCString()});
    }
  }
    // if string format valid 
  else {
    res.json({unix: date.valueOf(), utc: date.toUTCString()});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
