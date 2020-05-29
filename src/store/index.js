import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

const persistConfig = {
    key: "authType",
    storage: storage,
    whitelist: ["user"],
};
const pReducer = persistReducer(persistConfig, rootReducer);
const middleware = applyMiddleware(thunk);

export const store = createStore(pReducer, composeWithDevTools(middleware));
export const persistor = persistStore(store);
