import './App.css';
import { useState } from 'react';

function App() {
  let [todolst, settodolst] = useState(["hello", "world"])
  return (
    <div className="App">

      <header className='header'>
        Simple Todo Application Using React Js
      </header>

      <div className='subheader'>
        What do you need for your 😍 trip?

        <select className='selectofsubheader'>
          {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], x =>
            <option> {x}</option>
          )}

        </select>

        <input className='inputofsubheader' type="text" placeholder='item...' />
        <input className='btnofsubheader' type="button" value="ADD" />
      </div>
      <div className='mainbody'>
        {todolst.map(x => (
          <span>
            <input type="checkbox" /><span>{x}</span><i class="fa-sharp sharp-x fa-solid fa-x"></i>
          </span>
        ))}
      </div>
      <div className='downwarddiv'>

        <div className='orderbydiv'>
          <select>
            {Array.from(["Sort By input order", "Sort By Description", "Sort By Packed Status"], x => (
              <option>{x}</option>
            ))}
          </select>
          <button>Clear List</button>
        </div>
      <div className='cautiondiv'>
        You have 4 items on your list, and you already Packed 0 (0%)
      </div>
      </div>
    </div>
  );
}

export default App;
