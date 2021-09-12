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
