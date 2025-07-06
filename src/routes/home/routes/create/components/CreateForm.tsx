import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { DicesIcon, HammerIcon } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { surpriseMePrompts } from "@/components/constant";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type { CreateFormProps } from "../types";

const CreateForm = ({ input, setInput }: CreateFormProps) => {
    const { isLoaded } = useUser()

    const formSchema = z.object({
        prompt: z.string().min(1, {
            message: "Prompt cannot be empty."
        }),
        model: z.string(),
        width: z.number(),
        height: z.number(),
        seed: z.number()
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            model: "flux",
            width: 480,
            height: 720,
            seed: -1
        }
    })

    const isLoading = form.formState.isSubmitting && isLoaded

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (JSON.stringify(input) !== JSON.stringify(values)) {
            setInput(values)
        }
    }

    const getRandomPrompt = () => {
        const current = form.getValues("prompt")
        let randomIndex
        let randomPrompt = current

        while (randomPrompt === current) {
            randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
            randomPrompt = surpriseMePrompts[randomIndex]
        }

        form.setValue("prompt", randomPrompt)
    }

    if (!isLoaded) {
        return <div>Loading…</div>
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white dark:bg-neutral-950 p-8 flex flex-col gap-y-8">
                <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold text-primary">Image Prompt</FormLabel>
                            <FormControl>
                                <Textarea
                                    disabled={isLoading}
                                    placeholder="Describe the image you want to create..."
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is your image prompt
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold text-primary">AI Model</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="flux">Flux</SelectItem>
                                    <SelectItem value="turbo">Turbo</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Image generation model, default is Flux.
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <div className="flex gap-x-4 w-full">
                    <FormField
                        control={form.control}
                        name="width"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="font-bold text-primary">Image Size</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Image width"
                                        {...field}
                                        value={field.value}
                                        onChange={e => field.onChange(e.target.valueAsNumber)}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="height"
                        render={({ field }) => (
                            <FormItem className="w-full pt-[22px]">
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Image height"
                                        {...field}
                                        value={field.value}
                                        onChange={e => field.onChange(e.target.valueAsNumber)}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="seed"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold text-primary">Image Seed</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Seed number"
                                    {...field}
                                    value={field.value}
                                    onChange={e => field.onChange(e.target.valueAsNumber)}
                                />
                            </FormControl>
                            <FormDescription>
                                Different seed gives different image, -1 for random seed.
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <div className="flex gap-x-4 justify-end">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        size={"lg"}
                        className="flex-1 max-w-80"><HammerIcon />Create</Button>
                    <Button
                        type="button"
                        onClick={getRandomPrompt}
                        disabled={isLoading}
                        variant={"secondary"}
                        size={"lg"}
                        className="flex-1 max-w-80"><DicesIcon />Surprise Me</Button>
                </div>
            </form>
        </Form>
    );
}

export default CreateForm;