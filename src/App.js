import React,{ useContext,useState} from 'react';
import MusicCard from './Components/MusicCard';
import { Card,Input } from 'semantic-ui-react';
import Spinner from './Components/Loading';
import contextObj from './Context/MyContext';

import 'semantic-ui-css/semantic.min.css';
import './Components/MusicCard.css';

const chabi=process.env.REACT_APP_API_ENDPOINT;


const App=()=>{

    const accessContext=useContext(contextObj);
    const [loadValue,setLoadValue]=useState(false);

    const findSongs= async (keyword)=>{
            setLoadValue(true);
            try {
                const res = await fetch(`https://v1.nocodeapi.com/jkp/spotify/${chabi}/search?q=${keyword}&type=track`);
                const songData = await res.json();
                accessContext.setSearchSong(songData.tracks.items);
                setLoadValue(false);
            } catch (e) {
                setLoadValue(false);
                alert("Something went wrong please try again");
                console.error("Error", e);
            }
            
        }


    return(
        <div className="grey-background">
            <div style={{display: "flex",justifyContent:"center",alignItems:"center",margin:"4%"}}>
                <Input
                    placeholder='Search song...'
                    value={accessContext.keyword}
                    onChange={(e)=>{accessContext.setKeyword(e.target.value)}}
                    action={{
                        icon: 'search',
                        onClick: () => findSongs(accessContext.keyword),
                      }}
                />
                
            </div>
            <div style={{display: "flex",justifyContent:"center",alignItems:"center"}}>
                <Spinner loadValue={loadValue}/>
            </div>
            <Card.Group>
                {accessContext.searchSong&&
                    
                    accessContext.searchSong.map((element)=>{
                        return(
                            <div>
                                <MusicCard
                                images={element.album.images[1].url} 
                                name={element.album.name}
                                audio={element.preview_url}
                                keys={element.id}
                                />
                            </div>
                        )
                    })
                }
            </Card.Group>
        </div>   
    )
};

export default App;