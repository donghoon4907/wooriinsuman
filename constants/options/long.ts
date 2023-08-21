import type { CoreSelectOption } from '@interfaces/core';

// 납입주기
const L_PAYCYCLE: CoreSelectOption[] = [
    {
        label: '월납',
        value: '월납',
        isFixed: false,
    },
    {
        label: '3월납',
        value: '3월납',
        isFixed: false,
    },
    {
        label: '6월납',
        value: '6월납',
        isFixed: false,
    },
    {
        label: '연납',
        value: '연납',
        isFixed: false,
    },
    {
        label: '일시납',
        value: '일시납',
        isFixed: false,
    },
];
// 납입기간
const L_PAYDU: CoreSelectOption[] = [
    {
        label: '1년',
        value: '1',
        isFixed: false,
    },
    {
        label: '5년',
        value: '5',
        isFixed: false,
    },
    {
        label: '10년',
        value: '10',
        isFixed: false,
    },
    {
        label: '20년',
        value: '20',
        isFixed: false,
    },
    {
        label: '30년',
        value: '30',
        isFixed: false,
    },
    {
        label: '종신',
        value: '종신',
        isFixed: false,
    },
];

// 계약 상태
export const L_STATUS: CoreSelectOption[] = [
    {
        label: '정상유지',
        value: '정상유지',
        isFixed: false,
    },
    {
        label: '계약철회',
        value: '계약철회',
        isFixed: false,
    },
    {
        label: '품보해지',
        value: '품보해지',
        isFixed: false,
    },
    {
        label: '민원해지',
        value: '민원해지',
        isFixed: false,
    },
    {
        label: '임의해지',
        value: '임의해지',
        isFixed: false,
    },
    {
        label: '미납실효',
        value: '미납실효',
        isFixed: false,
    },
    {
        label: '보장종료',
        value: '보장종료',
        isFixed: false,
    },
    {
        label: '계약종료',
        value: '계약종료',
        isFixed: false,
    },
    {
        label: '타사이관',
        value: '타사이관',
        isFixed: false,
    },
];

// 수금 상태
export const L_PSTATUS: CoreSelectOption[] = [
    {
        label: '납입중',
        value: '납입중',
        isFixed: false,
    },
    {
        label: '납입유예',
        value: '납입유예',
        isFixed: false,
    },
    {
        label: '납입면제',
        value: '납입면제',
        isFixed: false,
    },
    {
        label: '납입완료',
        value: '납입완료',
        isFixed: false,
    },
    {
        label: '임의해지',
        value: '임의해지',
        isFixed: false,
    },
    {
        label: '미납실효',
        value: '미납실효',
        isFixed: false,
    },
    {
        label: '보장종료',
        value: '보장종료',
        isFixed: false,
    },
    {
        label: '계약종료',
        value: '계약종료',
        isFixed: false,
    },
    {
        label: '타사이관',
        value: '타사이관',
        isFixed: false,
    },
];

// 납입구분
export const L_PDIST: CoreSelectOption[] = [
    {
        label: '신규',
        value: '신규',
        isFixed: false,
    },
    {
        label: '계속',
        value: '계속',
        isFixed: false,
    },
    {
        label: '계속취소',
        value: '계속취소',
        isFixed: false,
    },
    {
        label: '철회',
        value: '철회',
        isFixed: false,
    },
    {
        label: '취소',
        value: '취소',
        isFixed: false,
    },
    {
        label: '추징',
        value: '추징',
        isFixed: false,
    },
    {
        label: '환급',
        value: '환급',
        isFixed: false,
    },
];

// 배서구분
export const L_EDIST: CoreSelectOption[] = [
    {
        label: '실효',
        value: '실효',
        isFixed: false,
    },
    {
        label: '해지',
        value: '해지',
        isFixed: false,
    },
    {
        label: '감액',
        value: '감액',
        isFixed: false,
    },
    {
        label: '부활',
        value: '부활',
        isFixed: false,
    },
];

// 금종
export const L_PAYKIND: CoreSelectOption[] = [
    {
        label: '카드',
        value: '카드',
        isFixed: false,
    },
    {
        label: '현금',
        value: '현금',
        isFixed: false,
    },
];

const rootSelectOptions = {
    payCycle: L_PAYCYCLE,
    payDu: L_PAYDU,
    status: L_STATUS,
    pStatus: L_PSTATUS,
    pDist: L_PDIST,
    eDist: L_EDIST,
    payKind: L_PAYKIND,
};

export default rootSelectOptions;