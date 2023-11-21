import type { NextPage } from 'next';
import type { AppState } from '@reducers/index';
import type { UserState } from '@reducers/user';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { CustomerForm } from '@partials/customer/CustomerForm';
import { wrapper } from '@store/redux';
import { permissionMiddleware } from '@utils/middleware/permission';
import { getOrgasRequest } from '@actions/hr/orga/get-orgas.action';
import { getUsersRequest } from '@actions/hr/user/get-users.action';
import { getCompaniesRequest } from '@actions/hr/common/get-companies.action';
import { MyLayout } from '@components/Layout';
import { useInitTab } from '@hooks/use-initialize';

const CreateCustomer: NextPage = () => {
    const { loggedInUser } = useSelector<AppState, UserState>(
        (state) => state.user,
    );

    // 탭 설정
    useInitTab('고객등록');

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
                <CustomerForm
                    mode="create"
                    spe="customer"
                    defaultUserid={loggedInUser.userid}
                    defaultOrganize={`${loggedInUser.user_info.orga} ${loggedInUser.user_info.name}`}
                />
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    permissionMiddleware(async ({ dispatch, sagaTask }) => {
        dispatch(getOrgasRequest({}));

        dispatch(getCompaniesRequest('long-view'));

        dispatch(getCompaniesRequest('car-view'));

        dispatch(getCompaniesRequest('gen-view'));

        dispatch(
            getUsersRequest({
                idx: '1',
            }),
        );

        dispatch(END);

        await sagaTask?.toPromise();

        return null;
    }),
);

export default CreateCustomer;
