/**
 * MarkdownRenderer Component
 * Professional Markdown rendering with enhanced typography and syntax highlighting
 */
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import type { Components } from "react-markdown";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer = ({
  content,
  className = "",
}: MarkdownRendererProps) => {
  // Custom components to match existing design system with enhancements
  const components: Components = {
    // Headings with enhanced hierarchy
    h1: ({ children }) => (
      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-[#111] mt-14 mb-6 leading-[1.1] border-b-4 border-[#7843e9] pb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#111] mt-12 mb-5 leading-[1.2]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-[#222] mt-10 mb-4 leading-[1.2]">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#333] mt-8 mb-3 leading-[1.3]">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-lg md:text-xl font-black uppercase tracking-tight text-[#444] mt-6 mb-3 leading-[1.3]">
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-base md:text-lg font-black uppercase tracking-wide text-[#555] mt-6 mb-2 leading-[1.4]">
        {children}
      </h6>
    ),

    // Enhanced paragraphs
    p: ({ children }) => (
      <p className="text-[#333] leading-[1.8] text-lg font-medium mb-6 selection:bg-[#7843e9] selection:text-white">
        {children}
      </p>
    ),

    // Enhanced lists
    ul: ({ children }) => (
      <ul className="space-y-3 mb-6 text-[#333] text-lg ml-6">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="space-y-3 mb-6 text-[#333] text-lg ml-6">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="leading-[1.8] font-medium relative pl-2">
        <span className="absolute -left-6 text-[#7843e9] font-black">•</span>
        {children}
      </li>
    ),

    // Enhanced links with external indicator
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#7843e9] font-bold underline decoration-2 underline-offset-2 hover:opacity-70 hover:decoration-4 transition-all"
      >
        {children}
      </a>
    ),

    // Enhanced code blocks with better styling
    code: ({ className, children }) => {
      const isBlock = className?.includes("language-");

      if (isBlock) {
        return (
          <code
            className={`${className} block bg-[#1e1e1e] text-[#d4d4d4] p-6 rounded-xl overflow-x-auto mb-6 text-[15px] font-mono leading-relaxed shadow-lg border-2 border-slate-700`}
          >
            {children}
          </code>
        );
      }

      return (
        <code className="bg-slate-100 text-[#7843e9] px-2.5 py-1 rounded-md text-[15px] font-mono font-bold border border-slate-200">
          {children}
        </code>
      );
    },
    pre: ({ children }) => (
      <pre className="bg-[#1e1e1e] rounded-xl overflow-hidden mb-6 shadow-lg border-2 border-slate-700">
        {children}
      </pre>
    ),

    // Enhanced blockquotes
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#7843e9] pl-6 py-3 italic text-slate-700 text-lg bg-gradient-to-r from-[#7843e91a] to-transparent mb-6 rounded-r-lg">
        {children}
      </blockquote>
    ),

    // Enhanced emphasis
    strong: ({ children }) => (
      <strong className="font-black text-[#111]">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-[#444]">{children}</em>,

    // Enhanced horizontal rule
    hr: () => (
      <div className="my-12 relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-slate-200"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="bg-white px-4">
            <div className="w-2 h-2 bg-[#7843e9] rounded-full"></div>
          </div>
        </div>
      </div>
    ),

    // Enhanced tables (GitHub Flavored Markdown)
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6 rounded-lg border-2 border-slate-200 shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-slate-100">{children}</thead>,
    tbody: ({ children }) => (
      <tbody className="bg-white divide-y divide-slate-200">{children}</tbody>
    ),
    tr: ({ children }) => (
      <tr className="hover:bg-slate-50 transition-colors">{children}</tr>
    ),
    th: ({ children }) => (
      <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-[#111]">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-6 py-4 text-base font-medium text-[#333] leading-relaxed">
        {children}
      </td>
    ),

    // Task lists (GitHub Flavored Markdown)
    input: ({ checked, disabled }) => (
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        className="mr-2 w-4 h-4 text-[#7843e9] rounded border-slate-300 focus:ring-[#7843e9] focus:ring-2 cursor-pointer"
      />
    ),

    // Images with enhanced styling
    img: ({ src, alt }) => (
      <figure className="my-8">
        <img
          src={src}
          alt={alt}
          className="w-full rounded-xl shadow-lg border-2 border-slate-200"
        />
        {alt && (
          <figcaption className="mt-3 text-center text-sm text-slate-500 italic font-medium">
            {alt}
          </figcaption>
        )}
      </figure>
    ),
  };

  // Check if content is plain text (non-Markdown) - render as-is for backward compatibility
  const isPlainText = !content.match(/[#*`\[\]>-]/);

  if (isPlainText) {
    return (
      <div
        className={`text-[#333] leading-[1.8] text-lg font-medium whitespace-pre-wrap ${className}`}
      >
        {content}
      </div>
    );
  }

  return (
    <div className={`prose prose-lg prose-slate max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize, rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
