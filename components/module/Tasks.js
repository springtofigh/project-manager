
import { RiMastodonLine } from 'react-icons/ri';
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi';

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
                <div>
                  {back ? (<button className='button-back' onClick={() => changeStatus(item._id, back)}><BiLeftArrow />Back</button>) : null}
                  {next ? (<button className='button-next' onClick={() => changeStatus(item._id, next)}><BiRightArrow />Next</button>) : null}
                </div>
            </div>
        )
        )}
    </div>
  )
}

export default Tasks;