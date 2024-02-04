import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import Signup, { INITIALSTATE } from './Slice/signupSlice';
import ClientReducer, { Client_INITIALSTATE } from './Slice/Client/clientSlice'

const persistConfig = {
  key: 'root',
  storage,
  // Specify the key for the 'client' slice in your state
  keyPrefix: 'client',
};

const persistedReducer = persistReducer(persistConfig, Signup);
const persistedClient = persistReducer(persistConfig, ClientReducer);
const store = configureStore({
  reducer: {
    signup: persistedReducer,
    client: persistedClient,
  },
});

export const persistor = persistStore(store)

export default store

export type ROOTSTORE = {
  signup: INITIALSTATE,
  client: Client_INITIALSTATE
} 