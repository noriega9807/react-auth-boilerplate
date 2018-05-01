import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

// Font awesome
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome';
import { faCoffee, faAlarmClock } from '@fortawesome/fontawesome-pro-light';


export const Header = ({startLogout}) => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <Link className="header__title" to="/dashboard">
                    <h1>
                        <span className="icon-margin-medium--right"><FontAwesomeIcon icon={faAlarmClock} /></span>
                        Flotillas
                    </h1>
                </Link>
                <button className="button button--link" onClick={startLogout}>Cerrar sesión</button>
            </div>
        </div>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);