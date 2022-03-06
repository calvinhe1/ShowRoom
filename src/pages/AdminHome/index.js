import "./styles.css"
import {Link, useNavigate} from 'react-router-dom';
import { useShowRatingsListContext } from "../../contexts/ShowRatingList";

import { uid } from "react-uid";
import { useShowListContext } from "../../contexts/ShowList";
import { useUserListContext } from "../../contexts/UserList";

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

function AdminManageShows() {

    const showListContext = useShowListContext();
    const shows = showListContext.getShows();

    const navigate = useNavigate();

    const showRatingList = useShowRatingsListContext();

    function addShow(e) {
        e.preventDefault();
        const newShowId = showListContext.addShow();
        showRatingList.addNewShowRating(newShowId);
        navigate('/show_page/' + newShowId);
    }

    return (
        <div>
            <h1>Shows in Database: </h1>
            {
                shows.map(show => {
                    return (
                        <div key={uid(show)}>
                            <Link to={"/show_page/" + show.showId}>
                                <button> {show.title} </button>
                            </Link>
                        </div>
                    )
                })
            }
            <button onClick={addShow}> Add Show </button>
        </div>
    );

}

function AdminManageUsers() {

    const userListContext = useUserListContext();
    const users = userListContext.getUsers();
    
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
                users.map(user => {
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