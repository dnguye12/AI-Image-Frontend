import { PaintbrushVerticalIcon } from "lucide-react";
import CreateForm from "./components/CreateForm";
import { useState } from "react";
import type { InputProps } from "./types";
import CreateImages from "./components/CreateImages";

const CreatePage = () => {
    const [input, setInput] = useState<InputProps>({
        prompt: "",
        model: "flux",
        width: 480,
        height: 720,
        seed: -1
    })
    const [imageLink, setImageLink] = useState<string>("")

    return (
        <section className="h-full flex flex-col px-8 py-12 container mx-auto max-w-7xl">
            <div>
                <h1 className="inline-flex font-extrabold text-3xl text-foreground items-center gap-2"><PaintbrushVerticalIcon /> Create</h1>
                <p className="mt-2 text-secondary-foreground text-base">Generate an imaginative image through our AI and share it with the community.</p>
            </div>
            <div className="h-full w-full shadow rounded-xl overflow-hidden grid grid-cols-2 border mt-8">
                <CreateForm input={input} setInput={setInput} imageLink={imageLink}/>
                <CreateImages input={input} imageLink={imageLink} setImageLink={setImageLink} />
            </div>
        </section>
    );
}

export default CreatePage;