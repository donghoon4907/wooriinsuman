import type { NextPage } from 'next';
import type { CoreSelectOption, CoreTabOption } from '@interfaces/core';
import Head from 'next/head';
import { useState } from 'react';
import { END } from 'redux-saga';
import { wrapper } from '@store/redux';
import { MySelect } from '@components/select';
import { MyLabel } from '@components/label';

// 임시
import { useDispatch } from 'react-redux';
import {
    getBasicPaymentsRequest,
    getBasicPaymentsSuccess,
} from '@actions/long/get-basic-payments.action';
import {
    getOverridesRequest,
    getOverridesSuccess,
} from '@actions/long/get-overrides.action';
import { DETAIL_PAGE_TABS } from '@constants/tab';
import { MyTab } from '@components/tab';
import { IncomeSettings } from '@partials/detail/IncomeSettings';

const FULL_SELECT_SIZE = 337;

const WITH_SELECT_SIZE = 100;

const Detail: NextPage = () => {
    const dispatch = useDispatch();

    const [tab, setTab] = useState<CoreTabOption>(DETAIL_PAGE_TABS[0]);

    const [d, setD] = useState<[Date, Date] | null>([
        new Date('2022-02-01'),
        new Date('2022-03-01'),
    ]);

    const [org, setOrg] = useState<CoreSelectOption | null>(null);

    const handleClickTab = (tab: CoreTabOption) => {
        setTab(tab);
    };

    const handleChange = (org: CoreSelectOption | null) => {
        setOrg(org);
    };

    const handleChangeDate = (value: [Date, Date] | null) => {
        setD(value);
    };

    return (
        <>
            <Head>
                <title>상세 페이지</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="wr-pages-detail row">
                <div className="col-4">
                    <div className="row wr-pages-detail__left">
                        <div className="col-8">
                            <div className="wr-pages-detail__block">
                                <div className="mt-2">
                                    <div className="wr-group">
                                        <span className="wr-pages-detail__department">
                                            직할 영업 &#62; 5회사임직원 &#62;
                                            전산개발실
                                        </span>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            type="button"
                                        >
                                            부서변경
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="wr-pages-detail__block">
                                <div className="row mt-2">
                                    <div className="col">
                                        <MyLabel>고객명</MyLabel>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="홍길동"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <MyLabel>사원번호</MyLabel>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="W1057"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div>
                                            <MyLabel>주민등록번호</MyLabel>
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="121212-2*******"
                                                    aria-label="Recipient's username"
                                                    aria-describedby="button-addon2"
                                                />
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    type="button"
                                                    id="button-addon2"
                                                >
                                                    보기
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <MyLabel>직함</MyLabel>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="실장"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <MyLabel>생년월일</MyLabel>
                                        <div className="wr-pages-detail__with">
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="1912-12-12"
                                                />
                                            </div>
                                            <MySelect
                                                width={WITH_SELECT_SIZE}
                                                options={[]}
                                                value={org}
                                                onChange={() => {}}
                                                placeholder={'양력'}
                                                placeHolderFontSize={16}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <MyLabel>영업가족</MyLabel>
                                        <MySelect
                                            width={FULL_SELECT_SIZE}
                                            options={[]}
                                            value={org}
                                            onChange={() => {}}
                                            placeholder={'FRC'}
                                            placeHolderFontSize={16}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="wr-pages-detail__block">
                                <div className="row">
                                    <div className="col">
                                        <MyLabel>핸드폰</MyLabel>
                                        <div className="wr-pages-detail__with">
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="010-1234-5678"
                                                />
                                            </div>
                                            <MySelect
                                                width={WITH_SELECT_SIZE}
                                                options={[]}
                                                value={org}
                                                onChange={() => {}}
                                                placeholder={'KT'}
                                                placeHolderFontSize={16}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <MyLabel>전화번호 / 내선</MyLabel>
                                        <div className="wr-pages-detail__with">
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="070-4881-6052"
                                                />
                                            </div>
                                            <div
                                                style={{
                                                    width: 140,
                                                }}
                                            >
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="6052"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <MyLabel>이메일</MyLabel>
                                        <div className="wr-pages-detail__with">
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="yoongiekim@naver.com"
                                                />
                                            </div>
                                            <MySelect
                                                width={WITH_SELECT_SIZE}
                                                options={[]}
                                                value={org}
                                                onChange={() => {}}
                                                placeholder={'naver'}
                                                placeHolderFontSize={16}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <MyLabel>기본주소</MyLabel>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="08195"
                                                aria-label="Recipient's username"
                                                aria-describedby="button-addon2"
                                            />
                                            <button
                                                className="btn btn-primary btn-sm"
                                                type="button"
                                                id="button-addon2"
                                            >
                                                찾기
                                            </button>
                                        </div>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="경기도 안양시 동안구 시민대로 383"
                                                aria-label="Recipient's username"
                                                aria-describedby="button-addon2"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div>
                                            <MyLabel>상세주소</MyLabel>
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="B동 1102호"
                                                    aria-label="Recipient's username"
                                                    aria-describedby="button-addon2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div>
                                            <MyLabel>입사일자</MyLabel>
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="2023-02-11"
                                                    aria-label="Recipient's username"
                                                    aria-describedby="button-addon2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div>
                                            <MyLabel>유치자</MyLabel>
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="홍길순 (W0010)"
                                                    aria-label="Recipient's username"
                                                    aria-describedby="button-addon2"
                                                />
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    type="button"
                                                    id="button-addon2"
                                                >
                                                    찾기
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div>
                                            <MyLabel>재직현황</MyLabel>
                                            <MySelect
                                                width={FULL_SELECT_SIZE}
                                                options={[]}
                                                value={org}
                                                onChange={() => {}}
                                                placeholder={'상근'}
                                                placeHolderFontSize={16}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div>
                                            <MyLabel>퇴사일자</MyLabel>
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="2023-02-11"
                                                    aria-label="Recipient's username"
                                                    aria-describedby="button-addon2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="wr-pages-detail__avatar">
                                <img
                                    src="http://via.placeholder.com/200x250"
                                    className="img-thumbnail"
                                    alt="..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="wr-pages-detail__right">
                        <ul className="nav nav-tabs" role="tablist">
                            {DETAIL_PAGE_TABS.map((v) => (
                                <MyTab
                                    key={v.id}
                                    onClick={handleClickTab}
                                    isActive={v.id === tab.id}
                                    {...v}
                                />
                            ))}
                        </ul>
                        <div className="wr-pages-detail__body">
                            <IncomeSettings
                                hidden={tab.id !== 'tabIncome'}
                                {...tab}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    ({ dispatch, sagaTask }) =>
        async (_) => {
            dispatch(
                getBasicPaymentsRequest({
                    successAction: getBasicPaymentsSuccess,
                    callback: () => {},
                }),
            );

            dispatch(
                getOverridesRequest({
                    successAction: getOverridesSuccess,
                    callback: () => {},
                }),
            );

            dispatch(END);

            await sagaTask?.toPromise();

            return {
                props: {},
            };
        },
);

export default Detail;
