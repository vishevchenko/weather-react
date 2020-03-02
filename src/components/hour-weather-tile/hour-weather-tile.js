import React from "react"

const HourWeatherTile = (props) => {
    const {
        icon, description, time,
        tempMax, windSpeed
    } = props.item;
    return (
        <div className="hourlyTile">
            <div className="time"><img src={icon} alt={description} /> {time}</div>
            <div className="temp">{tempMax} &deg;C</div>
            <div className="wind"><i className="fa fa-wind"></i> {windSpeed}m/s</div>
            <div className="description">{description}</div>
        </div>
    );
};

export default HourWeatherTile;