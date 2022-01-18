/* Import react-components */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
/* Import CSS for Header */
import headerCSS from './Header.css';
/* Import project-components */
import HeaderQuiz from './HeaderQuiz';
import HeaderMatch from './HeaderMatch';
/* import HeaderState from './HeaderState'; */

const Header = (props) => {
    const [userId, setUserId] = useState(0);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginState, setLoginState] = useState('I');
    const [quizTaken, setQuizTaken] = useState(false);
    const [logOutClicked, setLogOutClicked] = useState(false);
    const [firstRender, setFirstRender] = useState(true);

    const location = useLocation();

    const clickLogout = e => {
        console.log('onClick: clickLogout');
        setLogOutClicked(true);
    }

    console.log('Header: after const-declaration');

    function setSessionVar(userId, loggedIn, loginState, quizTaken) {
        console.log('function: setSessionVar');
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("loggedIn", loggedIn);
        sessionStorage.setItem("loginState", loginState);
        sessionStorage.setItem("quizTaken", quizTaken);
    }

    function renderHeaderState() {
        let logoutRoute = location.pathname;

        if ((logoutRoute === props.cfgData.FE_ROUTE_QUESTIONAIRE_START)||(logoutRoute === props.cfgData.FE_ROUTE_MATCHING_RESULT)) {
            logoutRoute = props.cfgData.FE_ROUTE_HOME;
        }

        if (userId > 0 && loggedIn) {
            sessionStorage.setItem("loginState", 'O');
            return (
                <div>
                    <Link to={logoutRoute}>
                        <button onClick={clickLogout} className="navbar__log_in" type="button">{props.cfgData.FE_ROUTE_LOGOUT_MENUITEM}</button>
                    </Link>
                </div>
            );
        }
        else {
            sessionStorage.setItem("loginState", 'I');

            return (
                <div>
                    <Link to={props.cfgData.FE_ROUTE_LOGIN_CREATE}>
                        <button className="navbar__log_in" type="button">{props.cfgData.FE_ROUTE_LOGIN_CREATE_MENUITEM}</button>
                    </Link>&nbsp;|&nbsp;
                    <Link to={props.cfgData.FE_ROUTE_LOGIN}>
                        <button className="navbar__log_in" type="button">{props.cfgData.FE_ROUTE_LOGIN_MENUITEM}</button>
                    </Link>
                </div>
            );
        }
    }
        
    useEffect(() => {
        console.log('useEffect: Start');
        if (firstRender === true) {
            console.log('useEffect: firstRender');
            setFirstRender(false);
            setUserId(1);
            setLoggedIn(true);
            setLoginState('O');
            setQuizTaken(true);
            setSessionVar(userId, loggedIn, loginState, quizTaken);
        }
        if (logOutClicked === true) {
            console.log('useEffect: logOutClicked');
            setLogOutClicked(false);
            // Logout -> BE
            axios.post('http://localhost:3001/logout', userId)
                .then(response => {
                    setUserId(0);
                    setLoggedIn(false);
                    setLoginState('I');
                    setQuizTaken(false);
                    setSessionVar(userId, loggedIn, loginState, quizTaken);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    })

    setSessionVar(userId, loggedIn, loginState, quizTaken);

    const petMatchLogo = props.cfgData.LAYOUT_IMAGES_PATH + props.cfgData.HEADER_PET_MATCH_LOGO;
    const petMatchLogoAlt = props.cfgData.HEADER_PET_MATCH_LOGO_ALT;
    
    return ( 
        <nav className="navbar">
            <Link to={props.cfgData.FE_ROUTE_HOME}><img src={petMatchLogo} alt={petMatchLogoAlt} className="logo__img" /></Link>
            <ul>
                <li>
                    <HeaderQuiz cfgData={props.cfgData} quizTaken={quizTaken} />
                </li>
                <HeaderMatch cfgData={props.cfgData} quizTaken={quizTaken} />
                <li>
                    <Link to={props.cfgData.FE_ROUTE_HOWITWORKS}>{props.cfgData.FE_ROUTE_HOWITWORKS_MENUITEM}</Link>
                </li>
                <li>
                    <Link to={props.cfgData.FE_ROUTE_ABOUTUS}>{props.cfgData.FE_ROUTE_ABOUTUS_MENUITEM}</Link>
                </li>
                <li>
                    <Link to={props.cfgData.FE_ROUTE_SHELTER}>{props.cfgData.FE_ROUTE_SHELTER_MENUITEM}</Link>
                </li>
            </ul>
            {renderHeaderState()}
        </nav>
    );
};

export default Header; 
