import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startLogoutUser } from '../../redux/user/actions';

const NavComponent = props => {

    const handleLogout = event => {
        event.preventDefault();
        props.startLogoutUser();
    };

    useEffect(() => {
        if(props.isAuthenticated) {
            let sideNav = document.querySelector('.sidenav');
            window.M.Sidenav.init(sideNav);
        }
    });

    return (
        <React.Fragment>
            <nav>
                <div className="nav-wrapper container">
                    <NavLink to="/" className="brand-logo">TicketMaster</NavLink>
                    {props.isAuthenticated && <a href="#!" data-target="mobile-nav" className="sidenav-trigger">
                        <i className="material-icons">menu</i>
                    </a>}
                    {props.isAuthenticated && <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><NavLink to="/">Mis Tickets</NavLink></li>
                        <li><NavLink to="/create-ticket">Crear Ticket</NavLink></li>
                        {props.role === 'admin' && <li><NavLink to="/user">Crear Usuario</NavLink></li>}
                        <li>
                            <a href="#!" onClick={handleLogout}>
                                <i className="material-icons">logout</i>
                            </a>
                        </li>
                    </ul>}
                </div>
            </nav>
            {props.isAuthenticated && <ul className="sidenav" id="mobile-nav">
                <li><NavLink className="sidenav-close" to="/">Mis Tickets</NavLink></li>
                <li><NavLink className="sidenav-close" to="/create-ticket">Crear Ticket</NavLink></li>
                {props.role === 'admin' && <li><NavLink className="sidenav-close" to="/user">Crear Usuario</NavLink></li>}
                <li>
                    <a className="sidenav-close" href="#!" onClick={handleLogout}>
                        <i className="material-icons">logout</i>
                    </a>
                </li>
            </ul>}
        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.uid !== null,
    role: state.user.uid !== null ? state.user.role : null
});

const mapDispatchToProps = (dispatch) => ({
    startLogoutUser: () => dispatch(startLogoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavComponent);