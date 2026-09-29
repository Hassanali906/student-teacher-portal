import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const accounts = {
  student: { email: "student@example.com", password: "123456", name: "Ali Khan" },
  teacher: { email: "teacher@example.com", password: "123456", name: "Mr. Ahmed" }
};

function Login({ role, setRole, onLogin }) {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");

  function submit(e){
    e.preventDefault();
    const a=accounts[role];
    if(email===a.email && password===a.password) onLogin({...a,role});
    else setError(`Use ${a.email} with password 123456`);
  }

  return <main className="page">
    <section className="login-card">
      <div className="brand"><div className="logo">SP</div><div><h1>Student Portal</h1><p>Student & Teacher Login Portal</p></div></div>
      <div className="tabs">
        <button className={role==="student"?"active":""} onClick={()=>{setRole("student");setError("")}}>Student</button>
        <button className={role==="teacher"?"active":""} onClick={()=>{setRole("teacher");setError("")}}>Teacher</button>
      </div>
      <h2>{role==="student"?"Student Login":"Teacher Login"}</h2>
      <p className="muted">Sign in to access your dashboard.</p>
      <form onSubmit={submit}>
        <label>Email</label>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email" required />
        <label>Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password" required />
        {error && <div className="error">{error}</div>}
        <button className="login-btn" type="submit">Sign In</button>
      </form>
      <div className="demo"><strong>Demo account</strong><span>{accounts[role].email}</span><span>Password: 123456</span></div>
    </section>
  </main>;
}

function Dashboard({user,onLogout}){
  const student=user.role==="student";
  return <div className="dashboard">
    <header className="topbar">
      <div className="brand small"><div className="logo">SP</div><div><strong>Student Portal</strong><small>{student?"Student Dashboard":"Teacher Dashboard"}</small></div></div>
      <button className="logout" onClick={onLogout}>Logout</button>
    </header>
    <main className="content">
      <div className="welcome"><div><p className="eyebrow">{student?"STUDENT AREA":"TEACHER AREA"}</p><h1>Welcome, {user.name} 👋</h1><p>Here is your portal overview.</p></div><div className="avatar">{user.name[0]}</div></div>
      <div className="cards">
        {student ? <>
          <div className="stat"><span>📚</span><strong>6</strong><small>Enrolled Courses</small></div>
          <div className="stat"><span>📝</span><strong>3</strong><small>Pending Assignments</small></div>
          <div className="stat"><span>✅</span><strong>12</strong><small>Completed Tasks</small></div>
        </> : <>
          <div className="stat"><span>👨‍🎓</span><strong>84</strong><small>Total Students</small></div>
          <div className="stat"><span>📚</span><strong>5</strong><small>My Courses</small></div>
          <div className="stat"><span>📝</span><strong>9</strong><small>Pending Reviews</small></div>
        </>}
      </div>
      <section className="panel"><h2>{student?"Recent Courses":"Recent Classes"}</h2>
        <div className="list">
          {student ? <>
            <div><b>Modern Web Development</b><span>Progress: 72%</span></div>
            <div><b>JavaScript Fundamentals</b><span>Progress: 58%</span></div>
            <div><b>Database Systems</b><span>Progress: 84%</span></div>
          </> : <>
            <div><b>Web Development — Batch A</b><span>32 students</span></div>
            <div><b>JavaScript — Batch B</b><span>27 students</span></div>
            <div><b>React Basics — Batch A</b><span>25 students</span></div>
          </>}
        </div>
      </section>
    </main>
  </div>;
}

function App(){
  const [role,setRole]=useState("student");
  const [user,setUser]=useState(null);
  return user ? <Dashboard user={user} onLogout={()=>setUser(null)}/> : <Login role={role} setRole={setRole} onLogin={setUser}/>;
}
createRoot(document.getElementById("root")).render(<App />);
