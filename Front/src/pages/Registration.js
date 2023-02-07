import React, {useState} from 'react';
import axios from 'axios';
import {Outlet, Link} from "react-router-dom";

const Registration = () =>{
    const[Firstname, setFirstName] = useState("");
    const[Lastname, setLastName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Confirmpassword, setConfirmPassword] = useState("");
    const [mobilenumber, setMobileNumber] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [dob, setDob] = useState("");

    const handlesubmit = () => {
        if(Password !== Confirmpassword) {
            alert("wrong credentials!")
    } else {
            axios.post("http://localhost:9000/registration19",{
            Firstname: Firstname,
            Lastname: Lastname,
            Email: Email,
            Password: Password,
            Confirmpassword: Confirmpassword,
            mobilenumber: mobilenumber,
            gender: gender,
            address: address,
            dob: dob,

        })
            
        }
    };


    return(
        <div>
            <nav>
                <ul>
                    <li><Link to="/Login">Login</Link></li>
                </ul>
            </nav>
            <form onSubmit={handlesubmit}>
              <table>
                <tr>
                    <td>Firstname</td>
                    <td>
                        <input type="text" name="Firstname" value={Firstname} onChange={(e)=>{
                            setFirstName(e.target.value);
                        }}/>
                    </td>
                </tr>
                <tr>
                <td>Lastname</td>
                    <td>
                        <input type="text" name="Lastname" value={Lastname} onChange={(e)=>{
                            setLastName(e.target.value);
                        }}/>
                    </td>
                </tr>
                <tr>
                <td>Email</td>
                    <td>
                        <input type="email" name="Email" value={Email} onChange={(e)=>{
                            setEmail(e.target.value);
                        }}/>
                    </td>
                </tr>
                <tr>
                <td>Password</td>
                    <td>
                        <input type="password" name="Password" value={Password} onChange={(e)=>{
                            setPassword(e.target.value);
                        }}/>
                    </td>
                </tr>
                <tr>
                <td>Confirmpassword</td>
                    <td>
                        <input type="password" name="Confirmpassword" value={Confirmpassword} onChange={(e)=>{
                            setConfirmPassword(e.target.value);
                        }}/>
                    </td>
                </tr>
                <tr>
                <td>Mobile number</td>
                    <td>
                        <input type="phone" name="mobilenumber" value={mobilenumber} onChange={(e)=>{
                            setMobileNumber(e.target.value);
                        }}/>
                    </td>
                </tr>   
                <tr>
                <td>Gender</td>
                    <td>
                        <input type="text" name="gender" value={gender} onChange={(e)=>{
                            setGender(e.target.value);
                        }}/>
                    </td>
                </tr> 
                <tr>
                <td>Address</td>
                    <td>
                        <input type="text" name="address" value={address} onChange={(e)=>{
                            setAddress(e.target.value);
                        }}/>
                    </td>
                </tr> 
                <tr>
                <td>DOB</td>
                    <td>
                        <input type="date" name="dob" value={dob} onChange={(e)=>{
                            setDob(e.target.value);
                        }}/>
                    </td>
                </tr>          
                <tr>
                    {/* <td>&nbsp;</td> */}
                    <br/><br/>
                    <td >
                    <input className="btn btn-dark" type="submit" value="submit" />
                    </td>
                </tr>
              </table>
            </form>
            <Outlet/>
        </div>
    )
} 

export default Registration;