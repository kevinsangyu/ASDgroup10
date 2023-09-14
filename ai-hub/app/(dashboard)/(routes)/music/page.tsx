"use client";

import * as z from "zod";
import { Heading } from "@/components/ui/heading";
import { Music } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
//import { useRouter } from 'next/router';  NEED TO FIX USEROUTER AS IT ERRORS WITH NEXT ROUNTER NOT MOUNTED

const MusicPage = () => {
 //   const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        try {
//            setMusic(undefined)

            const response = await axios.post("/api/music", values);

//            setMusic(response.data.audio);
            form.reset();
        } catch (error: any) {
            console.log(error);
        } finally {
 //           router.reload();
        } 
        
    }

    return (
        <div>
        <Heading 
            title="Music Generation"
            description="Enter a prompt to generate music!"
            icon={Music}
            iconColor="text-orange-500"
            bgColor="bg-orange-500/10"
        />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="
                            rounded-lg
                            border
                            w-full
                            p-4
                            px-3
                            md:px-6
                            focus-within:shadow-sm
                            grid
                            grid-cols-12
                            gap-2
                        "

                        >
                            <FormField 
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input 
                                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="Guitar solo with a violin"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default MusicPage;

/*
function setMusic(undefined: undefined) {
    throw new Error("Function not implemented.");
}
*/
