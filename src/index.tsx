import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reduxThunk from 'redux-thunk'
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import reducers from 'ducks/reducers'

const store = createStore(reducers)

// uncomment this to use Redux Dev Tools in the browser.
// const store = createStore(reducers, composeWithDevTools(applyMiddleware(reduxThunk)))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
