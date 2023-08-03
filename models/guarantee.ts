export type Guarantee = {
    // 순서
    index: number;
    // id
    idx?: number;
    kind: string;
    g_money?: number;
    remark?: string;
    sdate?: string;
    edate?: string;
    redate?: string;
    agency_com?: string;
    accumulate_goal?: number;
    accumulate_status?: string;
    accumulate_type?: number;
    accumulate_rate?: number;
    checked: boolean;
    available: boolean;
};