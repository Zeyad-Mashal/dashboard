import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import authReducer from './slices/auth';
import messageReducer from './slices/message';

const reducer = {
    auth: authReducer,
    message: messageReducer
  }

  export const store = configureStore({
    reducer: reducer,
    devTools: true,
  })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types
// useAppDispatch instead of useDispatch in your component.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//export default store;