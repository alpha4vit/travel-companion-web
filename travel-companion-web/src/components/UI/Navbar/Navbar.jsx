import React from 'react';
import {Link} from "react-router-dom";
import cl from "./Navbar.module.css"
import {AuthService} from "../../../api/AuthService";

const Navbar = ({isLoggedIn, onLogout}) => {

    return (
        <nav className={'navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light '+cl.navbar_my} id="ftco-navbar">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav"
                        aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="fa fa-bars"></span> Меню
                </button>
                <div className="collapse navbar-collapse" id="ftco-nav">
                    {isLoggedIn
                    ?
                        <ul className="navbar-nav m-auto">
                            <li className="nav-item"><Link to="/posts"><a  className="nav-link">Главная</a></Link></li>
                            <li className="nav-item"><Link to="/profile"><a  className="nav-link">Профиль</a></Link></li>
                            <li className="nav-item"><Link to="/auth"><a onClick={onLogout} className="nav-link">Выйти</a></Link></li>
                        </ul>
                    :
                        <ul className="navbar-nav m-auto">
                            <li className="nav-item"><Link to="/posts"><a  className="nav-link">Главная</a></Link></li>
                            <li className="nav-item"><Link to="/auth"><a  className="nav-link">Войти</a></Link></li>
                        </ul>
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;