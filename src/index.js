import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// styles
import "./styles/main.scss";
// router dom
import { BrowserRouter } from 'react-router-dom';
// redux_toolkit
import store from "./redux/store/store"
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter >
        <Provider store={store}>
            <App />
        </Provider>

    </BrowserRouter>


);



