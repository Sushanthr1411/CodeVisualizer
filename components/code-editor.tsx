'use client';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
}

export default function CodeEditor({ code, onChange }: CodeEditorProps) {
  return (
    <div className="flex-1 glass rounded-2xl p-4 overflow-hidden flex flex-col glow-subtle">
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your JavaScript code here..."
        className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/50 font-mono text-sm p-4 rounded-xl resize-none focus:outline-none focus:ring-0 border-0 leading-relaxed"
      />
      <div className="text-xs text-muted-foreground/60 pt-2 border-t border-border/20">
        {code.length} characters
      </div>
    </div>
  );
}
