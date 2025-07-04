
console.log("🚀 app.js loaded");

const form = document.getElementById('business-form');
const result = document.getElementById('result');
const ratingEl = document.getElementById('rating');
const reviewsEl = document.getElementById('reviews');
const headlineEl = document.getElementById('headline');
const regenerateBtn = document.getElementById('regenerate-btn');

let businessName = '';
let locationName = '';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  businessName = document.getElementById('name').value.trim();
  locationName = document.getElementById('location').value.trim();

  if (!businessName || !locationName) {
    alert('Please enter both Business Name and Location.');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/business-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: businessName, location: locationName })
    });

    const data = await response.json();
    updateUI(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('Unable to reach backend. Make sure it’s running.');
  }
});

regenerateBtn.addEventListener('click', async () => {
  try {
    const response = await fetch(
      `http://localhost:5000/regenerate-headline?name=${businessName}&location=${locationName}`
    );
    const data = await response.json();
    headlineEl.textContent = data.headline;
  } catch (error) {
    console.error('Error regenerating headline:', error);
    alert('Failed to regenerate headline.');
  }
});

function updateUI(data) {
  ratingEl.textContent = `Rating: ${data.rating}★`;
  reviewsEl.textContent = `Reviews: ${data.reviews}`;
  headlineEl.textContent = data.headline;
  result.classList.remove('hidden');
}
