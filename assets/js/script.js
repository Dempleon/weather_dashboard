$('#search-btn').on('click', function (event) {
    event.preventDefault();
    let cityName = $('#city').val();
    getLatLon(cityName)
});

var getLatLon = function (cityName) {
    var geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&appid=efe86d861872cbdd30489c657b7913a3'
    var lat;
    var lon;
    console.log(geoUrl);
    fetch(geoUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    console.log(typeof (data));
                    lat = data[0].lat
                    lon = data[0].lon
                    console.log('lat: ' + lat + ', lon: ' + lon);
                    getWeather(lat, lon)
                });
            } else {
                console.log('error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            console.log('unable to connect to api link')
        });



    // var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=efe86d861872cbdd30489c657b7913a3';
    // console.log(apiUrl);
    // fetch(apiUrl)
    //     .then(function (response) {
    //         if (response.ok) {
    //             response.json().then(function (data) {
    //                 console.log(data);
    //                 console.log(typeof (data));
    //             });
    //         } else {
    //             console.log('error: ' + response.statusText);
    //         }
    //     })
    //     .catch(function (error) {
    //         console.log('unable to connect to api link')
    //     });
}

function getWeather(lat, lon) {

    var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=efe86d861872cbdd30489c657b7913a3';
    console.log(apiUrl);
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    console.log(data.list);
                });
            } else {
                console.log('error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            console.log('unable to connect to api link')
        });
}