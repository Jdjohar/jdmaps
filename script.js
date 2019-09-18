
document.getElementById('geolocate').addEventListener('click', event => {

    if ("geolocation" in navigator) {
console.log('geolocation is available');

navigator.geolocation.getCurrentPosition(async position=> {

const lat =position.coords.latitude;
const lon =position.coords.longitude;
document.getElementById('latitude').textContent = lat;
document.getElementById('longitude').textContent = lon;
const api_url =`soil/query?lon=${lon}&lat=${lat}`;
//const api_url =`/soil`;
const response = await fetch (api_url);
const json = await response.json();
console.log(json);


//console.log(position);
const data = { lat, lon};
const options = {
method:'POST',
headers:{
'Content-Type': 'application/json'
},   
body: JSON.stringify(data)
};
const response = await fetch ('/api', options);
const json = await response.json();
console.log(json);
});
} else {
console.log('geolocation IS NOT available');
}
});
