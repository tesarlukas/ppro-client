import React, {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useState,
} from 'react';

interface Props {
    children: ReactNode;
}

interface UserContextInterface {
    user: string;
    setUser: Dispatch<SetStateAction<string>>;
}

const userContextDefaultValue: UserContextInterface = {
    user: '',
    setUser: () => '',
};

export const UserContext = createContext<UserContextInterface>(
    userContextDefaultValue,
);

export const UserContextProvider = ({ children }: Props) => {
    const [user, setUser] = useState<string>('');
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
