import React from "react";
import { useState, createContext, useContext } from "react";
import { commentList } from "../../local-data";

export const commentListDefaultValues = {
    comments: {},
    getComments: () => {},
    getCommentsByShowId: () => {},
    getCommentsByUserId: () => {},
    addComment: () => {},
    deleteCommentById: () => {},
    getMostCommentedIds: () => {}
}

export const commentListContext = createContext(commentListDefaultValues);

export function useCommentListContext(){
    // import this to files
    return useContext(commentListContext);
}

export function useProvideCommentListContext() {
    const [comments, setComments] = useState(commentList);

    function getComments() {
        return comments;
    }

    function getCommentsByShowId(id) {
        return comments.filter(comment => comment.showId === id);
    }

    function getCommentsByUserId (id){
        return comments.filter(comment => comment.userId === id);
    }

    function addComment(comment) {
        const commentId = comments[comments.length - 1] + 1; //From lecture, replace with server UUID's
        comment.commentId = commentId;
        comments.push(comment);
        setComments(comments);
        return commentId;
    }

    function deleteCommentById(id) {
        const newComments = comments.filter(c => c.commentId !== id);
        setComments(newComments);
    }    

    function getMostCommentedIds() {
        const commentCounts = comments.reduce((prev, cur) => {
            if (prev[cur.showId] === undefined) {
                prev[cur.showId] = 1;
                return prev
            }
            prev[cur.showId]++;
            return prev;
        }, {});
        const list = Object.keys(commentCounts)
        list.sort((a, b) => {
            if (commentCounts[a] > commentCounts[b]) {
                return -1
            } else if (commentCounts[a] < commentCounts[b]) {
                return 1;
            } else {
                return 0;
            }
        });
        return list;
    }

    return {
        comments,
        getComments,
        getCommentsByShowId,
        getCommentsByUserId,
        addComment,
        deleteCommentById,
        getMostCommentedIds
    }
}

export function ProvideCommentListContext({children}){
    const commentList = useProvideCommentListContext()
    return (
        <commentListContext.Provider value={commentList}>
            {children}
        </commentListContext.Provider>
    )
}
