# WebFoo Mart

## Current State
- Customer login/registration uses username + password (text field)
- Admin panel has Orders, Manage Stores (with image upload), Manage Products, and Customers tabs
- The Customers tab in admin shows: name, login ID, password hash only -- no orders or address
- There is no "Account" page for logged-in customers
- Header shows user display name, My Orders link, and Logout button
- AuthContext stores: username, displayName, passwordHash

## Requested Changes (Diff)

### Add
- A new customer **Account page** (`/account`) accessible to logged-in users showing:
  - Full name (displayName)
  - Mobile number (phone)
  - Last used delivery address (pulled from localStorage orders)
  - Full order history (same data as My Orders page)
- An "Account" link in the Header for logged-in users (replacing or alongside "My Orders")
- Mobile number field in `AuthContext` StoredUser shape and in the register/login flow
- Mobile number validation on registration (10-digit Indian mobile number)

### Modify
- **AuthContext**: Add `phone` field to `StoredUser` and `AuthUser` interfaces
- **RegisterPage**: Replace "Username" field with "Mobile Number" field (type=tel, 10-digit validation). Keep Display Name, Password, Confirm Password
- **LoginPage**: Replace "Username" label/placeholder with "Mobile Number" field (type=tel). Login key remains the mobile number (acts as unique identifier)
- **AuthContext login/register logic**: Use mobile number as the unique `username` key internally (no breaking changes to localStorage keys)
- **AdminPage Customers tab**: Expand each customer row to show: name, mobile number (login ID), password hash, and a collapsible section showing their orders and last known address
- **Header**: Add "Account" icon/link for logged-in users that goes to `/account`. Keep My Orders and Logout. On mobile show icon only.

### Remove
- Nothing removed -- all existing pages and functionality remain intact

## Implementation Plan
1. Update `AuthContext.tsx`: add `phone` to `StoredUser` and `AuthUser`; update register to accept and store phone; update login to match on phone number as username
2. Update `RegisterPage.tsx`: replace Username field with Mobile Number (tel input, 10-digit validation); pass phone to register()
3. Update `LoginPage.tsx`: replace Username field with Mobile Number (tel input)
4. Create `AccountPage.tsx` (`/account`): shows customer profile (name, phone, address from orders), full order history
5. Update `Header.tsx`: add Account link for logged-in users
6. Update `AdminPage.tsx` CustomersTab: expand rows to show phone number as login ID, and show each customer's orders/address inline
7. Update `App.tsx` router: add `/account` route
