import "./styles.css"
import UserInformation from "../../react-components/UserInformation";

import { useParams } from 'react-router-dom';

function Profile() {
    const { id } = useParams();

    return (
        <div>
            <UserInformation _id={id}></UserInformation>
        </div>
    );
}

export default Profile;