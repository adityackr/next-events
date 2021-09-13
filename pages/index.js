import Head from 'next/head';

import EventList from '../components/events/EventList';
import { getFeaturedEvents } from '../helpers/api-util';

const HomePage = (props) => {
    const featuredEvents = getFeaturedEvents();

    return (
        <div>
            <Head>
                <title>NextEvents</title>
                <meta
                    name="description"
                    content="Find a lot of great events that allow you to evolve..."
                />
            </Head>
            <EventList events={props.events} />
        </div>
    );
};

export const getStaticProps = async () => {
    const featuredEvents = await getFeaturedEvents();

    return {
        props: {
            events: featuredEvents,
        },
        revalidate: 1800,
    };
};

export default HomePage;
