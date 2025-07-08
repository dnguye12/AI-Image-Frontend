export interface ImageProps {
    id: string;
    model: string;
    prompt: string;
    width: number;
    height: number;
    seed: number;
    likedBy: string[];
    dislikedBy: string[];
    createdAt: Date;
    createdBy?: string | undefined;
}