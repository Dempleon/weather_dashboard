// Event handler for search button
$('#search-btn').on('click', function (event) {
    event.preventDefault();
    let cityName = $('#city').val();
    // getCoordinates(cityName)

    console.log('latitudes and longitude'+getCoordinates(cityName))


});

// function to get the latitude and longitude of desired city
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

// function to get 5 day forecast
async function get5days(lat, lon) {

    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=efe86d861872cbdd30489c657b7913a3';
    // console.log(apiUrl);
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
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

// function to get the current day weather
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

// function to dynamically update/display the current day weather
function displayCurrent(data) {
    var currentDate = moment().format('dddd, MMMM DD, YYYY')
    console.log(data);
    $('#cityName').text(data.name + ', ' + currentDate);
    $('#currentTemp').text('Current Temperature: ' + data.main.temp + 'F');
    $('#currentWindSpeed').text('Current Wind speed: ' + data.wind.speed + 'mph');
    $('#currentHumidity').text('Current Humidity: ' + data.main.humidity + '%');
    // var imgLink = 'http://openweathermap.org/img/wn/' + days[i][3].weather[0].icon + '@4x.png'
    var currentIcon = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@4x.png';
    currentIconEl = $('<img>');
    currentIconEl.attr('src', currentIcon);
    $('#currentIcon').empty();
    $('#currentIcon').append(currentIconEl);

}

// function to display the future day forecasts
function displayForecast(data) {
    // console.log(data);
    $('#forecast').empty();
    $('#weatherCards').empty();
    var headerEl = $('<h3>');
    headerEl.text('Five Day Forecast');
    $('#forecast').append(headerEl);
    
    //split the 40 data array into 5x8
    var days = [];
    while(data.length) {
        days.push(data.splice(0,8));
    }
    console.log(days);
    for (var i = 0; i < days.length; i++) {
        // console.log(getDailyMinMaxAvg(days[i]));
        var dailyInfo = getDailyMinMaxAvg(days[i]);
        console.log(days[i][0].dt_txt.split(' ')[0]);
        console.log(dailyInfo)

        var card = $('<div>');
        card.addClass('card flex-coulumn weather-cards p-2')
        var date = $('<h3>');
        date.text(days[i][0].dt_txt.split(' ')[0]);
        var tempMin = $('<p>');
        tempMin.text('Daily Low: ' + dailyInfo[0].toPrecision(3) + 'F');
        var tempMax = $('<p>');
        tempMax.text('Daily High: ' + dailyInfo[1].toPrecision(3) + 'F');
        var windSpeed = $('<p>');
        windSpeed.text('Average wind speeds: ' + dailyInfo[2].toPrecision(3) + 'mph');
        var humid = $('<p>');
        humid.text('Average Humidity: ' + dailyInfo[3].toPrecision(3) + '%');

        var weatherImg = $('<img>');
        var imgLink = 'http://openweathermap.org/img/wn/' + days[i][3].weather[0].icon + '@4x.png'
        console.log(imgLink);
        weatherImg.attr('src', imgLink)

        card.append(date);
        card.append(tempMin);
        card.append(tempMax);
        card.append(windSpeed);
        card.append(humid);
        card.append(weatherImg);

        $('#weatherCards').append(card);
    }

}

// get the min and max temps as well as the daily average windspeeds and humidity
// returns [dailyMin, dailyMax, avgWindspeeds, avgHumidity]
function getDailyMinMaxAvg (day) {
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

// function to get the average of an array
function getAvg(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
}




