import React, { createRef } from 'react';
import { connect } from 'react-redux';
import { startCreateTicket } from '../../redux/ticket/actions';
import './CreateTicketStyles.css';

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
        <React.Fragment>
            <h2 className="text-center">Crear Ticket</h2>
            <form className="form" id="ticket-form" onSubmit={handleCreateTicket}>
                <div className="form-group">
                    <label className="form-group_label" htmlFor="ticketName">Título</label>
                    <input
                        className="form-group_input"
                        placeholder="Título.."
                        type="text"
                        name="ticketName"
                        id="ticketName"
                        ref={nameInput}
                        defaultValue=""
                        autoComplete="off"
                        required={true}
                    />
                </div>
                <div className="form-group">
                    <label className="form-group_label" htmlFor="ticketDescription">Descripción</label>
                    <textarea
                        className="form-group_textarea"
                        placeholder="Descripción.."
                        name="ticketDescription"
                        id="ticketDescription"
                        ref={descriptionInput}
                        defaultValue=""
                        cols="20"
                        rows="4"
                        autoComplete="off"
                        required={true}
                    />
                </div>
                <div className="form-group">
                    <label className="form-group_label" htmlFor="ticketLabel">Nivel</label>
                    <select
                        className="form-group_select"
                        name="ticketLabel"
                        id="ticketLabel"
                        ref={labelInput}
                        defaultValue=""
                        required={true}
                    >
                        <option value="">Seleccione...</option>
                        {(props.labels.length > 0) && props.labels.map(label => {
                            return (
                                <option key={label.id} value={label.id}>{label.name}</option>
                            );
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-group_label" htmlFor="project">Proyecto</label>
                    <select
                        className="form-group_select"
                        name="project"
                        id="project"
                        ref={projectInput}
                        defaultValue=""
                        required={true}
                    >
                        <option value="">Seleccione...</option>
                        {(props.projects.length > 0) && props.projects.map(project => {
                            return (
                                <option key={project} value={project}>{project}</option>
                            );
                        })}
                    </select>
                </div>
                <div className="form-action">
                    <button className="button-submit" type="submit" form="ticket-form">Crear Ticket</button>
                </div>
            </form>
        </React.Fragment>
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