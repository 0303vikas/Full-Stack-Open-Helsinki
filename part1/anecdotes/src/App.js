import React, { useEffect, useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  
  // const [vote, setVote] = useState({
  //   0: 0,
  //   1: 0,
  //   2: 0,
  //   3: 0,
  //   4: 0,
  //   5: 0,
  //   6: 0,
  // })
  const [vote, setvote] = useState([]);

  const [big, changebig] = useState(0);
  const [bigvotes, setbigvotes] = useState(0);
  
React.useEffect(()=> {

  let k = 0
    for(let i=0;i<=(anecdotes.length-1);i++){
      vote.push(k);
    }
    

},[])

React.useEffect(()=> {

  let i = vote.indexOf(Math.max(...vote))
  
  changebig(i);
  setbigvotes(vote[i])

  

 

},[vote])
 

  const changeAnec = () => {
    
    
    let randomNum = Math.floor(Math.random() *anecdotes.length)
    setSelected(randomNum)    
    
  }


  const changevote = () => {

    
    const newVote = [...vote]
    newVote[selected] += 1;
    setvote([...newVote])   
    
    
  }


  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>Has {vote[selected]} votes</p>
      <button onClick={changevote}>Vote</button>
      <button onClick={changeAnec}>Next Anecdote</button>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[big]}</p>
        <p>Has {bigvotes} votes</p>
      </div>
    </div>
  )
}

export default App