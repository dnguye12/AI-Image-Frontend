import { Button } from "@/components/ui/button";
import { BotMessageSquareIcon, MailIcon, MailOpenIcon, MessageCircleQuestionIcon, PaintbrushVerticalIcon, SearchIcon, SparklesIcon, ThumbsUpIcon, UsersRoundIcon } from "lucide-react";

const HomePage = () => {
    return (
        <section className="h-full flex flex-col px-8 pb-32 container mx-auto max-w-7xl items-center justify-center">
            <div className=" flex flex-col gap-y-8">
                <h1 className="inline-flex font-extrabold text-3xl text-foreground items-center gap-2"><SparklesIcon /> Hey There! Welcome to Image Gen <SparklesIcon /></h1>
                <div>
                    <h3 className="text-lg font-semibold text-foreground inline-flex gap-2"><MessageCircleQuestionIcon /> Ever wished creating cool images was as easy as texting your bestie?</h3>
                    <p className=" text-secondary-foreground text-base">Image Gen lets you whip up amazing visuals using super-smart AI—no artistic skills required (we promise!).</p>
                    <p className="text-secondary-foreground text-base">All you need to do is type a prompt.</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-foreground inline-flex gap-2"><UsersRoundIcon /> Check out Amazing Creations from Our Community</h3>
                    <p className=" text-secondary-foreground text-base">Dive into a world of endless inspiration by checking out jaw-dropping images made by fellow creators.</p>
                    <p className="text-secondary-foreground text-base">Like, share, and get inspired—because creativity is way better when shared!</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-foreground inline-flex gap-2"><ThumbsUpIcon /> Start now using These Two Buttons</h3>
                    <div className="mt-2 flex items-center gap-2">
                        <Button size={"lg"} className="cursor-pointer">
                            <a href="/home/create" className="inline-flex gap-1 items-center"><SearchIcon className="!w-[20px] !h-[20px]" /> Explore</a>
                        </Button>
                        <Button size={"lg"} className="cursor-pointer">
                            <a href="/home/create" className="inline-flex gap-1 items-center"><PaintbrushVerticalIcon className="!w-[20px] !h-[20px]" /> Create Image</a>
                        </Button>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-foreground inline-flex gap-2"><MailIcon /> Contact Me</h3>
                    <p className=" text-secondary-foreground text-base">For website support or questions, please contact me with either email or discord:</p>
                    <div className="mt-2 flex items-center gap-2">
                        <Button size={"lg"} className="cursor-pointer bg-blue-500 hover:bg-blue-600 ">
                            <a href="mailto:duchuyng051@gmail.com" target="_blank" className="inline-flex gap-1"><MailOpenIcon /> Email</a>
                        </Button>
                        <Button size={"lg"} className="cursor-pointer bg-violet-500 hover:bg-violet-600">
                            <a href="http://discord.com/users/589583302890094600" target="_blank" className="inline-flex gap-1"><BotMessageSquareIcon /> Discord</a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomePage;