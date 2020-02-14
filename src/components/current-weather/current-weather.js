import React, { Component } from "react";
import Loader from '../loader';

export default class CurrentWeather extends Component {

    state = {
        weatherInfo: null,
        error: false,
        loading: false
    };

    updateWeatherInfo = () => {
        const { getData, cityId } = this.props;

        this.setState({
            weatherInfo: null,
            error: false,
            loading: true
        });

        cityId && getData(cityId)
            .then((data) => {
                this.setState({
                    weatherInfo: data,
                    error: true,
                    loading: false
                });
            }).catch(() => {
                this.setState({
                    weatherInfo: null,
                    error: true,
                    loading: false
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
        const { weatherInfo, loading, error } = this.state;

        if (loading) return <Loader />;
        if (!error) return <h2>ERROR: NO DATA!</h2>;

        const {
            name, temp, weatherDesctiption,
            icon, feelsLike, windSpeed,
            pressure, humidity, clouds,
        } = weatherInfo;
        return (
            <div className="row text-center">
                <div className="col-12">
                    <h2>{name}</h2>
                    <p>
                        <img src={icon} alt={weatherDesctiption} />
                        <big>{temp}° C </big><br />
                    </p>
                </div>
                <div className="col-12">
                    <big>{weatherDesctiption}</big>
                </div>
                <div className="col-12">
                    <div className="row">
                        <div className="col-sm-6">
                            <dl className="row">
                                <dt className="col-6 text-right">Feels Like</dt>
                                <dd className="col-6 text-left">{feelsLike}&deg;</dd>

                                <dt className="col-6 text-right">Clouds</dt>
                                <dd className="col-6 text-left">{clouds}%</dd>

                                <dt className="col-6 text-right">Wind</dt>
                                <dd className="col-6 text-left">{windSpeed} m/s</dd>
                            </dl>
                        </div>
                        <div className="col-sm-6">
                            <dl className="row">
                                <dt className="col-6 text-right">Pressure</dt>
                                <dd className="col-6 text-left">{pressure} hPa</dd>

                                <dt className="col-6 text-right">Humidity</dt>
                                <dd className="col-6 text-left">{humidity}%</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}