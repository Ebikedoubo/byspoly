import React from "react";
import { useState, useEffect } from "react";
import Logo from "../../assests/byspoly-logo-new.png";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


export default function Login() {
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [nameerror, setNameerror] = useState(false);
    const [passworderror, setPassworderror] = useState(false);
    const [loader, setLoader] = useState(false);
    const [wrongdetails, setWrongdetails] = useState(false);
    const navigate = useNavigate();


    // make use of useeffect hook here to check if there is a value in local storage
    //for toke what ever you named it, and if there is redirect a user to the dashboard.
    useEffect(() => {
        const token = localStorage.getItem("token")

        if (token !== null) {
            navigate('/dashboard');
        }

    }, [])

    const navigateToForgetPassword = () => {

        navigate('/properties');
    };

    const handleInput = (value, type) => {
        if (type === "email") {
            setName(value.target.value)

        }
        if (type === "password") {
            setPassword(value.target.value)

        }
    }

    const postToServer = async () => {
        let url = `${process.env.REACT_APP_API_URL}/user/login`;
        let data = {
            email: name, // ensure that the object key is same as the api required filed
            password: password, // ensure that the object key is same as the api required filed
        }

        const response = await axios.post(url, data);
        return response.data;
    }

    const login = async () => {
        // this function use await/async cause we want the code to block until we have gotten a feedback from the server

        setWrongdetails(false)
        if (name.length < 1) {
            setNameerror(true)
        }

        if (password.length < 1) {
            setPassworderror(true)
        }
        console.log(name.length, password.length)
        navigate('/dashboard');
        // write your axios to sent to the server and get server feedback
        // note save feedback token in a local storage

        // create an object to hold the login data
        setLoader(true)
        postToServer().then((response) => {
            let data = response.data;
            console.log(data)
            if (data.status === "success") {
                localStorage.setItem('token', data.token)
                setLoader(false)
                navigate('/dashboard');
            }
        }).catch((error) => {
            console.error(error.response)
            setWrongdetails(true)
            setLoader(false)
        })



    }

    return (

        <div className="flex bg-[green] w-[100%] ">
            <div className="hidden lg:flex w-[50%] bg-[white] items-center justify-center">
                <div className=" ">
                    <div className="flex justify-center h-[120px]"><img src={Logo} alt="logo" /></div>
                    <div className="flex justify-center text-[15px] font-medium mt-[15px]">ADMIN MANAGEMENT PORTAL</div>
                    <div className="w-[410px] flex justify-center text-[10px] mt-[17px] text-slate-400">
                        Lorem Ipsum is simply dummy text of the printing
                        and typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center w-full lg:w-[50%] bg-no-repeat bg-cover  bg-center h-screen bg-login-bg">
                <div >

                    {wrongdetails ?
                        <h3 className="text-red-600"> Wrong username or password</h3>
                        : null}
                    <div>
                        {nameerror ?
                            <h3 className="text-red-600"> u need an email</h3>
                            : null}
                        <input className="flex items-center pl-[10px] w-[300px] h-[40px] rounded-md text-[14px] font-normal text-gray-950"
                            type="text"
                            placeholder="Enter Username"

                            onChange={(e) => handleInput(e, "email")}
                        />
                    </div>
                    <div className="mt-[50px]">
                        {passworderror ?
                            <h3 className="text-red-600"> u need an password</h3>
                            : null}
                        <input className="flex  items-center pl-[10px] w-[300px] h-[40px] rounded-md text-[14px] font-normal text-gray-950"
                            type="password"
                            placeholder="Password"

                            onChange={(e) => handleInput(e, "password")}
                        />
                    </div>

                    <button onClick={() => login()} className="flex mt-[50px] justify-center items-center bg-yellow-600 hover:bg-yellow-500 w-[300px] h-[40px] rounded-md text-[14px] font-semibold text-[white]">
                        {loader ? "Loading ........" : "Login"}
                    </button>
                    <div className="flex justify-between text-[white] mt-2">
                        <p className="text-[12px] cursor-pointer">Sign Up</p>
                        <p onClick={navigateToForgetPassword} className="text-[12px] cursor-pointer">Forgot Password</p>
                    </div>


                </div>
            </div>
        </div>

    );
}
