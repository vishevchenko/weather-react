import React, { Component } from 'react';

import wapiService from "./services/wapi-service";
import DropDown from "./components/drop-down";
import CurrentWeather from "./components/current-weather";
// import Forecast from "./components/forecast";
import Carousel from "./components/carousel";
import DayWeatherTile from "./components/day-weather-tile";

import { _cities, _apiKey } from "./config";

export default class App extends Component {

  _cities = _cities;

  state = {
    wapiService: new wapiService(_apiKey),
    weatherData: [],
    currentCity: null,
    cityIMG: null
  }

  updateDailyWeather = () => {
    this.state.wapiService
      .getDailyForecast(this._cities[0].id)
      .then((data) => {
        console.log(data);

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
    console.log(cityInfo);
    
    this.setState({
      currentCity: cityId,
      cityIMG: cityInfo.img || null
    }, this.updateDailyWeather);
  }

  render() {
    const { getWeather, getForecast, getDailyForecast } = this.state.wapiService;

    return (
      <div className="container" style={{ backgroundImage: `url("${this.state.cityIMG}")` }}>
        <br />
        <div className="row justify-content-center">
          <div className="col-7">
            <DropDown options={this._cities} onChangeHandler={this.cityChangedHandler} />
            <br />
            <CurrentWeather getData={getWeather} cityId={this.state.currentCity} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Carousel items={this.state.weatherData} itemsInRow={6}>
              {(item) => <DayWeatherTile item={item} />}
            </Carousel>
          </div>
        </div>
        {/* <div className="row">
          <div className="col">
            <Forecast getData={getDailyForecast} tilesInRow={5} cityId={this.state.currentCity} />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <Forecast getData={getForecast} cityId={this.state.currentCity} />
          </div>
        </div> */}
      </div>
    );
  }
}
