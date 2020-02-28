import React from "react";

const RenderProp = ({label, value, icon, children: dim}) => {
    return (
        <React.Fragment>
            <dt className="col-6 text-right">{label || icon}</dt>
            <dd className="col-6 text-left">{value} {dim}</dd>
        </React.Fragment>
    );
};

const CurrentWeatherView = ({ weatherInfo }) => {
    const {
        name, temp, weatherDesctiption,
        icon, feelsLike, windSpeed,
        pressure, humidity, clouds,
    } = weatherInfo;

    return (
        <div className="row text-center current-weather">
            <div className="col-12">
                <h2>{name}</h2>
                <p>
                    <img src={icon} alt={weatherDesctiption} />
                    <big>{temp}° C</big><br />
                </p>
            </div>
            <div className="col-12">
                <big>{weatherDesctiption}</big>
            </div>
            <div className="col-12">
                <div className="row">
                    <div className="col-sm-6">
                        <dl className="row">
                            <RenderProp label='Feels Like' value={feelsLike}>&deg;</RenderProp>
                            <RenderProp label='Clouds' value={clouds}>%</RenderProp>
                            <RenderProp label='Wind' value={windSpeed}>m/s</RenderProp>
                        </dl>
                    </div>
                    <div className="col-sm-6">
                        <dl className="row">
                            <RenderProp label='Pressure' value={pressure}>hPa</RenderProp>
                            <RenderProp label='Humidity' value={humidity}>%</RenderProp>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeatherView;