import React from 'react';
import Modal from 'react-modal';
import '../styles/ErrorModal.css';
import { useDispatch } from 'react-redux';
import { setError } from '../redux/user_actions';

const ErrorModal = ({ error }) => {

    const dispatch = useDispatch();

    const toggleModal = () => {
        dispatch(setError(''));
    }

    return (
            <Modal
                ariaHideApp={false}
                className="form-modal"
                overlayClassName="Overlay"
                isOpen={error ? true : false}
                shouldCloseOnOverlayClick={true}
                onRequestClose={toggleModal}
                aria={{
                    labelledby: "Error Modal"
                }}
            >
            <p className="error-text">{error}</p>

            </Modal>
    );
}

export default ErrorModal;