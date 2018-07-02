const express = require('express');
const axios = require('axios');
const CircularJSON = require('circular-json');

const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config();

app.get('/weatherdata', (req, res) => {
  console.log('PARAMETERS')
  console.log(req.param('latitude'))
  console.log(req.param('longitude'))

  console.log('KEY')
  console.log(process.env.DARK_SKY_API_KEY)

  axios.get(`https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${req.param('latitude')},${req.param('longitude')}`)
    .then((response) => {
      let json = CircularJSON.stringify(response.data);

      // console.log('heres the response')
      // console.log(response.data)
      res.send(json);
    })
    .catch((error) => {
      console.log(error)
    })
});

app.listen(port, () => console.log(`Listening on port ${port}`));
