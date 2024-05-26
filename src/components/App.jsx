import { useEffect } from 'react';
import { useDispatch } from 'react-redux'; //!!!
import {
  Route,
  Routes,
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getAllMarkets } from 'redux/market/marketOperations'; //!!!

import { SharedLayout } from 'components/SharedLayout/SharedLayout';
import { NotFoundPage } from "page/NotFoundPage/NotFoundPage";
import { HomePage } from 'page/HomePage/HomePage';
import { CartPage } from 'page/CartPage/CartPage';
import { HistoryPage } from 'page/HistoryPage/HistoryPage';
import { OrderCompletionPage } from 'page/OrderCompletionPage/OrderCompletionPage';


export const App = () => {
  const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllMarkets());
    }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<SharedLayout />} >
          <Route index element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} ></Route>
          <Route path="/history" element={<HistoryPage />} ></Route>
          <Route path="/order" element={<OrderCompletionPage/>} ></Route>
        </Route> 
      </Routes>
      <ToastContainer />  
  </>
  );
};
