import { useContext, useEffect, useState } from 'react';

import CommentList from './CommentList';
import NewComment from './NewComment';
import classes from './Comments.module.css';
import NotificationContext from '../../store/notification-context';
function Comments(props) {
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [isFetchingComments, setisFetchingComments] = useState(false);

    const notificationCtx = useContext(NotificationContext);

    const { eventId } = props;

    useEffect(() => {
        if (showComments) {
            setisFetchingComments(true);
            fetch('/api/comments/' + eventId)
                .then((response) => response.json())
                .then((data) => {
                    setComments(data.comments);
                    setisFetchingComments(false);
                });
        }
    }, [eventId, showComments]);

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    function addCommentHandler(commentData) {
        notificationCtx.showNotification({
            title: 'Adding Comment...',
            message: 'Adding comment to event',
            status: 'pending',
        });

        fetch('/api/comments/' + eventId, {
            method: 'POST',
            body: JSON.stringify(commentData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }

                return response.json().then((data) => {
                    throw new Error(data.message || 'Something went wrong!');
                });
            })
            .then((data) => {
                notificationCtx.showNotification({
                    title: 'Success!',
                    message: 'Added comment to the event successfully!',
                    status: 'success',
                });
            })
            .catch((error) => {
                notificationCtx.showNotification({
                    title: 'Error!',
                    message: error.message || 'Something went wrong!',
                    status: 'error',
                });
            });
    }

    return (
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewComment onAddComment={addCommentHandler} />}
            {showComments && !isFetchingComments && (
                <CommentList items={comments} />
            )}
            {showComments && isFetchingComments && <p>Loading...</p>}
        </section>
    );
}
export default Comments;
