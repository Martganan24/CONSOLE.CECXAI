import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
    AppProvider
} from './AppContext'; // Import the AppProvider
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';

ReactDOM.render( <
    BrowserRouter >
    <
    AppProvider >
    <
    Switch >
    <
    Route >
    <
    App / >
    <
    /Route> <
    /Switch> <
    /AppProvider> <
    /BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA