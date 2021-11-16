import React from 'react';

const Header = (props) => {
  return(

  <>
  <h1>{props.course["name"]}</h1>
  </>)

};

const Part = (props) => {
  return(
    <>
    <p>
      {props.part} {props.exercise} 
    </p>

    </>
  )
}

const Content = (props) => {
  
  const part = props.part["parts"];

  return(
  <>
  <Part part={part[0]["name"]} exercise={part[0]["exercises"]} />
  <Part part={part[1]["name"]} exercise={part[1]["exercises"]} />
  <Part part={part[2]["name"]} exercise={part[2]["exercises"]} />
  
  </>)

};

const Total = (props) => {
  const total = props.total["parts"]
  return(  <>
  <p>Number of exercise {total[0]["exercises"]+total[1]["exercises"]+total[2]["exercises"]}</p>
  </>)

};


const App = () => {
  const course = {
  name: 'Half Stack application development',
  parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
}


  

  return (
    
      <>
    <Header course={course}/>
    <Content part={course}/>
    <Total total={course}/>


    
    
    
    
  </>
      
   
  )
}

export default App;
