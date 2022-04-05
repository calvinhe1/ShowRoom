import "./styles.css"
import ProfileInformation from "../../react-components/ProfileInformation";
import { useParams } from "react-router-dom";


function PublicProfile() {
    const { id } = useParams();
    return (
        <div>
            <ProfileInformation id={id}></ProfileInformation>
        </div>
    );
}

export default PublicProfile;