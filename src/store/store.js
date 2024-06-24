import {configureStore} from '@reduxjs/toolkit'
import userDataSlice from './reducers/userDataSlice';

const store = configureStore({
    reducer:{
        userDataSlice:userDataSlice
    }
})

export default store;