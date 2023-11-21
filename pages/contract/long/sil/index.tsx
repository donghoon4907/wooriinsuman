import type { NextPage } from 'next';
import type { AppState } from '@reducers/index';
import type { LongState } from '@reducers/long';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import dayjs from 'dayjs';
import { startOfMonth } from 'date-fns';
import { MyTable } from '@components/table';
import { wrapper } from '@store/redux';
import { MyPagination } from '@components/pagination';
import { MyLayout } from '@components/Layout';
import { useColumn } from '@hooks/use-column';
import { getOrgasRequest } from '@actions/hr/orga/get-orgas.action';
import { permissionMiddleware } from '@utils/middleware/permission';
import { getCompaniesRequest } from '@actions/hr/common/get-companies.action';
import { LongSilSearchFilter } from '@partials/contract/long/template/SilSearchFilter';
import { SearchResultTemplate } from '@partials/common/template/SearchResult';
import { generateListParams } from '@utils/generate';
import { getLongSilsRequest } from '@actions/contract/long/get-sils.action';
import { getUsersRequest } from '@actions/hr/user/get-users.action';

const LongSil: NextPage = () => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    const { longSils } = useSelector<AppState, LongState>(
        (props) => props.long,
    );

    const columns = useColumn(longSils.fields);

    const handleClickRow = ({ idx }: any) => {
        router.push(`/contract/long/${idx}`);
    };

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
                <div className={displayName}>
                    <LongSilSearchFilter />
                    <SearchResultTemplate
                        createUrl="/contract/long/create"
                        data={[
                            `계약건수:${longSils.total.count.toLocaleString()}건`,
                            `보험료계:${
                                longSils.total.pay
                                    ? longSils.total.pay.toLocaleString()
                                    : 0
                            }`,
                            `수정보험료계:${
                                longSils.total.tp
                                    ? longSils.total.tp.toLocaleString()
                                    : 0
                            }`,
                        ]}
                    />
                    <div className={`${displayName}__body`}>
                        <div className="wr-table--scrollable wr-table--hover">
                            <MyTable
                                columns={columns}
                                data={longSils.rows}
                                pageSize={longSils.lastPayload?.nums}
                                onClickRow={handleClickRow}
                            />
                        </div>
                    </div>
                    <div className={`${displayName}__footer`}>
                        <MyPagination
                            total={longSils.total.count}
                        ></MyPagination>
                    </div>
                </div>
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    permissionMiddleware(async ({ dispatch, sagaTask }, ctx) => {
        const condition = {
            sildate: [
                dayjs(startOfMonth(new Date())).format('YYYY-MM-DD'),
                dayjs(new Date()).format('YYYY-MM-DD'),
            ],
        };

        const params = generateListParams(condition, ctx.query);

        dispatch(getLongSilsRequest(params));

        dispatch(getCompaniesRequest('long-view'));

        dispatch(getOrgasRequest({}));

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

export default LongSil;
