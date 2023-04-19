import React, { useState,useEffect,useReducer,useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input.js';
const emailHandler = (state,action)=>{
  if(action.type === "USER_INPUT"){
    return {value:action.val,valid:action.val.includes("@")};
  }
  if(action.type === "INPUT_BLUR"){
    return {value : state.value,valid:state.valid };
  }
  return {value:"", valid:false};
}

const passWordHandler = (state,action)=>{
  if(action.type === "USER_INPUT"){
    return {value:action.val,valid:action.val.trim().length>6};
  }
  if(action.type === "INPUT_BLUR"){
    return {value : state.value,valid:state.valid };
  }
  return {value:"", valid:false};
}
const Login = (props) => {

  const [emailState, dispachEmail] = useReducer(emailHandler,{value:"", valid:null});
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  const [passwordState, dispachPassword] = useReducer(passWordHandler,{value:"", valid:null});
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollage,setCollage] = useState("");
  const [collageIsValid,setCollageIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const {valid:emailValid} = emailState;
  const {valid:passValid} = passwordState;
  useEffect(()=>{
    const id= setTimeout(() => {
      setFormIsValid( emailState.value.includes('@') && passwordState.value.trim().length > 6 && enteredCollage.trim().length );      
    }, 500);
    return ()=>{
      clearInterval(id);
    }
  },[emailValid, passValid, enteredCollage])
  const emailChangeHandler = (event) => {
    dispachEmail({type:"USER_INPUT", val:event.target.value})
  };

  const passwordChangeHandler = (event) => {
    dispachPassword({type:"USER_INPUT",val:event.target.value});
  };

  const validateEmailHandler = () => {
    dispachEmail({type:"INPUT_BLUR"});
  };

  const validatePasswordHandler = () => {
    dispachPassword({type:"INPUT_BLUR"});
  };

  const collageChangeHandler = (e)=>{
    setCollage(e.target.value)
  }
  const validateCollageHandler = ()=>{
    setCollageIsValid(enteredCollage.trim().length>0);
  }
  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.logIn(emailState.value, passwordState.value);
  };

  const authCtx = useContext(AuthContext);
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
      <Input 
      Text ="email"
      valid={emailState.valid}
      val={emailState.value}
      onChangeHandler = {emailChangeHandler}
      onBlurHandler = {validateEmailHandler}></Input>
         
         <Input 
         Text = "password"
      valid={passwordState.valid}
      val={passwordState.value}
      onChangeHandler = {passwordChangeHandler}
      onBlurHandler = {validatePasswordHandler}></Input>
       
       <Input
       Text = "collage"
       valid = {collageIsValid}
       val = {enteredCollage}
       onChangeHandler = {collageChangeHandler}
       onBlurHandler = {validateCollageHandler}></Input>

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
