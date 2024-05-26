import { useState } from "react"; 
import { useSelector } from "react-redux"; 

import { toast } from 'react-toastify';

import { selectLoadingMarkets, selectAllMarkets } from 'redux/market/marketSelectors';

import pizzaMarketsJson from "db/pizzaMarketsMongoDB.json"; //!!! 

import { HomeShopsList } from 'components/HomeShopsList/HomeShopsList';
import { HomePizzasList } from 'components/HomePizzasList/HomePizzasList';

import { Loader } from 'components/Loader/Loader.jsx';

import imageBackgroundPizza from "images/A48382B1BEBB8CBDB0-large.webp";

import css from './HomePage.module.css';


export const HomePage = () => {
    const allChoicePizzasLocalStorage = JSON.parse(localStorage.getItem("allChoicePizzas"));

    const [allPizzas, setAllPizzas] = useState([]);
    const [allChoicePizzas, setAllChoicePizzas] = useState(allChoicePizzasLocalStorage || []);
    const [shopIndex, setShopIndex] = useState(null);

    const isLoading = useSelector(selectLoadingMarkets);
    let pizzaMarkets = useSelector(selectAllMarkets);
    if (pizzaMarkets.length === 0) pizzaMarkets = [...pizzaMarketsJson];

    const selectShop = (idShop, indexShop) => {
        const [selectShopPizzas] = pizzaMarkets.filter(pizzaMarket => pizzaMarket._id === idShop);
        setAllPizzas(selectShopPizzas.pizzas);
        setShopIndex(indexShop);
    };

    const addPizzaToCart = (pizza, indexPizza) => {
        const findIndexPizza = allChoicePizzas.findIndex(item => item.pizza === pizza.pizza);
        if (findIndexPizza === -1) {
            const pizzaAndQuantity = {
            ...pizza,
            quantity: 1,
            indexShop: shopIndex,
            indexPizza
            };
            setAllChoicePizzas([...allChoicePizzas, pizzaAndQuantity]);
            localStorage.setItem("allChoicePizzas", JSON.stringify([...allChoicePizzas, pizzaAndQuantity]));
            toast.success(`Pizza "${pizza.pizza}" has been added to your cart`, { theme: "colored", position: "top-center", autoClose: 2000 });
        } else {
            allChoicePizzas.map((item, index) => {
                if (index === findIndexPizza) item.quantity = item.quantity + 1;
                return allChoicePizzas
            });
            setAllChoicePizzas([...allChoicePizzas]);
            localStorage.setItem("allChoicePizzas", JSON.stringify([...allChoicePizzas]));
            toast.info(`You have added ${allChoicePizzas[findIndexPizza].quantity} pizzas "${pizza.pizza}" to your cart!`, { theme: "colored", position: "top-center", autoClose: 2000 });
        }
    }


    // console.log("HomePage-->shopIndex:", shopIndex); //!

    return (
        <div className={css.homeContainer}>
            <div className={css.shops}>
                <>
                    {isLoading
                        ?
                        (
                            <div className={css.informationTextContainer}>
                                <div className={css.informationText}
                                >
                                    Please wait, our shops are loading...
                                    <Loader />
                                </div>
                            </div>
                        )
                        :
                        (
                            <HomeShopsList
                                selectShop={selectShop}
                                // shopIndex={shopIndex}
                            />
                        )
                    }
                </>
            </div>
            <div
                // className={css.pizzas}
                className={
                    `${allPizzas.length > 0
                        ?
                        `${css.pizzas}`
                        :
                        `${css.pizzas} ${css.pizzasOverflowHidden}`
                    }`
                }
            >
                {allPizzas.length > 0
                    ?
                    (
                        <HomePizzasList
                        allPizzas={allPizzas}
                        addPizzaToCart={addPizzaToCart}
                        shopIndex={shopIndex}
                        />
                    )
                    :
                    (
                        <div className={css.imagePizzaContainer}>
                            <img
                                className={css.imageBackgroundPizza}
                                alt={"Background Pizza"}
                                src={imageBackgroundPizza}
                                width="100%"
                            />
                        </div>
                    )
                }
            </div>
        </div>
    );
};
