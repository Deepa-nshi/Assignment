const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;
const path = require('path');
app.use(cors());


app.use(express.static(path.join(__dirname, 'public')));

// Route to fetch ticker data
app.get('/api/tickers', async (req, res) => {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    res.json(response.data);
   
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
