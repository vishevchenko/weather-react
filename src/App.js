import React, { Component } from 'react';

import wapiService from "./services/wapi-service";
import DropDown from "./components/drop-down";
import CurrentWeather from "./components/current-weather";
import Carousel from "./components/carousel";
import DayWeatherTile from "./components/day-weather-tile";
import HourWeatherTile from "./components/hour-weather-tile";

import { _cities, _apiKey } from "./config";

export default class App extends Component {

  _cities = _cities;
  _wapiService = new wapiService(_apiKey);

  state = {
    currentWeatherData: {},
    weatherData: [],
    hourlyWeatherData: [],
    currentCity: null,
    cityIMG: null
  }


  updateDailyWeather = () => {
    this._wapiService
      .getDailyForecast(this.state.currentCity || this._cities[0].id)
      .then((data) => {
        this.setState({ weatherData: data });
      });
  }

  getCityInfo(cityId) {
    const cities = this._cities;

    for (let i = 0; i < cities.length; i++) {
      if (cityId == cities[i].id) {
        return cities[i]
      }
    }

    return {};
  }

  componentDidMount() {
    this.setState({
      currentCity: this._cities[0].id,
      cityIMG: this._cities[0].img
    }, this.updateDailyWeather);
  }

  cityChangedHandler = (cityId) => {
    const cityInfo = this.getCityInfo(cityId);

    this.setState({
      currentCity: cityId,
      cityIMG: cityInfo.img || null
    }, this.updateDailyWeather);
  }
  onDailyTileClick = (item) => {
    const { currentCity } = this.state;

    this._wapiService.getHourlyForecast(currentCity, item.day)
      .then((list) => {
        this.setState({
          hourlyWeatherData: list
        });
      });
  }

  render() {
    const { getWeather } = this._wapiService;
    const { weatherData, hourlyWeatherData } = this.state;

    return (
      <div className="container-fluid" style={{ backgroundImage: `url("${this.state.cityIMG}")` }}>
        <div className="row justify-content-center">
          <div className="col-md-7 my-4">
            <DropDown options={this._cities} onChangeHandler={this.cityChangedHandler} />
          </div>
          <div className="col-md-7">
            <CurrentWeather getData={getWeather} cityId={this.state.currentCity} />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            <Carousel items={weatherData} itemsInRow={6} onTileClick={this.onDailyTileClick}>
              {(item) => <DayWeatherTile item={item} />}
            </Carousel>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col">
            <Carousel items={hourlyWeatherData} itemsInRow={6}>
              {(item) => <HourWeatherTile item={item} />}
            </Carousel>
          </div>
        </div>
      </div>
    );
  }
}
