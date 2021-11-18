import React, { useState } from 'react'

const Heading = (props) => <h1>{props.text}</h1>;

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

const StatisticLine = (props) => <tr><td>{props.text}</td><td> {props.value}</td></tr>;



const Statistics = (props) => {

  if(props.states[0]["name"] === 0 && props.states[1]["name"] === 0 && props.states[2]["name"] === 0){
    return(
      <h6>No foodback given</h6>
    )
  }
  else {
    
  return(
    <>
    <table>
      <tbody>
         <StatisticLine text="Rated Good" value={props.states[0]["name"]}/>
        <StatisticLine text="Rated Neutral" value={props.states[1]["name"]}/>
        <StatisticLine text="Rated Bad" value={props.states[2]["name"]}/>
        <StatisticLine text="All Reviews" value={props.states[3]["name"]} />
        <StatisticLine text="Average" value={props.states[4]["name"]} />
         <StatisticLine text="Positive" value={(props.states[0]["name"] *100)/(props.states[0]["name"]+props.states[1]["name"]+props.states[2]["name"])+"%"} />
      </tbody>

    </table>
   
    
    
   
   
    

    </>

  );

  }

  

  



  }





const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, countall] = useState(0)
  const [average, calAve] = useState(0)

  const states = [
    {
      name: good,
      function: setGood,
    },
    {
      name: neutral,
      function: setNeutral,
    },
    {
      name: bad,
      function: setBad,
    },
    {
      name: all,
      function: countall,
    },
    {
      name: average,
      function: calAve,
    },
  ]

  React.useEffect(() => {
    calAve((good-bad)/(good+bad+neutral))
  },[good,bad,neutral]); 

  const handleGood = () => {     
    states[0]["function"](states[0]["name"]  + 1);
    states[3]["function"](states[3]["name"] +1)     
       
  };



const handleNautral = () => {
  
  states[1]["function"](states[1]["name"]  +1);
    
  states[3]["function"](states[3]["name"] +1)}
  


const handleBad = () => {

  states[2]["function"](states[2]["name"] +1)
  states[3]["function"](states[3]["name"]+1)} 

 

  

  return (
    <>

    <Heading text="Give Feedback" />
    <Button  text="good" onClick={handleGood} />
    <Button  text="neutral" onClick={handleNautral}/>
    <Button  text="bad" onClick={handleBad}/>
    <Heading text="Statistics" />
    <Statistics states={states}/>
    
    
   
    






    

    </>
  )
}

export default App