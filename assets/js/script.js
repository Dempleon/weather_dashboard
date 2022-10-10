$('#search-btn').on('click', function (event) {
    event.preventDefault();
    let cityName = $('#city').val();
    getWeather(cityName)
});

var getWeather = function (cityName) {
    var geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='+ cityName + '&appid=efe86d861872cbdd30489c657b7913a3'
    var lat;
    var lon;
    console.log(geoUrl);
    fetch(geoUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    console.log(typeof(data));
                });
            } else {
                console.log('error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            console.log('unable to connect to api link')
        });

    var apiUrl = 'api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid={API key}'

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    console.log(typeof(data));
                });
            } else {
                console.log('error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            console.log('unable to connect to api link')
        });
}