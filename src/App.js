import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todolst, setTodoList] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(1); // Default to 1
  const [inputValue, setInputValue] = useState('');
  const [packedThings, setPackedThings] = useState([]);
  const [sortBy, setSortBy] = useState(''); // State to store sorting option

  useEffect(() => {
    if (todolst.length > 0) {
      const packedItems = todolst.filter((item) => item.packed);
      setPackedThings(packedItems);
    } else {
      setPackedThings([]);
    }
  }, [todolst]);

  // Function to add an item to the list
  const addItemToList = () => {
    if (inputValue) {
      const newItem = {
        text: `${selectedNumber} ${inputValue}`,
        packed: false,
      };
      setTodoList([...todolst, newItem]);
      setInputValue(''); // Clear input field
    }
  };

  // Function to clear the list with confirmation
  const clearList = () => {
    const confirmation = window.confirm(
      'Are you sure you want to delete all things?'
    );
    if (confirmation) {
      setTodoList([]);
    }
  };

  // Function to sort the list by packed status
  const sortByPackedStatus = () => {
    const sortedList = [...todolst].sort((a, b) => {
      if (a.packed && !b.packed) return -1;
      if (!a.packed && b.packed) return 1;
      return 0;
    });
    setTodoList(sortedList);
    setSortBy('Sort By Packed Status'); // Update sorting option
  };

  // Function to sort the list by input order
  const sortByInputOrder = () => {
    const sortedList = [...todolst].sort((a, b) => {
      // Extract numbers from text and compare them
      const numA = parseInt(a.text.split(' ')[0]);
      const numB = parseInt(b.text.split(' ')[0]);
      return numA - numB;
    });
    setTodoList(sortedList);
    setSortBy('Sort By input order'); // Update sorting option
  };

  // Function to sort the list by description
  const sortByDescription = () => {
    const sortedList = [...todolst].sort((a, b) => {
      const keywordA = a.text.split(' ').slice(1).join(' ');
      const keywordB = b.text.split(' ').slice(1).join(' ');
      return keywordA.localeCompare(keywordB);
    });
    setTodoList(sortedList);
    setSortBy('Sort By Description'); // Update sorting option
  };

  // Function to handle sorting option change
  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    if (selectedSort === 'Sort By Packed Status') {
      sortByPackedStatus();
    } else if (selectedSort === 'Sort By input order') {
      sortByInputOrder();
    } else if (selectedSort === 'Sort By Description') {
      sortByDescription();
    } else {
      setSortBy(selectedSort); // Update sorting option
    }
  };

  return (
    <div className="App">
      <header className='header'>
        Simple Todo Application Using React Js
      </header>

      <div className='subheader'>
        What do you need for your 😍 trip?

        <select
          value={selectedNumber}
          className='selectofsubheader'
          onChange={(e) => setSelectedNumber(parseInt(e.target.value))}
        >
          {Array.from(Array(20).keys()).map((x) => (
            <option key={x} value={x + 1}>{x + 1}</option>
          ))}
        </select>

        <input
          className='inputofsubheader'
          type="text"
          placeholder='item...'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <input
          className='btnofsubheader'
          type="button"
          value="ADD"
          onClick={addItemToList}
        />
      </div>

      <div className='mainbody'>
        {todolst.map((item, index) => (
          <div
            key={index}
            className={item.packed ? 'packed' : ''}
            style={{ textDecoration: item.packed ? 'line-through' : 'none' }}
          >
            <input
              type="checkbox"
              onChange={() => {
                const updatedList = [...todolst];
                updatedList[index].packed = !updatedList[index].packed;
                setTodoList(updatedList);
              }}
              checked={item.packed || false}
            />
            <span>{item.text}</span>
            <i
              className="fa-sharp sharp-x fa-solid fa-x"
              onClick={() => {
                const updatedList = [...todolst];
                updatedList.splice(index, 1);
                setTodoList(updatedList);
              }}
            ></i>
          </div>
        ))}
      </div>

      <div className='downwarddiv'>
        <div className='orderbydiv'>
          <select value={sortBy} onChange={handleSortChange}>
            <option value='Sort By input order'>Sort By input order</option>
            <option value='Sort By Description'>Sort By Description</option>
            <option value='Sort By Packed Status'>Sort By Packed Status</option>
          </select>
          <button onClick={clearList}>Clear List</button>
        </div>
        <div className='cautiondiv'>
          You have {todolst.length} items on your list, and you already Packed{' '}
          {packedThings.length} ({((packedThings.length / todolst.length) * 100).toFixed(2)}%)
        </div>
      </div>
    </div>
  );
}

export default App;
