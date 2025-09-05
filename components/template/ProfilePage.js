import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import ProfileForm from "../module/ProfileForm";
import ProfileData from "../module/ProfileData";


function ProfilePage() {
    const [ name, setName ] = useState("");
    const [ lastName, setlastName ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ data, setData ] = useState(null); // اگر null باشه یعنی هنوز پروفایل ساخته نشده (create)
    const [isEditing, setIsEditing] = useState(false); // کنترل نمایش فرم ویرایش

    useEffect(() => {fetchProfile()}, []);

    const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      const json = await res.json();

      // اگر api پاسخ موفق داده و data موجوده، stateها رو پر کن
      if (json.status === "success" && json.data) {
        setData(json.data);
        setName(json.data.name || "");
        setlastName(json.data.lastName || "");
        // در نظر بگیر که ایمیل یا فیلدهای دیگر هم اونجا باشند
      } else {
        // اگر پروفایل وجود نداشت، data میمونه null و فرم برای ایجاد نشان داده خواهد شد
        setData(null);
      }
    } catch (err) {
      console.error("fetchProfile error:", err);
    }
  };

    const submitHandler = async () => {
        const res = await fetch('/api/profile', {
            method:"POST",
            body: JSON.stringify({name, lastName, password}),
            headers: { "Content-Type": "application/json" }
        });

        const data = await res.json();
        console.log(data);
    }
  return (
    <div className="profile-form">
        <h2>
            <CgProfile/>
            Profile
        </h2>
        {isEditing ? (
        // فرم ویرایش / ایجاد
        // فرض کردم ProfileForm خودش یک <form> داره و از submitHandler استفاده میکنه
        <ProfileForm
          name={name}
          lastName={lastName}
          password={password}
          setName={setName}
          setlastName={setlastName}
          setPassword={setPassword}
          submitHandler={submitHandler}
        />
      ) : (
        // نمایش دیتا و دکمه‌ی ویرایش / افزودن
        <>
          <ProfileData data={data} />
          <div>
            <button
              onClick={() => {
                // اگر data وجود داره، state ها قبلاً در fetchProfile پر شده‌اند.
                setIsEditing(true);
              }}
              className="submit-btn"
            >
              {data ? "Edite" : "Send"}
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default ProfilePage;