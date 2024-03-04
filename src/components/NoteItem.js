import React from 'react'
import noteContext from "../context/noteContext";
import { useContext } from 'react';


function NoteItem(props) {
    const {note ,updateNote}=props

    const context = useContext(noteContext);
  const { deleteNote } = context;
  return (
    <div className="col-md-3 ">





<div className="card my-3">
  <div className="card-body">
    <h5 className="card-title">TITLE: {note.title}</h5>
    <p className="card-text"> <strong>Description : </strong> {note.description}</p>
    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id) ;  props.showAlert("Deleted SuccessFully","success");}}></i>
    <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note);}}></i>
      </div>
  
  </div>



      
    </div>
  )
}

export default NoteItem
