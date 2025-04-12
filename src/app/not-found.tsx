import Link from 'next/link';
import { Routes } from '@shared/routes';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[73vh] px-6 text-center ">
      <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">Page not found</h2>
      <p className="text-gray-600 mb-6">Sorry, we couldn’t find the page you’re looking for.</p>
      <Link
        href={Routes.HOME}
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition-all"
      >
        Go back home
      </Link>
    </div>
  );
}
