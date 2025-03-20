
import { RiMastodonLine } from 'react-icons/ri';
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi';
import Link from "next/link";

function Tasks({ data, back, next, fetchTodos }) {

  const changeStatus = async (id ,status) => {
    const res =  await fetch('/api/todos' , {
      method: 'PATCH',
      body: JSON.stringify({ id ,status }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    if (data.status === "success") fetchTodos();

  }

  return (
    <div className="tasks">
        {data ?.map( item =>(
            <div key={item._id} className="tasks__card">
                <span className={item.status}></span>
                <RiMastodonLine/>
                <h4>{item.title}</h4>
                <div>{item.description}</div>
                <div>
                  {back ? (<button className='button-back' onClick={() => changeStatus(item._id, back)}><BiLeftArrow />Back</button>) : null}
                  {next ? (<button className='button-next' onClick={() => changeStatus(item._id, next)}><BiRightArrow />Next</button>) : null}
                </div>
                <div>
                    <Link
                      href={`/todo/${item._id}`}
                    >
                    <span className='button-back'>
                      Details
                    </span>
                  </Link>
                    <Link
                      href={`/todo/edite/${item._id}`}
                    >
                    <span className='button-back'>
                      Edite
                    </span>
                  </Link>
                </div>
                
            </div>
        )
        )}
    </div>
  )
}

export default Tasks;