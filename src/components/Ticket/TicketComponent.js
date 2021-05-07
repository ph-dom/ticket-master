import React from 'react';
import { connect } from 'react-redux';

const TicketComponent = props => {
    return (
        <div>
            <h1>Ticket</h1>
            <div>
                <p><b>ID: </b><span>{props.ticket.id}</span></p>
                <p><b>Nombre: </b><span>{props.ticket.name}</span></p>
                <p><b>Descripción: </b><span>{props.ticket.desc}</span></p>
                <p><b>Tipo: </b><span>{props.ticket.labels[0].name}</span></p>
                <p><b>Estado: </b><span>{props.ticket.list.name}</span></p>
                <p><b>Proyecto: </b><span>{props.ticket.project}</span></p>
            </div>
        </div>
    );
}

const mapStateToProps = (state, props) => {
    let ticket = state.tickets.find(ticket => ticket.id === props.match.params.id);
    if(ticket) {
        let idProject = ticket.customFieldItems.find(cfi => cfi.idCustomField === '60720a69d2551548ee6c4ae9').idValue;
        ticket.project = state.board.projects.find(prjct => prjct.id === idProject).name;
    }
    return {
        ticket
    }
};

export default connect(mapStateToProps)(TicketComponent);