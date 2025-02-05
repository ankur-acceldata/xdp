import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The requested page could not be located. It may have been moved, deleted, or is temporarily unavailable.
        </p>
        <Button asChild variant="default">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
} 