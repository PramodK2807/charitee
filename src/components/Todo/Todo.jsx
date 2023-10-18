import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { todoList } from '../../recoil/todoRecoil';
import TodoInput from './TodoInput';

const Todo = () => {
  // const todo = useRecoilValue(todoList);
  const [todo, setTodo] = useRecoilState(todoList);

  const handleComplete = (e, id) => {
    e.preventDefault();
    const index = todo.findIndex((item) => item.id === id);

    if (index !== -1) {
      const updatedTodo = [...todo];
      updatedTodo[index] = {
        ...updatedTodo[index],
        status:
          updatedTodo[index].status === 'Completed' ? 'Pending' : 'Completed',
      };
      setTodo(updatedTodo);
    }
  };

  return (
    <>
      <div className='todo_bg'>
        <div className='container py-5'>
          <h1 className='text-center'>Todo App</h1>
          <TodoInput />
          <div className='box_shadow p-5 bg-light rounded'>
            <h3 className='text-center text-success pb-3'>All Todos</h3>
            <table className='table table-striped table-hover'>
              <thead >
                <tr>
                  <th scope='col'>S.No.</th>
                  <th scope='col'>Todo Task</th>
                  <th scope='col'>Quantity</th>
                  <th scope='col'>Price/Qty</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {todo &&
                  todo.length > 0 &&
                  todo.map((items, i) => {
                    return (
                      <tr key={items.id}>
                        <td>{i + 1}</td>
                        <td>{items.title}</td>
                        <td>
                          {items.qty} {items.unit}
                        </td>
                        <td>{items.price}</td>
                        <td>{items.status}</td>
                        <td>
                          <button
                            className={`px-3 py-1 rounded-pill ${
                              items.status === 'Completed'
                                ? 'bg-danger'
                                : ' bg-success'
                            }`}
                            onClick={(e) => handleComplete(e, items.id)}
                            // disabled={items.status === 'Completed'}
                          >
                            Change Status
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default Todo;
