import  { useContext,useState } from 'react'
import { Context } from '../../main';
import axios from 'axios';
import { Link,Navigate } from 'react-router-dom';
import toast from "react-hot-toast";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized,} = useContext(Context)

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/user/register",
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={'/'} />
  }

  return (
    <div>
      <div className="authPage">
        <div className="container">
          <div className="header">
            <h3>Create New Account</h3>
          </div>
          <form>
            <div className="inputTag">
              <label>Register as</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Employer">user</option>
                  <option value="Job Seeker">admin</option>
                </select>
              </div>
            </div>

            <div className="inputTag">
              <label>Name</label>
              <div>
                <input 
                type='text' 
                value={name} 
                onChange={(e)=>setName(e.target.value)} 
                placeholder='xyz'
                />
              </div>
            </div>

            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input 
                type='Email' 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)} 
                placeholder='abc@gmail.com'
                />
              </div>
            </div>

            <div className="inputTag">
              <label>Phone Number</label>
              <div>
                <input 
                type='number' 
                value={phone} 
                onChange={(e)=>setPhone(e.target.value)} 
                placeholder='0123456789'
                />
              </div>
            </div>

            <div className="inputTag">
              <label>Password</label>
              <div>
                <input 
                type='password' 
                value={password} 
                onChange={(e)=>setPassword(e.target.value)} 
                placeholder='Password'
                />
              </div>
            </div>
            <button onClick={handleRegister} type='submit'>Register</button>
            <Link to={'/login'}>Login Now</Link>
          </form>
        </div>
      </div>
    </div>
  )
}


