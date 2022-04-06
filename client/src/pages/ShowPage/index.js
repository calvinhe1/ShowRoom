import "./styles.css";

import ShowInfo from "../../react-components/ShowInfo";
import ShowsBar from "../../react-components/ShowsBar";
import CommentSection from "../../react-components/CommentSection";

import {useState, useEffect} from "react";

import { uid } from "react-uid";
import EpisodeInfo from "../../react-components/EpisodeInfo";

import EpisodesBar from "../../react-components/EpisodesBar";
import { getShowById } from "../../actions/show";
import { getEpisodeById } from "../../actions/episode";

import { createSeason, getAllSeasonsByShow } from "../../actions/season";
import { useUserProfileContext } from "../../contexts/UserProfile";
import { createEpisode, getTopRatedEpisodes } from "../../actions/episode";

function ShowPage(props) {

    const [value, setValue] = useState("Cover");
    const [episode, setEpisode] = useState(false);
    const [seasonNum, setSeasonNum] = useState();

    const [episodeNum, setEpisodeNum] = useState();

    const [episodeID, setepisodeID] = useState();

    const [show, setShow] = useState(props.showId)

    const [currentShow, setCurrentShow] = useState({});


    const [currentEpisode, setCurrentEpisode] = useState({});

    const profile = useUserProfileContext().profile;
    const [topThree, setTopThree] = useState([]);

    useEffect(() => {
        getShowById(props.showId).then(res => {
            setCurrentShow(res.data);
        });
        getTopRatedEpisodes(props.showId).then(res => {
            setTopThree(res.data);
        })

      
    }, [props.showId])


    const [seasons, setSeasons] = useState([]);
    useEffect(() => {
        getAllSeasonsByShow(props.showId)
            .then(res => {
                setSeasons(res.data.seasons);
            })
    }, [props.showId])

    if (show != props.showId) {
        setEpisode(false)
        setShow(props.showId)
        setValue("Cover")
    }

    useEffect(() => {    
        window.scrollTo(0,0)
        if (value == "Cover") {
            setEpisode(false)
        }
        else {
            setEpisode(true)
            getEpisodeById(episodeID).then(res => {
                setCurrentEpisode(res.data)//???
        })
       
        }
        
     }, [value]);

        const handleOnChange =  (e) => {
        e.preventDefault()
        let test = e.target.getAttribute("value")
            //ensure value is actually set before moving on.
        if (test != null) {
                setValue(test)
                setShow(props.showId)
                setepisodeID(test)
                getEpisodeById(episodeID).then(res => {
                    setCurrentEpisode(res.data)//???
            })
        }
        }

    function addEpisode(e) {
        e.preventDefault();
        if (!(seasonNum >= 0) || !(episodeNum >= 0)) {
            alert("Please specify the season and show number to add too")
            return;
        }
        getAllSeasonsByShow(props.showId)
            .then(res => {
                const season = res.data.seasons.find(s => s.seasonNum == seasonNum);
                if (!season) {
                    createSeason(props.showId, seasonNum)
                        .then(res => {
                            createEpisode(props.showId, res.data._id, episodeNum).then(result => {
                                //TODO navigate to new episode
                             
                                alert('Episode Created!');
                                /*
                                setValue(test)
                                setShow(props.showId)
                                setepisodeID(test)
                                getEpisodeById(episodeID).then(res => {
                                    setCurrentEpisode(res.data)//???
                                })*/
                                //setepisodeID(result.data._id) //when episode is created, set the CURRENT EPISODE to this episode. The currente episode should also be set WHEN IT IS CLICKED. Q. How to get the episode ID from clicking something?
                            });
                        })
                } else {
                    createEpisode(props.showId, season._id, episodeNum).then(result => {
                        //TODO navigate to new episode
                        setepisodeID(result.data._id)
                        alert('Show Created!');
                    });
                }
            })
    }

    function handleNewEpsiode(e) {
        e.preventDefault()
        setEpisodeNum(e.target.value);
    }

    function handleNewSeason(e) {
        e.preventDefault();
        setSeasonNum(e.target.value)
    }

    //extract top 3 most rated episodes, and put into cover page. (Also indicate the rating on it.)
    return (
        <div className="pageContainer">
            {
            !episode && topThree.length != 0? 
            (
            <div className = "highestRatedEpisodes"  onClick={handleOnChange}  > Most Liked Episodes! 
            <br></br><br></br>
                {   

                    topThree.map(episode =>  {
                        return (
                            <div key={uid(episode)} className = "ep" value={episode._id} >{"Episode " + episode.episodeNum}<br></br>
                            <div key={uid(episode._id)} className = "rating"  valuetwo ={episode.numLikes} >Liked: {episode.numLikes} </div>
                            
                            </div>                        
                        )
                    })
                }
            </div>) : null
            }
            
            <div className="epContainer" value ={value} >
                <br></br>
                <span className="ep" value={"Cover" } onClick={handleOnChange} >
                     {currentShow?.title}
                </span>
                {
                    profile.isAdmin ?
                        <span>
                            <input type="text" placeholder="Season Number" value={seasonNum} onChange={handleNewSeason}></input>
                            <input type="text" placeholder="Episode Number" value={episodeNum} onChange={handleNewEpsiode}></input>
                            <button className="edit-button" onClick={addEpisode}>Add Episode</button> 
                        </span> :
                        null
                }
            </div>
          
            {
                //erased episode paramter to EpisodeInfo component.
            
            episode ? <EpisodeInfo currentShowId={props.showId} currentEpisode = {currentEpisode} setCurrentEpisode={setCurrentEpisode} ></EpisodeInfo> : 
            <ShowInfo currentShowId={props.showId} currentShow={currentShow} setCurrentShow={setCurrentShow} ></ShowInfo>
            }  
            
            <div>
                <div className="show-page-show-bars-left">
                {
                    seasons.map(season => {
                        return (
                                <div className ="showbartwo" onClick={handleOnChange} key={uid(season) } >
                                    <h2>Season {season.seasonNum}</h2>
                                    <EpisodesBar currentShowId={props.showId} season={season}/>
                            
                                </div>
                        )
            
                    })
                }
                    <div className="showbartwo">
                        <h2>Recommended</h2>
                        <ShowsBar changePage={props.changePage} currentShowId={props.showId}/>
                    </div>
                </div>
                <div className="show-page-comments-right">
                    <CommentSection showId={props.showId} />
                </div>
            </div>
        </div>

    );
}

export default ShowPage;