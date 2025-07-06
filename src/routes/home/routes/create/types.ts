import { type Dispatch, type SetStateAction } from "react";

export interface InputProps {
    prompt: string,
    model: string,
    width: number,
    height: number,
    seed: number
}

export interface CreateFormProps {
    input: InputProps,
    setInput: Dispatch<SetStateAction<InputProps>>
}