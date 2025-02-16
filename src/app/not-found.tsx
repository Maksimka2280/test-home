import Link from 'next/link';
import { Routes } from '@shared/routes';

// TODO: update layout after getting design for not found page
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href={Routes.HOME}>Return Home</Link>
    </div>
  );
}
