import React,{useState} from "react";
import {Outlet, Link, useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
  
    const navigate = useNavigate();
    const handlesubmit = (e) => {
      e.preventDefault();
      // console.log("button click");
      axios
        .post("http://localhost:9000/login19", {
          Email: Email,
          Password: Password,
        })
        .then((res) => {
          console.log(res.data[0].Firstname);
          console.log(res.data[0].accesstoken);
          localStorage.setItem("token", res.data[0].accesstoken);
          localStorage.setItem("username", res.data[0].Firstname);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return (
        <div>
          <nav>
            <ul>
                <li><Link to="/Registration">Registration</Link></li>
            </ul>
          </nav>
          <form onSubmit={handlesubmit}>
            <table>
              <tr>
                <td>Email</td>
                <td>
                  <input
                    type="email"
                    name="Email"
                    value={Email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Password</td>
                <td>
                  <input
                    type="password"
                    name="Password"
                    value={Password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                {/* <td>&nbsp;</td> */}
                {/* <br/> */}
                <td>
                  <input className="btn btn-primary" type="submit" value="submit" />
                </td>
              </tr>
            </table>
          </form>
          <Outlet />
        </div>
      );
    };
    export default Login;
    