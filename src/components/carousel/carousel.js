import React, { Component } from "react";

export default class Carousel extends Component {

    wrapper = React.createRef();
    inner = React.createRef();

    componentDidUpdate(prevProps) {
        const prevItems = JSON.stringify(prevProps.items);
        const items = JSON.stringify(this.props.items);
        
        if (prevItems !== items) {
            this.inner && (this.inner.current.style.left = '0px');
        }
    }

    buildItems = (items) => {
        const { itemsInRow, children } = this.props;
        const style = {
            width: `calc( (100vw - 80px) / ${itemsInRow} )`
        };
        const { onTileClick } = this.props;

        return items.map((item) => {
            return (
                <div key={item.id}
                    className="tile"
                    style={style}
                    onClick={() => { onTileClick && onTileClick(item) }}>
                    {children(item)}
                </div>
            );
        })
    }

    onPrevClick = () => {
        const { inner: { current: inner } } = this;
        const { items, itemsInRow } = this.props;
        const tileRect = inner.firstChild.getBoundingClientRect();
        const innerLeft = parseInt(inner.style.left, 10) || 0;

        if (innerLeft > -tileRect.width * (items.length - itemsInRow)) {
            inner.style.left = `${innerLeft - tileRect.width}px`;
        }
    }

    onNextClick = () => {
        const { inner: { current: inner } } = this;
        const tileRect = inner.firstChild.getBoundingClientRect();
        const innerLeft = parseInt(inner.style.left, 10) || 0;

        if (innerLeft < 0) {
            inner.style.left = `${innerLeft + tileRect.width}px`;
        }
    }

    render() {
        const { items, itemsInRow } = this.props;
        const tiles = this.buildItems(items);
        return (
            <div className="carousel slide">
                <div className="inner-wrapper" ref={this.wrapper}>
                    <div className="carousel-inner" ref={this.inner}>
                        {tiles}
                    </div>
                </div>

                {(itemsInRow < items.length) &&
                    <React.Fragment>
                        <div className="carousel-control-prev rounded-circle" onClick={this.onPrevClick}>
                            <span className="carousel-control-prev-icon">
                                <i className="fa fa-angle-left"></i>
                            </span>
                            <span className="sr-only">Previous</span>
                        </div>
                        <div className="carousel-control-next rounded-circle" onClick={this.onNextClick}>
                            <span className="carousel-control-next-icon">
                                <i className="fa fa-angle-right"></i>
                            </span>
                            <span className="sr-only">Next</span>
                        </div>
                    </React.Fragment>
                }
            </div>
        );
    }
}