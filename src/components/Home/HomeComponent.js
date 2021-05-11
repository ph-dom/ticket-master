import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './HomeStyles.css';

const HomeComponent = props => {
    return (
        <React.Fragment>
            <h2 className="text-center">Mis Tickets</h2>
            <div className="tickets-list">
                <div><b>Nombre</b></div>
                <div><b>Estado</b></div>
                <div><b>Mensajes</b></div>
                <div><b>Detalle</b></div>
                {props.tickets.length > 0 ?
                    props.tickets.map(ticket => {
                        return (
                            <React.Fragment key={ticket.id}>
                                <div><span>{ticket.name}</span></div>
                                <div><span>{ticket.list.name}</span></div>
                                <div><span>{ticket.actions.length}</span></div>
                                <div>
                                    <Link className="linkToTicket" to={`/ticket/${ticket.id}`}>
                                        <span className="material-icons">visibility</span>
                                    </Link>
                                </div>
                            </React.Fragment>
                        );
                    }) : 
                    (<p>No tienes tickets</p>) }
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({
    tickets: state.tickets
});

export default connect(mapStateToProps)(HomeComponent);