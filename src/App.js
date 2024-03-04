import React, { useState } from "react";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
    
        
          <Alert alertMessage={alert} /> {/* Pass the correct prop name here */}
          <div className="container">
            <Routes>
              <Route path="/Home" element={<Home showAlert={showAlert} />} />
              <Route path="/about" element={<About/>} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/signup" element={<Signup showAlert={showAlert} />} />
              {/* Other routes */}
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
