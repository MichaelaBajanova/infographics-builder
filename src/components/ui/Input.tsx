import React from 'react'
import 'styles/ui/Input.scss'

interface IProps {
    id?: string,
    type?: string,
    placeholder?: string,
    value?: string,
    onChange?: (event: any) => void,
    onKeyPress?: (event: any) => void,
}

const Input = (props: IProps) => {
    const {id, type, placeholder, value, onChange, onKeyPress} = props

    return (
        <input
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
        />
    )
}

export default Input
