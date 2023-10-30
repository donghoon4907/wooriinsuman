import type { NextPage } from 'next';
import type { GeneralState } from '@reducers/general';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { wrapper } from '@store/redux';
import { permissionMiddleware } from '@utils/middleware/permission';
import generalsService from '@services/generalsService';
import { getCompaniesRequest } from '@actions/hr/get-companies';
import { findSelectOption } from '@utils/getter';
import longConstants from '@constants/options/long';
import { createUserHistory } from '@actions/common/set-user-history.action';
import { createInsured } from '@actions/contract/common/set-insured.action';
import { createPay } from '@actions/contract/long/set-pay.action';
import { getOrgasRequest } from '@actions/hr/get-orgas';
import { createContact } from '@actions/common/set-contact.action';
import { updateProduct } from '@actions/contract/common/set-product.action';
import { GeneralForm } from '@partials/contract/general/GeneralForm';
import { MyLayout } from '@components/Layout';
import { useInitCustomer, useInitTab } from '@hooks/use-initialize';

const General: NextPage<GeneralState> = ({ general }) => {
    const { genUseCompanies } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );
    // 탭 설정
    useInitTab(`일반계약상세${general.c_name ? ` - ${general.c_name}` : ''}`);
    // 계약자 설정
    useInitCustomer(general.c_idx);

    const defaultComp = findSelectOption(general.wcode, genUseCompanies);

    const defaultStatus = findSelectOption(
        general.status,
        longConstants.status,
    );

    return (
        <>
            <Head>
                <title>일반계약상세</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
            </Head>
            <MyLayout>
                <GeneralForm
                    mode="update"
                    idx={general.idx}
                    defaultUserid={general.userid}
                    defaultComp={defaultComp}
                    defaultCnum={general.cnum}
                    defaultTitle={general.title}
                    defaultContdate={general.contdate}
                    defaultBodatefrom={general.bo_datefrom}
                    defaultBodateto={general.bo_dateto}
                    defaultStatus={defaultStatus}
                    defaultSpec={general.spec}
                    defaultIsConfirm={general.confirm ? 'Y' : 'N'}
                    defaultPayment={general.payment}
                />
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    permissionMiddleware(async ({ dispatch, sagaTask }, ctx) => {
        const { query } = ctx;

        const idx = query.idx as string;

        dispatch(getOrgasRequest({}));

        dispatch(getCompaniesRequest('gen-use'));

        const output: any = {
            props: {},
        };

        try {
            dispatch(END);

            await sagaTask?.toPromise();

            const { data } = await generalsService.getGeneral({ idx });

            const general = data.data;

            output.props.general = general;

            dispatch(
                updateProduct({
                    p_code: general.p_code,
                    title: general.title,
                    spec: general.spec,
                    subcategory: null,
                    cal_spec: null,
                }),
            );

            if (general.userid_his) {
                for (let i = 0; i < general.userid_his.length; i++) {
                    dispatch(
                        createUserHistory({
                            index: i,
                            checked: false,
                            gdate: general.userid_his[i].gdate,
                            group: general.userid_his[i].group,
                            userid: general.userid_his[i].userid,
                            username: general.userid_his[i].fcname,
                        }),
                    );
                }
            }

            if (general.p_persons) {
                for (let i = 0; i < general.p_persons.length; i++) {
                    dispatch(
                        createInsured({
                            ...general.p_persons[i],
                            index: i,
                            checked: false,
                        }),
                    );
                }
            }

            if (general.pays) {
                for (let i = 0; i < general.pays.length; i++) {
                    dispatch(
                        createPay({
                            index: i,
                            checked: false,
                            idx: general.pays[i].idx,
                            paydate: general.pays[i].paydate,
                            dist: general.pays[i].dist,
                            pay: general.pays[i].pay,
                            insert_datetime: general.pays[i].insert_datetime,
                            insert_userid: general.pays[i].insert_userid,
                        }),
                    );
                }
            }

            if (general.contacts) {
                for (let i = 0; i < general.contacts.length; i++) {
                    dispatch(
                        createContact({
                            ...general.contacts[i],
                            index: i,
                            checked: false,
                        }),
                    );
                }
            }
        } catch {
            output.redirect = {
                destination: '/404',
                permanent: true, // true로 설정하면 301 상태 코드로 리다이렉션
            };
        }

        return output;
    }),
);

export default General;
