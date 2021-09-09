import EventItems from './EventItems';

const EventList = (props) => {
    return (
        <ul>
            {props.events.map((event) => (
                <EventItems
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    image={event.image}
                    date={event.date}
                    location={event.location}
                />
            ))}
        </ul>
    );
};

export default EventList;
