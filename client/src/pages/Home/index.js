import ShowBars from "../../react-components/ShowBars";
import SeasonsDropdown from "../../react-components/SeasonsDropdown"
import "./styles.css";
import {Link, useNavigate} from 'react-router-dom';
import RecentComments from "../../react-components/RecentComments";


/* The Header Component */
function Home() {

  return (

    <div className="home">      
      <ShowBars></ShowBars>
      <RecentComments></RecentComments>
    </div>
  );
}

export default Home;