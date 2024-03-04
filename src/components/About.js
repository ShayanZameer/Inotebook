import React from 'react'

export default function About(props) {


    // const [mystyle,setmystyle]=useState({color:'white',
    // backgroundColor:'grey'})

    let mystyle={
      color: props.mode==='dark'?'white':'black',
      backgroundColor: props.mode==='dark'?'grey':'white'
    }

    
  

    
  return (
    <div className="container" style={mystyle}>

      <br />

        <h1 className='my-2'>About Us</h1>

        <br />

<div className="accordion" id="accordionExample "style={mystyle}>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button style={mystyle} className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
      <strong>Our Mission </strong>
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div style={mystyle} className="accordion-body">
        <strong>Our mission at the NoteBook App is to provide a versatile and easily accessible tool for users to jot down and organize quick thoughts, reminders, and information in a simple and visual manner, enhancing productivity and aiding in task management.</strong> 
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button style={mystyle} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        <strong>Meet Our team</strong>
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div style={mystyle} className="accordion-body">
        <strong>It is a Solo Project. This is Shayan Zameer student of Bachelor Of Computer Science at Comsats University Islamabad.</strong> 
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button style={mystyle} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
      <strong>Why Choose Us?</strong>
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div style={mystyle} className="accordion-body">
        <strong> Choose our Sticky Notes app for its simplicity, versatility, and convenience. With an intuitive interface, it seamlessly integrates into your daily routine, helping you organize ideas, tasks, and reminders effortlessly. Experience enhanced productivity as you declutter your mind and stay on top of your priorities, all in one centralized digital space. </strong> 
      </div>
    </div>
  </div>
</div>





      
    </div>
  )
}
