
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const staticHeadlines = [
  "Discover the Best of [NAME] in [LOCATION]!",
  "[NAME] – Your Go-To Spot in [LOCATION]!",
  "[LOCATION] Loves [NAME]: Here's Why!",
];

app.post('/business-data', (req, res) => {
  const { name, location } = req.body;
  res.json({
    rating: (Math.random() * 2 + 3).toFixed(1),
    reviews: Math.floor(Math.random() * 200 + 50),
    headline: `Why ${name} is ${location}'s Sweetest Spot in 2025`
  });
});

app.get('/regenerate-headline', (req, res) => {
  const { name, location } = req.query;
  const headline = staticHeadlines[Math.floor(Math.random() * staticHeadlines.length)]
    .replace('[NAME]', name)
    .replace('[LOCATION]', location);
  res.json({ headline });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
