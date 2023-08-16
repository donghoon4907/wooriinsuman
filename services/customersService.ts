import type { CreateCustomerRequestPayload } from '@actions/customer/create-customer.action';
import type { GetCustomerRequestPayload } from '@actions/customer/get-customer';
import type { UpdateCustomerRequestPayload } from '@actions/customer/update-customer.action';
import { getBackendAxios } from '@utils/axios/backend';

export function createCustomer(payload: CreateCustomerRequestPayload) {
    return getBackendAxios().post('/customer/new', payload);
}

export function updateCustomer(payload: UpdateCustomerRequestPayload) {
    return getBackendAxios().post('/customer/update', payload);
}

export function getCustomer(payload: GetCustomerRequestPayload) {
    return getBackendAxios().get(`/customer/detail/${payload.idx}`);
}

const rootServices = {
    createCustomer,
    getCustomer,
    updateCustomer,
};

export default rootServices;
