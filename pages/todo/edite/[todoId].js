import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function TodoPage() {
  const router = useRouter();
  const { todoId } = router.query;
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');

  // دریافت اطلاعات Todo از API
  useEffect(() => {
      if (!todoId) return;

      const fetchTodo = async () => {
          try {
              const response = await fetch(`/api/todos/${todoId}`);
              const data = await response.json();

              if (data.status === 'success') {
                  setTodo(data.data);
                  setTitle(data.data.title);
                  setStatus(data.data.status);
                  setDescription(data.data.description);
              } else {
                  setError(data.message);
              }
          } catch (err) {
              setError('Failed to fetch todo');
          } finally {
              setLoading(false);
          }
      };

      fetchTodo();
  }, [todoId]);

  // ارسال درخواست PATCH برای ویرایش Todo
  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const response = await fetch(`/api/todos/${todoId}`, {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ title, status, description }),
          });

          const data = await response.json();

          if (data.status === 'success') {
              alert('Todo updated successfully!');
              router.push('/'); 
          } else {
              setError(data.message);
          }
      } catch (err) {
          setError('Failed to update todo');
      }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
     <div className="todo-page">
      <h1 className="page-title">Edit Todo</h1>
      <form className="todo-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Update Todo</button>
      </form>
    </div>
  );
}

export default TodoPage;