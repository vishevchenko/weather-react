import React, { Component } from "react";

import Loader from "../loader";

const CityInfoRow = ({ item, label, prop }) => {
    return (
        <React.Fragment>
            <dt className="col-sm-3">{label}</dt>
            <dd className="col-sm-9">{item[prop]}</dd>
        </React.Fragment>
    );
};

export default class CityWeatherInfo extends Component {

    state = {
        cityInfo: null
    };

    updateCityInfo(cityId) {
        this.props.getData(cityId).then((data) => {
            this.setState({
                cityInfo: data
            });
        });
    }

    componentDidMount() {
        this.updateCityInfo(this.props.cityId);
    }
    componentDidUpdate(prev) {
        if (prev.cityId !== this.props.cityId) {
            this.updateCityInfo(this.props.cityId);
        }
    }

    render() {
        const { cityInfo } = this.state

        if (!cityInfo) return <Loader />

        return (
            <dl className="row">
                <CityInfoRow item={cityInfo} label="City" prop="name" />
                <CityInfoRow item={cityInfo} label="Temperature" prop="temp" />
                <CityInfoRow item={cityInfo} label="Feels like" prop="feelsLike" />
                <CityInfoRow item={cityInfo} label="Weather" prop="weatherDesctiption" />
                <CityInfoRow item={cityInfo} label="Sunrise" prop="sunrise" />
                <CityInfoRow item={cityInfo} label="Sunset" prop="sunset" />
                <CityInfoRow item={cityInfo} label="Clouds" prop="clouds" />
                <CityInfoRow item={cityInfo} label="Wind speed" prop="windSpeed" />
                <CityInfoRow item={cityInfo} label="Pressure" prop="pressure" />
                <CityInfoRow item={cityInfo} label="Humidity" prop="humidity" />
            </dl>
        );
    }
};
