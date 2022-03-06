import "./styles.css"
import {Link, useNavigate} from 'react-router-dom';
import UserList from "../UserList";
import ShowList from "../ShowList";
import Profile from "../Profile";
import { showList, userList, commentList } from '../../local-data';
import { useState, useEffect, createContext, useContext } from "react";

import { uid } from "react-uid";

function AdminHome() {
    return (
        <div>
            {
            <Link to="/admin_manage_users">
            <button className ="buttonsAdmin">Manage Users</button>
            </Link>
            }   

            {
            <Link to="/admin_manage_shows">
            <button className ="buttonsAdmin">Manage Shows</button>
            </Link>
            } 
        </div>
    );
}

function AdminManageShows(props) {

    const navigate = useNavigate();

    function addShow(e) {
        e.preventDefault();
        const newShowId = props.addShow();
        navigate('/show_page/' + newShowId);
    }

    return (
        <div className="manageDBTitle">
            <h1>Database shows: </h1>
            {
                showList.map(show => {
                    return (
                        <div key={uid(show)}>
                            <Link to={"/show_page/" + show.showId}>
                                <button className="showName"> {show.title} </button>
                            </Link>
                        </div>
                    )
                })
            }
            <button onClick={addShow} className="addShowButton">Add Show </button>
        </div>
    );

}

function AdminManageUsers() {
    return (
        /*
        <div>
            <h1>Users in Database: </h1>
            {
            <Link to="/add_new_user">
            <button className="addButton"> Add new user </button>
            </Link>
            }
        </div>*/
        <div>
            <h1>Users in Database: </h1>
            {
                userList.map(user => {
                    return (
                        <div key={uid(user)}>
                            
                            <button> {user.userName}</button>
                            {
                            /*User pages not made yet.
                            <Link to={"/show_page/" + show.showId}>
                                <button> {show.title} </button>
                            </Link>*/
                            }
                        </div>
                    )
                })
            }

        </div>
    );
}


function AddShow() {

    return (
        <div>
            <form id ="addForm">
                <label htmlFor="image">Picture:</label><br></br>
                <input type="file" name ="image"></input><br></br>

                <label htmlFor="title">Title:</label><br></br>
                <input type="text" name ="title"></input><br></br>

                <label htmlFor="genre">Genre:</label><br></br>
                <input type="text" name ="genre"></input><br></br>

                <label htmlFor="startDate">Start date:</label><br></br>
                <input type="date" name="startDate" min = "1950-01-01" max= "2030-03-05"></input><br></br>

                <label htmlFor="endDate">End date:</label><br></br>
                <input type="date" name="endDate" min = "1950-01-01" max= "2030-03-05"></input><br></br>

                <label htmlFor="description">Description: </label><br></br>
                <textarea rows = "5" cols="40" name="description"></textarea><br></br>

                <input type="submit"></input>
            </form>
        </div>
    );

}

function AddUser() {

    return (
        <div>
            <form id ="addForm">

                <label htmlFor="profilePicture">Profile picture:</label><br></br>
                <input type="file" name ="profilePicture"></input><br></br>

                <label htmlFor="userName">Username:</label><br></br>
                <input type="text" name ="userName"></input><br></br>

                <label htmlFor="pass">Password: </label><br></br>
                <input type="text" name ="pass"></input><br></br><br></br>

                <input type="submit"></input>
            </form>
        </div>
    );
}

export {AdminManageShows, AdminManageUsers, AdminHome, AddShow, AddUser};