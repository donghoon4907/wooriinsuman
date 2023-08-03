export type Code = {
    index: number;
    // id
    idx?: number;
    wcode: number;
    fccode: string;
    password: string;
    cent_val: string;
    indate: string | null;
    // 손해 / 생명 구분
    dist: string;
    // 회사명
    company: string;
    checked: boolean;
};