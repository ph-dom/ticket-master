import React, { createRef } from 'react';
import { connect } from 'react-redux';
import { startCreateTicket } from '../../redux/ticket/actions';

const CreateTicketComponent = props => {
    const nameInput = createRef(null);
    const descriptionInput = createRef(null);
    const labelInput = createRef(null);
    const projectInput = createRef(null);

    const handleCreateTicket = event => {
        event.preventDefault();
        let ticket = {
            name: nameInput.current.value,
            desc: descriptionInput.current.value,
            idLabels: labelInput.current.value,
            project: projectInput.current.value
        };
        props.startCreateTicket(ticket).then(() => {
            if(ticket.id) {
                document.querySelector('#ticket-form').reset();
                props.history.push(`/ticket/${ticket.id}`);
            }
        });
    }

    return (
        <form id="ticket-form" onSubmit={handleCreateTicket}>
            <div>
                <label htmlFor="ticketName">Título: </label>
                <input type="text" name="ticketName" id="ticketName" ref={nameInput} defaultValue=""/>
            </div>
            <div>
                <label htmlFor="ticketDescription">Descripción: </label>
                <textarea name="ticketDescription" id="ticketDescription" ref={descriptionInput} defaultValue="" cols="20" rows="4"/>
            </div>
            <div>
                <label htmlFor="ticketLabel">Nivel: </label>
                <select name="ticketLabel" id="ticketLabel" ref={labelInput} defaultValue="">
                    <option value="">Seleccione...</option>
                    {(props.labels.length > 0) && props.labels.map(label => {
                        return (
                            <option key={label.id} value={label.id}>{label.name}</option>
                        );
                    })}
                </select>
            </div>
            <div>
                <label>Proyecto: </label>
                <select name="project" id="project" ref={projectInput} defaultValue="">
                    <option value="">Seleccione...</option>
                    {(props.projects.length > 0) && props.projects.map(project => {
                        return (
                            <option key={project} value={project}>{project}</option>
                        );
                    })}
                </select>
            </div>
            <div>
                <button type="submit" form="ticket-form">Crear Ticket</button>
            </div>
        </form>
    );
}

const mapStateToProps = (state) => ({
    labels: state.board.labels || [],
    projects: state.user.projects
});

const mapDispatchToProps = (dispatch) => ({
    startCreateTicket: (ticket) => dispatch(startCreateTicket(ticket))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTicketComponent);