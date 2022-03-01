import "./styles.css"
import UserInformation from "../../react-components/UserInformation";

import { useUserProfileContext } from './../../contexts/UserProfile';

function Profile(props) {
    const currentUser =  useUserProfileContext().profile;
    console.log(currentUser)

    return (
        <div>
            <UserInformation user={currentUser}></UserInformation>
        </div>
    );
}

export default Profile;