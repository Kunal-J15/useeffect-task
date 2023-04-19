import React,{useState, useEffect} from "react";

const AuthContext = React.createContext({
    isLoggedIn :false,
    logOut: ()=>{},
    logIn :(email,password)=>{}
})



export const AuthContextProvider = (props)=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(()=>{
  if(localStorage.getItem("logged")==="1"){
    setIsLoggedIn(true);
  }
},[])
const loginHandler = (email, password) => {
  // We should of course check email and password
  // But it's just a dummy/ demo anyways
  localStorage.setItem("logged","1");
  setIsLoggedIn(true);
};

const logoutHandler = () => {
  localStorage.removeItem("logged");
  setIsLoggedIn(false);
};
    return <AuthContext.Provider value={{
        isLoggedIn :isLoggedIn,
        logOut: logoutHandler,
        logIn :loginHandler
    }}>{props.children}
    </AuthContext.Provider>
}

export default  AuthContext;