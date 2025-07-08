import { usePollinationsImage } from '@pollinations/react';
import type { CreateImageProps } from '../types';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect } from 'react';

const CreateImages = ({ input, imageLink, setImageLink }: CreateImageProps) => {

    const imageUrl = usePollinationsImage(input.prompt, {
        width: input.width,
        height: input.height,
        seed: input.seed,
        nologo: true,
        model: input.model,
    })

    useEffect(() => {
        if(imageLink !== imageUrl) {
            setImageLink(imageUrl)
        }
    }, [imageUrl, imageLink, setImageLink])

    return (
        <div className="w-full relative">
            {(!input.prompt || !imageUrl)
                ? (
                    <Skeleton className="w-full h-full rounded-none" />
                )
                :
                (
                    <>
                        <Dialog>
                            <DialogTrigger className='w-full h-full relative overflow-hidden'>
                                <img
                                    src={imageUrl}
                                    className=" absolute inset-0 w-full h-full object-cover object-center z-10"
                                />
                            </DialogTrigger>
                            <DialogContent className='flex flex-col w-full h-[90vh] !max-w-[90vw] p-0 overflow-hidden'>
                                <img
                                    src={imageUrl}
                                    className="w-auto h-full object-cover"
                                />
                            </DialogContent>
                        </Dialog>

                        <Skeleton className="w-full h-full rounded-none absolute top-0 left-0 z-0" />
                    </>
                )
            }

        </div>
    );
}

export default CreateImages;