'use client';

import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0326] via-[#3b0b73] to-[#6d28d9] text-white">

      <main className="pt-8">
        <section className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="rounded-3xl bg-white/5 border border-white/6 backdrop-blur-md p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                Visualize Your Code, Understand Faster
              </h1>
              <p className="text-gray-300 mb-6 max-w-xl">
                Explore function relationships and program flow with interactive graphs.
                Paste your JavaScript, scan your repo, or connect a GitHub project to get started.
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => router.push('/visualizer')}
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] font-semibold shadow-lg hover:scale-[1.02] transition-transform"
                >
                  Start Visualizing
                </button>

                <a
                  href="#features"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/6 text-sm font-medium hover:bg-white/6 transition"
                >
                  See Features
                </a>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="rounded-xl bg-[#010417] border border-white/6 p-4 shadow-xl">
                <pre className="text-sm text-green-300 overflow-auto max-h-56 font-mono">
{`// Example: simple flow
function fetchData() {
  const data = getData();
  process(data);
}

function getData() {
  return apiCall('/items');
}

function process(items) {
  items.forEach(renderItem);
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mt-12 max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white/4 rounded-2xl border border-white/6">
              <h3 className="font-semibold mb-2">Interactive Graphs</h3>
              <p className="text-sm text-gray-300">Zoom, pan and explore function relationships.</p>
            </div>

            <div className="p-6 bg-white/4 rounded-2xl border border-white/6">
              <h3 className="font-semibold mb-2">Fast Parsing</h3>
              <p className="text-sm text-gray-300">Quickly analyze files or pasted snippets.</p>
            </div>

            <div className="p-6 bg-white/4 rounded-2xl border border-white/6">
              <h3 className="font-semibold mb-2">Export & Share</h3>
              <p className="text-sm text-gray-300">Save diagrams as PNG or share interactive links.</p>
            </div>

            <div className="p-6 bg-white/4 rounded-2xl border border-white/6">
              <h3 className="font-semibold mb-2">Repo Integration (Planned)</h3>
              <p className="text-sm text-gray-300">Connect GitHub to visualize entire projects.</p>
            </div>

            <div className="p-6 bg-white/4 rounded-2xl border border-white/6">
              <h3 className="font-semibold mb-2">Multi-language (Planned)</h3>
              <p className="text-sm text-gray-300">Expand analysis to Python, Go, and more.</p>
            </div>

            <div className="p-6 bg-white/4 rounded-2xl border border-white/6">
              <h3 className="font-semibold mb-2">Lightweight & Private</h3>
              <p className="text-sm text-gray-300">Processing can run locally—your code stays private.</p>
            </div>
          </div>
        </section>

        <section className="mt-12 mb-16 max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-400">"Turn Your Code Into A Visual Map"</p>
        </section>
      </main>
    </div>
  );
}