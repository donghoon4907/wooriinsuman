import type { NextPage } from 'next';
import type { AppState } from '@reducers/index';
import type { OrgaState } from '@reducers/orga';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { MyTable } from '@components/table';
import { wrapper } from '@store/redux';
import { MyPagination } from '@components/pagination';
import { MyLayout } from '@components/Layout';
import { useColumn } from '@hooks/use-column';
import { permissionMiddleware } from '@utils/middleware/permission';
import { searchOrgasRequest } from '@actions/orga/search-orgas.action';
import { OrgaSearchFilter } from '@partials/orga/template/SearchFilter';
import { getOrgasRequest } from '@actions/orga/get-orgas.action';
import { SearchResultTemplate } from '@partials/common/template/SearchResult';
import { generateListParams } from '@utils/generate';

const Orgas: NextPage = () => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    const { searchOrgas } = useSelector<AppState, OrgaState>(
        (state) => state.orga,
    );

    const columns = useColumn(searchOrgas.fields);

    const handleClickRow = ({ idx }: any) => {
        router.push(`${router.pathname}/${idx}`);
    };

    return (
        <>
            <Head>
                <title>우리인슈맨라이프</title>
            </Head>
            <MyLayout>
                <div className={displayName}>
                    <OrgaSearchFilter />
                    <SearchResultTemplate
                        data={[
                            `조직수:${searchOrgas.total.count.toLocaleString()}`,
                        ]}
                    />
                    <div className={`${displayName}__body`}>
                        <div className="wr-table--scrollable wr-table--hover">
                            <MyTable
                                columns={columns}
                                data={searchOrgas.rows}
                                pageSize={searchOrgas.lastPayload?.nums}
                                onClickRow={handleClickRow}
                            />
                        </div>
                    </div>
                    <div className={`${displayName}__footer`}>
                        <MyPagination
                            total={searchOrgas.total.count}
                        ></MyPagination>
                    </div>
                </div>
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    permissionMiddleware(async ({ dispatch, sagaTask }, ctx) => {
        const { orga_idx, ...rest } = ctx.query;

        const condition = {};

        const params = generateListParams(condition, rest);

        // 영업조직
        if (orga_idx) {
            params.condition['idx'] = orga_idx;
        }

        // 영업조직 목록
        dispatch(getOrgasRequest({}));
        // 조직 목록
        dispatch(searchOrgasRequest(params));

        dispatch(END);

        await sagaTask?.toPromise();

        return null;
    }),
);

export default Orgas;
