import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
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
        } else if(attachment.url) {
            formData.append('url', attachment.url);
        }
        formData.append('name', attachment.name);
        props.startAddAttachmentToCard(props.ticket.id, formData).then(() => {
            document.querySelector('#attachment-form').reset();
            setAttachment({
                name: '',
                file: null,
                url: ''
            });
        });
    }

    useEffect(() => {
        window.M.textareaAutoResize(document.querySelector('#comment'));
    });

    let actions = props.ticket.actions;
    let attachments = props.ticket.attachments;

    return (
        <React.Fragment>
        <section className="container">
            <div className="row">
                <div className="col s12 m10 l8 xl6">
                    <div className="card grey lighten-4">
                        <div className="card-content">
                            <h4 className="card-title" style={{ margin: '0' }}>Ticket</h4>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>ID</th>
                                        <td><span>{props.ticket.id}</span></td>
                                    </tr>
                                    <tr>
                                        <th style={{verticalAlign: 'top'}}>Nombre</th>
                                        <td><span>{props.ticket.name}</span></td>
                                    </tr>
                                    <tr>
                                        <th style={{verticalAlign: 'top'}}>Descripción</th>
                                        <td><span>{props.ticket.desc}</span></td>
                                    </tr>
                                    <tr>
                                        <th>Tipo</th>
                                        <td><span>{props.ticket.labels[0].name}</span></td>
                                    </tr>
                                    <tr>
                                        <th>Estado</th>
                                        <td><span>{props.ticket.list.name}</span></td>
                                    </tr>
                                    <tr>
                                        <th>Proyecto</th>
                                        <td><span>{props.ticket.project}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="container">
            <div className="row">
                <div className="col s12 m10 l8 xl6">
                    <div className="card grey lighten-4">
                        <div className="card-content">
                            <h4 className="card-title" style={{ margin: '0' }}>Adjuntos</h4>
                            {(attachments.length > 0) ?
                                <ul className="attachments-list">
                                    {attachments.sort((a, b) => new Date(a.date) - new Date(b.date)).map(attm => {
                                        return (
                                            <li className="attachment-item" key={attm.id}>
                                                {attm.mimeType.startsWith('image') ?
                                                    <img
                                                        src={attm.url}
                                                        alt={attm.name}
                                                        height="100"
                                                        width="100"
                                                    /> :
                                                    <svg
                                                        version="1.1"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 100 100"
                                                        height="100"
                                                        width="100"
                                                    >
                                                        <rect x="0" y="0" width="100" height="100" stroke="none" fill="rgba(0,0,0,0.2)" />
                                                        <text x="50" y="50" alignmentBaseline="middle" textAnchor="middle" fontSize="20">{attm.fileName?.split('.').pop() || 'URL'}</text>
                                                    </svg>}
                                                <div>
                                                    <strong>{attm.name}</strong>
                                                    <time dateTime={moment(attm.date).toISOString()}>{moment(attm.date).format("DD/MM/YYYY - HH:mm")}</time>
                                                </div>
                                                <div className="attachment-item_link">
                                                    <a target="_blank" href={attm.url} rel="noreferrer">
                                                        {attm.fileName ? 
                                                            <i className="material-icons">file_download</i> :
                                                            <i className="material-icons">forward</i> }
                                                    </a>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul> :
                                <p className="text-center">No hay archivos adjuntos.</p>}
                            <form id="attachment-form" onSubmit={handleSubmitAttachment}>
                                {!attachment.url && <div className="input-file">
                                    <label htmlFor="file">
                                        {attachment.file ? 
                                            <i className="material-icons">file_upload</i> :
                                            <i className="material-icons">attach_file</i>}
                                        Buscar
                                    </label>
                                    {attachment.file && <strong className="d-block text-center">{attachment.file.name} ({attachment.file.size} bytes)</strong>}
                                    <input
                                        type="file"
                                        id="file"
                                        name="file"
                                        multiple={false}
                                        accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                                        onChange={event => setAttachment(att => ({
                                            ...att, file: event.target.files[0]
                                        }))}
                                        required={true}
                                    />
                                </div>}
                                {!attachment.file && <div className="input-field">
                                    <label htmlFor="url">URL</label>
                                    <input
                                        type="url"
                                        id="url"
                                        name="url"
                                        defaultValue=""
                                        onChange={event => setAttachment(att => ({
                                            ...att, url: event.target.value
                                        }))}
                                        autoComplete="off"
                                        required={true}
                                    />
                                </div>}
                                <div className="input-field">
                                    <label htmlFor="name">Nombre: </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        defaultValue=""
                                        onChange={event => setAttachment(att => ({
                                            ...att, name: event.target.value
                                        }))}
                                        autoComplete="off"
                                        required={true}
                                    />
                                </div>
                                <button className="btn waves-effect waves-light" type="submit" form="attachment-form">Guardar</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col s12 m10 l8 xl6">
                    <div className="card grey lighten-4">
                        <div className="card-content">
                            <h4 className="card-title" style={{ margin: '0 0 10px 0' }}>Mensajes</h4>
                            {(actions.length > 0) ? actions.sort((a, b) => new Date(a.date) - new Date(b.date)).map(comment => {
                                let isMyComment = comment.idMemberCreator === '60538224b64e4a7e14b831f7';
                                let autorName = isMyComment ? 'Yo' : comment.memberCreator.fullName;
                                return (
                                    <div key={comment.id}>
                                        <div className="comment">
                                            <strong>{autorName}</strong>
                                            &nbsp;&nbsp;
                                            <time dateTime={moment(comment.date).toISOString()}>{moment(comment.date).format("DD/MM/YYYY - HH:mm")}</time>
                                        </div>
                                        <span>{comment.data.text}</span>
                                        <hr />
                                    </div>
                                );
                            }) : <p className="text-center">No hay mensajes</p>}
                            <form id="comment-form" onSubmit={handleSubmitComment}>
                                <div className="input-field">
                                    <textarea
                                        className="materialize-textarea"
                                        id="comment"
                                        name="comment"
                                        default=""
                                        ref={commentRef}
                                        cols="20"
                                        rows="4"
                                        autoComplete="off"
                                        required={true}
                                    />
                                    <label htmlFor="comment">Agregar Comentario</label>
                                </div>
                                <button className="btn waves-effect waves-light" type="submit" form="comment-form">Enviar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </React.Fragment>
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