import { useState } from 'react';
import './App.css';
import { TodoContext } from './TodoContext';
import AddTodos from './components/AddTodos';
import Todo from './components/Todo';
import {GET_TODOS} from './grapql/quearies'
import { useQuery } from '@apollo/client';

function App() {
  const [selectedId, setSelectedId] = useState(0)
  const { loading, error, data } = useQuery(GET_TODOS);
  if (loading) return <p>loading ....</p>
  if (error) return <p>{error.message}</p>

  return (
    <TodoContext.Provider value={{selectedId,setSelectedId}}>
      <div className="container">
        <div className='todoform'>
          <AddTodos></AddTodos>
        </div>
        <div className="list-group listcontainer">
        <span className='listHead'> TO-DO LIST</span>

          {data.getTodos.map((todo) => (
            <Todo key={todo.id}
              id={todo.id}
              title={todo.title}
              details={todo.details}
              date={todo.date}
            ></Todo>
          ))}
          
        </div>
      </div>
    </TodoContext.Provider>
  );
}

export default App;
