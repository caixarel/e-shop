import { compose, createStore, applyMiddleWare } from "redux";
import logger from 'redux-logger'

import { rootReducer } from "./root-reducer";

const middleWares = [ logger];

export const store = createStore(rootReducer, undefined, middleWares)
