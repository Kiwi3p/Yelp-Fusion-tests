'use strict';

const yelp = require('yelp-fusion');
const express = require('express');
const hbs = require('hbs');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'WgRag4zBmo7OTNmEPv_H4JsjK1OhtfSYeCIG99_4-xK7R0Ref9OP0RlVWb_5GssPYF9KucWPXl70qYDIzIGruWthGl3ZgcC9YuxBYOg8T21PmTk6kzRKSTf2InKtX3Yx';

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

const searchRequest = {
  term:'-+Farmers market',
  location: 'Lisbon, pt',
  limit: 8
};

const client = yelp.client(apiKey);


app.get('/', (req, res) =>  {
client.search(searchRequest).then(response => {
  const firstResult = response.jsonBody.businesses;
//  const prettyJson = JSON.stringify(firstResult, null, 4);
  console.log(firstResult);
  res.render('index', {print: firstResult})
}).catch(e => {
  console.log(e);
});
});

app.listen(3000, () => console.log('My Yelp project running on port 3000 🎧 🥁 🎸 🔊'));