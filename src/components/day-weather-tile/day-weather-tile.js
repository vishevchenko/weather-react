import React from "react";

const DayWeatherTile = (props) => {
    const {
        day, tempMin, tempMax,
        description, icon
    } = props.item;
    return (
        <div className="dailyTile">
            <div className="date">
                <span>{day}</span>
                <div className="icon">
                    <img src={icon} alt={description} />
                </div>
            </div>
            <div className="temp">
                <span className="max">{tempMax}&deg;</span>
                <span className="min">{tempMin}&deg;</span>
            </div>
            <div className="description">{description}</div>
        </div>
    );
}

export default DayWeatherTile;