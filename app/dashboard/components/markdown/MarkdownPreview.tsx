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
                    return <h2 {...props} className="text-2xl font-bold"></h2>  // Perbaiki typo di sini (h1 menjadi h2)
                },
                h3: ({ node, ...props }) => {
                    return <h3 {...props} className="text-xl font-bold"></h3>  // Perbaiki typo di sini (h1 menjadi h3)
                },
                ol: ({ node, ...props }) => <ol {...props} className="list-decimal mb-4 ml-6" />,
                ul: ({ node, ...props }) => <ul {...props} className="list-disc mb-4 ml-6" />,
                li: ({ node, ...props }) => <li {...props} className="mb-2" />,
            }}
        >
            {content}
        </Markdown>
    )
}
