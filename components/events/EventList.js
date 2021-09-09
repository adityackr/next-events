import EventItems from './EventItems';
import classes from './EventList.module.css';

const EventList = (props) => {
    return (
        <ul className={classes.list}>
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
