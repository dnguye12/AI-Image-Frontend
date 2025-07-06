import { usePollinationsImage } from '@pollinations/react';
import type { CreateFormProps } from '../types';
import { Skeleton } from '@/components/ui/skeleton';

const CreateImages = ({ input }: CreateFormProps) => {

    const imageUrl = usePollinationsImage(input.prompt, {
        width: input.width,
        height: input.height,
        seed: input.seed,
        nologo: true,
        model: input.model,
    })

    return (
        <div className="w-full relative">
            {(!input.prompt || !imageUrl)
                ? (
                    <Skeleton className="w-full h-full rounded-none" />
                )
                :
                (
                    <>
                        <img
                            src={imageUrl}
                            className="w-full h-full object-cover z-10 relative"
                        />
                        <Skeleton className="w-full h-full rounded-none absolute top-0 left-0 z-0" />
                    </>
                )
            }

        </div>
    );
}

export default CreateImages;