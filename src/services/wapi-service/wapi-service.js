export default class wapiSevice {

    constructor(_apiKey) {
        this._apiBase = "http://api.openweathermap.org/data/2.5/";
        this._apiSearchBase = `&APPID=${_apiKey}&units=metric`;
    }


    getResource = async (url, cityId) => {
        const res = await fetch(`${this._apiBase}${url}?id=${cityId}${this._apiSearchBase}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }

        return await res.json();
    }

    getWeather = (cityId = 700568) => {
        return this.getResource('weather', cityId)
            .then((data) => {
                return this._transformWeatherData(data);
            });
    }

    getForecast = (cityId = 700568) => {
        return this.getResource('forecast', cityId)
        .then( (data) => {
            return data.list.map(this._transformForecastData);
        });
    }

    _tansformTimestampToTime(timeStamp) {
        return new Date(timeStamp)
            .toLocaleTimeString()
            .replace(/\D\d\d$/, '');
    }
    _tansformTimestampToDay(timeStamp) {
        return new Date(timeStamp)
            .toDateString()
            .replace(/([a-z]+)\s+([a-z]+)\s+(\d+)\s+(\d+)/i, '$1 $3');
    }

    _transformDescription = (text) => {
        return text.trim().split(/\s+/)
            .map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
            .join(' ');
    }

    _transformWeatherData = (data) => {
        const { main, wind, sys, weather, clouds, name } = data;

        return {
            name,
            temp: main.temp,
            feelsLike: main.feels_like,
            pressure: main.pressure,
            humidity: main.humidity,
            windSpeed: wind.speed,
            clouds: clouds.all,
            weatherDesctiption: this._transformDescription(weather[0].description),
            icon: `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
            sunrise: this._tansformTimestampToTime(sys.sunrise * 1000),
            sunset: this._tansformTimestampToTime(sys.sunset * 1000),
        };
    }
    _transformForecastData = (data) => {
        const { dt, weather, main, wind, clouds, rain} = data;
        
        return {
            id: dt,
            day: this._tansformTimestampToDay(dt * 1000),
            time: this._tansformTimestampToTime(dt * 1000),
            icon: `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
            tempMin: main.temp_min,
            tempMax: main.temp_max,
            desctiption: this._transformDescription(weather[0].description),
            wind: wind.speed,
            clouds: clouds.all
        };
    }
}