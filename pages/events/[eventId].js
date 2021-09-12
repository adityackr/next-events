import { Fragment } from 'react';
import EventContent from '../../components/event-detail/EventContent';
import EventLogistics from '../../components/event-detail/EventLogistics';
import EventSummary from '../../components/event-detail/EventSummary';
import ErrorAlert from '../../components/ui/ErrorAlert';
import { getEventById, getFeaturedEvents } from '../../helpers/api-util';

const EventsDetailsPage = (props) => {
    const event = props.selectedEvent;

    if (!event) {
        return (
            <ErrorAlert>
                <p>No event found!</p>
            </ErrorAlert>
        );
    }
    return (
        <Fragment>
            <EventSummary title={event.title} />
            <EventLogistics
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    );
};

export const getStaticProps = async (context) => {
    const eventId = context.params.eventId;

    const event = await getEventById(eventId);

    return {
        props: {
            selectedEvent: event,
        },
        revalidate: 30,
    };
};

export const getStaticPaths = async () => {
    const events = await getFeaturedEvents();

    const paths = events.map((event) => ({ params: { eventId: event.id } }));

    return {
        paths: paths,
        fallback: 'blocking',
    };
};

export default EventsDetailsPage;
