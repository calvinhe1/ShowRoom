import ShowBars from "../../react-components/ShowBars";
import SeasonsDropdown from "../../react-components/SeasonsDropdown"
import "./styles.css";
import {Link, useNavigate} from 'react-router-dom';


/* The Header Component */
function Home() {

  return (

    <div className="home">
      
      {
        <Link to="/seasons">
        <button className="seasonView">Seasons</button>
        </Link>
      }
      
      <ShowBars></ShowBars>
    </div>
  );
}

export default Home;