import React, { Component } from "react";

export default class Carousel extends Component {

    wrapper = React.createRef();

    render() {
        const { items, itemsInRow, children } = this.props;
        const wrapper = this.wrapper.current;
        const wrapperWidth = wrapper && wrapper.getBoundingClientRect().width;
        const style = {
            width: `calc(${wrapperWidth || 0}px / ${itemsInRow})`
        };

        return (
            <div className="carousel slide">
                <div className="inner-wrapper" ref={this.wrapper}>
                    <div className="carousel-inner">
                        {
                            items.map((item) => {
                                return (<div key={item.id} className="tile" style={style}>
                                    {children(item)}
                                </div>);
                            })
                        }
                    </div>
                </div>
                <div className="carousel-control-prev rounded-circle">
                    <span className="carousel-control-prev-icon"></span>
                    <span className="sr-only">Previous</span>
                </div>
                <div className="carousel-control-next rounded-circle">
                    <span className="carousel-control-next-icon"></span>
                    <span className="sr-only">Next</span>
                </div>
            </div>
        );
    }
}