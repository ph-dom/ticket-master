import React, { createRef } from 'react';
import { connect } from 'react-redux';

const CreateTicketComponent = props => {
    const nameInput = createRef(null);
    const descriptionInput = createRef(null);
    const labelInput = createRef(null);

    return (
        <form id="ticket-form">
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
                    <option value="">Seleccione</option>
                    {(props.labels.length > 0) && props.labels.map(label => {
                        return (
                            <option key={label.id} value={label.id}>{label.name}</option>
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
    labels: state.board.labels || []
});

export default connect(mapStateToProps)(CreateTicketComponent);