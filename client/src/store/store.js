import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import productsReducer from '../redux/reducers/products';
import reviewsReducer from '../redux/reducers/reviews';
import errorReducer from '../redux/reducers/error';
import authenticateUserReducer from '../redux/reducers/authenticate';
import shoppingCartReducer from '../redux/reducers/shoppingCart';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const persistConfig = {
    key: 'shoppingCart',
    storage: storage,
    whitelist: ['shoppingCart'], // which reducer want to store
    stateReconciler: autoMergeLevel2
};

const topLevelReducer = combineReducers({
    products: productsReducer,
    reviews: reviewsReducer,
    error: errorReducer,
    user: authenticateUserReducer,
    shoppingCart: shoppingCartReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const pReducer = persistReducer(persistConfig, topLevelReducer);
const store = createStore(pReducer, composeEnhancers(applyMiddleware(thunk)));
const persistor = persistStore(store, null);


export default { store, persistor };
