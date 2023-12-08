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
                // accessContext.setSearchSong(testData);
                setLoadValue(false);
                
            } catch (e) {
                setLoadValue(false);
                alert("Something went wrong please try again");
                console.error("Error", e);
            }
            
        }


    return (
  <div className="grey-background" >
    <div class="sticky-input-container">

      <div class="ui icon input">
        <Input
          placeholder='Search song...'
          value={accessContext.keyword}
          onChange={(e) => { accessContext.setKeyword(e.target.value) }}
        />
        <i class="inverted circular search link icon" onClick={() => findSongs(accessContext.keyword)}></i>

    </div>
    </div>

    <div className="centered-spinner-container" >
      <Spinner loadValue={loadValue} />
    </div>

            <Card.Group className="grid-container" >
                {accessContext.searchSong&&
                    
                    accessContext.searchSong.map((element)=>{
                        return(
                            <div>
                                <MusicCard
                                images={element.album.images[0].url} 
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