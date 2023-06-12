import { AnyAction, combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import error from '@reducers/common/error';
import loading from '@reducers/common/loading';
import { demoReducer } from '@reducers/demo';

const combinedReducer = combineReducers({
    demo: demoReducer,
    error,
    loading,
});

export const rootReducer = (state: any, action: AnyAction) => {
    let nextState;
    if (action.type === HYDRATE) {
        nextState = {
            ...state,
            ...action.payload,
        };
    } else {
        nextState = combinedReducer(state, action);
    }

    return nextState;
};

export type AppState = ReturnType<typeof rootReducer>;