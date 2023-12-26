import React, { useContext, useEffect, useRef, useState } from 'react';
import { ADD_TODO, UPDATE_TODO } from '../grapql/mutations';
import { useMutation, useQuery } from '@apollo/client';
import { GET_TODO, GET_TODOS } from '../grapql/quearies';
import moment from 'moment'
import { TodoContext } from '../TodoContext';

const AddTodos = () => {
  const {selectedId, setSelectedId} = useContext(TodoContext);

  const [addTodo] = useMutation(ADD_TODO)
  const [updateTodo] = useMutation(UPDATE_TODO)
  const [todo, setTodo] = useState({
    title:'',
    details:'',
    date:''
  })

  const {loading, error, data} = useQuery(GET_TODO, {
    variables: {id: selectedId}, onCompleted: (data) => setTodo(data?.getTodo)
  })

  const inputAreaRef = useRef();

  useEffect(() => {
    const checkIfClickOutside = e => {
      if (!inputAreaRef.current.contains(e.target)) {
        setSelectedId(0)
      }
    }
    document.addEventListener('mousedown', checkIfClickOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickOutside)
    }
  }, [])

  const onsubmit = e => {
    if (todo?.title === "" || !todo.date) {
      alert('please provide the mandatory fields')
      return
    }
    e.preventDefault();
    if (selectedId == 0) {
      addTodo({
        variables: {
          title: todo.title,
          details: todo.details,
          date: todo.date
        },refetchQueries:[
          {query: GET_TODOS}
        ]
      })

      setTodo({
        title:'',
        details:'',
        date:''
      })
    } else {
      updateTodo({
        variables: {
          id: selectedId,
          title: todo.title,
          details: todo.details,
          date: todo.date
        },refetchQueries:[
          {query: GET_TODOS}
        ]
      })

      setTodo({
        title:'',
        details:'',
        date:''
      })

      setSelectedId(0)      
    }
    
  }

  return (
    <form onSubmit={onsubmit} ref={inputAreaRef}>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Title *</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Title"
          value={todo?.title}
          onChange={e => setTodo({...todo, title: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Details</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Enter Details"
          value={todo?.details}
          onChange={e => setTodo({...todo, details: e.target.value })}

        />
      </div>
      <div className="form-group">
        <label>Date *</label>
        <input
          type="date"
          className="form-control"
          value={moment(todo?.date).format('YYYY-MM-DD')}
          onChange={e => setTodo({...todo, date: e.target.value })}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        {selectedId === 0 ? 'ADD': 'UPDATE'}
      </button>
    </form>
  );
};


export default AddTodos;