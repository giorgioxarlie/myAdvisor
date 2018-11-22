let map;

function initMap() {
  position = { lat:40.392379299999995, lng:-3.6984572 };
  map = new google.maps.Map(document.getElementById('map'), {
    center: position,
    zoom: 5,
  });
}

function createWindow(lat, lng, name, imageURL, id) {
  const infowindow = new google.maps.InfoWindow({
    content: `<h1>${name}</h1><br><br><a href="detail/${id}"><img src='${imageURL}' style="width:400px;border-radius:10%"></a>`,
  });
  const marker = new google.maps.Marker({
    position: { lat, lng },
    map,
    title: name,
  });
  marker.addListener('click', () => {
    infowindow.open(map, marker);
  });
}


// Geolocaliza al usuario y luego llama a success_fn con la posicion que has obtenido
getPosition().then((loc) => {
  const lat = loc.lat;
  const lng = loc.lng;
  const position = { lat, lng };
  map = new google.maps.Map(document.getElementById('map'), {
    center: position,
    zoom: 14,
  });
  var marker = new google.maps.Marker({
    position: { lat, lng },
    map,
    title: name,
    icon:'https://www.localguidesconnect.com/t5/General-Discussion/Need-Help-About-Google-Map-Blue-Dot/td-p/581743',
  });
  console.log(places);
  places.forEach((p) => {
    createWindow(p.location.lat, p.location.lng, p.name, p.imageURL, p._id);
  });
  // places.forEach(p =>{
  //     console.log(p)
  //   createWindow(p.location.lat,p.location.lng,p.name,p.imageURL,p._id);
  // });

  const card = document.getElementById('pac-card');
  const input = document.getElementById('pac-input');
  const types = document.getElementById('type-selector');
  const strictBounds = document.getElementById('strict-bounds-selector');

  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

  const autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.bindTo('bounds', map);

  const infowindow = new google.maps.InfoWindow();
  const infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);
  image = '';
  var marker = new google.maps.Marker({

  });

  autocomplete.addListener('place_changed', () => {
    infowindow.close();
    marker.setVisible(false);
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert(`No details available for input: '${place.name}'`);
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
      console.log(place.geometry.location.lat);
      document.getElementById('lat').value = place.geometry.location.lat();
      document.getElementById('lng').value = place.geometry.location.lng();
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    let address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || ''),
      ].join(' ');
    }

    // infowindowContent.children['place-icon'].src = place.icon;
    infowindowContent.children['place-name'].textContent = place.name;
    infowindowContent.children['place-address'].textContent = address;
    infowindow.open(map, marker);
  });

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  function setupClickListener(id, types) {
    const radioButton = document.getElementById(id);
    // radioButton.addEventListener('click', function() {
    //   autocomplete.setTypes(types);
    // });
  }

  setupClickListener('changetype-all', []);
  setupClickListener('changetype-address', ['address']);
  setupClickListener('changetype-establishment', ['establishment']);
  setupClickListener('changetype-geocode', ['geocode']);

  document.getElementById('use-strict-bounds');
  // .addEventListener('click', function() {
  //   console.log('Checkbox clicked! New state=' + this.checked);
  //   autocomplete.setOptions({strictBounds: this.checked});
  // });
});


function getPosition() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      const fail_fn = function () {
        console.log('Error in the geolocation service.');
      };
      console.log('Geolocalizing');
      navigator.geolocation.getCurrentPosition((position) => {
        const user_location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        resolve(user_location);
      }, reject);
    } else {
      console.log('Browser does not support geolocation.');
      reject();
    }
  });
}
