export default function AboutPage() {
    return (
        <div className="text-white">
            <h1 className="text-3xl font-bold mb-6">About</h1>

            <div className="border border-white/10 rounded-xl p-6 bg-black shadow-md mb-4">
                <h2 className="text-xl font-semibold mb-2">What is X?</h2>
                <p className="text-white/80 leading-relaxed">
                    X is a platform for real-time conversation. Share ideas, follow thinkers,
                    and discover what&apos;s happening in the world right now.
                </p>
            </div>

            <div className="border border-white/10 rounded-xl p-6 bg-black shadow-md mb-4">
                <h2 className="text-xl font-semibold mb-2">Our mission</h2>
                <p className="text-white/80 leading-relaxed">
                    Give everyone the power to create and share ideas and information instantly,
                    without barriers.
                </p>
            </div>

            <div className="border border-white/10 rounded-xl p-6 bg-black shadow-md">
                <h2 className="text-xl font-semibold mb-2">Built with</h2>
                <ul className="text-white/80 space-y-1 list-disc list-inside">
                    <li>Next.js 16 App Router</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS v4</li>
                    <li>React Compiler</li>
                </ul>
            </div>
        </div>
    );
}
