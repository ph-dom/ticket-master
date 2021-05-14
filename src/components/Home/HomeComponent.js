import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const HomeComponent = props => {
    return (
        <section className="container">
            <div className="row">
                <div className="col s12 m10 l8 xl6">
                    <h4>Mis Tickets</h4>
                    <table className="striped responsive-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Estado</th>
                                <th>Mensajes</th>
                                <th>Detalle</th>
                            </tr>
                        </thead>
                        <tbody>
                        {props.tickets.length > 0 ?
                            props.tickets.map(ticket => {
                                return (
                                    <tr key={ticket.id}>
                                        <td style={{ maxWidth: '230px' }}>
                                            <span>{ticket.name}</span>
                                        </td>
                                        <td>
                                            <span>{ticket.list.name}</span>
                                        </td>
                                        <td className="text-center">
                                            <span>{ticket.actions.length}</span>
                                        </td>
                                        <td className="text-center">
                                            <Link to={`/ticket/${ticket.id}`}>
                                                <i className="material-icons">visibility</i>
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            }) : 
                            (<tr><td colSpan="4"><span>No tienes tickets</span></td></tr>) }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

const mapStateToProps = (state) => ({
    tickets: state.tickets
});

export default connect(mapStateToProps)(HomeComponent);