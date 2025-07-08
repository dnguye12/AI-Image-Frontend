import { Skeleton } from "@/components/ui/skeleton"
import { getImagesRecent } from "@/services/image"
import { useEffect, useState } from "react"
import type { ImageProps } from "./types"

const ExplorePage = () => {
    const [images, setImages] = useState<ImageProps[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const randomSkeletonHeight = () => {
        const size = [180, 270, 360, 450, 540]

        return size[Math.floor(Math.random() * size.length)]
    }

    useEffect(() => {
        if (isLoading) {
            const getImages = async () => {
                try {
                    const helper = await getImagesRecent()

                    setImages(helper)
                } catch (error) {
                    console.log(error)
                } finally {
                    setIsLoading(false)
                }
            }

            getImages()
        }
    }, [isLoading])

    if (images.length === 0 || isLoading) {
        return (
            <section className="h-full px-4">
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-1 py-12">
                    {
                        Array.from({ length: 50 }).map((_, idx) => {
                            const helper = randomSkeletonHeight()
                            return (
                                <Skeleton
                                    key={idx}
                                    className="w-full mb-1 break-inside-avoid"
                                    style={{ height: helper }}
                                />
                            )
                        })
                    }
                </div>
            </section>
        )
    }

    return (
        <section className="h-full px-4">
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-1 py-12">
                {
                    images.map((image, idx) => (
                        <img
                            key={idx}
                            className="w-full mb-1 break-inside-avoid shadow-md"
                            crossOrigin="anonymous"
                            src={`${import.meta.env.VITE_API_URL}/image/${image.id}/image`} 
                            alt={image.prompt}
                            />
                    ))
                }
            </div>
        </section>
    )
}

export default ExplorePage