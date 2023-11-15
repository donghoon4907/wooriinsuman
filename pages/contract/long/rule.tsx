import type { NextPage } from 'next';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { wrapper } from '@store/redux';
import { permissionMiddleware } from '@utils/middleware/permission';
import { getCompaniesRequest } from '@actions/hr/get-companies';
import { getOrgasRequest } from '@actions/hr/get-orgas';
import { findSelectOption } from '@utils/getter';
import { MyLayout } from '@components/Layout';
import { useInitTab } from '@hooks/use-initialize';
import { LongRuleForm } from '@partials/contract/long/LongRuleForm';

const LongRule: NextPage = () => {
    const { loggedInUser, orgas } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    // 탭 설정
    useInitTab('장기 환수 제도');

    const defaultOrga = findSelectOption(
        loggedInUser.user_info.orga_idx,
        orgas,
    );

    return (
        <>
            <Head>
                <title>우리인슈맨라이프</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
            </Head>
            <MyLayout>
                <LongRuleForm
                    mode="create"
                    defaultUserid={loggedInUser.userid}
                    defaultOrga={defaultOrga}
                />
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    permissionMiddleware(async ({ dispatch, sagaTask }) => {
        dispatch(getOrgasRequest({}));

        dispatch(getCompaniesRequest('long-use'));

        dispatch(END);

        await sagaTask?.toPromise();

        return null;
    }),
);

export default LongRule;