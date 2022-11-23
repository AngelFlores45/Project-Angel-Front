import React, {useState} from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import {useNavigate} from 'react-router-dom';
import UserPool from "./UserPool";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

const Login = ()=>{
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("isLoggedIn")|| false));
    const navigate = useNavigate();
    const onSubmit = (event) =>{
        event.preventDefault();
        const user = new CognitoUser({
            Username: email,
            Pool: UserPool,
        });
        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password,
        });
        user.authenticateUser(authDetails,{
            onSuccess: (data) =>{
                console.log("onSuccess: ", data);
                setauthenticated(true)
                localStorage.setItem("isLoggedIn", true);
                navigate('/project');
            },
            onFailure: (err) => {

                console.error("onFaiLure :", err);
            }, 
            newPasswordRequired: (data) => {
                console.log("newPasswordRequired :", data);
            },
        });
    };
    return(
        <Paper elevation={6} style={{margin:"10px",padding:"100px", margin:"200px", textAling:"left"}}>
            <div>
                <form onSubmit={onSubmit}>
                    
                    <TextField  label="eMail" variant="outlined" fullWidth 
                    value={email}
                    onChange={(event)=> setEmail(event.target.value)}></TextField>
                    <br/>
                    <br/>
                    <TextField  label="Passworf" variant="outlined" fullWidth
                    value={password}
                    onChange={(event)=> setPassword(event.target.value)}></TextField>

<br/>
                    <br/>
                    <Button type="submit" variant="contained" color="success">Login</Button>
                </form>
            </div>
            </Paper>
    );
};
export default Login;