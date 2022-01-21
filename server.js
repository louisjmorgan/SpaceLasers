const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());

app.get('/txt_response', async (req, res) => {
  const resp = await fetch(
    'http://www.celestrak.com/NORAD/elements/active.txt'
  );
  const textResp = await resp.text();
  res.json(textResp);
});

app.listen('9000');
