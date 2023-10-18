import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { todoList } from '../../recoil/todoRecoil';

const TodoInput = () => {
  const [task, setTask] = useState();
  const [price, setPrice] = useState();
  const [qty, setQty] = useState(1);
  const [unit, setUnit] = useState(null);

  const setTodoItem = useSetRecoilState(todoList);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: Date.now().toString(),
      title: task,
      status: 'Pending',
      price,
      qty,
      unit,
    };
    setTodoItem((oldTodos) => [newTodo, ...oldTodos]);
    setTask('')
    setPrice('')
    setUnit(null)
    setQty(1)
  };
  return (
    <div className='my-5 box_shadow bg-light rounded'>
      <h3 className='text-center py-3 text-danger'>Enter New Todo</h3>
      <form onSubmit={handleSubmit}>
        <div className='row py-3 px-5 align-items-center justify-content-between'>
          <div className='col-6 py-0'>
            <label htmlFor='task'>Enter Task</label>
            <input
              type='text'
              placeholder='Enter Task'
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className='col-6 py-0'>
            <label htmlFor='price'>Enter Price</label>
            <input
              type='number'
              placeholder='Enter the estimated price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className='col-7 my-3 py-4 border rounded'>
            <label className='text-center w-100 mb-3'>Select Quantity</label>
            <div className='row align-items-center '>
              <div className='col-7'>
                <select
                  name='qty'
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                >
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </select>
              </div>
              <div className='col-5 radio'>
                <div>
                  <input
                    type='radio'
                    name='qty'
                    value='Kg'
                    id='kg'
                    onChange={(e) => setUnit(e.target.value)}
                  />
                  <label htmlFor='kg'>Kg</label>
                </div>
                <div>
                  <input
                    type='radio'
                    name='qty'
                    value='Litre'
                    id='litre'
                    onChange={(e) => setUnit(e.target.value)}
                  />
                  <label htmlFor='litre'>Litre</label>
                </div>
              </div>
            </div>
          </div>
          <div className='col-2 my-5'>
            <button className='w-100 fw-bold rounded' type='submit'>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default TodoInput;
