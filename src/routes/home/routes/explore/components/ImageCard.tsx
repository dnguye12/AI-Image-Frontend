import type { Dispatch, SetStateAction } from "react";
import type { ImageProps } from "../types";

interface ImageCardProps {
    image: ImageProps,
    setSelectedImage: Dispatch<SetStateAction<ImageProps | null>>
}

const ImageCard = ({ image, setSelectedImage }: ImageCardProps) => {
    return (
            <img
                className="w-full mb-1 break-inside-avoid shadow-md hover:scale-105 transition-all cursor-pointer"
                crossOrigin="anonymous"
                src={`${import.meta.env.VITE_API_URL}/image/${image.id}/image`}
                alt={image.prompt}
                onClick={() => {setSelectedImage(image)}}
            />
    );
}

export default ImageCard;