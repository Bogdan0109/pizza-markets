import { useNavigate } from "react-router-dom";

import css from './CartCustomerDataForm.module.css';




export const CartCustomerDataForm = () => {
    const navigate = useNavigate();

    let customerDataLocalStorage = JSON.parse(localStorage.getItem("customerData"));
    const allChoicePizzasLocalStorage = JSON.parse(localStorage.getItem("allChoicePizzas"));

    if (!customerDataLocalStorage) {
        const customerData = {
            name: "",
            email: "",
            phone: "",
            address: "",
        };
        localStorage.setItem("customerData", JSON.stringify(customerData));
        customerDataLocalStorage = JSON.parse(localStorage.getItem("customerData"));
    };

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;
        const customerData = {
            name: form.elements.name.value,
            email: form.elements.email.value,
            phone: form.elements.phone.value,
            address: form.elements.address.value,
        };
        localStorage.setItem("customerData", JSON.stringify(customerData));
        form.reset();
        navigate("/history", { replace: true });
    };

    // console.log("allChoicePizzasLocalStorage:", allChoicePizzasLocalStorage); //!
    // console.log("allChoicePizzasLocalStorage.length:", allChoicePizzasLocalStorage.length); //!

    return (
        <>
            <form
                autoComplete="on"
                className={css.form}
                onSubmit={handleSubmit}
            >
                <label className={css.label}>
                    Name:
                    <input
                        className={css.input}
                        type="text"
                        name="name"
                        required
                        placeholder={customerDataLocalStorage.name ? customerDataLocalStorage.name : "Input you Name"}
                        defaultValue={customerDataLocalStorage.name}
                    />
                </label>
                <label className={css.label}>
                    Email:
                    <input
                        className={css.input}
                        type="email"
                        name="email"
                        required
                        placeholder={customerDataLocalStorage.email ? customerDataLocalStorage.email : "Input you Email"}
                        defaultValue={customerDataLocalStorage.email}
                    />
                </label>
                <label className={css.label}>
                    Phone:
                    <input
                        className={css.input}
                        type="text"
                        name="phone"
                        required
                        placeholder={customerDataLocalStorage.phone ? customerDataLocalStorage.phone : "Input you Phone"}
                        defaultValue={customerDataLocalStorage.phone}
                    />
                </label>
                <label className={css.label}>
                    Address:
                    <input
                        className={css.input}
                        type="text"
                        name="address"
                        required
                        placeholder={customerDataLocalStorage.address ? customerDataLocalStorage.address : "Input you Address"}
                        defaultValue={customerDataLocalStorage.address}
                    />
                </label>
                <button
                    className={
                        `${allChoicePizzasLocalStorage && allChoicePizzasLocalStorage.length > 0
                            ?
                            `${css.submitButtonForm}`
                            :
                            `${css.submitButtonForm} ${css.submitButtonFormOpacity}`
                        }
                        `
                    }
                    type="submit"
                    disabled={!allChoicePizzasLocalStorage || !(allChoicePizzasLocalStorage.length > 0)}
                >
                    Submit
                </button>
            </form>
        </>
    );
};
