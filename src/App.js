import React, { useState } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import shuffle from "lodash.shuffle";
import './App.css';

function App() {
  const [data, setData] = useState(Array(20).fill().map((e,i)=>i+1));
  const [subData, setSubData] = useState(Array(20).fill().map((e,i)=>i+1));
  const [num, setNum] = useState(12);
  const [mid, setMid] = useState(Math.floor(data.length/2))
  const [res, setRes] = useState()
  const shuffleList = () => setData(shuffle(data));

  const getClassName = (d, num) => {
    if(d === num)
      return 'target'

    else if(d === mid)
      return 'mid'
    else 
      return 'listItem'
  }
  const changeNum = (event) => {
    setNum(event.target.value)
  }

  const sortList = () => setData([...data].sort((a,b) => a - b));

  const resetList = () => {
    setData(Array(20).fill().map((e,i)=>i+1))
    setData(Array(20).fill().map((e,i)=>i+1))
  }

  const binarySearchIt = (arr, x) => e => {
    let start=0, end=arr.length; 
    // Iterate while start not meets end 

    let timer = setInterval(() => {
      // Find the mid index 
      let mid=Math.floor((start + end)/2); 
      setMid(mid)
  
      // If element is present at mid, return True 
      if (arr[mid]===x) {
        setSubData(data.filter(n => n === x))
        setRes(x); 
        clearInterval(timer);
      }

      // Else look in left or right half accordingly 
      else if (arr[mid] < x){
        start = mid + 1; 
        setMid(data[mid+1])
        setSubData(data.filter(n => n >= mid ))
      }
      else{
        end = mid - 1; 
        setMid(data[mid-1])
        setSubData(data.filter(n => n >= mid ))
      }
      if (start > end) {
        clearInterval(timer);
      }
    }, 1250);

   
    return setRes('does not exist'); 
  }

  return (
    <div className="App">
      <h1>Binary search</h1>
      <h2>Time space complexity O(log n)</h2>
      <h3>Best case O(1), if <span className="target-text">target</span> = <span className="mid-text">mid</span></h3>
      <Flipper flipKey={data.join("")}>
        <button className="button" onClick={shuffleList}> shuffle</button>
        <button className="button" onClick={sortList}>Sort</button>
        <button className="button" onClick={binarySearchIt(data, num)}>Search Iterative</button>
        <button className="button" onClick={resetList}>Reset</button>
        <h3>Number to search <input type="text" value={num} onChange={changeNum} /></h3>
        {/* {res} */}
        <ul className="list">
          {data.map(d => (
            <Flipped key={d} flipId={d}>
              <li className={getClassName(d, num)} id={d}>{d}</li>
            </Flipped>
          ))}
        </ul>
        <ul className="list">
          {subData.map(d => (
            <Flipped key={d} flipId={d}>
              <li className={getClassName(d, num)} id={d}>{d}</li>
            </Flipped>
          ))}
        </ul>
      </Flipper>
    </div>
  );
}

export default App;
