import React, { useContext } from 'react';
import moment from 'moment'
import { useMutation } from '@apollo/client';
import { DELETE_TODO } from '../grapql/mutations';
import { GET_TODOS } from '../grapql/quearies';
import { TodoContext } from '../TodoContext';

const Todo = ({id, title, details, date}) => {
  const {selectedId, setSelectedId} = useContext(TodoContext)

  const [deleteTodo] = useMutation(DELETE_TODO);
  const deleteTodoList = (id) => {
    deleteTodo({
      variables:{
        id:id
      },refetchQueries: [
        {query: GET_TODOS}
      ]
    })

    setSelectedId(0)
  }

  return (
    <a onClick={ () => {setSelectedId(id)} } 
    className="list-group-item list-group-item-action" key={id}>
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{title}</h5>
        <small>{moment(date).format('MMMM DD YYYY')}</small>
      </div>
      <p className="mb-1">{details}</p>
      <button onClick={() => deleteTodoList(id)}>Delete</button>
    </a>
  );
};

export default Todo;