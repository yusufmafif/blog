import { cn } from '@/lib/utils'
import React from 'react'
import Markdown from 'react-markdown'

export default function MarkdownPreview({ content, className }: { content: string, className?: string }) {
    return (
        <Markdown
            className={cn("space-y-6", className)}
            components={{
                h1: ({ node, ...props }) => {
                    return <h1 {...props} className="text-3xl font-bold"></h1>
                },
                h2: ({ node, ...props }) => {
                    return <h1 {...props} className="text-2xl font-bold"></h1>
                },
                h3: ({ node, ...props }) => {
                    return <h1 {...props} className="text-xl font-bold"></h1>
                },
            }}
        >
            {content}
        </Markdown>
    )
}
