import type { Action } from 'redux';
import type { CorePayload, CorePaginateSuccessPayload } from '@interfaces/core';

export const GET_BASIC_PAYMENTS_KEY = 'GET_BASIC_PAYMENTS';

export const GetBasicPaymentsActionTypes = {
    REQUEST: `${GET_BASIC_PAYMENTS_KEY}_REQUEST`,
    SUCCESS: `${GET_BASIC_PAYMENTS_KEY}_SUCCESS`,
    FAILURE: `${GET_BASIC_PAYMENTS_KEY}_FAILURE`,
} as const;

export interface GetBasicPaymentsRequestPayload extends CorePayload {
    searchKeyword?: string;
    order?: string;
}

export interface GetBasicPaymentsSuccessPayload
    extends CorePaginateSuccessPayload<GetBasicPaymentsRequestPayload> {}

export interface GetBasicPaymentsRequestAction extends Action<string> {
    payload: GetBasicPaymentsRequestPayload;
}

export interface GetBasicPaymentsSuccessAction extends Action<string> {
    payload: GetBasicPaymentsSuccessPayload;
}

export function getBasicPaymentsRequest(
    payload: GetBasicPaymentsRequestPayload,
): GetBasicPaymentsRequestAction {
    return {
        type: GetBasicPaymentsActionTypes.REQUEST,
        payload,
    };
}

export function getBasicPaymentsSuccess(
    payload: GetBasicPaymentsSuccessPayload,
): GetBasicPaymentsSuccessAction {
    return {
        type: GetBasicPaymentsActionTypes.SUCCESS,
        payload,
    };
}