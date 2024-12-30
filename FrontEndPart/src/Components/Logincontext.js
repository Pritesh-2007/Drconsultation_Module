import { createContext } from "react";
 
const logincontext=createContext({
    Isloggedin:false,
    setIsLoggedIn:function(){
        Isloggedin=true; 
    }
});
export default logincontext;