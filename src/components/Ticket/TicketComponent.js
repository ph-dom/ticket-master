import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { startAddCommentToTicket } from '../../redux/ticket/actions';

const TicketComponent = props => {
    const commentRef = useRef(null);

    const handleSubmitComment = event => {
        event.preventDefault();
        let comment = {
            comment: commentRef.current.value
        };
        props.startAddCommentToTicket(props.ticket.id, comment).then(() => {
            if(comment.id) {
                document.querySelector('#comment-form').reset();
            }
        });
    }
    let actions = props.ticket.actions;

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
            <div>
                <h2>Mensajes</h2>
                {(actions.length > 0) && actions.sort((a, b) => new Date(a.date) - new Date(b.date)).map(comment => {
                    let isMyComment = comment.idMemberCreator === '60538224b64e4a7e14b831f7';
                    let autorName = isMyComment ? 'Yo' : comment.memberCreator.fullName;
                    return (
                        <div key={comment.id}>
                            <p>
                                <b>{autorName}: </b>
                                <span>{comment.data.text}</span>
                            </p>
                        </div>
                    );
                })}
            </div>
            <div>
                <form id="comment-form" onSubmit={handleSubmitComment}>
                    <h2>Enviar mensaje</h2>
                    <div>
                        <label htmlFor="comment">Agregar Comentario: </label>
                        <textarea id="comment" name="comment" default="" ref={commentRef} cols="20" rows="4"/>
                    </div>
                    <div>
                        <button type="submit" form="comment-form">Enviar</button>
                    </div>
                </form>
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

const mapDispatchToProps = (dispatch) => ({
    startAddCommentToTicket: (idCard, comment) => dispatch(startAddCommentToTicket(idCard, comment))
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketComponent);