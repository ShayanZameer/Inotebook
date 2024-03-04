import React, { useState } from "react";
import noteContext from "../noteContext";

const NoteState = (props) => {

  const host="http://localhost:5000";
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial);

  // const getNotes = async () => {
    
  //     const response = await fetch(`${host}/api/notes/fetchallnotes`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "auth-token":
  //           localStorage.getItem('token'),
  //       }
  //     });

  //     const json = await response.json();

  //     // console.log(json);

  //     setNotes(json);

     

      
    
  // };

  // const getNotes = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5000/api/notes/fetchallnotes", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 "
  //         "auth-token": localStorage.getItem('token')
  //       }
  //     });
  
  //     const json = await response.json();
  //     // console.log(json); // Debug: Check the data being received
  
  //     setNotes(json);
  //   } catch (error) {
  //     console.error("Error fetching notes:", error);
  //   }
  // };

  const getNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log("Token IS:", token);
      
      if (!token) {
        console.log("Token is missing");
        return; // Exit the function if token is missing
      }
  
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token
        }
      });
  
      const json = await response.json();
      // console.log("API Response:", json);
  
      if (Array.isArray(json)) {
        setNotes(json);
      } else {
        console.error("API response is not an array:", json);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };
  
  

  

  // ADD NOTE

  const addNote = async (title, description, tag) => {
    try {
      

      
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token'),
          

        },
        
        body: JSON.stringify({title,description,tag}),
      });
      

      if (!response.ok) {
        throw new Error("Add note request failed");
      }

      const addedNote = await response.json();

      setNotes([...notes, addedNote]);
    } catch (error) {
      console.error("Error adding note:", error);
      // Handle error as needed
    }
  };



  //DELETE NOTE

  const deleteNote = async (id) => {
    try {
      // Make API call to delete the note
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 "
          "auth-token":localStorage.getItem('token')
          ,
        },
      });
  
      if (!response.ok) {
        throw new Error("Delete note request failed");
      }
  
      // Filter out the deleted note from the local state
      const updatedNotes = notes.filter((note) => note._id !== id);
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
      // Handle error as needed
    }
  };
  

  // // EDIT NOTE

  const editNote = async (id, title, description, tag) => {
    try {
      const updatedNote = {
        "_id": id,
        "user": "64cbc8e3fa09b4672f7d67da",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2023-08-04T01:17:59.149Z",
        "__v": 0
      };


      
      
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
      });

      if (!response.ok) {
        throw new Error("Edit request failed");
      }

      const updatedNotes = notes.map((note) =>
        note._id === id ? updatedNote : note
      );

      setNotes(updatedNotes);
      
      return updatedNote;
    } catch (error) {
      console.error("Error editing note:", error);
      // Handle error as needed
      return null;
    }
  }

  return (
    <noteContext.Provider value={{ notes, addNote,deleteNote,editNote,getNotes}}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
