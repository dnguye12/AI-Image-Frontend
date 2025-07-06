import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function capitalize(word : string) {
    return String(word).charAt(0).toUpperCase() + String(word).slice(1)
}