import type { NextPage } from 'next';
import type { AppState } from '@reducers/index';
import type { LongState } from '@reducers/long';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { MyTable } from '@components/table';
import { wrapper } from '@store/redux';
import { MyPagination } from '@components/pagination';
import { MyLayout } from '@components/Layout';
import { useColumn } from '@hooks/use-column';
import { getOrgasRequest } from '@actions/hr/get-orgas';
import { permissionMiddleware } from '@utils/middleware/permission';
import { getLongsRequest } from '@actions/contract/long/get-longs.action';
import { getCompaniesRequest } from '@actions/hr/get-companies';
import { LongSearchFilter } from '@partials/contract/long/template/SearchFilter';
import { SearchResultTemplate } from '@partials/common/template/SearchResult';
import { generateListParams } from '@utils/generate';

const LongBo: NextPage = () => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    const { longs } = useSelector<AppState, LongState>((props) => props.long);

    const columns = useColumn(longs.fields);

    const handleClickRow = ({ idx }: any) => {
        router.push(`/contract/long/${idx}`);
    };

    return (
        <>
            <Head>
                <title>장기보유계약</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
            </Head>
            <MyLayout>
                <div className={displayName}>
                    <LongSearchFilter />
                    <SearchResultTemplate
                        createUrl="/contract/long/create"
                        data={[
                            `계약건수:${longs.total.count.toLocaleString()}건`,
                            `보험료계:${
                                longs.total.pay
                                    ? longs.total.pay.toLocaleString()
                                    : 0
                            }`,
                        ]}
                    />
                    <div className={`${displayName}__body`}>
                        <div className="wr-table--scrollable wr-table--hover">
                            <MyTable
                                columns={columns}
                                data={longs.rows}
                                pageSize={longs.lastPayload?.nums}
                                onClickRow={handleClickRow}
                            />
                        </div>
                    </div>
                    <div className={`${displayName}__footer`}>
                        <MyPagination total={longs.total.count}></MyPagination>
                    </div>
                </div>
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    permissionMiddleware(async ({ dispatch, sagaTask }, ctx) => {
        const condition = {};

        const params = generateListParams(condition, ctx.query);

        dispatch(getLongsRequest(params));

        dispatch(getCompaniesRequest('long-view'));

        dispatch(getOrgasRequest());

        dispatch(END);

        await sagaTask?.toPromise();

        return null;
    }),
);

export default LongBo;
