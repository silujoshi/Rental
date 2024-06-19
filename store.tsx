import { combineReducers, configureStore } from '@reduxjs/toolkit'
import progressReducer from "./slices/progressBarSlice"
import payPopReducer from "./slices/payPopSlice"
import storage from 'redux-persist/lib/storage'
// import {persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER } from 'redux-persist'


// const persistConfig={
//   key:"counter",
//   storage
// }
const reducers=combineReducers({progressBar:progressReducer,payPop:payPopReducer})
// const persistenceReducer=persistReducer(persistConfig,reducers)
export const store = configureStore({
  reducer: {
    progressBar:progressReducer,
    payPop:payPopReducer
  },
})
// export const store = configureStore({
//   reducer:persistenceReducer
//   ,
//   middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:
    
// {
//   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,'payPop/saveFiles'],
// }
//   })
// })


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch