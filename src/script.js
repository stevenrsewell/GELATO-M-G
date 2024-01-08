var imagePaths = {
  "vanilla": "img/vanilla.jpg",
  "chocolate": "img/chocolate.jpg",
  "strawberry": "img/strawberry.jpg",
  "mint": "img/mint.jpg",
  "coffee": "img/coffee.jpg",
  "hazelnut": "img/hazelnut.jpg",
  "cookies": "img/cookies.jpg",
  "banana": "img/banana.jpg",
};

function updateImages() {
  var dropdown1 = document.getElementById("dropdown1");
  var dropdown2 = document.getElementById("dropdown2");
  var leftImage = document.getElementById("leftImage");
  var rightImage = document.getElementById("rightImage");

  var selectedValue1 = dropdown1.value;
  var selectedValue2 = dropdown2.value;

  // Set the src attribute of the leftImage based on the selected value in dropdown1
  leftImage.src = imagePaths[selectedValue1] || "";

  // Set the src attribute of the rightImage based on the selected value in dropdown2
  rightImage.src = imagePaths[selectedValue2] || "";
}

// Fade in Images
function updateImages(dropdownId) {
  var leftImage = document.getElementById('leftImage');
  var rightImage = document.getElementById('rightImage');
  var dropdown1 = document.getElementById('dropdown1');
  var dropdown2 = document.getElementById('dropdown2');

  // Get selected values from dropdowns
  var selectedValue1 = dropdown1.value;
  var selectedValue2 = dropdown2.value;

  if (dropdownId === 'dropdown1') {
    // Apply fade-out effect to leftImage
    leftImage.classList.remove('fade-in');
    leftImage.classList.add('fade-out');

    // Update leftImage source after a shorter delay
    setTimeout(function () {
      leftImage.src = `img/${selectedValue1}.jpg`;

      // Apply fade-in effect to leftImage after updating the source
      leftImage.classList.remove('fade-out');
      leftImage.classList.add('fade-in');
    }, 300); // Reduced delay time to 300 milliseconds
  } else if (dropdownId === 'dropdown2') {
    // Apply fade-out effect to rightImage
    rightImage.classList.remove('fade-in');
    rightImage.classList.add('fade-out');

    // Update rightImage source after a shorter delay
    setTimeout(function () {
      rightImage.src = `img/${selectedValue2}.jpg`;

      // Apply fade-in effect to rightImage after updating the source
      rightImage.classList.remove('fade-out');
      rightImage.classList.add('fade-in');
    }, 300); // Reduced delay time to 300 milliseconds
  }
}

// Modified onchange functions for dropdowns
function updateLeftImage() {
  updateImages('dropdown1');
}

function updateRightImage() {
  updateImages('dropdown2');
}


// Map Code
var map;
var service;
var infowindow;
var previousZip = '';

function findPlaces() {
  var zipCode = document.getElementById('zipCode').value.trim();
  if (zipCode === previousZip) {
    return; // Same zip code, no need to search again
  }

  previousZip = zipCode;
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'address': zipCode }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var latitude = results[0].geometry.location.lat();
      var longitude = results[0].geometry.location.lng();
      var mapOptions = {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: 12
      };
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
      infowindow = new google.maps.InfoWindow();
      service = new google.maps.places.PlacesService(map);
      var request = {
        location: map.getCenter(),
        radius: '5000',
        keyword: 'gelato ice cream'
      };
      service.nearbySearch(request, callback);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });

  clearPlacesList();
}

function clearPlacesList() {
  var placesList = document.getElementById('placesList');
  placesList.innerHTML = '';
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      getPlaceDetails(results[i]);
    }
  }
}

function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

function getPlaceDetails(place) {
  service.getDetails({
    placeId: place.place_id
  }, function (placeDetails, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      addToPlacesList(placeDetails);
    }
  });
}

function addToPlacesList(placeDetails) {
  var placesList = document.getElementById('placesList');
  var placeItem = document.createElement('div');
  placeItem.classList.add('place-item');

  var address = placeDetails.formatted_address || 'Address not available';
  var openingHours = placeDetails.opening_hours ? placeDetails.opening_hours : 'Hours not available';
  var isOpen = openingHours ? (openingHours.isOpen() ? 'Open' : 'Closed') : 'Hours not available';
  var openStatusClass = isOpen === 'Open' ? 'open' : 'closed';

  var placeContent = `
    <h3>${placeDetails.name}</h3>
    <p>Rating: ${placeDetails.rating ? placeDetails.rating : 'N/A'}</p>
    <p>Address: ${address}</p>
    <p>Status: <span class="${openStatusClass}">${isOpen}</span></p>
    <p>Operating Hours:</p>
    <p>${getFormattedHours(openingHours)}</p>
    <div class="photos"></div>
  `;
  placeItem.innerHTML = placeContent;

  placesList.appendChild(placeItem);

  if (placeDetails.photos) {
    var photosDiv = placeItem.querySelector('.photos');
    var rowDiv = document.createElement('div');
    rowDiv.classList.add('row', 'justify-content-center');

    for (var j = 0; j < placeDetails.photos.length; j++) {
      var photo = document.createElement('img');
      var thumbnailUrl = placeDetails.photos[j].getUrl({ maxWidth: 100, maxHeight: 100 }); // Generating thumbnail URL
      var fullSizeUrl = placeDetails.photos[j].getUrl({ maxWidth: 800, maxHeight: 800 }); // Full-size URL for onclick event

      photo.src = thumbnailUrl;
      photo.classList.add('img-fluid', 'thumbnail-img', 'col-6', 'col-md-3', 'col-lg-2'); // Bootstrap grid classes

      // Attach click event to open full-size image
      photo.addEventListener('click', function () {
        window.open(fullSizeUrl, '_blank');
      });

      rowDiv.appendChild(photo);
    }

    photosDiv.appendChild(rowDiv);
  }
}

function getFormattedHours(openingHours) {
  if (openingHours == 'Hours not available') {
    return openingHours;
  }

  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var formattedHours = '';

  for (var i = 0; i < days.length; i++) {
    var day = days[i];
    var hours = openingHours.weekday_text.find(function (item) {
      return item.startsWith(day);
    });

    if (hours) {
      var dayHours = hours.split(': ');
      formattedHours += `${day}: ${dayHours[1]}<br>`;
    } else {
      formattedHours += day + ': Closed<br>';
    }
  }

  return formattedHours;
}