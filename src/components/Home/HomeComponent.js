import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const HomeComponent = props => {
    return (
        <React.Fragment>
            <h1>Mis Tickets</h1>
            {props.tickets.length > 0 ?
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th>Mensajes</th>
                            <th>Detalle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.tickets.map(ticket => {
                            return (
                                <tr key={ticket.id}>
                                    <td>{ticket.name}</td>
                                    <td>{ticket.list.name}</td>
                                    <td>{ticket.actions.length}</td>
                                    <td><Link to={`/ticket/${ticket.id}`}>Ver</Link></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table> : 
                <p>No tienes tickets</p>}
        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({
    tickets: state.tickets
});

export default connect(mapStateToProps)(HomeComponent);