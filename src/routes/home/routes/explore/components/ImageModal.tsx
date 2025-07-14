import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import moment from "moment";

import { getUser } from "@/services/user";

import type { ImageProps } from "../types";
import type { UserResource } from "@clerk/types";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageDownIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { dislikeImage, likeImage } from "@/services/image";

interface ImageModalProps {
    selectedImage: ImageProps | null;
    setSelectedImage: Dispatch<SetStateAction<ImageProps | null>>
}

const ImageModal = ({ selectedImage, setSelectedImage }: ImageModalProps) => {
    const [user, setUser] = useState<UserResource | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [likes, setLikes] = useState<number>(-1)
    const [dislikes, setDislikes] = useState<number>(-1)
    const [liked, setLiked] = useState<boolean>(false)
    const [disliked, setDisliked] = useState<boolean>(false)
    const [isLiking, setIsLiking] = useState<boolean>(false)

    useEffect(() => {
        if (isLoading && selectedImage && selectedImage.createdBy) {
            const userId = selectedImage.createdBy
            const findUser = async () => {
                try {
                    const helper = await getUser(userId)

                    setUser(helper)
                } catch (error) {
                    console.log(error)
                } finally {
                    setIsLoading(false)
                }
            }
            findUser()
        }
    }, [isLoading, selectedImage])

    useEffect(() => {
        if (selectedImage && user) {
            setLikes(selectedImage.likedBy.length)
            setDislikes(selectedImage.dislikedBy.length)

            setLiked(selectedImage.likedBy.includes(user.id))
            setDisliked(selectedImage.dislikedBy.includes(user.id))
        }
    }, [selectedImage, user])

    if (!selectedImage) {
        return null
    }

    const handleClose = () => {
        setIsLoading(true)
        setSelectedImage(null)
    }

    const handleLikeImage = async () => {
        if (disliked) {
            setDisliked(false)
            setLiked(true)
            setDislikes((prev) => prev - 1)
            setLikes((prev) => prev + 1)
        } else if (liked) {
            setLiked(false)
            setDisliked(false)
            setLikes((prev) => prev - 1)
        } else {
            setLiked(true)
            setDisliked(false)
            setLikes((prev) => prev + 1)
        }

        setIsLiking(true)
        if (selectedImage.createdBy) {
            try {
                const helper = await likeImage(selectedImage.id, selectedImage.createdBy)
                setSelectedImage(helper)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLiking(false)
            }
        }
    }

    const handleDislikeImage = async () => {
        if (liked) {
            setLiked(false)
            setDisliked(true)
            setLikes((prev) => prev - 1)
            setDislikes((prev) => prev + 1)
        } else if (disliked) {
            setLiked(false)
            setDisliked(false)
            setDislikes((prev) => prev - 1)
        } else {
            setLiked(false)
            setDisliked(true)
            setDislikes((prev) => prev + 1)
        }

        setIsLiking(true)
        if (selectedImage.createdBy) {
            try {
                const helper = await dislikeImage(selectedImage.id, selectedImage.createdBy)
                setSelectedImage(helper)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLiking(false)
            }
        }
    }

    return (
        <Dialog open={selectedImage != null} onOpenChange={handleClose}>
            <DialogContent className="!w-screen lg:!w-[calc(100vw-223px)] !max-w-screen h-screen !max-h-screen left-0 md:left-[223px] top-1/2 !translate-x-0 bg-transparent backdrop-blur-sm !p-0">
                <DialogTitle className="hidden"></DialogTitle>
                <div className="hidden lg:grid grid-cols-12 w-full h-full overflow-hidden">
                    <div className="lg:col-span-7 xl:col-span-9 !p-6 bg-background/50 h-screen max-h-screen">
                        <img
                            crossOrigin="anonymous"
                            src={`${import.meta.env.VITE_API_URL}/image/${selectedImage.id}/image`}
                            className="object-contain h-full w-full rounded-xl overflow-hidden"
                        />
                    </div>
                    <div className="lg:col-span-5 xl:col-span-3 bg-background py-6 px-6">
                        <div className="inline-flex items-center gap-2 mb-2">
                            <img src={user?.imageUrl} className=" rounded-full w-14 h-auto border" />
                            <span className="font-semibold text-primary">{user?.fullName}</span>
                        </div>
                        <p className="mb-2">{selectedImage.prompt}</p>
                        <p className="text-muted-foreground mb-4 text-sm">Created at {moment(selectedImage.createdAt).format("DD/MM/YYYY, hh:mm:ss")}</p>
                        <div className="grid grid-cols-3 gap-2">
                            <Button onClick={handleLikeImage} variant={liked ? "default" : "secondary"} disabled={isLiking}><ThumbsUpIcon /> {likes}</Button>
                            <Button onClick={handleDislikeImage} variant={disliked ? "default" : "secondary"} disabled={isLiking}><ThumbsDownIcon /> {dislikes}</Button>
                            <Button variant={"secondary"} asChild>
                                <a
                                    href={`${import.meta.env.VITE_API_URL}/image/${selectedImage.id}/image`}
                                    download={`${selectedImage.id}.jpeg`}
                                    target="_blank"
                                    rel="noopener"
                                >
                                    <ImageDownIcon /> Download
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:hidden w-screen h-screen max-h-screen !box-border bg-background p-6 inset-0 justify-between overflow-y-scroll">
                    <div className="flex-1">
                        <img
                            crossOrigin="anonymous"
                            src={`${import.meta.env.VITE_API_URL}/image/${selectedImage.id}/image`}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="flex flex-col mt-6">
                        <div className="inline-flex items-center gap-2 mb-2">
                            <img src={user?.imageUrl} className=" rounded-full w-14 h-auto border" />
                            <span className="font-semibold text-primary">{user?.fullName}</span>
                        </div>
                        <p className="mb-2">{selectedImage.prompt}</p>
                        <p className="text-muted-foreground text-sm mb-4">Created at {moment(selectedImage.createdAt).format("DD/MM/YYYY, hh:mm:ss")}</p>
                        <div className="grid grid-cols-3 gap-2">
                            <Button onClick={handleLikeImage} variant={liked ? "default" : "secondary"} disabled={isLiking}><ThumbsUpIcon /> {likes}</Button>
                            <Button onClick={handleDislikeImage} variant={disliked ? "default" : "secondary"} disabled={isLiking}><ThumbsDownIcon /> {dislikes}</Button>
                            <Button variant={"secondary"} asChild>
                                <a
                                    href={`${import.meta.env.VITE_API_URL}/image/${selectedImage.id}/image`}
                                    download={`${selectedImage.id}.jpeg`}
                                    target="_blank"
                                    rel="noopener"
                                >
                                    <ImageDownIcon /> Download
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ImageModal;