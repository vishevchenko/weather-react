import React, { Component } from 'react';

import wapiService from "./services/wapi-service";
import DropDown from "./components/drop-down";
import CurrentWeather from "./components/current-weather";
import Forecast from "./components/forecast";

import { _cities, _apiKey } from "./config";

export default class App extends Component {

  _cities = _cities;

  state = {
    wapiService: new wapiService(_apiKey),
    weatherData: null,
    currentCity: null
  }
  componentDidMount() {
    this.setState({
      currentCity: this._cities[0].id
    });
    this.state.wapiService.getDailyForecast(this._cities[0].id);
  }

  cityChangedHandler = (cityId) => {
    this.setState({
      currentCity: cityId
    });
  }

  render() {
    const { getWeather, getForecast, getDailyForecast } = this.state.wapiService;

    return (
      <div className="container">
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
            <Forecast getData={getDailyForecast} tilesInRow={5} cityId={this.state.currentCity} />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <Forecast getData={getForecast} cityId={this.state.currentCity} />
          </div>
        </div>
      </div>
    );
  }
}
