import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import RootReducer from './reducer';
import RootSaga from './saga';

const sagaMiddleware = createSagaMiddleware({
  context: {}
});

const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(...[thunk, sagaMiddleware]))
);

sagaMiddleware.run(RootSaga);

(module as any).host?.accept();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
