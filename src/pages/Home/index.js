import ShowsBar from "../../react-components/ShowsBar";
import "./styles.css";

/* The Header Component */
function Home(props) {
  return (
      <div className="showbar-container">
        <ShowsBar shows={props.shows}></ShowsBar>
      </div>
  );
}

export default Home;