import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import moment from "moment";

import { getUser } from "@/services/user";

import type { ImageProps } from "../types";
import type { UserResource } from "@clerk/types";

import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ImageModalProps {
    selectedImage: ImageProps | null;
    setSelectedImage: Dispatch<SetStateAction<ImageProps | null>>
}

const ImageModal = ({ selectedImage, setSelectedImage }: ImageModalProps) => {
    const [user, setUser] = useState<UserResource | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

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

    const handleClose = () => {
        setIsLoading(true)
        setSelectedImage(null)
    }

    if (!selectedImage) {
        return <div>...Loading</div>
    }

    return (
        <Dialog open={selectedImage != null} onOpenChange={handleClose}>
            <DialogContent className="!w-screen lg:!w-[calc(100vw-223px)] !max-w-screen h-screen !max-h-screen left-0 md:left-[223px] top-1/2 !translate-x-0 bg-transparent backdrop-blur-sm !p-0">
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
                        <p className="text-muted-foreground">Created at {moment(selectedImage.createdAt).format("DD/MM/YYYY, hh:mm:ss")}</p>
                    </div>
                </div>
                <div className="flex flex-col lg:hidden w-screen h-screen max-h-screen bg-background p-6 inset-0 justify-between">
                    <div className="flex-1">
                        <img
                            crossOrigin="anonymous"
                            src={`${import.meta.env.VITE_API_URL}/image/${selectedImage.id}/image`}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <img src={user?.imageUrl} className=" rounded-full w-14 h-auto border" />
                            <span className="font-semibold text-primary">{user?.fullName}</span>
                        </div>
                        <p className="mb-2">{selectedImage.prompt}</p>
                        <p className="text-muted-foreground">Created at {moment(selectedImage.createdAt).format("DD/MM/YYYY, hh:mm:ss")}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ImageModal;