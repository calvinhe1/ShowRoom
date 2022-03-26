import "./styles.css"

import UserShow from "../UserShow";

import { useUserProfileContext } from './../../contexts/UserProfile';
import { useShowListContext } from './../../contexts/ShowList';
import { useShowRatingsListContext } from './../../contexts/ShowRatingList';

function UserShowSection(props) {

    const userContext = useUserProfileContext();
    const currentUser = userContext.profile;

    const ratingContext = useShowRatingsListContext();
    const ratings = ratingContext.getUsersTop5ShowsById(currentUser.userId);

    const showContext = useShowListContext();    

    return (
        <div className="show-section-container">
            {
                ratings.map(s => {
                    return <UserShow show={showContext.getShowById(s)}/>;
                })
            }
        </div>
    );
}

export default UserShowSection;