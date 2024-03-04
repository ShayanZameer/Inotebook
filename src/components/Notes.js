import React, { useState, useContext, useEffect, useRef } from "react";
import noteContext from "../context/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import {useNavigate} from 'react-router-dom';


function Notes(props) {
  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;
  let navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes();
    }else{
      navigate('/Login');
    }
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "default",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      title: currentNote.title,
      description: currentNote.description,
      tag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    // Add logic here to save or update the note using the provided note data.

    editNote(note.id,note.title,note.description,note.tag);
    refClose.current.click();
    props.showAlert("Updated SuccessFully","success");

    setNote({ id: "", title: "", description: "", tag: "default" }); // Clearing the input fields

    // props.showAlert("Updated SuccessFully","Success"
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };


  return (
<>  <AddNote  showAlert={props.showAlert}/>



{/* <!-- Modal --> */}

<button   type="button" className="btn btn-primary d-none"  ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
  
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      

      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title"  className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
          />
        </div>
      </form>






      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button  onClick={handleClick} type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>



    {/* THIS IS NOTES CONTENT */}
    
    <div className="row my-3">
    <h2>YOUR NOTES</h2>

       <div className="container mx-2">
    {notes.length===0 && 'No Notes To Display'}
        </div> 

    {notes.map((note)=>{
       
      return <NoteItem key ={note._id} showAlert={props.showAlert} updateNote={updateNote} note ={note} />;
    })}

    </div>

    </>
  
  )
}

export default Notes
