"use client";

import * as z from "zod";
import { Heading } from "@/components/ui/heading";
import { ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { amountOptions, resolutionOptions, formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const ImagePage = () => {
  const [images, setImages] = useState<string[]>([]);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "256x256"
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);
      console.log(values);

      const response = await axios.post('/api/image', values);
      const urls = response.data.map((image: { url: string }) => image.url);

      setImages(urls);
    } catch (error: any) {
      console.log(error);
    } finally {
      router.refresh();
    }
    
  }

  return (
    <div>
      <Heading
        title="Image Generation"
        description="Generate an image with a prompt."
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
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
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="A painting of a Japanese landscape in Cyberpunk style"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
              control={form.control}
                name="amount"
                render={({field}) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue defaultValue={field.value}/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {amountOptions.map((option) => (
                            <SelectItem
                            key={option.value}
                            value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                    </Select>
                  </FormItem>
                  )}
              />
              <FormField
              control={form.control}
                name="resolution"
                render={({field}) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue defaultValue={field.value}/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {resolutionOptions.map((option) => (
                            <SelectItem
                            key={option.value}
                            value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                    </Select>
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

export default ImagePage;