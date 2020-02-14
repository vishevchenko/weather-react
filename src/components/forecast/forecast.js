import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind } from '@fortawesome/free-solid-svg-icons'

import "./forecast.css"

import Loader from "../loader";

const windIcon = <FontAwesomeIcon icon={faWind} />

const buildWeatherTile = (list) => {
    return (
        list.map((item) => {
            const { id, day, time, icon,
                tempMin, tempMax, desctiption,
                wind } = item;
            return (
                <div key={id} className="tile border carousel-item">
                    {day} <br/>
                    <img src={icon} alt={desctiption}/> <br/>
                    {tempMin} &deg;C / {tempMax} &deg;C <br/>
                    {windIcon} {wind} m/s<br/>
                    {desctiption} <br/> <hr/>
                    {time} <br/>

                </div>
            )
        })
    );
};

export default class Forecast extends Component {
    state = {
        list: null
    };

    componentDidUpdate(prev) {
        const { getData, cityId } = this.props;

        if (prev.cityId == cityId) return;

        getData(cityId)
            .then((data) => {
                this.setState({
                    list: data
                });

            });
    }

    render() {
        const { list } = this.state;

        if (!list) return <Loader />;

        const tiles = buildWeatherTile(list);

        return (
            <div className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    {tiles}
                </div>
                <div className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </div>
                <div className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </div>
            </div>
        );
    }
}

