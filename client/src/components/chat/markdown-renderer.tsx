import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:p-0">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          pre({ node, children, ...props }) {
            return (
              <pre className="not-prose overflow-hidden rounded-lg bg-zinc-950 my-4" {...props}>
                {children}
              </pre>
            );
          },
          code({ node, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            
            if (!match) {
              return (
                <code className="bg-muted px-1.5 py-0.5 rounded-md text-sm font-mono" {...props}>
                  {children}
                </code>
              );
            }

            return (
              <div className="flex flex-col w-full text-sm font-mono">
                <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800 text-zinc-400">
                  <span>{match[1]}</span>
                  <button className="text-xs hover:text-zinc-200 transition-colors">Copy code</button>
                </div>
                <div className="p-4 overflow-x-auto text-zinc-100 bg-zinc-950">
                  <code {...props} className={className}>
                    {children}
                  </code>
                </div>
              </div>
            );
          },
          p({ children }) {
            return <p className="mb-4 last:mb-0">{children}</p>;
          },
          ul({ children }) {
            return <ul className="mb-4 list-disc pl-6 space-y-1">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="mb-4 list-decimal pl-6 space-y-1">{children}</ol>;
          },
          li({ children }) {
            return <li>{children}</li>;
          },
          h1({ children }) {
            return <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>;
          },
          h2({ children }) {
            return <h2 className="text-xl font-bold mt-5 mb-3">{children}</h2>;
          },
          h3({ children }) {
            return <h3 className="text-lg font-bold mt-4 mb-2">{children}</h3>;
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-primary/50 pl-4 py-1 mb-4 italic text-muted-foreground bg-muted/30 rounded-r-lg">
                {children}
              </blockquote>
            );
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm text-left border-collapse">
                  {children}
                </table>
              </div>
            );
          },
          th({ children }) {
            return (
              <th className="px-4 py-2 font-medium border border-border bg-muted/50">
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td className="px-4 py-2 border border-border">
                {children}
              </td>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
