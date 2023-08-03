import type { NextPage } from 'next';
import Head from 'next/head';
import { MyLayout } from '@components/Layout';

const Test: NextPage = () => {
    return (
        <>
            <Head>
                <title>우리인슈맨라이프 - 404</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
            </Head>
            <MyLayout>
                <div
                    style={{
                        backgroundColor: 'white',
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                ></div>
            </MyLayout>
        </>
    );
};

export default Test;
