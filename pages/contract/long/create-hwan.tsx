import type { NextPage } from 'next';
import type { AppState } from '@reducers/index';
import type { UserState } from '@reducers/user';
import { useSelector } from 'react-redux';
import { wrapper } from '@store/redux';
import { pageMiddleware } from '@utils/middleware/page';
import { getCompaniesRequest } from '@actions/hr/get-companies.action';
import { getOrgasRequest } from '@actions/orga/get-orgas.action';
import { MyLayout } from '@components/Layout';
import { useInitTab } from '@hooks/use-initialize';
import { getSudistsRequest } from '@actions/rule/get-sudists';
import { getMakeableRatesRequest } from '@actions/rule/get-makeable-rates';
import { getGradesRequest } from '@actions/rule/get-grades';
import { getHwansRequest } from '@actions/rule/get-hwans';
import { LongHwanForm } from '@partials/rule/long/LongHwanForm';
import { MyHelmet } from '@components/Helmet';

const CreateLongHwan: NextPage = () => {
    const { loggedInUser } = useSelector<AppState, UserState>(
        (state) => state.user,
    );
    // 탭 설정
    useInitTab('장기 환수 제도 등록');

    return (
        <>
            <MyHelmet />
            <MyLayout>
                <LongHwanForm
                    mode="create"
                    defaultUserid={loggedInUser.userid}
                />
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    pageMiddleware(async ({ dispatch }) => {
        dispatch(getOrgasRequest({}));

        dispatch(getMakeableRatesRequest());

        dispatch(getGradesRequest());

        dispatch(getHwansRequest());

        dispatch(getSudistsRequest({ spe: 'long' }));

        dispatch(getCompaniesRequest('long-use'));

        return null;
    }),
);

export default CreateLongHwan;
