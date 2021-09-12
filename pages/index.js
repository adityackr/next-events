import EventList from '../components/events/EventList';
import { getFeaturedEvents } from '../helpers/api-util';

const HomePage = (props) => {
    const featuredEvents = getFeaturedEvents();

    return (
        <div>
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
