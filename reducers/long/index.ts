import type { Reducer } from 'redux';
import type { Pay } from '@models/pay';
import type { Endorsement } from '@models/endorsement';
import type { GetLongsSuccessPayload } from '@actions/long/get-longs.action';
import produce from 'immer';
import { GetLongsActionTypes } from '@actions/long/get-longs.action';
import { GetLongActionTypes } from '@actions/long/get-long.action';
// import { LongEtcUpdateActionTypes } from '@actions/long/set-long-etc.action';
import { PayActionTypes } from '@actions/long/set-pay.action';
import { EndorsementActionTypes } from '@actions/long/set-endorsement.action';

export interface LongState {
    /**
     * 장기계약 목록
     */
    longs: GetLongsSuccessPayload;
    /**
     * 장기계약 상세
     */
    long: any;
    /**
     * 납입실적 목록
     */
    pays: Pay[];
    /**
     * 삭제한 납입실적 목록
     */
    removedPays: Pay[];
    /**
     * 배서 목록
     */
    endorsements: Endorsement[];
    /**
     * 삭제한 배서 목록
     */
    removedEndorsements: Endorsement[];
}

const initialState: LongState = {
    longs: {
        fields: [],
        rows: [],
        total: null,
        ptitles: [],
        lastPayload: null,
    },
    long: null,
    // etcs: [],
    pays: [],
    removedPays: [],
    endorsements: [
        {
            index: 0,
            checked: false,
            idx: 3102,
            dist: '해지',
            paydate: '2023-06-14',
            gdate: '2023-06-01',
            whoi: 1,
            pay_before: 78000,
            pay_after: 78000,
            tp_before: 78000,
            tp_after: 78000,
            balance: 78000,
            confirm: 'Y',
            insert: 'system 2023-07-04 17:46',
        },
    ],
    removedEndorsements: [],
};

export const longReducer: Reducer<LongState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case GetLongsActionTypes.SUCCESS: {
                draft.longs = action.payload;

                break;
            }
            case GetLongActionTypes.SUCCESS: {
                draft.long = action.payload;

                break;
            }
            // case LongEtcUpdateActionTypes.UPDATE: {
            //     draft.long.etcs[action.payload.field] = action.payload.content;

            //     break;
            // }
            case PayActionTypes.CREATE: {
                draft.pays = draft.pays.concat(action.payload);
                break;
            }
            case PayActionTypes.UPDATE: {
                const { index, ...rest } = action.payload;

                for (let i = 0; i < draft.pays.length; i++) {
                    if (draft.pays[i].index === index) {
                        draft.pays[i] = {
                            ...draft.pays[i],
                            ...rest,
                        };

                        break;
                    }
                }

                break;
            }
            case PayActionTypes.DELETE: {
                const findIndex = draft.pays.findIndex(
                    (v) => v.index === action.payload.index,
                );

                if (findIndex !== -1) {
                    const [deleted] = draft.pays.splice(findIndex, 1);

                    if (deleted.idx) {
                        draft.removedPays = draft.removedPays.concat(deleted);
                    }
                }

                break;
            }
            case EndorsementActionTypes.CREATE: {
                draft.endorsements = draft.endorsements.concat(action.payload);
                break;
            }
            case EndorsementActionTypes.UPDATE: {
                const { index, ...rest } = action.payload;

                for (let i = 0; i < draft.endorsements.length; i++) {
                    if (draft.endorsements[i].index === index) {
                        draft.endorsements[i] = {
                            ...draft.endorsements[i],
                            ...rest,
                        };

                        break;
                    }
                }

                break;
            }
            case EndorsementActionTypes.DELETE: {
                const findIndex = draft.endorsements.findIndex(
                    (v) => v.index === action.payload.index,
                );

                if (findIndex !== -1) {
                    const [deleted] = draft.endorsements.splice(findIndex, 1);

                    if (deleted.idx) {
                        draft.removedEndorsements =
                            draft.removedEndorsements.concat(deleted);
                    }
                }

                break;
            }

            default:
                return state;
        }
    });
