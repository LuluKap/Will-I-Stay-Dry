$(document).ready(function () {

    var apiKey = '867245041e2adb6b9944a617c9515624';
    var searchInput = $('#search-input');
    var pastSearches = $('#past-searches');

    //big weather

    function getWeather(data) {
        var queryUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${APIkey}`
        fetch(queryUrl, {
            }).then(function (response) {
            return response.json();
        }).then(function (data) {

            var weatherTodayEl = $('#weather-today');
            weatherTodayEl.addClass('border border-primary');

            var cityNameEl = $('<h2>');
            cityNameEl.text(currentCity);
            weatherTodayEl.append(cityNameEl);
            
            var cityDateEl = data.current.dt;
            cityDate = moment.unix(cityDateEl).format('MM/DD/YY');
            var todayDateEl = $('<span>');
            todayDateEl.text('(${cityDate})');
            cityNameEl.append(todayDateEl);

            var currentIcon = data.current.weather[0].icon;
            var weatherIconEl = $('<img>');
            weatherIconEl.attr("src", "http://openweathermap.org/img/wn/" + currentIcon + ".png");
            cityNameEl.append(currentWeatherIconEl);

            var currentTemp = data.current.temp;
            var tempEl = $('<p>')
            tempEl.text(`Temp: ${currentTemp}°C`)
            weatherTodayEl.append(tempEl);

            var currentWind = data.current.wind_speed;
            var windEl = $('<p>')
            windEl.text(`Wind: ${currentWind} KPH`)
            weatherTodayEl.append(WindEl);

            var currentHumidity = data.current.humidity;
            var humidityEl = $('<p>')
            humidityEl.text(`Humidity: ${currentHumidity}%`)
            weatherTodayEl.append(humidityEl);

            var currentUV = data.current.uvi;
            var uvEl = $('<p>');
            var uvSpanEl = $('<span>');
            uvEl.append(uvSpanEl);
            uvEl.append(currentUV);

                if (uvIndex < 3) {
                    weatherToday.append(`<p>UV Index: <span class="bg-green">${uvIndex} Low Risk </span></p>`);
                } else if (uvIndex < 6) {
                    weatherToday.append(`<p>UV Index: <span class="bg-yellow">${uvIndex} Moderate Risk </span></p>`);
                } else if (uvIndex < 8) {
                    weatherToday.append(`<p>UV Index: <span class="bg-orange">${uvIndex} High Risk </span></p>`);
                } else if (uvIndex < 11) {
                    weatherToday.append(`<p>UV Index: <span class="bg-red">${uvIndex} Very High Risk </span></p>`);
                } else {
                    weatherToday.append(`<p>UV Index: <span class="bg-purple">${uvIndex} Extreme Risk </span></p>`);
                }
                weatherTodayEl.append(currentUvEl);
             
            //forecast
            var forecastTitleEl = $('#forecastTitle');
            var fiveDayHeaderEl = $('<h2>');
            fiveDayHeaderEl.text('5-Day Forecast:');
            forecastTitleEl.append(fiveDayHeaderEl);

            var fivedayForecasstEl = $('#fivedayForecasst');

            for (var i = 1; i <= 5; i++) {
                var date;
                var temp;
                var icon;
                var wind;
                var humidity;
                date = data.daily[i].dt;
                date = moment.unix(date).format("MM/DD/YYYY");

                temp = data.daily[i].temp.day;
                icon = data.daily[i].weather[0].icon;
                wind = data.daily[i].wind_speed;
                humidity = data.daily[i].humidity;

                var card = document.createElement('div');
                card.classList.add('card', 'col-2', 'm-1', 'bg-dark', 'text-white');
                var cardBody = document.createElement('div');
                cardBody.classList.add('card-body');
                cardBody.innerHTML = `<h6>${date}</h6>
                                      <img src= "http://openweathermap.org/img/wn/${icon}.png"> </><br>
                                       ${temp}°C<br>
                                       ${wind} KPH <br>
                                       ${humidity}%`
                                       
                card.appendChild(cardBody);
                fivedayForecasstEl.append(card);
            }
        return;
    });
