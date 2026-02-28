# WebFoo Mart

## Current State

The app is a full-stack e-commerce platform with:
- **Backend (Motoko)**: Stores, products, reviews, orders, authorization
- **Frontend (React/TypeScript)**: 8 pages (Home, Store, ProductDetail, Cart, Checkout, OrderConfirmed, Login, Register)
- **Data**: 12 stores (6 backend, 6 frontend-only), 48+ products, reviews
- **Auth**: Login/Register with localStorage-based sessions, AuthContext
- **Cart**: CartContext with subtotal calculation
- **Theme**: Cyan/dark (#0f0f0f, #06B6D4) matching uploaded logo
- **Logo**: Circular image at `/assets/uploads/cropped_circle_image-1.png` in header

## Requested Changes (Diff)

### Add
- None new features; this is a comprehensive rebuild/refresh ensuring all user-specified features are present and polished

### Modify
- **HomePage**: Ensure search bar is prominent and centered, clearly distinct from the hero section; store grid is exactly 2 columns on mobile/tablet, with all 12 stores visible and categories clearly labeled (General Store, Flower Store, Chocolate Store, Grocery Store, Vegetable Store among them)
- **StorePage**: Improve product grid layout -- ensure a clean organized grid of all store items with clear product cards showing name, price, and image placeholder
- **ProductDetailPage**: Ensure photo placeholder area is prominent, description, price, quantity selector (increment/decrement), and reviews are clearly visible; "Buy Now" and "Add to Cart" buttons must be visually distinct from each other (different colors/styles)
- **CheckoutPage**: "Buy Now" must immediately trigger checkout flow starting with delivery address form, then payment gateway step; ensure the 2-step flow (address → payment) is clearly indicated
- **CartPage**: Ensure items list, quantity update controls, calculated total, and "Proceed to Checkout" button are all clearly visible
- **Login/Register pages**: Keep existing functionality, style consistent with theme

### Remove
- Nothing removed; all existing features preserved

## Implementation Plan

1. **HomePage**: Force 2-column grid (`grid-cols-2`) at all breakpoints up to lg (where it becomes 3-col optional), make search bar section more prominent with a taller/more spacious layout, ensure all 12 stores render with their category badges
2. **StorePage**: Ensure product cards show emoji/color image, name, price, and a clear CTA or link to product detail
3. **ProductDetailPage**: Ensure "Buy Now" button is visually distinct (solid, bold) and "Add to Cart" is a secondary style (outlined), quantity selector is clearly visible, reviews section is fully rendered
4. **CartPage**: Verify item rows, quantity controls, subtotal/shipping/total breakdown, and checkout button all work correctly
5. **CheckoutPage**: Verify "Buy Now" nav goes directly to checkout (bypassing cart), 2-step address+payment flow is clear
6. **Overall**: Consistent cyan/dark theme, circular logo in header, login/logout in header
