import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { startAddCommentToTicket, startAddAttachmentToCard } from '../../redux/ticket/actions';

const TicketComponent = props => {
    const commentRef = useRef(null);
    const [ attachment, setAttachment ] = useState({
        name: '',
        file: null,
        url: ''
    });
 
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

    const handleSubmitAttachment = event => {
        event.preventDefault();
        let formData = new FormData();
        if(attachment.file) {
            formData.append('file', attachment.file);
            formData.append('name', attachment.name);
        } else if(attachment.url) {
            formData.append('url', attachment.url);
        }
        props.startAddAttachmentToCard(props.ticket.id, formData).then(() => {
            document.querySelector('#attachment-form').reset();
        });
    }

    let actions = props.ticket.actions;
    let attachments = props.ticket.attachments;

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
                <h2>Adjuntos</h2>
                <ul>
                {(attachments.length > 0) && attachments.sort((a, b) => new Date(a.date) - new Date(b.date)).map(attm => {
                    return (
                        <li key={attm.id}>
                            <a target="_blank" href={attm.url} rel="noreferrer">{attm.name}</a>
                            <span> {attm.date}</span>
                        </li>
                    );
                })}
                </ul>
            </div>
            <div>
                <h2>Adjuntar archivo</h2>
                <form id="attachment-form" onSubmit={handleSubmitAttachment}>
                    {!attachment.url && <div>
                        <label htmlFor="file">Archivo: </label>
                        <input type="file" id="file" name="file" multiple={false} accept="image/*,.pdf,.doc,.docx,.xls,.xlsx" onChange={event => setAttachment(att => ({ ...att, file: event.target.files[0] }))} />
                        {attachment.file && <span>{attachment.file.type}</span>}
                    </div>}
                    {!attachment.file && <div>
                        <label htmlFor="url">URL: </label>
                        <input type="url" id="url" name="url" defaultValue="" onChange={event => setAttachment(att => ({ ...att, url: event.target.value }))}/>
                    </div>}
                    {attachment.file && <div>
                        <label htmlFor="name">Nombre: </label>
                        <input type="text" id="name" name="name" defaultValue="" onChange={event => setAttachment(att => ({ ...att, name: event.target.value }))}  />
                    </div>}
                    <div>
                        <button type="submit" form="attachment-form">Guardar</button>
                    </div>
                </form>
            </div>
            <div>
                <h2>Mensajes</h2>
                {(actions.length > 0) && actions.sort((a, b) => new Date(a.date) - new Date(b.date)).map(comment => {
                    let isMyComment = comment.idMemberCreator === '60538224b64e4a7e14b831f7';
                    let autorName = isMyComment ? 'Yo' : comment.memberCreator.fullName;
                    return (
                        <div key={comment.id}>
                            <p>
                                <b>{comment.date}-{autorName}: </b>
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
    startAddCommentToTicket: (idTicket, comment) => dispatch(startAddCommentToTicket(idTicket, comment)),
    startAddAttachmentToCard: (idTicket, formData) => dispatch(startAddAttachmentToCard(idTicket, formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketComponent);