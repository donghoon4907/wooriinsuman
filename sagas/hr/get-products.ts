import { GetProductsRequestAction } from '@actions/hr/common/get-products.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import hrsService from '@services/hrsService';
import { commonMiddleware } from '@utils/generators/common';
import {
    GetProductsActionTypes,
    getProductsSuccess,
} from '@actions/hr/common/get-products.action';

function* getProductsSaga({ payload }: GetProductsRequestAction) {
    const { callback, ...rest } = payload;

    const { data } = yield call(hrsService.beforeGetProducts, rest);

    yield put(
        getProductsSuccess({
            data,
            wcode: payload.wcode,
        }),
    );

    return data;
}

export function* watchGetProducts() {
    yield takeEvery(
        GetProductsActionTypes.REQUEST,
        commonMiddleware(getProductsSaga),
    );
}
