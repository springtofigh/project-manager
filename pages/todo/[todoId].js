import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

function SingleTodo() {
  const router = useRouter();
  const { todoId } = router.query;
  const [todo, setTodo] = useState(null); // حالت برای ذخیره داده‌های todo
  const [loading, setLoading] = useState(true); // حالت برای مدیریت بارگذاری
  const [error, setError] = useState(null); // حالت برای مدیریت خطاها

  const fetchTodo = async () => {
    try {
      const response = await fetch(`/api/todos/${todoId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch todo");
      }
      const data = await response.json();
      setTodo(data.data); // ذخیره داده‌ها در state
    } catch (error) {
      setError(error.message); // ذخیره خطا
    } finally {
      setLoading(false); // پایان بارگذاری
    }
  };

  
  useEffect(() => {
    if (todoId) { // فقط اگر todoId وجود داشت، داده‌ها را دریافت کنید
      fetchTodo();
    }
  }, [todoId]); // وابستگی به todoId

  if (!todo) {
    return <div>Loading...</div>; // نمایش پیام در حال بارگذاری
  }

  const statusMap = {
  todo: { label: "To Do 📝", class: "todo" },
  pending: { label: "inProgress ⏳", class: "pending" },
  review: { label: "In Review 🔍", class: "review" },
  done: { label: "Done ✅", class: "done" },
};

  return (
    <div className="card">
      <h2 className="title">{todo.title}</h2>
      <p className={`status ${statusMap[todo.status]?.class || ""}`}>
        Status: {statusMap[todo.status]?.label || "Unknown"}
      </p>
      <p className="description">{todo.description}</p>
    </div>
  );
}

export default SingleTodo;

