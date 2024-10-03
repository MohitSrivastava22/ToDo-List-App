import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './assets/components/Navbar'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [Todo, setTodo] = useState("")
  const [Todos, setTodos] = useState([])
  const [showFinished, setShowFInished] = useState(true);
  useEffect(() => {
    let todoString = localStorage.getItem("Todos")
    if (todoString) {
      let Todos = JSON.parse(localStorage.getItem("Todos"))
      setTodos(Todos)
    }
  }, [])


  const saveToLocalStorage = () => {
    localStorage.setItem("Todos", JSON.stringify(Todos))
  }


  const toggleFinished = (e) => {
    setShowFInished(!showFinished)
  }

  const handleTodo = (e) => {
    setTodo(e.target.value)
  }


  const handleAdd = () => {
    // if (Todo == "") {
    //   confirm("Please Enter Your Todo")
    //   return;
    // }
    setTodos([...Todos, { id: uuidv4(), Todo, isCompleted: false }])
    setTodo("")
    saveToLocalStorage();
  }


  const handleEdit = (e, id) => {
    const t = Todos.filter((item2) => {
      return item2.id == id
    })
    setTodo(t[0].Todo);
    const newTodo = Todos.filter((item2) => {
      return item2.id != id;
    })
    setTodos(newTodo)
    saveToLocalStorage();
  }


  const handleDelete = (e) => {
    const id = e.target.name;
    console.log(id);
    const newTodo = Todos.filter((item2) => {
      return item2.id != id
    })
    setTodos(newTodo)
    saveToLocalStorage();
  }


  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = Todos.findIndex((item2) => {
      return item2.id == id;
    })
    const newTodo = [...Todos]
    newTodo[index].isCompleted = !newTodo[index].isCompleted;
    setTodos(newTodo);
    console.log(newTodo, Todo);
    saveToLocalStorage();
  }


  return (
    <>
      <Navbar/>
      <div className='container bg-violet-100 w-1/2 h-screen mr-auto ml-auto mt-2 rounded-md'>
      <h1 className='flex justify-center font-bold text-3xl mt-2'>iTask-Manage All Your Todos At One Place</h1>
        <div>
          <h2 className='text-black flex ml-5 font-bold text-2xl pt-3 mt-6'>Add a todo</h2>
        </div>

        <div className='flex ml-5 mt-5'>
          <input value={Todo} onChange={handleTodo} className='w-2/3 h-7 rounded-md p-4' type="text" placeholder='Enter Your Todo' />
          <button onClick={handleAdd} disabled={Todo.length == 0} className='ml-5 bg-violet-600 w-14 rounded-sm disabled:bg-slate-300'>Add</button>
        </div>
        <div className='mt-5 mb-5 ml-5 text-xl'>
          <input className='mr-3'  onChange={toggleFinished} type="checkbox" checked={showFinished} />Show Finished
        </div>
        <div>
          <h1 className='text-2xl ml-4 font-semibold'>Your Todos</h1>
          {Todos.map((item) => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className='flex mt-5 ml-4 justify-between'>
              <div className='flex'>
                <input className='mr-2' name={item.id} checked={item.isCompleted} type="checkbox" onChange={handleCheckbox} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.Todo}</div>
              </div>
              <div className='button'>
                <button onClick={(e) => { handleEdit(e, item.id) }} className='ml-5 bg-violet-600 w-8 p-2 rounded-md hover:font-semibold transition-all'><MdEdit /></button>
                <button name={item.id} onClick={handleDelete} className='ml-5 mr-52 bg-violet-600 w-8 p-2 rounded-md hover:font-semibold transition-all'><MdDelete /></button>
              </div>
            </div>

          })}

        </div>
      </div>
    </>
  )
}

export default App




