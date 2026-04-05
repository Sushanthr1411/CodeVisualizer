export default function Header() {
  return (
    <header className="h-20 border-b border-border/30 bg-card/30 glass-lg flex items-center justify-between px-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center glow-subtle">
          <svg
            className="w-6 h-6 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.5a2 2 0 00-1 3.75A2 2 0 0010 11v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a4 4 0 004 4z"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Code Flow Visualizer</h1>
          <p className="text-xs text-muted-foreground">Visualize your code structure instantly</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        
      </div>
    </header>
  );
}
