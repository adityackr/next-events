import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import useSWR from 'swr';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/ResultsTitle';
import Button from '../../components/ui/Button';
import ErrorAlert from '../../components/ui/ErrorAlert';
import { getFilteredEvents } from '../../helpers/api-util';

const SelectedEventDetailPage = (props) => {
    // const [loadedEvents, setLoadedEvents] = useState();
    const router = useRouter();

    const filterData = router.query.slug;

    // console.log(filterData);

    // const { data, error } = useSWR(
    //     'https://next-course-53a67-default-rtdb.firebaseio.com/events.json'
    // );

    // useEffect(() => {
    //     if (data) {
    //         const events = [];

    //         for (const key in data) {
    //             events.push({
    //                 id: key,
    //                 ...data[key],
    //             });
    //         }
    //         setLoadedEvents(events);
    //     }
    // }, [data]);

    const pageHeadData = (
        <Head>
            <title>Filtered Events</title>
            <meta
                name="description"
                content={`All events for ${props.date.month}/${props.date.year}`}
            />
        </Head>
    );

    if (!props.events) {
        return (
            <Fragment>
                {pageHeadData}
                <p className="center">Loading...</p>
            </Fragment>
        );
    }

    // const filteredYear = filterData[0];
    // const filteredMonth = filterData[1];

    // const numYear = +filteredYear;
    // const numMonth = +filteredMonth;

    if (props.hasError) {
        return (
            <Fragment>
                {pageHeadData}
                <ErrorAlert>
                    <p>Invalid filter! Please adjust your values!</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    const filteredEvents = props.events;

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                {pageHeadData}
                <ErrorAlert>
                    <p className="center">
                        No events found for your choosen filter!
                    </p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    const date = new Date(props.date.year, props.date.month - 1);

    return (
        <Fragment>
            {pageHeadData}
            <ResultsTitle date={date} />
            <EventList events={filteredEvents} />
        </Fragment>
    );
};

export const getServerSideProps = async (context) => {
    const { params } = context;

    const filterData = params.slug;

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if (
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12
    ) {
        return {
            props: {
                hasError: true,
            },
        };
    }

    const filteredEvents = await getFilteredEvents({
        year: numYear,
        month: numMonth,
    });

    return {
        props: {
            events: filteredEvents,
            date: {
                year: numYear,
                month: numMonth,
            },
        },
    };
};

export default SelectedEventDetailPage;
