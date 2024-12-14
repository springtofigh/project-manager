
function ProfileData({ data }) {
  return (
    <div className="profile-data">
        <div>
            <span>Name: </span>
            <p>{data.name}</p>
        </div>
        <div>
            <span>last Name: </span>
            <p>{data.lastName}</p>
        </div>
        <div>
            <span>Email: </span>
            <p>{data.email}</p>
        </div>
    </div>
  )
}

export default ProfileData;