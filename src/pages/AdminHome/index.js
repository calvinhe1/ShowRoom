import "./styles.css"
import {Link} from 'react-router-dom';

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


    return (
        <div>
            <h1>Shows in Database: </h1>
            {
            <Link to="/add_new_show">
            <button className="addButton"> Add new show </button>
            </Link>
            }

        </div>
    );


}

function AdminManageUsers() {
    return (
        <div>
            <h1>Users in Database: </h1>
            {
            <Link to="/add_new_user">
            <button className="addButton"> Add new user </button>
            </Link>
            }
        </div>
    );
}


function addShow() {

    return (
        <div>
        </div>
    );

}

function addUser() {

    return (
        <div>
        </div>
    );

}

export {AdminManageShows, AdminManageUsers, AdminHome, addShow, addUser};