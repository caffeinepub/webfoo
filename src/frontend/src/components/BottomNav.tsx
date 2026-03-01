import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, LogOut, Package, UserCircle } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export function BottomNav() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Only show for logged-in customers
  if (!currentUser) return null;

  function handleLogout() {
    logout();
    navigate({ to: "/login", search: { redirect: undefined } });
  }

  function handleNotification() {
    toast.info("No new notifications", {
      description: "You're all caught up!",
      duration: 3000,
    });
  }

  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.2 }}
      aria-label="Bottom navigation"
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: "#0f0f0f/95",
        backgroundColor: "#0f0f0f",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(6,182,212,0.18)",
        boxShadow: "0 -1px 12px rgba(0,0,0,0.6)",
      }}
    >
      {/* Safe area support for devices with home bars */}
      <div
        className="flex items-stretch"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        {/* Orders */}
        <Link
          to="/my-orders"
          className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1.5 px-2 min-h-[44px] transition-colors duration-150 group"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          {({ isActive }) => (
            <>
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-150"
                style={
                  isActive
                    ? { backgroundColor: "rgba(6,182,212,0.18)" }
                    : { backgroundColor: "transparent" }
                }
              >
                <Package
                  className="w-3.5 h-3.5 transition-colors duration-150"
                  style={{
                    color: isActive ? "#06B6D4" : "rgba(255,255,255,0.45)",
                  }}
                />
              </div>
              <span
                className="text-[8px] font-semibold tracking-wide transition-colors duration-150"
                style={{
                  color: isActive ? "#06B6D4" : "rgba(255,255,255,0.45)",
                }}
              >
                Orders
              </span>
            </>
          )}
        </Link>

        {/* My Account */}
        <Link
          to="/account"
          className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1.5 px-2 min-h-[44px] transition-colors duration-150"
        >
          {({ isActive }) => (
            <>
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-150"
                style={
                  isActive
                    ? { backgroundColor: "rgba(6,182,212,0.18)" }
                    : { backgroundColor: "transparent" }
                }
              >
                <UserCircle
                  className="w-3.5 h-3.5 transition-colors duration-150"
                  style={{
                    color: isActive ? "#06B6D4" : "rgba(255,255,255,0.45)",
                  }}
                />
              </div>
              <span
                className="text-[8px] font-semibold tracking-wide transition-colors duration-150"
                style={{
                  color: isActive ? "#06B6D4" : "rgba(255,255,255,0.45)",
                }}
              >
                My Account
              </span>
            </>
          )}
        </Link>

        {/* Notifications */}
        <button
          type="button"
          onClick={handleNotification}
          className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1.5 px-2 min-h-[44px] transition-colors duration-150 group cursor-pointer bg-transparent border-0 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-inset"
          aria-label="Notifications"
        >
          <div className="w-6 h-6 rounded-lg flex items-center justify-center group-hover:bg-white/8 transition-all duration-150">
            <Bell
              className="w-3.5 h-3.5 transition-colors duration-150 group-hover:text-white"
              style={{ color: "rgba(255,255,255,0.45)" }}
            />
          </div>
          <span
            className="text-[8px] font-semibold tracking-wide transition-colors duration-150 group-hover:text-white"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Notification
          </span>
        </button>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1.5 px-2 min-h-[44px] transition-colors duration-150 group cursor-pointer bg-transparent border-0 outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-inset"
          aria-label="Logout"
        >
          <div className="w-6 h-6 rounded-lg flex items-center justify-center group-hover:bg-red-500/12 transition-all duration-150">
            <LogOut
              className="w-3.5 h-3.5 transition-colors duration-150 group-hover:text-red-400"
              style={{ color: "rgba(255,255,255,0.45)" }}
            />
          </div>
          <span
            className="text-[8px] font-semibold tracking-wide transition-colors duration-150 group-hover:text-red-400"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Logout
          </span>
        </button>
      </div>
    </motion.nav>
  );
}
