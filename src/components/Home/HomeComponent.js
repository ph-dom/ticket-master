import React from 'react';
import { connect } from 'react-redux';

const HomeComponent = props => {
    return (
        <React.Fragment>
            <h1>Mis Tickets</h1>
            {props.tickets.length > 0 ?
                <ul>
                    {props.tickets.map(ticket => {
                        return (<li key={ticket.id}>{ticket.id}</li>);
                    })}
                </ul> : 
                <p>No tienes tickets</p>}
        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({
    tickets: state.tickets
});

export default connect(mapStateToProps)(HomeComponent);