import "./styles.css";

import ShowInfo from "../../react-components/ShowInfo";
import ShowsBar from "../../react-components/ShowsBar";

import {useState, useEffect} from "react";

import {useParams} from "react-router-dom";

function ShowPage(props) {

    //TODO user from server
    const [user, setUser] = useState({userName: 'user', isAdmin: true});

    return (
        <div>
            <ShowInfo user={user} showList={props.showList}></ShowInfo>
            {/** TODO comment section */}
        </div>

    );
}

export default ShowPage;