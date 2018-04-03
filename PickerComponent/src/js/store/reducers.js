/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-03-29 21:19
 * @version 1.0
 * Description:
 */

import {createStore, combineReducers, applyMiddleware } from 'redux'
import { takeEvery } from 'redux-saga'
import { put } from 'redux-saga/effects'
import createSagaMiddleware from 'redux-saga'

const reducer = (state = 0, action) => {
    console.log(action.type);
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
};

function* helloSaga() {
    console.log('Hello Sagas!');
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function* incrementAsync() {
    yield delay(1000)
    yield put({ type: 'INCREMENT' })
}



function* watchIncrementAsync() {
    console.log('df');
    yield* takeEvery('INCREMENT_ASYNC', incrementAsync)
}

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

export const store = createStore(
    reducer,
    applyMiddleware(...middlewares));
sagaMiddleware.run(watchIncrementAsync);



