// initiated in App.js
// argument is an array containing objects
//contains all courses and data regarding them
const Course = ({course}) => {  

    //used as a call back function for reduce()
    //calculated the sum of numbers in array
    const calculate = (previousValue, currentValue) =>  previousValue + currentValue.exercises
    
    
    return(
      <>
       {/* used map inside map to access the array inside the object inside array */}
       {course.map(list =>  (<div key={list.name}>
  
                    <h1>{list.name}</h1>            
                    <ul>

                        {list.parts.map(parts => <li style={{listStyleType: 'none'}} key={parts.id}>{parts.name} {parts.exercises}</li>
                            )
                        }
                    <li style={{listStyleType: 'none'}}  id={"exercise"+list.name}>Total of {list.parts.reduce(calculate,0)} exercise</li>                
        
                    </ul>
                </div>
                )
            )
        }    
      </>
  
    )
  }
  
export default Course;