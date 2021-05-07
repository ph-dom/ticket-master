import React from 'react';
import { connect } from 'react-redux';

const HomeComponent = props => {
    return (
        <React.Fragment>
            <h1>Mis Tickets</h1>
            {props.tickets.length > 0 ?
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th>Mensajes</th>
                            <th>Detalle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.tickets.map(ticket => {
                            console.log(ticket)
                            return (
                                <tr key={ticket.id}>
                                    <td>{ticket.id}</td>
                                    <td>{ticket.name}</td>
                                    <td>{ticket.list.name}</td>
                                    <td>{ticket.actions.length}</td>
                                    <td>ya va</td>
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