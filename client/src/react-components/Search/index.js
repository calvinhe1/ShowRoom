import { useState } from "react";
import { uid } from "react-uid";
import { useShowListContext } from "../../contexts/ShowList";
import { Link } from "react-router-dom";
import "./styles.css";

function Search() {

    const [value, setValue] = useState(undefined);
    const [visible, setVisible] = useState(false);
    const shows = useShowListContext().getShows();

    function filterShows() {
        if (value === undefined) return shows;
        return shows.filter(show => {
            if (show.title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                return true;
            } 
            return false;
        });
    }

    function change(e) {
        setValue(e.target.value);
    }

    function showSearch() {
        setVisible(true);
    }

    function hideSearch() {
        //Let's the link be clicked before the onBlur removes it
        setTimeout(() => {
            setVisible(false);
        }, 100);
    }

    return (
        <div className="search-container">
            <span>
                <input type="text" placeholder="Search" value={value}  className="search-box" onChange={change} onClick={showSearch} onBlur={hideSearch}></input>
                <i className="fa fa-search search-icon"></i>
            </span>
            { visible ?
                <ul className="search-list">
                    {
                        filterShows().map(show => {
                            return (
                                <li key={uid(show)} className="search-element">
                                    <Link to={"/show_page/" + show.showId}>
                                        <img src={show.picture}></img>    
                                        <span>{show.title}</span>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul> : null 
            }
        </div>
    )
}

export default Search;