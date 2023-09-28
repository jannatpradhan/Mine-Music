import React ,{useState} from "react";
import contextObj from "./MyContext";

const ContextData=(props)=>{
    const [keyword,setKeyword]=useState("");
    const [searchSong,setSearchSong]=useState([]);

    return(
        <contextObj.Provider value={
            {
                keyword,
                setKeyword,
                searchSong,
                setSearchSong
            }
        }>
            {props.children}
        </contextObj.Provider>
    )
}

export default ContextData;