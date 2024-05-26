import { useState, useEffect } from 'react';

import pictureDefault from '../../images/free-icon-pizza-512-7467230.png'; //!!!
import pictureDefault1 from '../../images/PizzasImages/05-05.PizzaHouse_Americano.webp'; //!-----------------------

import pizzaMarketsJson from 'db/pizzaMarketsMongoDB.json'; //!!!

//! Модальное окно
import { Modal } from 'components/Modal/Modal';

import css from './HomePizzasList.module.css';

export const HomePizzasList = ({ allPizzas, addPizzaToCart, shopIndex }) => {
  // console.log("pizzaMarketsJson:", pizzaMarketsJson); //!

  // const imgRelativeURL = pizzaMarketsJson[shopIndex].pizzas[1].defaultImageURL
  // console.log("imgRelativeURL:", imgRelativeURL); //!

  // const defaultImageBase64Json = pizzaMarketsJson[shopIndex].pizzas[1].defaultImage
  // console.log("defaultImageBase64Json:", defaultImageBase64Json); //!

  //todo Not Work
  // const imgSrc = `https://github.com/Ruslan379/pizza-markets-development/blob/main/src/images/PizzasImages/${imgRelativeURL}`;
  // const imgSrc = `https://github.com/Ruslan379/pizza-markets-development/blob/main/src/images/${imgRelativeURL}`;
  // console.log("imgSrc:", imgSrc); //!

  //todo Not Work = Delete
  // const publicURL = process.env.REACT_APP_PUBLIC_URL;
  // console.log("publicURL:", publicURL); //!

  // const imagePath = process.env.REACT_APP_PUBLIC_URL + 'images/PizzasImages/01-01.PizzaMexico_VremenaGoda.png';
  // console.log("imagePath:", imagePath); //!

  //!----------------------------- Преобразование defaultImage в Base64: ----------------------------
  const [defaultImageBase64, setDefaultImageBase64] = useState('');

  useEffect(() => {
    const loadImage = async () => {
      try {
        const response = await fetch(pictureDefault1);
        // const response = await fetch("../../images/PizzasImages/01-01.PizzaMexico_VremenaGoda.png"); //! так не работает
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setDefaultImageBase64(reader.result);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.log('Error loading image:', error);
      }
    };
    loadImage();
  }, []);

  const jsonFile = {
    imageDef: defaultImageBase64,
  };
  // console.log("jsonFile.imageDef:", jsonFile.imageDef); //!
  //!__________________________ Преобразование defaultImage в Base64: __________________________

  //! Модальное окно + большая картинка
  const [pizzaURL, setPizzaURL] = useState('');
  const [showModal, setShowModal] = useState(false);
  const toggleModal = index => {
    setShowModal(!showModal);
    // if (index !== null || index !== undefined) setDeletePizzaIndex(index);
  };

  //! Кликаем в картинку, ищем её URL(event.target.src), откываем МОДАЛКУ с картинкой
  const handleBackdropClick = event => {
    if (event.target.src) {
      toggleModal();
      // console.log("event.target.src:", event.target.src); //!
      setPizzaURL(event.target.src);
      // const i = hits.findIndex(hit => hit.webformatURL === event.target.src)
      // setLargeURL(hits[i].largeImageURL);
    } else return;
  };

  return (
    <ul className={css.list}>
      {/* {allPizzas.map((item, index) => ( */}
      {allPizzas.map(({ pizza, picture = pictureDefault, price }, index) => {
        // console.log("picture:", picture); //!
        const defaultImageBase64Json =
          pizzaMarketsJson[shopIndex].pizzas[index].defaultImage;
        return (
          <li
            className={css.listItem}
            // key={item.pizza}
            key={pizza}
            onClick={handleBackdropClick}
            // onClick={() => handleBackdropClick(index)}
          >
            <img
              className={css.imagePizza}
              alt={'Pizza'}
              //* Рабочий вариант 1:
              // src={picture || jsonFile.imageDef}
              //* ОКОНЧАТЕЛЬНЫЙ Рабочий вариант 2:
              src={picture || defaultImageBase64Json}
              width="100%"
            />
            <p className={css.namePizza}>
              {/* "{item.pizza}" */}"{pizza}"
              <span className={css.pricePizza}>
                {/* {item.price} грн. */}
                {price} грн.
              </span>
            </p>
            <button
              className={css.selectPizzaButton}
              type="button"
              onClick={() => addPizzaToCart(allPizzas[index], index)}
            >
              add to Cart
            </button>
          </li>
        );
      })}
      {showModal && (
        <Modal onClose={toggleModal} bgColor={'HomePageBgColor'}>
          <img alt="" src={pizzaURL} width="100%" />
        </Modal>
      )}
    </ul>
  );
};
