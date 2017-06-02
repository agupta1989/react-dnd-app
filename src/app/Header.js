import React from 'react';
import logo from '../images/logo.svg';

export default class Header extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>                        
                        </button>
                        <a className="navbar-brand" href="javascript:void(0)">
                            <img src={logo} className="App-logo" alt="logo" />
                        </a>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <h2 className="heading">React DnD Sample</h2>
                    </div>
                </div>
            </nav>
        );
    }
}