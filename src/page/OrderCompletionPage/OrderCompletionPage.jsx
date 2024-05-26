import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";

import { selectAllOrders, selectLastOrderNumber } from 'redux/orders/ordersSelectors';

import css from './OrderCompletionPage.module.css';



export const OrderCompletionPage = () => {
    let lastOrder = null

    const allOrders = useSelector(selectAllOrders);
    const lastOrderNumber = useSelector(selectLastOrderNumber);

    const findLastOrder = lastOrderNumber => {
        [lastOrder] = allOrders.filter(item => item._id === lastOrderNumber);
    };
    findLastOrder(lastOrderNumber);

    
    return (
        <div className={css.orderCompletionContainer}>
            <div className={css.textContainer}>
                <p className={css.header}
                >Thank you,
                    <span className={`${css.header} ${css.headerData}`}> {lastOrder ? lastOrder.name : "Сustomer"}</span>
                    !
                </p>
                <p className={css.header}>Your order №:
                    <span className={`${css.header} ${css.headerData}`}> {lastOrderNumber ? lastOrderNumber : "number"} </span>
                    has been accepted and will be delivered to you at:
                    <br />
                    <span className={`${css.header} ${css.headerData}`}>{lastOrder ? lastOrder.address : "address" }</span>
                </p>
            </div>
            <NavLink className={css.linkButton} to="/">Go Shop</NavLink>
        </div>
    );
};
