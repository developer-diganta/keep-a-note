import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import Note from "./Note";
import {getNotes} from "../services/services";
import loaderGif from "./note-loader.gif";
import "./Notes.css";

  function createNote(x,i){
    return <Note id={i} key={i} title={x.name} desc={x.desc} image={x.image}/>
  }

  export default function Notes(){
    const [note,updateNote]=useState([]);
    const [loader,updateLoader]=useState(true);
    const user=useSelector((state)=>state.auth);
    const noteCount=useSelector((state)=>state.note);
    useEffect(()=>{
        async function fetchNotes(){
            updateLoader(true)
          const userFetch = JSON.parse(user);
          if (user===null){
              updateLoader(false)
            updateNote([]);
          }
          else{
            
            const n=await getNotes(userFetch);
            updateNote(n); 
            updateLoader(false);
          }
        }
        fetchNotes();
        },[user,noteCount]);

        return(
            <div className="container">
                <div className="row">
                {loader?<div className="loader-gif"><img  src={loaderGif} alt="LOADING"/><br/>Loading Your Notes!</div>:""}
                    {note.map(createNote)}
                </div>
            </div>
        )
}