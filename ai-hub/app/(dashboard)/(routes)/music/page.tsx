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
import { Loader } from "@/components/loader";
import { Empty } from "@/components/empty";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

const MusicPage = () => {
    const router = useRouter();
    const [music, setMusic] = useState<string>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setMusic(undefined);
            console.log(values);

            const response = await axios.post("/api/music", values);
            setMusic(response.data.audio);
            form.reset()
        } catch (error: any) {
            console.log(error);
        } finally {
            router.refresh()
        }
    }

    return (
        <div>

            <Heading
                title="Music generation"
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
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="90s hip hop"
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
                <div className="space-y-4 mt-4">
                        {isLoading && (
                            <div className="p-8
                            rounded-lg w-full flex items-centre justify-centre bg-muted">
                                <Loader />
                                </div>
                        )}
                        {!music && !isLoading && (
                            <Empty label="No music generated." />
                        )}
                        {music && (
                            <audio controls className="w-full mt-8">
                                <source src={music} type="audio/mpeg" />
                            </audio>
                    )}
                    </div>
            </div>
        </div>
    );
}

export default MusicPage;