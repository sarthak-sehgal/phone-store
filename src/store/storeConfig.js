import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

const initialState = {
};
const enhancers = [];
const middleware = [thunk];

if (process.env.NODE_ENV === "development") {
  console.log("Development build");
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
} else {
  console.log("Production build");
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
