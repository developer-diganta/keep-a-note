import {Card} from "react-bootstrap";
import { deleteNotes } from "../services/services";
import { useSelector,useDispatch } from "react-redux";
import "./Note.css";
import {useState,useEffect} from "react";
import EditForm from "./EditForm"; 
import changeNoteCount from "../actionCreators/changeNoteCount";

export default function Note(props){
    const dispatch = useDispatch();
    const userData = useSelector((state)=>state.auth);
    const user=JSON.parse(userData);

    const deleteThis =async ()=>{
        await deleteNotes(user,props.id);
        dispatch(changeNoteCount())
    }



    const [formDisplay,setFormDisplay] = useState("none");

    const changeVis=useSelector((state)=>state.note);

    useEffect(()=>{
        setFormDisplay("none");
    },[changeVis])

    return (
        <div className="col-lg-4 col-md-6 col-xs-12 d-flex justify-content-center" >
                <Card style={{ width:'18rem',height:"30rem",overflow:"auto",margin:"10px",backgroundColor:"#3cf2ff"}}>
            <Card.Img variant="top" src={props.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCGFwGjXf7R4e7uMFvXxcXyiLCdM_G5mmPLA&usqp=CAU"} height="40%" />
            <Card.Body  >
                <Card.Title style={{padding:"5px"}}><h3 style={{fontWeight:"900",textAlign:"center"}}>{props.title}</h3></Card.Title>
                <Card.Text >
                    <span style={{fontWeight:"bold"}}>{props.desc}</span>
                </Card.Text>
                <button onClick={deleteThis}><i className="fas fa-trash ico"></i></button>
                <button onClick={()=>setFormDisplay("block")} ><i className="fas fa-edit ico"></i></button>
                <div style={{padding:"3%"}}>
                <span style={{display:formDisplay,backgroundColor:"#d191df",padding:"2%",borderRadius:"5%"}}> 
                    <EditForm key={props.id} id={props.id} title={props.title} desc={props.desc} image={props.image}/>
                    <button className="btn-close" onClick={()=>setFormDisplay("none")}>CLOSE <i className="fas fa-times"></i></button> 
               </span>
                </div>
            </Card.Body>
        </Card>
        </div>
        
    )
}

