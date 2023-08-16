import type { UpdateCustomerRequestAction } from '@actions/customer/update-customer.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import customersService from '@services/customersService';
import { commonMiddleware } from '@utils/generators/common';
import {
    UpdateCustomerActionTypes,
    updateCustomerSuccess,
} from '@actions/customer/update-customer.action';

function* updateCustomerSaga({ payload }: UpdateCustomerRequestAction) {
    const { data } = yield call(customersService.updateCustomer, payload);

    const { Message } = data;

    if (Message !== 'Success') {
        alert(Message);
    }

    yield put(updateCustomerSuccess());

    return data;
}

export function* watchUpdateCustomer() {
    yield takeEvery(
        UpdateCustomerActionTypes.REQUEST,
        commonMiddleware(updateCustomerSaga),
    );
}
