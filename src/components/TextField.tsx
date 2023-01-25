import React, { useState } from 'react';

interface TextFieldProps {
    value?: string;
    onChange?: (value: string) => void;
    type: 'text' | 'password';
    placeholder?: string;
    id?: string;
    name?: string;
}

const TextField: React.FC<TextFieldProps> = (props: TextFieldProps) => {
    const [text, setText] = useState<string>('');

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);

        if (props.onChange !== undefined) props.onChange(e.target.value);
    };

    return (
        <input
            className="border-slate-300 rounded-sm h-10 bg-slate-600"
            id={props.id}
            type={props.type}
            onChange={handleOnChange}
            value={text}
            name={props.name}
            placeholder={props.placeholder}
        />
    );
};

export default TextField;
