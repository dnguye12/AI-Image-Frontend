import { useState } from "react";
import Dither from "../../components/react-bits/Dither";
import { Button } from "@/components/ui/button";
import { LogInIcon, MailsIcon, SearchIcon, UserIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { useClerk, useUser } from "@clerk/clerk-react";

const WelcomePage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { isLoaded, isSignedIn } = useUser()
    const { openUserProfile } = useClerk()

    const toggleLoading = () => {
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 10000)
    }

    return (
        <div className="w-screen h-screen relative overflow-hidden">
            <Dither
                waveColor={[0.1, 0.5, 0.5]}
                disableAnimation={false}
                enableMouseInteraction={true}
                mouseRadius={0.3}
                colorNum={4}
                waveAmplitude={0.3}
                waveFrequency={3}
                waveSpeed={0.05}
            />
            <div className=" flex flex-col items-center gap-y-10 absolute top-1/2 left-1/2 -translate-1/2 z-10">
                <h1 className="mb-6 text-4xl font-bold tracking-tight text-pretty md:text-5xl lg:text-7xl text-neutral-50 text-center">Image Gen</h1>

                <div className=" flex p-4 gap-4 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 shadow-md">
                    {
                        (isLoaded && !isSignedIn)
                            ?
                            (
                                <Button size={"lg"} className={cn(" rounded-full border hover:bg-green-700 border-green-600 cursor-pointer", isLoading && "opacity-30 cursor-default pointer-events-none select-none")} asChild>
                                    <a href={"/sign-in"} className=" inline-flex items-center text-neutral-100 gap-x-1"><LogInIcon /> Login</a>
                                </Button>
                            )
                            :
                            (
                                <Button onClick={() => openUserProfile()} size={"lg"} className={cn(" rounded-full border hover:bg-sky-700 border-sky-600 cursor-pointer", isLoading && "opacity-30 cursor-default pointer-events-none select-none")} asChild>
                                    <span className=" inline-flex items-center text-neutral-100 gap-x-1"><UserIcon /> My Profile</span>
                                </Button>
                            )
                    }
                    <Button size={"lg"} className={cn("rounded-full border hover:bg-rose-700 border-rose-600 cursor-pointer", isLoading && "opacity-30 cursor-default pointer-events-none select-none")} asChild>
                        <a href={"/home/explore"} onClick={toggleLoading} className=" inline-flex items-center text-neutral-100 gap-x-1">
                            <SearchIcon /> Explore
                        </a>
                    </Button>
                    <Button size={"lg"} className={cn("rounded-full border hover:bg-yellow-700 border-yellow-600 cursor-pointer", isLoading && "opacity-30 cursor-default pointer-events-none select-none")} asChild>
                        <a href="https://webfolio-smoky.vercel.app/" target="_blank" className=" inline-flex items-center text-neutral-100 gap-x-1">
                            <MailsIcon /> Contact Us
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default WelcomePage;