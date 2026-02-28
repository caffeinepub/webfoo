import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Link } from "@tanstack/react-router";
import { LogIn, LogOut, ShoppingCart, User } from "lucide-react";
import { motion } from "motion/react";

export function Header() {
  const { totalItems } = useCart();
  const { currentUser, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-[#0f0f0f]/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <img
            src="/assets/uploads/cropped_circle_image-1.png"
            alt="WebFoo Mart"
            className="h-14 w-14 object-contain"
          />
        </Link>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Auth controls */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              {/* User display */}
              <div
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{
                  backgroundColor: "rgba(6,182,212,0.12)",
                  border: "1px solid rgba(6,182,212,0.2)",
                }}
              >
                <User className="w-4 h-4" style={{ color: "#06B6D4" }} />
                <span className="text-sm font-medium text-white max-w-[100px] truncate">
                  {currentUser.displayName}
                </span>
              </div>
              {/* Mobile: just icon */}
              <div
                className="flex sm:hidden items-center justify-center w-9 h-9 rounded-xl"
                style={{
                  backgroundColor: "rgba(6,182,212,0.12)",
                  border: "1px solid rgba(6,182,212,0.2)",
                }}
              >
                <User className="w-4 h-4" style={{ color: "#06B6D4" }} />
              </div>
              {/* Logout button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/8 hover:bg-white/15 transition-colors text-sm font-medium text-white/70 hover:text-white"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </motion.button>
            </div>
          ) : (
            <Link to="/login" search={{ redirect: undefined }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors text-sm font-semibold"
                style={{
                  backgroundColor: "rgba(6,182,212,0.18)",
                  border: "1px solid rgba(6,182,212,0.3)",
                  color: "#22D3EE",
                }}
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Login</span>
              </motion.div>
            </Link>
          )}

          {/* Cart */}
          <Link to="/cart" className="relative group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-white" />
              <span className="hidden sm:block text-sm font-medium text-white">
                Cart
              </span>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center"
                  style={{ backgroundColor: "#06B6D4" }}
                >
                  {totalItems > 99 ? "99+" : totalItems}
                </motion.span>
              )}
            </motion.div>
          </Link>
        </div>
      </div>
    </header>
  );
}
