import React, { useState } from 'react';
import 

function Dropdownold({ title, items, multiselect = false}) {
    const [open, setOpen] = useState(false);
    const [selection, setSelection] = useState([]);
    const toggle = () => setOpen(!open);

    function handleOnClick(item) {}

    return (
        <div className="dd-wrapper">
            <div 
                tabIndex={0} 
                className="dd-header" 
                role="button" 
                onKeyPress={() => toggle(!open)} 
                onClick={() => toggle(!open)}>
                    <div className="dd-header__title"></div>
                        <p className="dd_header__title-bold">{title}</p>
            </div>
            <div className="dd-header__action">
                <p>{open ? 'Close' : 'Open'}</p>
            </div>
            {open && (
                <ul className="dd-list">
                    {items.map(item => (
                        <li className="dd_list-item" key={item.id}>
                            <button type="button" onClick={() => handleOnClick(item)}>
                                <span>{item.value}</span>
                                <span>Selected...</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Dropdownold;