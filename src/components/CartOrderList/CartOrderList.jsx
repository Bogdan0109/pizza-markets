import React, { useState } from 'react';

import imageTrash from "images/trash.png";
import pictureDefault from "../../images/free-icon-pizza-512-7467230.png"; //!!!
import pizzaMarketsJson from "db/pizzaMarketsMongoDB.json"; //!!!

//! Модальное окно
import { Modal} from 'components/Modal/Modal';
import { ModalPizzaLDeleteWindow } from 'components/ModalPizzaLDeleteWindow/ModalPizzaLDeleteWindow';

import css from "./CartOrderList.module.css";


export const CartOrderList = () => {
    const [value, setValue] = useState(true);
    const togle = () => setValue(!value);

    //! Тест кнопок Decrement и Increment
    // const [value1, setValue1] = useState(0);
    // const handleDecrement = () => {
    //     setValue1(value1 - 1);
    // };
    // const handleIncrement = () => {
    //     setValue1(value1 + 1);
    // };

    const handleDecrement = (index) => {
        let changeItemQuantity = allChoicePizzasLocalStorage[index].quantity - 1;
        if (changeItemQuantity < 1) changeItemQuantity = 1; //! МИНИМАЛЬНОЕ значение quantity
        allChoicePizzasLocalStorage[index].quantity = changeItemQuantity;
        localStorage.setItem("allChoicePizzas", JSON.stringify([...allChoicePizzasLocalStorage]));
        togle();
    };

    const handleIncrement = (index) => {
        let changeItemQuantity = allChoicePizzasLocalStorage[index].quantity + 1;
        if (changeItemQuantity > 50) changeItemQuantity = 50; //! МАКСИМАЛЬНОЕ значение quantity
        allChoicePizzasLocalStorage[index].quantity = changeItemQuantity;
        localStorage.setItem("allChoicePizzas", JSON.stringify([...allChoicePizzasLocalStorage]));
        togle();
    };

    //! Required for a modal window --> 
    const allChoicePizzasLocalStorage = JSON.parse(localStorage.getItem("allChoicePizzas"));

    let totalPrice = 0;
    if (allChoicePizzasLocalStorage) {
        totalPrice = allChoicePizzasLocalStorage.reduce((total, item) => {
            total = total + item.price * item.quantity;
            return total;
        }, 0);
    };

    //! Required for a modal window --> Преренесено в ModalPizzaLDeleteWindow
    // const deletePizza = (index) => {
    //     const allChoicePizzasWithDeleting = allChoicePizzasLocalStorage.filter((item) => item !== allChoicePizzasLocalStorage[index]);
    //     localStorage.setItem("allChoicePizzas", JSON.stringify(allChoicePizzasWithDeleting));
    //     togle();
    // };
    

    //! Модальное окно
    const [showModal, setShowModal] = useState(false);
    const [deletePizzaIndex, setDeletePizzaIndex] = useState(null);
    const toggleModal = (index) => {
        setShowModal(!showModal);
        if (index !== null || index !== undefined) setDeletePizzaIndex(index);
    }

    // console.log("deletePizzaIndex:", deletePizzaIndex); //!


    return (
        <>
            {allChoicePizzasLocalStorage && allChoicePizzasLocalStorage.length > 0
                ?
                (
                    <ul className={css.list}>
                        {allChoicePizzasLocalStorage.map(({ indexShop, indexPizza, pizza, picture = pictureDefault, quantity, price }, index) => {
                            const defaultImageBase64Json = pizzaMarketsJson[indexShop].pizzas[indexPizza].defaultImage
                            return <li
                                        className={css.listItem}
                                        key={pizza}
                                    >
                                        <img
                                            className={css.imagePizza}
                                            alt={"Pizza"}
                                            // src={imagePizza}
                                            // src={item.picture}
                                            // src={picture || pictureDefault}
                                            src={picture || defaultImageBase64Json}
                                            width="100%"
                                        />
                                        <div className={css.cardContents}>
                                            <p className={css.namePizza}>"{pizza}"</p>
                                            <p className={css.pricePizza}>{price * quantity} грн.</p>

                                            <div className={css.inputDeleteButtonContainer}>
                                                <div className={css.inputContainer}>
                                                    <button className={`${css.quantityButton} ${css.decrementButton}`}
                                                        //! Тест кнопоки Decrement
                                                        // onClick={handleDecrement}
                                                        //! Local variant Decrement
                                                        // onClick={() => {
                                                        //     let changeItemQuantity = item.quantity - 1;
                                                        //     if (changeItemQuantity < 1) changeItemQuantity = 1; //! МИНИМАЛЬНОЕ значение quantity
                                                        //     allChoicePizzasLocalStorage[index].quantity = changeItemQuantity;
                                                        //     localStorage.setItem("allChoicePizzas", JSON.stringify([...allChoicePizzasLocalStorage]));
                                                        //     togle();
                                                        // }}
                                                        //! New Remote variant Increment Decrement
                                                        onClick={() => { handleDecrement(index) }}
                                                    >
                                                        -
                                                    </button>
                                                    <input className={css.inputQuantity}
                                                        type="text"
                                                        name="quantity"
                                                        value={quantity}
                                                        readOnly
                                                    />
                                                    <button className={`${css.quantityButton} ${css.incrementButton}`}
                                                        //! Тест кнопки Increment
                                                        // onClick={handleIncrement}
                                                        //! Local variant Increment
                                                        // onClick={() => {
                                                        //     let changeItemQuantity = item.quantity + 1;
                                                        //     if (changeItemQuantity > 50) changeItemQuantity = 50; //! МАКСИМАЛЬНОЕ значение quantity
                                                        //     allChoicePizzasLocalStorage[index].quantity = changeItemQuantity;
                                                        //     localStorage.setItem("allChoicePizzas", JSON.stringify([...allChoicePizzasLocalStorage]));
                                                        //     togle();
                                                        // }}
                                                        //! New Remote variant Increment
                                                        onClick={() => { handleIncrement(index) }}
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                {/* //! OLD вариант инпута */}
                                                {/* <input className={css.inputQuantity}
                                                    type="number"
                                                    name="quantity"
                                                    min="1"
                                                    max="100"
                                                    defaultValue={item.quantity}
                                                    onChange={(evt) => {
                                                        console.log(evt.target.value);
                                                        togle();
                                                        allChoicePizzasLocalStorage[index].quantity = Number(evt.target.value);
                                                        localStorage.setItem("allChoicePizzas", JSON.stringify([...allChoicePizzasLocalStorage]));
                                                    }}
                                                /> */}

                                                <div
                                                    // type="button"
                                                    className={css.pizzaDeleteButton}
                                                    // onClick={() => deletePizza(index)}
                                                    onClick={() => toggleModal(index)}
                                                >
                                                    <img
                                                        className={css.trashImage}
                                                        alt={"Trash"}
                                                        src={imageTrash}
                                                        width="100%"
                                                    />
                                                    {/* Delete */}
                                                </div>
                                            </div>
                                        </div>
                            </li>
                        })}
                        {showModal && (
                            <Modal
                                onClose={toggleModal}
                                bgColor={"CartPageBgColor"}
                            >
                                <ModalPizzaLDeleteWindow
                                    deletePizzaIndex={deletePizzaIndex}
                                    toggleModal={toggleModal}
                                />
                            </Modal>
                        )}
                    </ul>
                    
                )
                :
                (
                    <div className={css.informationTextContainer}>
                        <div className={css.informationText}
                        >
                            Please, place your pizza order on the shop page make an order
                        </div>
                    </div>
                )
            }
            {allChoicePizzasLocalStorage && allChoicePizzasLocalStorage.length > 0 && (
                <div className={css.shoppingCartPriceSubmitContainer}>
                    <p className={css.totalPriceText}
                    >
                        Total price:
                        <span className={css.totalPriceNumber}> {totalPrice} грн.</span>
                    </p>
                </div>
            )}
        </>
    );
};
