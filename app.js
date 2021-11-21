const mapStyle = [{
  'featureType': 'administrative',
  'elementType': 'all',
  'stylers': [{
    'visibility': 'on',
  },
  {
    'lightness': 33,
  },
  ],
},
{
  'featureType': 'landscape',
  'elementType': 'all',
  'stylers': [{
    'color': '#f2e5d4',
  }],
},
{
  'featureType': 'poi.park',
  'elementType': 'geometry',
  'stylers': [{
    'color': '#c5dac6',
  }],
},
{
  'featureType': 'poi.park',
  'elementType': 'labels',
  'stylers': [{
    'visibility': 'on',
  },
  {
    'lightness': 20,
  },
  ],
},
{
  'featureType': 'road',
  'elementType': 'all',
  'stylers': [{
    'lightness': 20,
  }],
},
{
  'featureType': 'road.highway',
  'elementType': 'geometry',
  'stylers': [{
    'color': '#c5c6c6',
  }],
},
{
  'featureType': 'road.arterial',
  'elementType': 'geometry',
  'stylers': [{
    'color': '#e4d7c6',
  }],
},
{
  'featureType': 'road.local',
  'elementType': 'geometry',
  'stylers': [{
    'color': '#fbfaf7',
  }],
},
{
  'featureType': 'water',
  'elementType': 'all',
  'stylers': [{
    'visibility': 'on',
  },
  {
    'color': '#acbcc9',
  },
  ],
},
];

function sanitizeHTML(strings) {
  const entities = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#39;'};
  let result = strings[0];
  for (let i = 1; i < arguments.length; i++) {
    result += String(arguments[i]).replace(/[&<>'"]/g, (char) => {
      return entities[char];
    });
    result += strings[i];
  }
  return result;
}

function initMap() {
  const map = new google.maps.Map(document.getElementById('mapapp'), {
    zoom: 7,
    center: {lat: 44.817334, lng: 20.465657},
    styles: mapStyle,
  });

  map.data.loadGeoJson('stores.json', {idPropertyName: 'storeid'});

  map.data.setStyle((feature) => {
    return {
      icon: {
        url: `/images/salto-marker.png`,
        scaledSize: new google.maps.Size(25, 38),
      },
    };
  });

  const apiKey = 'AIzaSyCRNdZRSeuwwMPpoCv0QCow6VwHy6TLrKg';
  const infoWindow = new google.maps.InfoWindow();

  map.data.addListener('click', (event) => {
    const name = event.feature.getProperty('name');
    const link = event.feature.getProperty('link');
    const address = event.feature.getProperty('address');
    const tap = event.feature.getProperty('tap');
    const position = event.feature.getGeometry().get();
    const content = sanitizeHTML`
      <div style="padding: 15px 20px 10px 20px;">
        <h2>${name}</h2>
        <p>${address}</p>
        <h4>${tap}</h4>
        <p><a href="${link}">${link}</a></p>
      </div>
      `;

    infoWindow.setContent(content);
    infoWindow.setPosition(position);
    infoWindow.setOptions({pixelOffset: new google.maps.Size(0, -30)});
    infoWindow.open(map);
  });

}