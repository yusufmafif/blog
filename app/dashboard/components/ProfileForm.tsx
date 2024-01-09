"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { EyeOpenIcon, Pencil1Icon, RocketIcon, StarIcon } from "@radix-ui/react-icons"
import { BsSave } from "react-icons/bs"
import { useState, useTransition } from "react"
import Image from "next/image"
import { Textarea } from "@/components/ui/textarea"
import MarkdownPreview from "./markdown/MarkdownPreview"
import {ProfileFormSchema, ProfileFormSchemaType } from "../schema"
import { IProfile } from "@/lib/types"


export default function ProfileForm({ onHandleSubmit, profile }: { onHandleSubmit: (data: ProfileFormSchemaType) => void; profile?: IProfile }) {
  const [isPending, startTransition] = useTransition()
  const [isPreview, setPreview] = useState(false)

  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    mode: "all",
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      name: profile?.name || "",
      description: profile?.description || "",
      photo_url: profile?.photo_url || "",
    },
  })

  function onSubmit(data: z.infer<typeof ProfileFormSchema>) {
    startTransition(() => {
      onHandleSubmit(data)
    })
  }
  console.log(isPreview)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full border rounded-md space-y-6 p-1">
        <div className="p-5 flex items-center flex-wrap justify-between border-b gap-5 ">
          <div className="flex gap-5 items-center flex-wrap">
            <span role="button" tabIndex={0} className="flex items-center gap-1 border p-2 rounded-md hover:ring-2 hover:ring-zinc-400 transition-all" onClick={() => setPreview(!isPreview && !form.getFieldState("name").invalid)}>{isPreview ? <><Pencil1Icon />Edit</> : <><EyeOpenIcon />Preview</>}</span>
          </div>
          <Button className="flex items-center gap-2 bg-black hover:bg-red-500" disabled={!form.formState.isValid || isPending}><BsSave /> Save</Button>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className={cn("p-2 w-full flex break-words gap-3", isPreview ? "divide-x-0" : "divide-x")}>
                  <Input placeholder="name" {...field} className={cn("border-none text-lg font-medium leading-relaxed", isPreview ? "w-0 p-0" : "w-full lg:w-1/2")} />
                  <div className={cn("lg:px-10", isPreview ? "mx-auto w-full lg:w-4/5" : "w-1/2 lg:block hidden")}>
                    <h1 className="text-3xl font-medium">{form.getValues().name}</h1>
                  </div>
                </div>
              </FormControl>
              {form.getFieldState("name").invalid && form.getValues().name && <FormMessage />}
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="photo_url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className={cn("p-2 w-full flex break-words gap-3", isPreview ? "divide-x-0" : "divide-x")}>
                  <Input placeholder="photo url" {...field} className={cn("border-none text-lg font-medium leading-relaxed", isPreview ? "w-0 p-0" : "w-full lg:w-1/2")} />
                  <div className={cn("lg:px-10", isPreview ? "mx-auto w-full lg:w-4/5" : "w-1/2 lg:block hidden")}>
                    {!isPreview ? (<><p>Click on Preview to see  image</p></>) : (<div className="relative h-80 mt-5 border rounded-md"><Image src={form.getValues().
                      photo_url} alt="Preview"
                      fill className="
                      object-cover object-center"/>
                    </div>)}
                  </div>
                </div>
              </FormControl>

              {form.getFieldState("photo_url").invalid && form.getValues().photo_url && (<div className="p-2"><FormMessage /></div>)}
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className={cn("p-2 w-full flex break-words gap-3", isPreview ? "divide-x-0" : "divide-x h-70vh")}>
                  <Textarea placeholder="description" {...field} className={cn("border-none text-lg font-medium leading-relaxed resize-none h-full", isPreview ? "w-0 p-0" : "w-full lg:w-1/2")} />
                  <div className={cn("lg:px-10 overflow-y-auto", isPreview ? "mx-auto w-full lg:w-4/5" : "w-1/2 lg:block hidden")}>
                    <MarkdownPreview content={form.getValues().description} />
                  </div>
                </div>
              </FormControl>
              {form.getFieldState("description").invalid && form.getValues().description && <FormMessage />}
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
