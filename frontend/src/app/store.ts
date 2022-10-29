import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit'
import CounterSlice from "features/counter/counterSlice";

export const store = configureStore({
    reducer: {
        counter: CounterSlice
    },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
