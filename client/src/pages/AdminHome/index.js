import "./styles.css"
import {Link, useNavigate} from 'react-router-dom';

import { uid } from "react-uid";
import { useUserListContext } from "../../contexts/UserList";
import { useState, useEffect } from "react";
import { createShow, getAllShows } from "../../actions/show";

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

    const navigate = useNavigate();

    const [shows, setShows] = useState([]);
    const [newShow, setNewShow] = useState('');

    useEffect(() => {
        getAllShows()
            .then(res => {
                setShows(res.data.shows);
            })
    }, [])

    function editNewShow(e) {
        e.preventDefault();
        setNewShow(e.target.value);
    }

    function addShow(e) {
        e.preventDefault();
        if (newShow.length === 0) {
            alert("Please enter a name for the new show");
            return;
        }
        createShow(newShow).then(res => {
            navigate('/show_page/' + res.data._id);
        });
    }

    return (
        <div className="manageDB">
            <h1>Database shows: </h1>
            {
                shows.map(show => {
                    return (
                        <div className="manage-show-list" key={uid(show)}>
                            <Link to={"/show_page/" + show._id}>
                                <button className="Name"> {show.title} </button>
                            </Link>
                        </div>
                    )
                })
            }
            <form>
                <input type="text" onChange={editNewShow} placeholder="New Show Title"></input>
                <button onClick={addShow} className="addShowButton">Add Show</button>
            </form>
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
        <div className="manageDB">
            <h1>Users in Database: </h1>
            {
                users.map(user => {
                    return (
                        <div key={uid(user)}>
                            
                            <button className="Name"> {user.username}</button>
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
            <Link to={"/add_new_user"}>
                <button className="addAdminButton">Add Admin User </button>
            </Link>
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
                <input type="file" name ="profilePicture" placeholder="Enter Username"></input><br></br><br></br>

                <label htmlFor="userName" className ="textInputs">Username:</label><br></br>
                <input type="text" name ="userName" className="textBar" placeholder="Enter Username"></input><br></br><br></br>

                <label htmlFor="pass" className = "textInputs">Password: </label><br></br>
                <input type="text" name ="pass" className="textBar" placeholder="Enter Password"></input><br></br><br></br>

                <Link to={"/admin_manage_users"}>
                    <input type="submit"></input>
                </Link>
                
            </form>
        </div>
    );
}

export {AdminManageShows, AdminManageUsers, AdminHome, AddShow, AddUser};