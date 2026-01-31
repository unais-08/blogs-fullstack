/**
 * MarkdownEditor Component
 * Professional-grade split-view Markdown editor with enhanced UX
 * Features: Live preview, autosave indicator, word count, reading time
 */
import {
  type TextareaHTMLAttributes,
  forwardRef,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link as LinkIcon,
  Code,
  Quote,
  Eye,
  EyeOff,
  Image,
  Type,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { MarkdownRenderer } from "./MarkdownRenderer";

interface MarkdownEditorProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "onChange"
> {
  label?: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  onSave?: (value: string) => Promise<void> | void;
  autoSaveDelay?: number; // milliseconds
}

export const MarkdownEditor = forwardRef<
  HTMLTextAreaElement,
  MarkdownEditorProps
>(
  (
    {
      label,
      error,
      className = "",
      id,
      value,
      onChange,
      onSave,
      autoSaveDelay = 2000,
      ...props
    },
    ref,
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [showPreview, setShowPreview] = useState(true);
    const [debouncedValue, setDebouncedValue] = useState(value);
    const [saveStatus, setSaveStatus] = useState<
      "saved" | "saving" | "unsaved"
    >("saved");

    const saveTimerRef = useRef<number | null>(null);

    const editorId = id || label?.toLowerCase().replace(/\s+/g, "-");

    // Calculate stats
    const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
    const charCount = value.length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200)); // 200 words per minute

    // Debounce preview updates for performance (150ms delay)
    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedValue(value);
      }, 150);

      return () => clearTimeout(timer);
    }, [value]);

    // Auto-save functionality
    useEffect(() => {
      if (!onSave) return;

      setSaveStatus("unsaved");

      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }

      saveTimerRef.current = setTimeout(async () => {
        setSaveStatus("saving");
        try {
          await onSave(value);
          setSaveStatus("saved");
        } catch (error) {
          setSaveStatus("unsaved");
          console.error("Auto-save failed:", error);
        }
      }, autoSaveDelay);

      return () => {
        if (saveTimerRef.current) {
          clearTimeout(saveTimerRef.current);
        }
      };
    }, [value, onSave, autoSaveDelay]);

    // Keyboard shortcuts (Ctrl+B, Ctrl+I, etc.)
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!e.ctrlKey && !e.metaKey) return;

        const shortcuts: { [key: string]: () => void } = {
          b: () => insertMarkdown("**", "**", "bold text"),
          i: () => insertMarkdown("*", "*", "italic text"),
          k: () => insertLink(),
          e: () => insertMarkdown("`", "`", "code"),
        };
        const action = shortcuts[e.key.toLowerCase()];
        if (action) {
          e.preventDefault();
          action();
        }
      };

      const textarea = textareaRef.current;
      if (textarea) {
        textarea.addEventListener("keydown", handleKeyDown as any);
        return () =>
          textarea.removeEventListener("keydown", handleKeyDown as any);
      }
    }, [value]);

    // Helper to insert Markdown syntax at cursor
    const insertMarkdown = useCallback(
      (before: string, after = "", placeholder = "") => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = value.substring(start, end) || placeholder;
        const newText =
          value.substring(0, start) +
          before +
          selectedText +
          after +
          value.substring(end);

        onChange(newText);

        // Restore cursor position after React updates
        setTimeout(() => {
          textarea.focus();
          const newCursorPos = start + before.length + selectedText.length;
          textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
      },
      [value, onChange],
    );

    const insertHeading = (level: number) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      const prefix = "#".repeat(level) + " ";

      const newText =
        value.substring(0, lineStart) + prefix + value.substring(lineStart);

      onChange(newText);

      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          lineStart + prefix.length,
          lineStart + prefix.length,
        );
      }, 0);
    };

    const insertLink = () => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = value.substring(start, end);

      if (selectedText) {
        const url = prompt("Enter URL:");
        if (url) {
          insertMarkdown("[", `](${url})`, selectedText);
        }
      } else {
        const url = prompt("Enter URL:");
        if (url) {
          insertMarkdown("[", `](${url})`, "link text");
        }
      }
    };

    const insertImage = () => {
      const url = prompt("Enter image URL:");
      if (url) {
        const alt = prompt("Enter image description (alt text):", "Image");
        insertMarkdown(`![${alt}](`, ")", url);
      }
    };

    const toolbarButtons = [
      {
        icon: Bold,
        label: "Bold (Ctrl+B)",
        action: () => insertMarkdown("**", "**", "bold text"),
      },
      {
        icon: Italic,
        label: "Italic (Ctrl+I)",
        action: () => insertMarkdown("*", "*", "italic text"),
      },
      {
        icon: Type,
        label: "Inline Code (Ctrl+E)",
        action: () => insertMarkdown("`", "`", "code"),
      },
      { type: "divider" as const },
      {
        icon: Heading1,
        label: "Heading 1",
        action: () => insertHeading(1),
      },
      {
        icon: Heading2,
        label: "Heading 2",
        action: () => insertHeading(2),
      },
      {
        icon: Heading3,
        label: "Heading 3",
        action: () => insertHeading(3),
      },
      { type: "divider" as const },
      {
        icon: List,
        label: "Bullet List",
        action: () => insertMarkdown("- ", "", "list item"),
      },
      {
        icon: ListOrdered,
        label: "Numbered List",
        action: () => insertMarkdown("1. ", "", "list item"),
      },
      {
        icon: Quote,
        label: "Quote",
        action: () => insertMarkdown("> ", "", "quote"),
      },
      { type: "divider" as const },
      {
        icon: LinkIcon,
        label: "Link (Ctrl+K)",
        action: insertLink,
      },
      {
        icon: Image,
        label: "Insert Image",
        action: insertImage,
      },
      {
        icon: Code,
        label: "Code Block",
        action: () => insertMarkdown("```\n", "\n```", "code here"),
      },
    ];

    const markdownTextareaClasses = [
      "w-full px-6 py-5 transition-all duration-300 text-slate-900 font-mono leading-relaxed",
      "focus:outline-none focus:ring-0",
      "resize-none h-full text-base",
      "placeholder:text-slate-400 placeholder:font-normal",
      error ? "border-red-500 bg-red-50" : "border-slate-200 bg-white",
      className,
    ].join(" ");

    // Normal mode
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={editorId}
            className="block text-[10px] font-black uppercase tracking-[0.3em] text-[#111] mb-3"
          >
            {label}
            {props.required && <span className="text-[#7843e9] ml-1">*</span>}
          </label>
        )}

        {/* Enhanced Toolbar */}
        <div className="flex flex-col gap-3 p-4 bg-gradient-to-b from-slate-50 to-white border-2 border-slate-200 rounded-t-lg shadow-sm">
          {/* Top row: Formatting buttons */}
          <div className="flex flex-wrap items-center gap-1">
            {toolbarButtons.map((btn, idx) => {
              if ("type" in btn && btn.type === "divider") {
                return <div key={idx} className="w-px h-6 bg-slate-300 mx-1" />;
              }

              const ButtonIcon = btn.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={btn.action}
                  title={btn.label}
                  className="p-2.5 hover:bg-white hover:text-[#7843e9] hover:shadow-sm rounded-md transition-all text-slate-600 border border-transparent hover:border-slate-200"
                >
                  <ButtonIcon size={16} strokeWidth={2.5} />
                </button>
              );
            })}

            {/* Spacer */}
            <div className="flex-1" />

            {/* View controls */}
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              title={showPreview ? "Hide Preview" : "Show Preview"}
              className="p-2.5 hover:bg-white hover:text-[#7843e9] hover:shadow-sm rounded-md transition-all text-slate-600 border border-transparent hover:border-slate-200"
            >
              {showPreview ? (
                <EyeOff size={16} strokeWidth={2.5} />
              ) : (
                <Eye size={16} strokeWidth={2.5} />
              )}
            </button>
          </div>

          {/* Bottom row: Stats and save status */}
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
            <div className="flex items-center gap-4">
              <span>{wordCount} words</span>
              <span className="w-px h-3 bg-slate-300" />
              <span>{charCount} characters</span>
              <span className="w-px h-3 bg-slate-300" />
              <span>{readingTime} min read</span>
            </div>

            {onSave && (
              <div className="flex items-center gap-2">
                {saveStatus === "saving" && (
                  <>
                    <Loader2
                      size={12}
                      className="animate-spin text-slate-400"
                    />
                    <span className="text-slate-400">Saving...</span>
                  </>
                )}
                {saveStatus === "saved" && (
                  <>
                    <CheckCircle2 size={12} className="text-green-600" />
                    <span className="text-green-600">Saved</span>
                  </>
                )}
                {saveStatus === "unsaved" && (
                  <span className="text-amber-600">Unsaved changes</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Split View: Editor + Live Preview */}
        <div
          className={`flex ${showPreview ? "gap-0" : ""} border-2 border-t-0 border-slate-200 rounded-b-lg overflow-hidden shadow-sm`}
        >
          {/* Left: Editor */}
          <div
            className={`${showPreview ? "w-1/2 border-r-2 border-slate-200" : "w-full"} bg-white`}
          >
            <textarea
              ref={(node) => {
                textareaRef.current = node;
                if (typeof ref === "function") {
                  ref(node);
                } else if (ref) {
                  ref.current = node;
                }
              }}
              id={editorId}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className={markdownTextareaClasses}
              placeholder="Start writing your story... Use toolbar for formatting or type Markdown directly."
              style={{ minHeight: "500px" }}
              {...props}
            />
          </div>

          {/* Right: Live Preview */}
          {showPreview && (
            <div
              className="w-1/2 px-6 py-5 bg-[#fafaf9] overflow-y-auto"
              style={{ minHeight: "500px" }}
            >
              {debouncedValue ? (
                <MarkdownRenderer content={debouncedValue} />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-slate-400 italic text-base">
                    Preview will appear here as you type...
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {error && (
          <p
            className="mt-2 text-[10px] font-bold uppercase tracking-wider text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Enhanced Quick Tips */}
        <div className="mt-3 flex items-start gap-3 text-[9px] text-slate-400 font-medium">
          <div>
            <span className="font-black uppercase tracking-wider text-slate-500">
              Shortcuts:
            </span>{" "}
            <span className="font-bold text-slate-600">Ctrl+B</span> Bold,{" "}
            <span className="font-bold text-slate-600">Ctrl+I</span> Italic,{" "}
            <span className="font-bold text-slate-600">Ctrl+K</span> Link,{" "}
            <span className="font-bold text-slate-600">Ctrl+E</span> Code
          </div>
        </div>
      </div>
    );
  },
);

MarkdownEditor.displayName = "MarkdownEditor";
