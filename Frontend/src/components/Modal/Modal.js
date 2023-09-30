import modalStyles from './Modal.module.scss'

function Modal({children}) {

    console.log('modal rerender')
    return (  
        <div className={modalStyles['modal']}>
            {children}
        </div>
    );
}

export default Modal;