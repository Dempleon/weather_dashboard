var currentDayWeather;
var fiveDayForcast;

$('#search-btn').on('click', function (event) {
    event.preventDefault();
    let cityName = $('#city').val();
    // getCoordinates(cityName)

    console.log('latitudes and longitude'+getCoordinates(cityName))

    // console.log(currentDayWeather);
    // console.log(fiveDayForcast);

});

async function getCoordinates (cityName) {
    var geoUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&appid=efe86d861872cbdd30489c657b7913a3'
    var lat;
    var lon;
    console.log(geoUrl);
    fetch(geoUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    
                    lat = data[0].lat
                    lon = data[0].lon
                    console.log('lat: ' + lat + ', lon: ' + lon);
                    get5days(lat, lon)
                    getCurrent(lat, lon)
                    // return Array.from([lat, lon]);
                });
            } else {
                console.log('error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            console.log('unable to connect to api link')
        });

}

async function get5days(lat, lon) {

    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=efe86d861872cbdd30489c657b7913a3';
    // console.log(apiUrl);
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data.list);
                    displayForecast(data.list)
                });
            } else {
                console.log('error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            console.log('unable to connect to api link')
        });
}

async function getCurrent(lat, lon) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=efe86d861872cbdd30489c657b7913a3';
    // console.log(apiUrl);
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayCurrent(data);
                });
            } else {
                console.log('error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            console.log('unable to connect to api link')
        });

}

function displayCurrent(data) {
    var currentDate = moment().format('dddd, MMMM Do YYYY')
    console.log(data);
    $('#cityName').text(data.name + ' ' + currentDate);
    $('#currentTemp').text('Current Temperature: ' + data.main.temp + 'F');
    $('#currentWindSpeed').text('Current Wind speed: ' + data.wind.speed + 'mph');
    $('#currentHumidity').text('Current Humidity: ' + data.main.humidity + '%');

}

function displayForecast(data) {
    console.log(data);
    var days = [];
    //split the 40 data array into 5x8
    while(data.length) {
        days.push(data.splice(0,8));
    }
    console.log(days);
    for (var i = 0; i < days.length; i++) {
        // getDailyMinMaxAvg(days[i]);
        console.log(getDailyMinMaxAvg(days[i]));
    }

}

function getDailyMinMaxAvg (day) {
    console.log(day)
    var minTemps = [];
    var maxTemps = [];
    var windspeeds = [];
    var humidities = [];
    for (var i = 0; i < day.length; i++) {
        minTemps[i] = day[i].main.temp_min;
        maxTemps[i] = day[i].main.temp_max;
        windspeeds[i] = day[i].wind.speed;
        humidities[i] = day[i].main.humidity;
    }
    return [Math.min(...minTemps), Math.max(...maxTemps), getAvg(windspeeds), getAvg(humidities)];
    
}

function getAvg(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
}




