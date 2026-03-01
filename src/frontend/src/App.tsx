import { BottomNav } from "@/components/BottomNav";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { AccountPage } from "@/pages/AccountPage";
import { AdminPage } from "@/pages/AdminPage";
import { CartPage } from "@/pages/CartPage";
import { CheckoutPage } from "@/pages/CheckoutPage";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { MyOrdersPage } from "@/pages/MyOrdersPage";
import { OrderConfirmedPage } from "@/pages/OrderConfirmedPage";
import { ProductDetailPage } from "@/pages/ProductDetailPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { StorePage } from "@/pages/StorePage";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

// Root route (no layout, just providers)
const rootRoute = createRootRoute({
  component: () => (
    <AuthProvider>
      <CartProvider>
        <Outlet />
        <Toaster richColors position="top-right" />
      </CartProvider>
    </AuthProvider>
  ),
});

// Layout route with Header + Footer for regular pages
const mainLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "main-layout",
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <BottomNav />
    </div>
  ),
});

// Layout route without Header for admin
const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "admin-layout",
  component: () => (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  ),
});

// Individual routes under main layout
const indexRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/",
  component: HomePage,
});

const storeRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/store/$storeId",
  component: StorePage,
});

const productRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/product/$productId",
  component: ProductDetailPage,
});

const cartRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/cart",
  component: CartPage,
});

const checkoutRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/checkout",
  component: CheckoutPage,
});

const orderConfirmedRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/order-confirmed",
  validateSearch: (search: Record<string, unknown>) => ({
    orderId: typeof search.orderId === "string" ? search.orderId : undefined,
  }),
  component: OrderConfirmedPage,
});

const loginRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/login",
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  component: LoginPage,
});

const registerRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/register",
  component: RegisterPage,
});

const myOrdersRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/my-orders",
  component: MyOrdersPage,
});

const accountRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/account",
  component: AccountPage,
});

// Admin route under its own layout (no header)
const adminRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin",
  component: AdminPage,
});

// Router
const routeTree = rootRoute.addChildren([
  mainLayoutRoute.addChildren([
    indexRoute,
    storeRoute,
    productRoute,
    cartRoute,
    checkoutRoute,
    orderConfirmedRoute,
    loginRoute,
    registerRoute,
    myOrdersRoute,
    accountRoute,
  ]),
  adminLayoutRoute.addChildren([adminRoute]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
