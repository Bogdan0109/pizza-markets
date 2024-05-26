import { CartCustomerDataForm } from 'components/CartCustomerDataForm/CartCustomerDataForm';
import { CartOrderList } from 'components/CartOrderList/CartOrderList';

import css from './CartPage.module.css';


export const CartPage = () => {
    return (
        <div className={css.cartContainer}>
            <div className={css.сustomerDataForm}>
                <CartCustomerDataForm />
            </div>
            <div className={css.customerOrder}>
                <CartOrderList />
            </div>
        </div>
    );
};
