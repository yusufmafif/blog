import * as z from "zod"

export const BlogFormSchema = z.object({
    title: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    image_url: z.string().url({
      message: "Invalid url",
    }),
    content: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    is_published: z.boolean(),
    is_premium: z.boolean()
  })
  // .refine((data) => {
  //   const image_url = data.image_url
  //   try {
  //     const url = new URL(image_url)
  //     return url.hostname === ""
  //   } catch {
  //     return false
  //   }
  // }, {
  //   message: "Currently we are support only the image from unsplash",
  //   path: ["image_url"],
  // })

  export type BlogFormSchemaType = z.infer<typeof BlogFormSchema>

export const ProfileFormSchema = z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    description: z.string().min(1,{
      message: "Description must be at least 2 characters",
    }),
    photo_url: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  })

  export type ProfileFormSchemaType = z.infer<typeof ProfileFormSchema>

  export const CommentFormSchema = z.object({
    id: z.any(),
    name: z.any(),
    comment: z.string().min(10, {
      message: "Comment must be at least 2 characters.",
    }),
  })

  export type CommentFormSchemaType = z.infer<typeof CommentFormSchema>