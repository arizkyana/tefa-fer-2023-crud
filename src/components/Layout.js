import { Plus_Jakarta_Sans } from 'next/font/google';
const PlusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] });

export default function Layout({ children }) {
  return (
    <main
      className={`${PlusJakartaSans.className} bg-slate-600 text-white pb-6`}
    >
      {children}
    </main>
  );
}
