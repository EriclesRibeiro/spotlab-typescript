import { InputHTMLAttributes } from 'react';
import './index.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string,
    label: string
}

    export default function Input({id, label, ...rest}: InputProps){
    return(
        <div className='input_group'>
            {label && <label className='input_label' htmlFor={id}>{label}</label>}
            <input id={id} {...rest} />
        </div>
    )
}