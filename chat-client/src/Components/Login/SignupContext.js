import React, { createContext, useState } from "react";

const SignupContext = createContext()

const SignupProvider = ({ children }) => {
    const [showSignUp, setShowSignUp] = useState(false)
    return (
        <SignupContext.Provider value={{ showSignUp, setShowSignUp }} >
            {children}
        </SignupContext.Provider>
    )
}

export { SignupContext, SignupProvider }