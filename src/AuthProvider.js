import React, { useState } from 'react';
import { AsyncStorage } from 'react-native';

export const AuthContext = React.createContext({
    user: null,
    login: () => {},
    logout: () => {}
});

function AuthProvider({children}){
    const [user, setUser] = useState(null);

    return (<AuthContext.Provider value={{
        user,
        login: () => {
            const fakeUser = {username: "bobbb"}
            setUser(fakeUser);
            AsyncStorage.setItem('user', JSON.stringify(fakeUser))
        },
        logout: () => {
            setUser(null);
            AsyncStorage.removeItem('user')
        }
    }}>
        {children}
    </AuthContext.Provider>
    );
}

export default AuthProvider;
