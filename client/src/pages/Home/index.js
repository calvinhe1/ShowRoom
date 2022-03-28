import ShowBars from "../../react-components/ShowBars";
import Seasons from "../../react-components/Seasons";
import "./styles.css";

/* The Header Component */
function Home() {

  return (
    <div className="home">
      
      <Seasons></Seasons>
      <ShowBars></ShowBars>
    </div>
  );
}

export default Home;