// Map API
mapboxgl.accessToken ="pk.eyJ1IjoidGF0bGlidXJhayIsImEiOiJjbG5uZmxiZmUwNWU4MmxwMTF4aTh3cnl2In0.2PPlPD95nN9_ewnsG5PGag";
//  Weather API
const weatherApiKey = "4ff3cbd9c59a732ddb20f205d22b6f31";

let map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: { lat: 39, lng: 35 },
  zoom: 5.5,
});

map.on('click', function(e){
  const coordinates = e.lngLat;
  console.log("Konum:", coordinates);
  weatherData(coordinates.lat, coordinates.lng, coordinates);
});

function weatherData(lat, lon, coordinates) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;
  fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("Bilgiler:", data);
      let result = Math.round((data.main.temp - 273.15))
      let name = data.name;
      let info = `Konum: ${name}<br>Hava Sıcaklığı: ${result}°C` 
        new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(info)
        .addTo(map);
    });

}


