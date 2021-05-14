import React, { createRef, useEffect } from 'react';
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

    useEffect(() => {
        window.M.textareaAutoResize(document.querySelector('#ticketDescription'));
    });

    return (
        <section className="container">
            <form className="row" id="ticket-form" onSubmit={handleCreateTicket}>
                <div className="col s12 m10 l8 xl6">
                    <h4>Crear Ticket</h4>
                    <div className="input-field">
                        <label htmlFor="ticketName">Título</label>
                        <input
                            type="text"
                            name="ticketName"
                            id="ticketName"
                            ref={nameInput}
                            defaultValue=""
                            autoComplete="off"
                            required={true}
                        />
                    </div>
                    <div className="input-field">
                        <textarea
                            className="materialize-textarea"
                            name="ticketDescription"
                            id="ticketDescription"
                            ref={descriptionInput}
                            defaultValue=""
                            autoComplete="off"
                            required={true}
                        />
                        <label htmlFor="ticketDescription">Descripción</label>
                    </div>
                    <div className="default-select">
                        <label>Nivel</label>
                        <select
                            className="browser-default"
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
                    <div className="default-select">
                        <label>Proyecto</label>
                        <select
                            className="browser-default"
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
                    <button className="btn waves-effect waves-light" type="submit" form="ticket-form">Crear Ticket</button>
                </div>
            </form>
        </section>
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