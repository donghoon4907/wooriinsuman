import type { NextPage } from 'next';
import Head from 'next/head';
import { MyLayout } from '@components/Layout';
import { WithLabel } from '@components/WithLabel';
import { MySelect } from '@components/select';
import { MyCalendar } from '@components/calendar';

const Calendar: NextPage = () => {
    const displayName = 'wr-pages-calendar';

    return (
        <>
            <Head>
                <title>일정관리</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
            </Head>
            <MyLayout>
                <div className={displayName}>
                    <div className="wr-pages-list__header">
                        <div className="wr-pages-list__filter">
                            <WithLabel id="orga" label="조직" type="active">
                                <MySelect inputId="orga" />
                            </WithLabel>
                        </div>
                    </div>
                    <div className={`${displayName}__body wr-mt wr-mb`}>
                        <MyCalendar />
                    </div>
                </div>
            </MyLayout>
        </>
    );
};

export default Calendar;