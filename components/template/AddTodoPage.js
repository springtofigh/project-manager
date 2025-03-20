import { GrAddCircle } from "react-icons/gr";
import { BsAlignStart } from "react-icons/bs";
import { useState } from "react";
import RadioButton from "../element/RadioButton";
import { FiSettings } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function AddTodoPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("todo");

    const addHandler = async () => {
        if (!description.trim()) {
            toast.error("Description is required");
            return;
        }

        const res = await fetch('/api/todos', {
            method: 'POST',
            body: JSON.stringify({ title, status, description }),
            headers:{"Content-Type": "application/json"}
        });

        const data = await res.json();
        if (data.status === 'success') {
            setTitle("")
            setStatus("todo")
            setDescription("")
            toast.success("Todo added!")
        }
    }

  return (
    <div className="add-form">
        <h2>
            <GrAddCircle/>
            Add New Todo
        </h2>
        <div className="add-form__input">
            <div className="add-form__input--first">
                <label htmlFor="title">Title: </label>
                <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="add-form__input--first">
                <label htmlFor="todo-description">Description: </label>
                <textarea
                    onChange={e => setDescription(e.target.value)}
                    name="description"
                    id="todo-description"
                    value={description} 
                    >
                </textarea>
            </div>
            <div className="add-form__input--second">
            <RadioButton status={status} setStatus={setStatus} value="todo" title="Todo">
                <BsAlignStart/>
            </RadioButton>
            <RadioButton status={status} setStatus={setStatus} value="inProgress" title="in Progress">
                <FiSettings/>
            </RadioButton>
            <RadioButton status={status} setStatus={setStatus} value="review" title="Review">
                <AiOutlineSearch/>
            </RadioButton>
            <RadioButton status={status} setStatus={setStatus} value="done" title="Done">
                <MdDoneAll/>
            </RadioButton>
            </div>
            <button onClick={addHandler}>Add</button>
        </div>
        <ToastContainer />
    </div>
  )
}

export default AddTodoPage