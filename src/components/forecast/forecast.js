import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind } from '@fortawesome/free-solid-svg-icons'

import "./forecast.css"

import Loader from "../loader";

const windIcon = <FontAwesomeIcon icon={faWind} />

const buildWeatherTiles = (list) => {
    return (
        list.map((item) => {
            const { id, day, time, icon,
                temp, desctiption,
                windSpeed } = item;
            return (
                <div key={id} className="tile pr-1 m-0 carousel-item">
                    <div key={id} className="border">
                        {day} <br />
                        <img src={icon} alt={desctiption} /> <br />
                        {temp} &deg;C <br />
                        {windIcon} {windSpeed} m/s<br />
                        {desctiption} <br /> <hr />
                        {time} <br />

                    </div>
                </div>
            )
        })
    );
};

export default class Forecast extends Component {
    state = {
        list: null
    };

    visibleTilesCount = 6;
    tiles = React.createRef();
    wrapper = React.createRef();

    componentDidUpdate(prev) {
        const { getData, cityId } = this.props;

        this._setTileWidth();

        if (prev.cityId === cityId) return;

        getData(cityId)
            .then((data) => {
                this.setState({
                    list: data
                });
            });
    }

    _setTileWidth() {
        const tilesBlock = this.tiles.current;

        if (!tilesBlock) return;

        const tiles = tilesBlock.children;

        if (tiles[0].style.width.length) {
            return;
        }

        const { wrapper: { current: wrapper }, visibleTilesCount } = this;
        const wrapperWidth = wrapper.getBoundingClientRect().width;

        const tileWidth = wrapperWidth / visibleTilesCount;

        [].slice.apply(tiles).forEach(function (tile) {
            tile.style.setProperty('width', `${tileWidth}px`);
        });
    }

    controlLeftClickHandler = () => {
        const { tiles: { current: tiles}, visibleTilesCount } = this;
        const leftOffset = tiles.style.getPropertyValue('left');
        const tileWidth = tiles.firstChild.style.width;
        let newOffset = (parseInt(leftOffset || 0) + parseInt(tileWidth) * visibleTilesCount);
       
        if (newOffset > 0) newOffset = 0;
        
        tiles.style.setProperty('left', `${newOffset}px`);
    };

    constrolRightClickHandler = () => {
        const { tiles: { current: tiles}, visibleTilesCount } = this;
        const leftOffset = tiles.style.getPropertyValue('left');
        const tileWidth = tiles.firstChild.style.width;
        let newOffset = (parseInt(leftOffset || 0) - parseInt(tileWidth) * visibleTilesCount);

        if (-parseInt(tileWidth) * tiles.childElementCount > newOffset) {
            newOffset = tileWidth * tiles.children.length;
        }
        tiles.style.setProperty('left', `${newOffset}px`);
    };

    render() {
        const { list } = this.state;

        if (!list) return <Loader />;

        const tilesList = buildWeatherTiles(list);

        return (
            <div className="carousel slide" data-ride="carousel">
                <div className="inner-wrapper" ref={this.wrapper}>
                    <div className="carousel-inner" ref={this.tiles}>
                        {tilesList}
                    </div>
                </div>
                <div className="carousel-control-prev rounded-circle"
                    onClick={this.controlLeftClickHandler}
                    href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </div>
                <div className="carousel-control-next rounded-circle"
                    onClick={this.constrolRightClickHandler}
                    href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </div>
            </div>
        );
    }
}

