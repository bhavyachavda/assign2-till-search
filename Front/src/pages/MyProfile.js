import axios from "axios";
import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

const MyProfile = () => {
  const [data, setData] = useState([]);
  const [Firstname, setFirstName] = useState("");
  const [Lastname, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  // const [Confirmpassword, setConfirmPassword] = useState("");
  const [mobilenumber, setMobileNumber] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) 
    setData([]);
  }, []);

  useEffect(() => {

  }, [data]);

  useEffect(() => {
    profile();
  }, []);

  const profile = async () => {
    const token= localStorage.getItem("token");
    // console.log(token)
    const res = await axios.get("http://localhost:9000/myprofile", { params: { token } })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setFirstName(res.data.Firstname);
        setLastName(res.data.Lastname);
        setEmail(res.data.Email);
        setPassword(res.data.Password);
        // setConfirmPassword(res.data.Confirmpassword);
        setMobileNumber(res.data.mobilenumber);
        setGender(res.data.gender);
        setAddress(res.data.address);
        setDob(res.data.dob);
        console.log("from client", res.data);
      })
      .catch((err) => {
        setData([]);
        console.log(err);
      });
  };
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>

      <form>
        <table>
          <tr>
            <td>First Name</td>
            <td>
              <input
                type="text"
                name="Firstname"
                value={Firstname}
                required
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </td>
          </tr>

          <tr>
            <td>Last Name</td>
            <td>
              <input
                type="text"
                name="Lastname"
                value={Lastname}
                required
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </td>
          </tr>

          <tr>
            <td>Email</td>
            <td>
              <input
                type="mail"
                name="Email"
                value={Email}
                required
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
                type="text"
                name="Password"
                value={Password}
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </td>
          </tr>

          {/* <tr>
            <td>Confirm Password</td>
            <td>
              <input
                type="password"
                name="Confirmpassword"
                value={Confirmpassword}
                required
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </td>
          </tr> */}

          <tr>
            <td>Mobile</td>
            <td>
              <input
                type="phone"
                name="mobilenumber"
                value={mobilenumber}
                required
                onChange={(e) => {
                  setMobileNumber(e.target.value);
                }}
              />
            </td>
          </tr>

          <tr>
            <td>Gender</td>
            <td>
              <input
                type="text"
                name="gender"
                value={gender}
                required
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              />
            </td>
          </tr>

          <tr>
            <td>Address</td>
            <td>
              <input
                type="text"
                name="address"
                value={address}
                required
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </td>
          </tr>

          <tr>
            <td>Date of Birth</td>
            <td>
              <input
                type="date"
                name="dob"
                value={dob}
                required
                onChange={(e) => {
                  setDob(e.target.value);
                }}
              />
            </td>
          </tr>
          <td>&nbsp;</td>
          <td colSpan="2">
            <input type="submit" className="btn btn-dark" value="submit" />
          </td>
        </table>
      </form>
      <Outlet />
    </div>
  );
};
export default MyProfile;
