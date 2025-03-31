import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import cartReducer from './cartSlice';  // Import your reducers

// Persist Config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// Combine Reducers
const rootReducer = combineReducers({
  cart: persistReducer(persistConfig, cartReducer),  // Persist the cart data
});

// Create Store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Needed for Redux Persist
    }),
});

// Persistor
const persistor = persistStore(store);

export { store, persistor };
