import React from "react";
import { useState, useEffect, createContext, useContext } from "react";
import { commentList } from "../../local-data";

export const commentListDefaultValues = {
    comments: {},
    getComments: () => {},
    getCommentsByShowId: () => {},
    getCommentsByUserId: () => {},
    addComment: () => {},
    deleteCommentById: () => {}
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

    return {
        comments,
        getComments,
        getCommentsByShowId,
        getCommentsByUserId,
        addComment,
        deleteCommentById
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
