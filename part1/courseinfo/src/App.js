import React from 'react';

const Header = (props) => {
  return(

  <>
  <h1>{props.course}</h1>
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
  const list = props.exercise;
  const part = props.part;

  return(
  <>
  <Part part={part[0]} exercise={list[0]} />
  <Part part={part[1]} exercise={list[1]} />
  <Part part={part[2]} exercise={list[2]} />
  
  </>)

};

const Total = (props) => {
  return(  <>
  <p>Number of exercise {props.total}</p>
  </>)

};

const App = () => {

  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const part = [part1, part2, part3];
  const exercise = [exercises1, exercises2,exercises3];
  

  return (
    <>
    <Header course={course}/>
    <Content exercise={exercise} part={part}/>
    <Total total={exercises1+exercises2+exercises3}/>


    
    
    
    
  </>);
};



export default App;
