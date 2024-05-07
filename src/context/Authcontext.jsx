import { createContext, useState } from "react";

const Authcontext = createContext();

export default Authcontext;

const AuthcontextProvider = ({children}) => {
    const [user,setUser] = useState({});

    let values = {
        user,
        setUser
    }

    return (
        <Authcontext.Provider value={values}>
            {children}
        </Authcontext.Provider>
    )
}

export { AuthcontextProvider };