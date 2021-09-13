import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import EventList from '../../components/events/EventList';
import EventsSearch from '../../components/events/EventsSearch';
import { getAllEvents } from '../../helpers/api-util';

const EventsPage = (props) => {
    const router = useRouter();
    const { events } = props;

    const findEventHandler = (year, month) => {
        const fullPath = `/events/${year}/${month}`;

        router.push(fullPath);
    };

    return (
        <Fragment>
            <Head>
                <title>All My Events</title>
            </Head>
            <Head>
                <title>All Events</title>
                <meta
                    name="description"
                    content="Find a lot of great events that allow you to evolve..."
                />
            </Head>
            <EventsSearch onSearch={findEventHandler} />
            <EventList events={events} />
        </Fragment>
    );
};

export const getStaticProps = async () => {
    const events = await getAllEvents();

    return {
        props: {
            events,
        },
        revalidate: 60,
    };
};

export default EventsPage;
