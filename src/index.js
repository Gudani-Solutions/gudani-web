import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import rootReducer from './store/reducers'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import '../node_modules/fullcalendar/dist/fullcalendar.min.js';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from "redux-persist"
import { PersistGate } from 'redux-persist/lib/integration/react'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage: storage,
};

const middleware = applyMiddleware(thunkMiddleware)
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, middleware);
const persistor = persistStore(store);

const app = (
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
);


ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
