import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startLogoutUser } from '../../../redux/user/actions';
import './NavStyles.css';

const NavComponent = props => {

    const handleLogout = () => {
        props.startLogoutUser();
    };

    return (
        <header>
            <h1 className="logo">TicketMaster</h1>
            {props.isAuthenticated &&
                <nav >
                    <ul className="nav-list">
                        <li><NavLink to="/">Mis Tickets</NavLink></li>
                        <li><NavLink to="/create-ticket">Crear Ticket</NavLink></li>
                        {props.role === 'admin' && <li><NavLink to="/user">Crear Usuario</NavLink></li>}
                        <li>
                            <button onClick={handleLogout}>
                                <span className="material-icons">logout</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            }
        </header>
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