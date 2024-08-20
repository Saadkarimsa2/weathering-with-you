const weatherKey = '21cfc13a13a2db76842ecb3b45789973';
const timeKey = 'mdsaad2018';

class Location {

    // Declaration of all variables, preliminary setup
    constructor(name, location, num) {
        this.name = name;
        this.location = location;
        this.num = num;

        this.weatherData = '';
        this.lon;
        this.lat;
        this.temperatureMin;
        this.temperatureMax;
        this.temperature;
        this.suniness;
        this.humidity;
        this.wind;

        this.timeData = '';
        this.time;
        this.timezone;
        this.sunrise;
        this.sunset;

        // Loading feedback
        document.getElementById(this.num + '-name').innerHTML = this.name;
        document.getElementById(this.num + '-location').innerHTML = this.location;

        document.getElementById(this.num + '-tags').innerHTML = 'Loading content.';
    }

    // Load all data and fill page (uses .bind(this) to retain class context)
    loadData () {
        loadWeather(this.location, function(response) {
            this.weatherData = JSON.parse(response);

            if (this.weatherData == null || this.weatherData == '') {
                document.getElementById(this.num + '-tags').innerHTML = "Couldn't load data.";
            } else {
                // Fill all weather data variables
                this.lon = this.weatherData['coord']['lon'];
                this.lat = this.weatherData['coord']['lat'];
                this.temperatureMin = kelvinToCelsius(this.weatherData['main']['temp_min']);
                this.temperatureMax = kelvinToCelsius(this.weatherData['main']['temp_max']);
                this.temperature = kelvinToCelsius(this.weatherData['main']['temp']);
                this.suniness = this.weatherData['weather'][0]['description'];
                this.humidity = this.weatherData['main']['humidity'];
                this.wind = mpsToKmph(this.weatherData['wind']['speed']);

                // Load time data (depends on location, so fetched sequentially after location data)
                loadTime(this.lon, this.lat, function(response) {
                    this.timeData = JSON.parse(response);

                    // Create tag elements for time data
                    document.getElementById(this.num + '-tags').innerHTML = "";

                    // Error if inappropriate response is returned
                    if (this.timeData == null || this.timeData == '') {
                        document.getElementById(this.num + '-tags').innerHTML = "Couldn't load time data.";
                        document.getElementById(this.num + '-tags').appendChild(document.createElement('br'));
                        document.getElementById(this.num + '-tags').appendChild(document.createElement('br'));
                    } else {
                        // Fill all time data variables
                        this.time = formatTime(this.timeData['time']);

                        // Color panel to express call appropriateness
                        var left = document.getElementById('left');
                        var right = document.getElementById('right');

                        if (parseInt(this.time.substring(0, 2)) < earliestCall && parseInt(this.time.substring(0, 2)) >= latestCall) {
                            document.getElementById(this.num + '-panel').style.backgroundColor = '#ccc';
                            document.getElementById(this.num + '-panel').style.color = '#fff';
                            document.getElementById(this.num + '-tags').style.color = '#fff';
                            document.getElementById(this.num + '-tags').style.borderColor = '#fff';
                        } else {
                            document.getElementById(this.num + '-panel').style.color = '#777';
                            document.getElementById(this.num + '-tags').style.color = '#777';
                            document.getElementById(this.num + '-tags').style.borderColor = '#ccc';
                        }

                        this.timezone = this.timeData['dstOffset'];
                        this.sunrise = formatTime(this.timeData['sunrise']);
                        this.sunset = formatTime(this.timeData['sunset']);

                        // Add subtitle data (time and temperature)
                        document.getElementById(this.num + '-main-data').innerHTML = this.time + ', ' + this.temperature + '&deg;';

                        // Create tag elements for time data
                        createTag(this.time, this.num + '-tags');
                        createTag('UTC' + this.timezone, this.num + '-tags');
                        createTag('◒ ' + this.sunrise, this.num + '-tags');
                        createTag('◓ ' + this.sunset, this.num + '-tags');

                        document.getElementById(this.num + '-tags').appendChild(document.createElement('br'));
                    }

                    // Create tag elements for weather data
                    createTag(this.temperature + '&deg;', this.num + '-tags');
                    createTag('> ' + this.temperatureMin + '&deg;', this.num + '-tags');
                    createTag('< ' + this.temperatureMax + '&deg;', this.num + '-tags');
                    createTag(this.suniness, this.num + '-tags');
                    createTag(this.humidity + '%', this.num + '-tags');
                    createTag(this.wind + ' km/h', this.num + '-tags');

                }.bind(this));
            }
        }.bind(this));
    }
}

//-------HELPERS

// Function to send a WhatsApp message
function sendWhatsapp () {
    fetch('http://localhost:3000/send-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

// Function to send WhatsApp audio
function sendAudio() {
    fetch('http://localhost:3000/send-audio', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

// Get weather data from OpenWeatherMap
function loadWeather(loc, callback) {
    var xhr = new XMLHttpRequest();
    var link = 'http://api.openweathermap.org/data/2.5/weather?q=' + loc + '&APPID=' + weatherKey;

    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status == 200) {
                clearTimeout(xmlHttpTimeout);

                var responseData = JSON.parse(xhr.responseText);

                var weatherDescription = responseData.weather[0].description;
                var cityName = responseData.name;

                console.log('City Name:', cityName);

                if (cityName == "Bengaluru") {
                    console.log('Weather Description:', weatherDescription);
                    sendWhatsapp();
                    sendAudio();
                }

                callback(xhr.responseText);
            } else if (xhr.status == 400) {
                console.log('There was an error 400: ' + xhr.responseText);
                callback(null);
            } else {
                console.log('Something else other than 200 was returned: ' + xhr.status);
                callback(null);
            }
        }
    };

    xhr.open("GET", link, true);
    xhr.send();

    var xmlHttpTimeout = setTimeout(ajaxTimeout, 40000);
    function ajaxTimeout(){
        xhr.abort();
        callback(null);
    }
}

// Get time data from GeoNames
function loadTime(lon, lat, callback) {
    var xhr = new XMLHttpRequest();
    var link = 'http://api.geonames.org/timezoneJSON?lat=' + lat + '&lng=' + lon + '&username=' + timeKey;

    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status == 200) {
                clearTimeout(xmlHttpTimeout);
                callback(xhr.responseText);
            } else if (xhr.status == 400) {
                console.log('There was an error 400: ' + xhr.responseText);
                callback(null);
            } else {
                console.log('Something else other than 200 was returned: ' + xhr.status);
                callback(null);
            }
        }
    };

    xhr.open("GET", link, true);
    xhr.send();

    var xmlHttpTimeout = setTimeout(ajaxTimeout, 40000);
    function ajaxTimeout(){
        xhr.abort();
        callback(null);
    }
}

// Math and string helpers
function kelvinToCelsius(n) {
    return roundToSingleDecimal(n - 273.15);
}

function roundToSingleDecimal(n) {
    return Math.round(n * 10) / 10;
}

function mpsToKmph(n) {
    return roundToSingleDecimal(n * 3.6);
}

function formatTime(s) {
    return s.substring(s.length - 5);
}

function createTag(content, loc) {
    var container = document.createElement('DIV');
    container.className = 'tag-holder';

    var text = document.createElement('SPAN');
    var textNode = document.createTextNode(content);
    text.appendChild(textNode);
    text.className = 'tag-content';
    text.innerHTML = content;

    container.appendChild(text);

    var location = document.getElementById(loc);
    location.appendChild(container);
}