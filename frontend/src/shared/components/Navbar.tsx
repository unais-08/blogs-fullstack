/**
 * Navbar Component
 * Matches the visual style of the screenshot with integrated Auth logic
 */
import { Link, useNavigate } from "react-router"; // Assuming react-router-dom
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ROUTES } from "@/constants";
import { Button } from "@/shared/components";

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const navLinks = [
    { name: "Home", path: ROUTES.HOME },
    { name: "Blogs", path: ROUTES.BLOGS },
    // { name: "About", path: "#about" },
  ];

  return (
    <nav className="sticky top-0 z-50 flex h-20 items-center justify-between bg-white px-8 py-4 shadow-sm md:px-16">
      {/* Brand/Logo Area */}

      <header className="relative z-10 py-10 px-8">
        <div className="max-w-7xl mx-auto text-center md:text-left">
          <Link
            to={ROUTES.HOME}
            className="text-2xl font-black uppercase tracking-[0.3em] text-[#111] hover:text-[#7843e9] transition-all"
          >
            Dev <span className="text-[#7843e9]">Blogs</span>
          </Link>
        </div>
      </header>

      {/* Navigation Links & Auth Actions */}
      <div className="flex items-center gap-10">
        <ul className="hidden gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className="text-sm font-bold uppercase tracking-widest text-[#333] transition-colors hover:text-[#7843e9]"
              >
                {link.name}
              </Link>
            </li>
          ))}

          {/* Authenticated Specific Links */}
          {isAuthenticated && (
            <>
              <li>
                <Link
                  to={ROUTES.MY_BLOGS}
                  className="text-sm font-bold uppercase tracking-widest text-[#333] transition-colors hover:text-[#7843e9]"
                >
                  My Blogs
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.CREATE_BLOG}
                  className="text-sm font-bold uppercase tracking-widest text-[#333] transition-colors hover:text-[#7843e9]"
                >
                  Create
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
          {isAuthenticated ? (
            <Button
              size="sm"
              variant="outline"
              onClick={handleLogout}
              className="border-[#7843e9] text-[#7843e9] hover:bg-[#7843e9] hover:text-white font-bold uppercase tracking-tighter"
            >
              Logout
            </Button>
          ) : (
            <div className="flex items-center gap-3">
              <Link to={ROUTES.LOGIN}>
                <span className="text-sm font-bold uppercase tracking-widest text-[#333] hover:text-[#7843e9] cursor-pointer">
                  Login
                </span>
              </Link>
              <Link to={ROUTES.REGISTER}>
                <Button
                  size="sm"
                  className="bg-[#7843e9] text-white font-bold uppercase tracking-widest px-6 py-2 hover:bg-[#6a36db]"
                >
                  Join
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
