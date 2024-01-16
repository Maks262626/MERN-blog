import { configureStore } from '@reduxjs/toolkit';
import { articleRecuder } from './articles';
import { authRecuder } from './auth';
const store = configureStore({
    reducer: {
        article: articleRecuder,
        auth: authRecuder
    }
})

export default store;