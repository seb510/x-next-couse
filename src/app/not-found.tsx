import Link from 'next/link'
export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-4">
            <h1 className="text-7xl font-bold mb-4">404</h1>
            <p className="text-neutral-600 mb-6">This page doesn't exist. Or maybe it moved.</p>
            <Link href={"/"} className="flex items-center gap-1 text-sm text-blue-500 hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 5l-7 7 7 7"/>
                </svg>
                Back to home
            </Link>
        </div>
    );
}