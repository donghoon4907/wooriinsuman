import { AnyAction, combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import { errorReducer } from './common/error';
import { loadingReducer } from './common/loading';
import { tabReducer } from './tab';
import { drawerReducer } from './drawer';
import { longReducer } from './long';
import { boardReducer } from './board';
import { uploadReducer } from './upload';
import { gnbReducer } from './gnb';
import { modalReducer } from './modal';
import { hrReducer } from './hr';
import { customerReducer } from './customer';
import { commonReducer } from './common';
import { contractReducer } from './contract';

const combinedReducer = combineReducers({
    tab: tabReducer,
    drawer: drawerReducer,
    long: longReducer,
    board: boardReducer,
    error: errorReducer,
    loading: loadingReducer,
    upload: uploadReducer,
    gnb: gnbReducer,
    modal: modalReducer,
    hr: hrReducer,
    customer: customerReducer,
    common: commonReducer,
    contract: contractReducer,
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
