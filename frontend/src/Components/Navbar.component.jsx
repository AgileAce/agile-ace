import React from 'react';
import Logo from './../Resources/IMG/logo.png';
import LightMode from './../Resources/IMG/light-mode.png';
import DarkMode from './../Resources/IMG/dark-mode.png';
import {Link} from "react-router-dom";
import {URL_ROUTES} from "../Resources/UTILS/URL_ROUTES.routes";
import {useTheme} from "../Contexts/Theme.context";
import {THEMES} from "../Resources/UTILS/ENUMS"; // Ensure the path is correct

function Navbar() {

      const { theme, toggleTheme } = useTheme();

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                {/* Navbar brand/logo - assuming you want to link this to the root or another route */}
                <Link className="navbar-brand" to={URL_ROUTES.HOME}
                      style={{position: 'absolute', left: '50%', transform: 'translateX(-50%)'}}>
                    <img src={Logo} alt="Logo" style={{height: '50px'}}/>
                </Link>

                {/* Dropdown menu item */}
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        {/* If this is just a button to toggle dropdown and not for navigation, keep it as <a> */}
                        <a className="nav-link" href="#" id="navbarDropdown" role="button"
                           data-bs-toggle="dropdown" aria-expanded="false">
                            <ion-icon name="menu" size="large"></ion-icon>
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li>
                                {/* Change to Link */}
                                <Link className="dropdown-item flex-center" to={URL_ROUTES.HOME}>
                                    <ion-icon className="font-size-16" name="home"></ion-icon>
                                    Home
                                </Link>
                            </li>
                            <li>
                                {/* Change to Link */}
                                <button type="button" className="dropdown-item flex-center" data-bs-toggle="modal"
                                        data-bs-target="#exampleModal">
                                    <ion-icon className="font-size-16" name="aperture"></ion-icon>
                                    Theme
                                </button>
                            </li>
                            <li>
                                {/* Change to Link */}
                                <Link className="dropdown-item flex-center" to={URL_ROUTES.HOME}>
                                    <ion-icon className="font-size-16" name="add-circle-outline"></ion-icon>
                                    Create
                                </Link>
                            </li>
                            <li>
                                {/* Change to Link */}
                                <Link className="dropdown-item flex-center" to={URL_ROUTES.LOGIN}>
                                    <ion-icon className="font-size-16" name="log-in"></ion-icon>
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>


                {/*  POP UP For theme change */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Theme Selector (<span className="text-capitalize">{theme}</span>) </h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-6">
                                        <button data-bs-dismiss="modal" onClick={()=> toggleTheme(THEMES.LIGHT)} className="btn no-effects">
                                            <img className="img-fluid" src={LightMode} alt="Light Mode"/>
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <button data-bs-dismiss="modal" onClick={()=> toggleTheme(THEMES.DARK)} className="btn no-effects">
                                            <img className="img-fluid" src={DarkMode} alt="Dark Mode"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary rounded-pill"
                                        data-bs-dismiss="modal">Close
                                </button>
                                {/*<button type="button" className="btn btn-primary rounded-pill">Save changes</button>*/}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Assuming this is for profile or another internal route */}
                <Link to={URL_ROUTES.LOGIN}>
                    <ion-icon name="person" size="large" class="text-dark"></ion-icon>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
