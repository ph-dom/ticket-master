import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { closeModal } from '../../../redux/modal/actions';

Modal.setAppElement('#root')

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const ModalComponent = props => {
    return (
        <Modal
            isOpen={props.modal.open}
            style={customStyles}
            contentLabel={props.modal.title}
        >
            <div>
                <h2>{props.modal.title}</h2>
                <p>{props.modal.message}</p>
                <button onClick={props.closeModal}>Aceptar</button>
            </div>
        </Modal>
    );
}

const mapStateToProps = (state) => ({
    modal: state.modal
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);