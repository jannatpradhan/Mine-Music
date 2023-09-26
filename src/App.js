import React,{ useContext,useState} from 'react';
import MusicCard from './Components/MusicCard';
import { Card,Input } from 'semantic-ui-react';
import Spinner from './Components/Loading';
import contextObj from './Context/MyContext';

import 'semantic-ui-css/semantic.min.css';
import './Components/MusicCard.css';


const App=()=>{

    const accessContext=useContext(contextObj);
    const [loadValue,setLoadValue]=useState(false);

    const findSongs= async (keyword)=>{
        setLoadValue(true);
        const request= await fetch(`https://v1.nocodeapi.com/jkp/spotify/MsXOWOwprzyAWDSG/search?q=${keyword}&type=track`);
        const songData=await request.json();
        accessContext.setSearchSong(songData.tracks.items);
        setLoadValue(false);
    }


    // useEffect(()=>{
    // },[]);

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
                            <div keys={element.id}>
                                <MusicCard
                                images={element.album.images[1].url} 
                                name={element.album.name}
                                audio={element.preview_url}
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