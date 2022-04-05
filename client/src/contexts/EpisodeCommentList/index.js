import React from "react";
import { useState, createContext, useContext } from "react";
import { commentList } from "../../local-data";

import { commentEpisodeList } from "../../local-data";

export const commentListDefaultValues = {
    comments: {},
    getEpisodeComments: () => {},
    getEpisodeCommentsByShowId: () => {},
    getEpisodeCommentsByUserId: () => {},
    addEpisodeComment: () => {},
    deleteEpisodeCommentById: () => {},
    getMostEpisodeCommentedIds: () => {},
    getEpisodeComments: () => {}
}

export const commentListContext = createContext(commentListDefaultValues);

export function useEpisodeCommentListContext(){
    // import this to files
    return useContext(commentListContext);
}

export function useProvideEpisodeCommentListContext() {
    const [comments, setComments] = useState(commentEpisodeList);

    function getEpisodeComments() {
        return comments;
    }

    function getEpisodeCommentsByShowId(id) {
        return comments.filter(comment => comment.showId === id);
    }

    function getEpisodeComments(epId, showId) {
 
        return comments.filter(comment => comment.showId == showId && comment.episodeId == epId)
    
    }

    function getEpisodeCommentsByUserId (id){
        return comments.filter(comment => comment.userId === id);
    }

    function likeEpisodeCommentByIds(commentId, userId) {
        // add user to list of users that like this comment
        // remove user from list of users that dislike this comment
    }

    function dislikeEpisodeCommentByIds(commentId, userId) {
        // add user to list of users that dislike this comment
        // remove user from list of users that like this comment
    }

    function addEpisodeComment(comment) {
        const commentId = comments[comments.length - 1] + 1; //From lecture, replace with server UUID's
        comment.commentId = commentId;
        comments.push(comment);
        setComments(comments);
        return commentId;
    }

    function deleteEpisodeCommentById(id) {
        const newComments = comments.filter(c => c.commentId !== id);
        setComments(newComments);
    }    

    function getMostEpisodeCommentedIds() {
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
        getEpisodeComments,
        getEpisodeCommentsByShowId,
        getEpisodeCommentsByUserId,
        addEpisodeComment,
        deleteEpisodeCommentById,
        getMostEpisodeCommentedIds,
        getEpisodeComments
    }
}

export function ProvideEpisodeCommentListContext({children}){
    const commentList = useProvideEpisodeCommentListContext()
    return (
        <commentListContext.Provider value={commentList}>
            {children}
        </commentListContext.Provider>
    )
}
