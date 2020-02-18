import React, { Component } from "react"

import Loader from '../loader';
import CurrentWeatherView from "./current-weather";

export default class CurrentWeather extends Component {
    state = {
        weatherInfo: null,
        error: false
    };

    updateWeatherInfo = () => {
        const { getData, cityId } = this.props;

        this.setState({
            weatherInfo: null,
            error: false
        });

        cityId && getData(cityId)
            .then((data) => {
                this.setState({
                    weatherInfo: data,
                    error: false
                });
            }).catch(() => {
                this.setState({
                    weatherInfo: null,
                    error: true
                });
            });
    }

    componentDidMount() {
        this.updateWeatherInfo();
    }

    componentDidUpdate(prev) {
        if (prev.cityId !== this.props.cityId) {
            this.updateWeatherInfo();
        }
    }

    render() {
        const { error, weatherInfo } = this.state;

        if (error) return <h1>Error. Fail get data.</h1>
        
        else if (!weatherInfo) return <Loader />
        
        else return <CurrentWeatherView weatherInfo={weatherInfo} />

    }
};