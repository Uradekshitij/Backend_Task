import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState({})

  const validate = () => {
    const errors = {}
    if(!name) errors.name = 'Full name is required'
    if(!email) errors.email = 'Email is required'
    else if(!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Enter a valid email'
    if(!password) errors.password = 'Password is required'
    else if(password.length < 6) errors.password = 'Password must be at least 6 characters'
    return errors
  }

  const errors = validate()
  const isValid = Object.keys(errors).length === 0

  const navigate = useNavigate()

  const handleSubmit =async (e) => {
    e.preventDefault()
    setTouched({name:true,email:true,password:true})
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/register",
        { name, email, password },
        { withCredentials: true }
      );

      alert("Register successful!");
      navigate("/login");

    } catch (error) {
      console.error(error);
      alert("Invalid credentials or server error");
    }
    navigate('/login', { replace: true })
  }

  return (
    <div className="app-container">
      <div className="auth-root">
        <div className="auth-layout">
          <div className="auth-ill auth-card">
            <svg width="340" height="220" viewBox="0 0 340 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="340" height="220" rx="14" fill="#FEF3C7" />
              <rect x="20" y="28" width="200" height="24" rx="8" fill="#fff" />
            </svg>
          </div>

          <div className="auth-card">
            <h2 style={{marginTop:0}}>Create your account</h2>
            <p className="muted">Start organizing tasks for your team in minutes.</p>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <label>Full name</label>
                <input
                  className={`input ${touched.name && errors.name ? 'error' : ''}`}
                  type="text"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  onBlur={()=>setTouched(t=>({...t,name:true}))}
                />
                {touched.name && errors.name && <div className="error-text">{errors.name}</div>}
              </div>

              <div className="form-row">
                <label>Email</label>
                <input
                  className={`input ${touched.email && errors.email ? 'error' : ''}`}
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  onBlur={()=>setTouched(t=>({...t,email:true}))}
                />
                {touched.email && errors.email && <div className="error-text">{errors.email}</div>}
              </div>

              <div className="form-row">
                <label>Password</label>
                <input
                  className={`input ${touched.password && errors.password ? 'error' : ''}`}
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  onBlur={()=>setTouched(t=>({...t,password:true}))}
                />
                {touched.password && errors.password && <div className="error-text">{errors.password}</div>}
              </div>

              <button className="btn-primary" style={{width:'100%'}} disabled={!isValid}>Create account</button>

              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
                <small className="muted">Already have an account?</small>
                <Link to="/login">Sign in</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
