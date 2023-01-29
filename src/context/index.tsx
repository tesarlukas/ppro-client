import React, {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useState,
} from 'react';
import { AuthUser as User } from '../shared/types';

interface Props {
    children: ReactNode;
}

interface UserContextInterface {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
}

const userContextDefaultValue: UserContextInterface = {
    user: { id: 0, name: '', role: '' },
    setUser: () => ({ name: '', role: '' }),
};

export const UserContext = createContext<UserContextInterface>(
    userContextDefaultValue,
);

export const UserContextProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User>(userContextDefaultValue.user);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
