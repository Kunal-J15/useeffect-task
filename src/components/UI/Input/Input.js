import React from "react";
import classes from "./Input.module.css";

const Input = (props)=>{
    return (<div
        className={`${classes.control} ${
          props.valid === false ? classes.invalid : ''
        }`}
      >
        <label htmlFor={props.Text}>{props.Text}</label>
        <input
          type={props.Text}
          id={props.Text}
          value={props.val}
          onChange={props.onChangeHandler}
          onBlur={props.onBlurHandler}
        />
      </div>);
}
export default Input;