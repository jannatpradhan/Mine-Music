import React ,{useState} from "react";
import contextObj from "./MyContext";

const ContextData=(props)=>{
    const [keyword,setKeyword]=useState("");
    const [searchSong,setSearchSong]=useState([]);

    const testData="hii I am test Data";
    return(
        <contextObj.Provider value={
            {
                testData,
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