import './Form.scss'

function Form({ styles, renderInputs }) {
    return (  
        <div className={styles['form-wrapper']}>
            <form className={styles['form']}>
                {renderInputs()}
            </form>
        </div>
    );
}

export default Form;