
function ProfileForm({ name, lastName, email, password, setName, setlastName, setEmail, setPassword, submitHandler }) {
  return (
    <>
    <div className="profile-form__input">
        <div>
            <label htmlFor="name">Name:</label>
            <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
            <label htmlFor="lastName">last Name:</label>
            <input id="lastName" type="text" value={lastName} onChange={e => setlastName(e.target.value)} />
        </div>
        <div>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
    </div>
    <button onClick={submitHandler}>Submit</button>
    </>
  )
}

export default ProfileForm;