export default class wapiSevice {

    constructor(_apiKey) {
        this._apiBase = "http://api.openweathermap.org/data/2.5/";
        this._apiSearchBase = `&APPID=${_apiKey}&units=metric`;
        this._cache = {};
    }

    getResource = async (url, cityId) => {
        const res = await fetch(`${this._apiBase}${url}?id=${cityId}${this._apiSearchBase}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }

        return await res.json();
    }

    getWeather = (cityId) => {
        if (this._cache[cityId] && this._cache[cityId].weather) {
            return new Promise((resolve, reject) => {
                resolve(this._cache[cityId].weather);
            });
        }

        return this.getResource('weather', cityId)
            .then((data) => {
                this._cache[cityId].weather = this._transformWeatherData(data);
                return this._cache[cityId].weather;
            });
    }

    getForecast = (cityId) => {
        if (this._cache[cityId] && this._cache[cityId].forecast) {
            return new Promise((resolve, reject) => {
                resolve(this._cache[cityId].forecast);
            });
        }

        this._cache[cityId] = [];

        return this.getResource('forecast', cityId)
            .then((data) => {
                this._cache[cityId].forecast = data.list.map(this._transformForecastData);
                return this._cache[cityId].forecast;
            });
    }

    getDailyForecast = (cityId) => {
        return this.getForecast(cityId)
            .then(data => {
                return this._sortByDay(data);
            })
            .then(data => {
                return this._transformDailyForecastData(data);
            });
    };

    getHourlyForecast = (cityId, day) => {
        return this.getForecast(cityId)
            .then((data) => {
                return data.filter(info => {
                    return info.day === day
                });
            });
    };

    /**
     * 
     * @param {array} list - hourly forecast
     * @returns {object} weather sorted by day
     */
    _sortByDay(list) {
        const res = {};

        list.forEach(el => {
            res[el.day] = res[el.day] || [];
            res[el.day].push(el);
        });

        return res;
    }

    _getAllDayValues(list, props) {
        const data = {};

        list.forEach(item => {
            props.forEach(prop => {
                data[prop] = data[prop] || [];
                data[prop].push(item[prop])
            });
        });
        return data;
    }

    _transformDailyForecastData(data) {
        const days = Object.keys(data);

        return days.map(day => {
            const { temp, description, icon } =
                this._getAllDayValues(data[day], [
                    'temp', 'description', 'icon'
                ]);

            const middleIdx = Math.floor(description.length / 2);

            return {
                id: day,
                day,
                tempMin: Math.min.apply(null, temp),
                tempMax: Math.max.apply(null, temp),
                description: description[middleIdx],
                icon: icon[middleIdx]
            };
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
            windDeg: wind.deg,
            clouds: clouds.all,
            weatherDesctiption: this._transformDescription(weather[0].description),
            icon: `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
            sunrise: this._tansformTimestampToTime(sys.sunrise * 1000),
            sunset: this._tansformTimestampToTime(sys.sunset * 1000),
        };
    }

    _transformForecastData = (data) => {
        const { dt, weather, main, wind, clouds } = data;

        return {
            id: dt,
            day: this._tansformTimestampToDay(dt * 1000),
            time: this._tansformTimestampToTime(dt * 1000),
            icon: `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
            temp: main.temp,
            tempMin: main.temp_min,
            tempMax: main.temp_max,
            description: this._transformDescription(weather[0].description),
            windSpeed: wind.speed,
            windDeg: wind.deg,
            clouds: clouds.all
        };
    }
}