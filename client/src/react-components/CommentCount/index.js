import "./styles.css";

function CommentCount(props) {
    return (
        <div className="center-count">
            <span className="fa fa-comments"></span>
            <span className="pad-count">({props.count})</span>
        </div>
    )
}

export default CommentCount;