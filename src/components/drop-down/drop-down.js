import React from 'react';

const BuildOptions = (options) => {
    return options.map(({ id, name }) => {
        return (<option key={id} value={id}>{name}</option>)
    });
};

const DropDown = (props) => {
    const { options, onChangeHandler } = props;
    const opts = BuildOptions(options);

    return (
        <select className="form-control drop-down" onChange={e => onChangeHandler(e.target.value)}>
            {opts}
        </select>
    );
};

export default DropDown;