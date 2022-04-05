import "./styles.css";
import { useEffect, useState } from "react";
import { uid } from "react-uid";
import { getRecentComemnts } from "../../actions/comment";
import Comment from "../Comment";

function RecentComments() {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getRecentComemnts().then(res => {
            setComments(res);
        });
    }, []);

    return (
    <div className="home-recent-comment-container">
        <h2 className="home-recent-comment-header">Recent Comments</h2>
        <div className="comment-section">
            <div className="posted-comments">
            {
                comments.map(comment => {
                    return <Comment comment={comment} comments={comments} setComments={setComments} key={uid(comment)}></Comment>
                })
            }
            </div>
        </div>
    </div>
    )
}

export default RecentComments;