import ShowsBar from "../../react-components/ShowsBar";
import "./styles.css";

/* The Header Component */
function Home(props) {
  return (
      <div>
        <ShowsBar shows={props.showList}></ShowsBar>
      </div>
  );
}

export default Home;