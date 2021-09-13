import Head from 'next/head';
import Layout from '../components/layout/Layout';
import Notification from '../components/ui/Notification';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Head>
                <title>NextEvents</title>
                <meta name="description" content="NextEvents" />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <Component {...pageProps} />
            <Notification
                title="Test"
                message="This is a test!"
                status="error"
            />
        </Layout>
    );
}

export default MyApp;
