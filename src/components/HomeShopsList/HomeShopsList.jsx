// import { useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";

import { selectAllMarkets, selectIsOneShop, selectShopIndex } from 'redux/market/marketSelectors';
import { togleIsOneShop, setShopIndexSelection } from 'redux/market/marketOperations';
import pizzaMarketsJson from "db/pizzaMarketsMongoDB.json"; //!!! 

import css from "./HomeShopsList.module.css";




export const HomeShopsList = ({ selectShop }) => {
    const dispatch = useDispatch();

    // const [shopIndexSelection, setShopIndexSelection] = useState(null);
    // console.log("shopIndexSelection:", shopIndexSelection); //!


    const switchIsOneShop = () => {
        // console.log("Togle isOneShop!!!"); //!
        // setValue(!value);
        dispatch(togleIsOneShop());

    };

    // console.log("HomeShopsList-->shopIndex:", shopIndex); //!

    const allChoicePizzasLocalStorage = JSON.parse(localStorage.getItem("allChoicePizzas"));
    // const conditionallChoicePizzasLocalStorage = !(!allChoicePizzasLocalStorage || !(allChoicePizzasLocalStorage.length > 0)); //! 1-й вариант
    const conditionallChoicePizzasLocalStorage = !!allChoicePizzasLocalStorage && allChoicePizzasLocalStorage.length > 0; //! 2-й вариант
    // console.log("conditionallChoicePizzasLocalStorage:", conditionallChoicePizzasLocalStorage); //!

    let pizzaMarkets = useSelector(selectAllMarkets);
    if (pizzaMarkets.length === 0) pizzaMarkets = [...pizzaMarketsJson];

    const isOneShop = useSelector(selectIsOneShop);
    // console.log("HomeShopsList-->isOneShop:", isOneShop); //!

    const shopIndexSelection = useSelector(selectShopIndex);
    // console.log("HomeShopsList-->shopIndexSelection:", shopIndexSelection); //!


    // console.log("HomeShopsList-->allChoicePizzasLocalStorage:", allChoicePizzasLocalStorage); //!


    return (
        <>
            <button
                // className={css.isOneShopButton}
                className={
                    `${isOneShop
                        ?
                        `${css.isOneShopButton}`
                        :
                        `${css.isOneShopButton} ${css.isAllShopButton}`
                    }`
                }
                type="button"
                onClick={switchIsOneShop}
                disabled={false}
            >
                {/* {isOneShop ? "Choice of pizza from ONE Shop" : "Choice of pizza from ALL Shops"} */}
                {isOneShop ? <p>Choice of pizza from <span className={css.accentShop}>ONE Shop</span></p> : <p>Choice of pizza from <span className={css.accentShop}>ALL Shops</span></p>}
            </button>

            <p className={css.headerShops}>Shops:</p>

            <ul className={css.list}>
                {pizzaMarkets.map((pizzaMarket, index) => (
                    <li
                        className={css.listItem}
                        key={pizzaMarket._id}
                    >
                        <button
                            // className={css.selectShopButton}
                            // className={
                            //     `${(shopIndexSelection === null || index === shopIndexSelection)
                            //         ?
                            //         `${css.selectShopButton}`
                            //         :
                            //         `${css.selectShopButton} ${css.selectShopButtonOpacity}`
                            //     }`
                            // }

                            // className={!conditionallChoicePizzasLocalStorage && (`${css.selectShopButton}`) conditionallChoicePizzasLocalStorage 
                            //     && (`${css.selectShopButton} ${css.selectShopButtonOpacity}`}
                            
                            // className={!conditionallChoicePizzasLocalStorage && css.selectShopButton}

                            className={
                                `
                                    ${(shopIndexSelection === null || index === shopIndexSelection)
                                        ?
                                        `${css.selectShopButton}`
                                        :
                                        `${css.selectShopButton} ${css.selectShopButtonOpacity}`
                                    }
                                    ${(
                                        isOneShop
                                        && conditionallChoicePizzasLocalStorage 
                                        // && !(allChoicePizzasLocalStorage[0].shopIndex === index)
                                        && !(shopIndexSelection === index)
                                        // && !(shopIndexSelection === null || index === shopIndexSelection)
                                        )
                                        ?
                                        `${css.selectShopButton} ${css.selectOnlyOneShopButtonOpacity}`
                                        :
                                        ``
                                    }
                                `
                            }
                            type="button"
                            onClick={() => {
                                selectShop(pizzaMarket._id, index);
                                // setShopIndexSelection(index);
                                dispatch(setShopIndexSelection(index));
                                // console.log("index:", index); //!
                            }}
                            // disabled={!(shopIndexSelection === null || index === shopIndexSelection)}
                            // disabled={conditionallChoicePizzasLocalStorage}
                            disabled={
                                isOneShop
                                && conditionallChoicePizzasLocalStorage 
                                // && !(allChoicePizzasLocalStorage[0].shopIndex === index)
                                && !(shopIndexSelection === index) 
                                // && !(shopIndexSelection === null || index === shopIndexSelection)
                            }
                        >
                            {pizzaMarket.shop}
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
};
