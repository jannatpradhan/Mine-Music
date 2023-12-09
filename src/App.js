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
            let MAX_RETRIES = 2;
            while(MAX_RETRIES){
                try {
                    const res = await fetch(`https://v1.nocodeapi.com/jkp/spotify/${chabi}/search?q=${keyword}&type=track`);
                    const songData = await res.json();
                    console.log("Data",res);
                    accessContext.setSearchSong(songData.tracks.items);
                    // accessContext.setSearchSong(testData);
                    setLoadValue(false);
                    return
                } catch (e) {
                    MAX_RETRIES--;
                    if(MAX_RETRIES===0){
                        setLoadValue(false);
                        alert("Something went wrong please try again");
                    }
                    
                    console.error("Error try count", MAX_RETRIES);
                }
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
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              findSongs(accessContext.keyword);
            }
          }}
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