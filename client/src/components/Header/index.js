import React from 'react';

import './style.css'

function Header(props) {
    return <header>
        <h1>Map-Tracker</h1>
        <a href={props.href}>{props.text}</a>
    </header>;
}

export default Header;