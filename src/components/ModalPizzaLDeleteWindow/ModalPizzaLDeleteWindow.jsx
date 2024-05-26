import PropTypes from 'prop-types';

import css from './ModalPizzaLDeleteWindow.module.css';

//------------------------------------------------------------------------------------------------------------------
export const ModalPizzaLDeleteWindow = ({ deletePizzaIndex, toggleModal }) => {
    const allChoicePizzasLocalStorage = JSON.parse(localStorage.getItem("allChoicePizzas"));
    // console.log("ModalPizzaLDeleteWindow --> allChoicePizzasLocalStorage:", allChoicePizzasLocalStorage); //!
    
    const deletePizza = (index) => {
        const allChoicePizzasWithDeleting = allChoicePizzasLocalStorage.filter((item) => item !== allChoicePizzasLocalStorage[index]);
        localStorage.setItem("allChoicePizzas", JSON.stringify(allChoicePizzasWithDeleting));
        toggleModal();
    };


    return (
        <>
            <div className={css.modalWindow}>
                <p className={css.modalTitle}
                >
                    Delete pizza
                </p>
                <p className={`${css.modalTitle} ${css.modalTitlePizza}`}
                >
                    "{allChoicePizzasLocalStorage[deletePizzaIndex].pizza}" <span className={css.questionMark}>?</span>
                </p>
                <button
                    className={`${css.modalBtn} ${css.modalBtnYes}`}
                    type='button'
                    onClick={() => deletePizza(deletePizzaIndex)}
                >
                    YES
                </button>
                <button
                    className={`${css.modalBtn} ${css.modalBtnNo}`}
                    type='button'
                    onClick={toggleModal}
                >
                    NO
                </button>
            </div>
        </>
    );
}

ModalPizzaLDeleteWindow.propTypes = {
    deletePizzaIndex: PropTypes.number.isRequired,
    toggleModal: PropTypes.func.isRequired,
};


