import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import ProfileForm from "../module/ProfileForm";
import ProfileData from "../module/ProfileData";
import ProfileEdit from "../module/ProfileEdit";
import { signOut } from "next-auth/react";


function ProfilePage() {
  const [name, setName] = useState("");
  const [lastName, setlastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState(null); // اگر null باشه یعنی هنوز پروفایل ساخته نشده (create)
  const [isEditing, setIsEditing] = useState(false); // کنترل نمایش فرم ویرایش

  useEffect(() => { fetchProfile() }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      const json = await res.json();

      // اگر api پاسخ موفق داده و data موجوده، stateها رو پر کن
      if (json.status === "success" && json.data) {
        setData(json.data);
        setName(json.data.name || "");
        setlastName(json.data.lastName || "");
        setEmail(json.data.email || "");
      } else {
        // اگر پروفایل وجود نداشت، data میمونه null و فرم برای ایجاد نشان داده خواهد شد
        setData(null);
      }
    } catch (err) {
      console.error("fetchProfile error:", err);
    }
  };

  const submitHandler = async () => {
    const url = data ? "/api/update-profile" : "/api/profile";
    const method = data ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      body: JSON.stringify({ name, lastName, email, password }),
      headers: { "Content-Type": "application/json" }
    });

    const result = await res.json();
    console.log(result);

    // ✅ اگر ایمیل تغییر کرد → signOut
    if (result.status === "success") {
      if (result.updatedFields?.email) {
        alert("ایمیل تغییر کرد، لطفاً دوباره وارد شوید");
        signOut({ callbackUrl: "/signin" });
      } else {
        setIsEditing(false);
        fetchProfile(); // رفرش دیتا
      }
    };

  }

  return (
    <div className="profile-form">
      <h2>
        <CgProfile />
        Profile
      </h2>
      {isEditing ? (
        // فرم ویرایش
        <ProfileEdit
          name={name}
          lastName={lastName}
          email={email}
          password={password}
          setName={setName}
          setEmail={setEmail}
          setlastName={setlastName}
          setPassword={setPassword}
          submitHandler={submitHandler}
        />
      ) : (
        <>
          {data ? (
            <>
              <ProfileData data={data} />
              <div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="submit-btn"
                >
                  Edit
                </button>
              </div>
            </>
          ) : (
            // اگر پروفایل وجود نداره، مستقیم فرم ساخت رو نشون بده
            <ProfileForm
              name={name}
              lastName={lastName}
              password={password}
              setName={setName}
              setlastName={setlastName}
              setPassword={setPassword}
              submitHandler={submitHandler}
            />
          )}
        </>
      )}
    </div>
  )
}

export default ProfilePage;