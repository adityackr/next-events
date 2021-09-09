import { useRouter } from 'next/router';
import { Fragment } from 'react';
import EventList from '../../components/events/EventList';
import EventsSearch from '../../components/events/EventsSearch';
import { getAllEvents } from '../../dummy-data';

const EventsPage = () => {
    const router = useRouter();
    const events = getAllEvents();

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

export default EventsPage;
