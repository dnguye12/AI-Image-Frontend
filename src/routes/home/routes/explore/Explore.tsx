import { useEffect, useState } from "react"
import { useDebouncedCallback } from 'use-debounce';

import { getImagesPopular, getImagesRandom, getImagesRecent, searchImage } from "@/services/image"

import type { ImageProps } from "./types"
import { Skeleton } from "@/components/ui/skeleton"
import ImageCard from "./components/ImageCard"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ClockIcon, DicesIcon, FlameIcon } from "lucide-react"

const ExplorePage = () => {
    const [images, setImages] = useState<ImageProps[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [filter, setFilter] = useState<string>("popular")
    const [searchPrompt, setSearchPrompt] = useState<string>("")
    const [isSearching, setIsSearching] = useState<boolean>(false)

    const handleSearch = useDebouncedCallback((value) => {
        if (value !== searchPrompt) {
            setSearchPrompt(value)
            if (value === "") {
                setIsLoading(true)
            } else {
                setIsSearching(true)
            }
        }
    }, 1000)

    const randomSkeletonHeight = () => {
        const size = [180, 270, 360, 450, 540]

        return size[Math.floor(Math.random() * size.length)]
    }

    useEffect(() => {
        if (isLoading) {
            const getImages = async () => {
                try {
                    if (filter === "recent") {
                        const helper = await getImagesRecent()
                        setImages(helper)
                    } else if (filter === "popular") {
                        const helper = await getImagesPopular()
                        setImages(helper)
                    } else if (filter === "random") {
                        const helper = await getImagesRandom()
                        setImages(helper)
                    }
                } catch (error) {
                    console.log(error)
                } finally {
                    setIsLoading(false)
                }
            }

            getImages()
        }
    }, [isLoading, filter])

    useEffect(() => {
        if (isSearching) {
            const getImages = async () => {
                try {
                    const helper = await searchImage(searchPrompt)
                    setImages(helper)
                } catch (error) {
                    console.log(error)
                } finally {
                    setIsSearching(false)
                }
            }

            getImages()
        }
    }, [isSearching, searchPrompt])

    const changeFilter = (value: string) => {
        if (value !== filter) {
            setFilter(value)
            setIsLoading(true)
        }
    }

    if (isLoading || isSearching) {
        return (
            <section className="h-full px-4">
                <div className="flex items-center gap-2">
                    <Input type="text" placeholder="Search for an image" className="rounded-lg h-10" disabled={true} />
                    <Select disabled value={filter}>
                        <SelectTrigger className="h-10">
                            <SelectValue placeholder="Sort images" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="popular"><FlameIcon />Most popular</SelectItem>
                            <SelectItem value="recent"><ClockIcon />Most recent</SelectItem>
                            <SelectItem value="random"><DicesIcon /> Random</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-1 pt-8 pb-12">
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
            <div className="flex items-center gap-2">
                <Input type="text" placeholder="Search for an image" className="rounded-lg h-10" onChange={e => handleSearch(e.target.value)} />
                <Select onValueChange={changeFilter} value={filter}>
                    <SelectTrigger className="h-10">
                        <SelectValue placeholder="Sort images" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="popular"><FlameIcon />Most popular</SelectItem>
                        <SelectItem value="recent"><ClockIcon />Most recent</SelectItem>
                        <SelectItem value="random"><DicesIcon /> Random</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {
                (!images || images.length === 0)
                    ?
                    (
                        <div className=" pt-8 pb-12">
                            <p className="text-lg font-semibold text-foreground text-center">No images to display.</p>
                        </div>
                    )
                    :
                    (
                        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-1 pt-8 pb-12">
                            {
                                images.map((image) => (<ImageCard image={image} />))
                            }
                        </div>
                    )}
        </section>
    )
}

export default ExplorePage