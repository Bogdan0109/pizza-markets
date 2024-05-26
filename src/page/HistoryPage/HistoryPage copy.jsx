import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'; //!!!

import { addOrder } from 'redux/orders/ordersOperations';
import { selectLoading } from 'redux/orders/ordersSelectors';

import { Loader } from 'components/Loader/Loader.jsx';

import css from './HistoryPage.module.css';



export const HistoryPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(selectLoading);

    const customerDataLocalStorage = JSON.parse(localStorage.getItem("customerData"));
    const allChoicePizzasLocalStorage = JSON.parse(localStorage.getItem("allChoicePizzas"));

    //! Добавление заказа в БД
    const completionOfTheOrder = async (totalPrice) => {
        const confirmedOrder = {
            ...customerDataLocalStorage,
            order: allChoicePizzasLocalStorage,
            total: totalPrice
        };
        await dispatch(addOrder(confirmedOrder));
        //! Очистка localStorage
        localStorage.removeItem("customerData");
        localStorage.removeItem("allChoicePizzas");
        await navigate("/order", { replace: true });
    }


    //! Подсчет общей суммы
    let totalPrice = 0;
    let totalPizzas = 0;
    if (allChoicePizzasLocalStorage) {
        totalPizzas = allChoicePizzasLocalStorage.reduce((total, item) => {
            total = total + item.quantity;
            return total;
        }, 0);
        totalPrice = allChoicePizzasLocalStorage.reduce((total, item) => {
            total = total + item.price * item.quantity;
            return total;
        }, 0);
    };




    return (
        <div className={css.orderHistoryContainer}>
            {isLoading
                ?
                <Loader
                    textOne={"Please wait..."}
                    textTwo={"Your order is being processed."}
                />
                :
                <>
                    <div className={css.historyData}>
                        {(customerDataLocalStorage && customerDataLocalStorage.name)
                            ?
                            (
                                <>
                                    <p className={css.header}>You Data:</p>
                                    {/* <br /> */}
                                    <p className={css.textKey}>You Name: <span className={css.textValue}>{customerDataLocalStorage.name}</span></p>
                                    <p className={css.textKey}>You Email: <span className={css.textValue}>{customerDataLocalStorage.email}</span></p>
                                    <p className={css.textKey}>You Phone: <span className={css.textValue}>{customerDataLocalStorage.phone}</span></p>
                                    <p className={css.textKey}>You Address: <span className={css.textValue}>{customerDataLocalStorage.address}</span></p>
                                </>
                            )
                            :
                            (
                                <div className={css.informationTextContainer}>
                                    <div className={css.informationText}
                                    >
                                        Please enter your information
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className={css.historyOrder}>
                        {allChoicePizzasLocalStorage && allChoicePizzasLocalStorage.length > 0
                            ?
                            (
                                <>
                                    <p className={css.header}>You Order:</p>
                                    {/* <br /> */}
                                    <p className={css.textKey}>Pizza varieties: <span className={css.textValue}>{allChoicePizzasLocalStorage ? allChoicePizzasLocalStorage.length : 0}</span></p>
                                    <p className={css.textKey}>Total pizzas: <span className={css.textValue}>{totalPizzas}</span></p>
                                    <p className={css.textKey}>TOTAL: <span className={css.textValue}>{totalPrice} грн.</span></p>
                                </>
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
                    </div>
                    <div className={css.buttonContainer}>
                        <NavLink className={css.linkButton} to="/cart">Change</NavLink>
                        {customerDataLocalStorage &&
                            customerDataLocalStorage.name &&
                            allChoicePizzasLocalStorage &&
                            allChoicePizzasLocalStorage.length > 0 && (
                            <button
                                className={`${css.linkButton} ${css.linkButtonConfirm}`}
                                type="button"
                                onClick={() => completionOfTheOrder(totalPrice)}
                            >
                                Сonfirm
                            </button>
                        )}
                    </div>
                </>
            }
        </div>
    );
};
