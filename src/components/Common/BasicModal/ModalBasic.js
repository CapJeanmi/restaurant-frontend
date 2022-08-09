import React from 'react';
import './ModalBasic.scss';
import { Modal } from 'semantic-ui-react';


export function ModalBasic(props) {
    const { show, size, title, children, onClose } = props;
  return (
    <Modal 
    className='modal-basic' 
    onClose={ onClose } 
    open={ show }
    size={ size }>
        {title && <Modal.Header>{ title }</Modal.Header>}
        <Modal.Content>{ children }</Modal.Content>
    </Modal>
  )
}


ModalBasic.defaultProps = {
    size: 'tiny'
}
