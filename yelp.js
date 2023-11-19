async function searchPlaces() {
  try {
    const apiKey = 'yTkRs_tJNfinfiD2hnlv8W40oTLK5RO7UcgYxkUPdoeRAPoqaJXlbdeI_TSzt_jo0U9767lQqusxeoM7cJ_GZhC9_CmH2CEtqBAhyR37w0qb4ut1fd2bfiWBR4VZZXYx';
    const zipCode = document.getElementById('zipCode').value;
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Replace with your preferred CORS proxy URL
    const endpoint = `${proxyUrl}https://api.yelp.com/v3/businesses/search?categories=icecream,gelato&location=${zipCode}`;
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    };

    const response = await fetch(endpoint, requestOptions);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    displayResults(data.businesses);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayResults(results) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  if (results.length === 0) {
    resultsContainer.innerHTML = '<p>No results found.</p>';
    return;
  }

  const resultList = document.createElement('ul');
  resultList.className = 'list-group';

  results.forEach(place => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    const { name, location, rating, review_count, phone } = place;

    const ratingStars = '⭐️'.repeat(Math.round(rating)); // Displaying stars based on the rating

    const address = `${location.address1}, ${location.city}, ${location.state} ${location.zip_code}`;

    // Create a link to open the address in Google Maps
    const addressLink = document.createElement('a');
    addressLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    addressLink.target = '_blank';
    addressLink.textContent = `${location.address1}, ${location.city}`;

    listItem.innerHTML = `
      <strong>${name}</strong><br>
      Rating: ${ratingStars} (${rating.toFixed(1)}/5) - ${review_count} reviews<br>
      Address: `;
      
    // Append the address link to the list item
    listItem.appendChild(addressLink);

    listItem.innerHTML += `<br>Phone: ${phone ? phone : 'N/A'}<br>`;
  
    resultList.appendChild(listItem);
  });
  
  resultsContainer.appendChild(resultList);
}
