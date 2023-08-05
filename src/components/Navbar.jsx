import Link from 'next/link';
import { useRouter } from 'next/router';

function Navbar() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.clear();
    router.replace('/login');
  };
  return (
    <nav className="bg-slate-700 text-white fixed top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-6xl py-6 flex justify-between items-center">
        <Link href="/products">
          <h1 className="font-bold text-2xl text-emerald-500">TokoLaku</h1>
        </Link>
        <div className="flex justify-start items-center space-x-3">
          <button
            role="link"
            type="button"
            className="block bg-white px-4 py-2 hover:bg-slate-100 text-sm rounded-lg text-slate-600"
          >
            Profile
          </button>
          <button
            role="link"
            type="button"
            className="block bg-red-500 px-4 py-2 hover:bg-red-600 text-sm rounded-lg"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
