# 🛒 Nexora Store — Comprehensive Engineering Audit & Remediation Log
> **Repository**: [https://github.com/nasrelshamekh/Nexora-Store](https://github.com/nasrelshamekh/Nexora-Store)  
> **Author**: Nasr Elshamekh  
> **Framework**: Next.js 15 (App Router), React 19, Tailwind CSS v4, TypeScript 5, NextAuth  

---

## 📑 Executive Summary

During a deep architectural scan of the **Nexora Store** codebase, multiple critical bugs, security discrepancies, and runtime navigation flaws were identified and methodically remediated in a discrete, multi-step process.

Every step has been isolated into its own atomic commit and pushed to GitHub.

---

## 🛠️ Step-by-Step Changelog & Remediation

### Step 1: Fix 404 Route Links, Empty Cart Total & Dead Navigation
- **Commit**: `fix: resolve 404 navigation routes, empty cart total, and shopping link`
- **Root Cause**:
  - In `products/page.tsx`, `categories/page.tsx`, `brands/page.tsx`, and `app/page.tsx`, links were written with relative paths lacking a leading slash (e.g. `href={`products/${id}`}`). When on `/products`, clicking a card resulted in `/products/products/:id` (HTTP 404).
  - In `cart/page.tsx`, the total cart price amount was an empty `<span></span>`.
  - The "Continue Shopping" button had no `asChild` and no link.
- **Remediation**:
  - Prefixed all dynamic links with `/` (`/products/${id}`, `/categories/${id}`, `/brands/${id}`).
  - Rendered `EGP {cartData?.totalCartPrice ?? 0}` in the total price slot.
  - Wrapped the "Continue Shopping" button in `<Link href="/products">` with `asChild`.
- **Files Modified**:
  - `src/app/(pages)/products/page.tsx`
  - `src/app/(pages)/categories/page.tsx`
  - `src/app/(pages)/brands/page.tsx`
  - `src/app/page.tsx`
  - `src/app/(pages)/cart/page.tsx`

---

### Step 2: Client Router Navigation Replacement for Server `redirect()`
- **Commit**: `fix: replace server redirect with client router navigation in buttons`
- **Root Cause**:
  - In `addToCartBtn.tsx` and `addToWishlistBtn.tsx`, `redirect("/login")` from `next/navigation` was called inside a client component button click handler inside a `try...catch` block.
  - In Next.js, `redirect()` throws a `NEXT_REDIRECT` symbol intended exclusively for Server Actions / Server Components. Calling it in client handlers threw runtime exceptions.
- **Remediation**:
  - Replaced `redirect` with `const router = useRouter()` from `next/navigation`.
  - Replaced `redirect("/login")` with `router.push("/login")`.
- **Files Modified**:
  - `src/components/products/addToCartBtn.tsx`
  - `src/components/products/addToWishlistBtn.tsx`

---

### Step 3: Dynamic Stripe Checkout Origin Resolution
- **Commit**: `fix: dynamically resolve checkout return origin instead of hardcoded vercel url`
- **Root Cause**:
  - `checkoutUser` in `cart.action.ts` hardcoded `?url=https://nexora-app-mu.vercel.app/` for Stripe card checkouts. Local dev or custom deployments were redirected to the Vercel staging deployment upon payment completion.
  - Lack of client error handling left users stuck on the modal if session creation failed.
- **Remediation**:
  - Updated `checkoutUser` to accept an optional `origin?: string` parameter and fall back to dynamic `headers()` inspection (`proto://host`).
  - Updated `checkout.tsx` to pass `window.location.origin` and added `toast.error()` alerts on failure.
- **Files Modified**:
  - `src/actions/cart.action.ts`
  - `src/components/cart/checkout.tsx`

---

### Step 4: NextAuth Secret Alignment & Chunked Cookie Resilience
- **Commit**: `fix: align nextauth secrets, handle chunked cookies, and add .env.example`
- **Root Cause**:
  - `middleware.ts` evaluated `NEXTAUTH_SECRET || AUTH_SECRET`, whereas `auth.ts` looked solely for `AUTH_SECRET!`. If only standard `NEXTAUTH_SECRET` was set, middleware let the request pass but `getUserToken()` failed with unauthorized errors across all server actions.
  - When sessions exceed 4KB, NextAuth chunks cookies (`.0`, `.1`). Manual cookie lookups failed for chunked cookies.
  - Missing `.env.example` left backend endpoints undocumented.
- **Remediation**:
  - Standardized on `NEXTAUTH_SECRET || AUTH_SECRET` across `auth.ts`, `authOptions.ts`, and `middleware.ts`.
  - Added chunked cookie reassembly logic in `getUserToken()`.
  - Created `.env.example` documenting `NEXT_PUBLIC_SITE_URL`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL`.
  - Updated `.gitignore` to track `!.env.example`.
- **Files Modified**:
  - `src/lib/auth.ts`
  - `src/lib/authOptions.ts`
  - `src/middleware.ts`
  - `.gitignore`
  - `.env.example`

---

### Step 5: Form Normalization, Render-Phase Routing & Zod Schemas
- **Commit**: `fix: eliminate nested forms, fix render phase routing, and repair zod schemas`
- **Root Cause**:
  - `cash-checkout.tsx` had an outer `<form>` wrapping `<DialogTrigger>` and `<DialogContent>`, which contained a second nested `<form>`, violating HTML specifications.
  - `verifycode/page.tsx` called `router.push('/forgotpassword')` directly during the render pass without `useEffect`.
  - `verifycode/page.tsx` and `resetpassword/page.tsx` accessed `useSearchParams()` without `<Suspense>`.
  - `auth.schema.ts` used invalid `z.email().nonempty()` and `{ error: "..." }` instead of `{ message: "..." }`.
  - `verify-code.schema.ts` allowed `min(4)` while displaying `"Code must be at least 6 characters"`.
  - `wishlist-provider.tsx` exported `CartContextProvider` by mistake.
- **Remediation**:
  - Removed outer `<form>` tag in `cash-checkout.tsx`.
  - Wrapped `router.push()` in `useEffect` and added `<Suspense>` wrappers.
  - Standardized Zod email and password-match schemas.
  - Aligned reset code validator to `min(6)`.
  - Renamed component to `WishlistContextProvider`.
- **Files Modified**:
  - `src/components/cart/cash-checkout.tsx`
  - `src/app/(auth)/verifycode/page.tsx`
  - `src/app/(auth)/resetpassword/page.tsx`
  - `src/schema/auth.schema.ts`
  - `src/schema/verify-code.schema.ts`
  - `src/provider/wishlist-provider.tsx`

---

### Step 6: UI Polish, Dark Mode Activation, Modern 404 & Cart Item Fix
- **Commit**: `feat(ui): complete step 6 - dark mode, modern 404 page, footer routes, and cart decrement fix`
- **Root Cause**:
  - In `cart-item.tsx`, clicking the minus button when `count === 1` triggered `updateCartProductCount(id, 0)`. The Route Academy API rejects count: 0 with a 400 error rather than removing the item; it requires `removeProductFromCart(id)`.
  - In `footer.tsx`, 11 links pointing to non-existent routes (`/mens`, `/womens`, `/returns`, etc.) caused 404 errors, and social links lacked security attributes.
  - In `not-found.tsx`, the 404 error was an unstyled minimal string (`<div>Not Found 404</div>`).
  - Dark mode was non-functional; `next-themes` was installed but never wrapped in root layout, and no toggle existed in the UI.
- **Remediation**:
  - Updated `cart-item.tsx` so decrementing when `count <= 1` automatically invokes `deleteProduct(id)`.
  - Replaced all dead footer links with active store routes (`/products`, `/categories`, `/brands`, `/cart`, `/wishlist`, `/allorders`), and added `target="_blank"` with `rel="noopener noreferrer"` to external links.
  - Rebuilt `not-found.tsx` with a modern branded UI including `PackageSearch` icon, friendly copy, and navigation buttons.
  - Implemented `ThemeProvider` via `next-themes` in `layout.tsx` with `suppressHydrationWarning`.
  - Built an animated `ThemeToggle` component and integrated it into `Navbar`.
- **Files Modified**:
  - `src/components/cart/cart-item.tsx`
  - `src/components/common/footer.tsx`
  - `src/app/not-found.tsx`
  - `src/provider/theme-provider.tsx`
  - `src/components/common/theme-toggle.tsx`
  - `src/app/layout.tsx`
  - `src/components/common/navbar.tsx`

---

### Step 7: Engineering Documentation, MIT License & Showcase README
- **Commit**: `docs: add comprehensive engineering audit log and showcase readme`
- **Deliverables**:
  - Created `docs/AUDIT_AND_FIXES.md` in repository.
  - Rewrote root `README.md` into a production-grade showcase with badges, architecture overview, feature list, and developer instructions.
  - Added open-source `LICENSE` (MIT).

---

### Step 8: Vercel CI/CD Build Remediation & Type Safety Alignment
- **Commit**: `fix(build): resolve token type narrowing in orders, decouple private dist imports, and memoize context handlers`
- **Root Cause**:
  - `src/app/(pages)/allorders/page.tsx`: `getUserToken()` returns `string | undefined`. Passing it into `jwtDecode<DecodedTokenI>(token)` without narrowing triggered a fatal TypeScript compiler error on Vercel: `Type 'undefined' is not assignable to type 'string'`.
  - `src/services/productServices.ts`, `brands/[brandId]/page.tsx`, `categories/[categoryId]/page.tsx`, `products/[productId]/page.tsx`: Imported internal private Next.js modules (`next/dist/server/request/params`).
  - `cart-provider.tsx` and `wishlist-provider.tsx`: `useEffect` hooks called unmemoized `handleCart` and `handleWishlist` functions, causing ESLint `react-hooks/exhaustive-deps` warnings during CI/CD.
- **Remediation**:
  - Added strict null check and `redirect('/login')` for unauthenticated sessions in `allorders/page.tsx` before decoding token.
  - Decoupled all routes and services from `next/dist/server/request/params`, utilizing standard Next.js 15 typed params `Promise<{ [key]: string }>`.
  - Wrapped `handleCart` and `handleWishlist` in `useCallback` with complete dependency arrays.
- **Files Modified**:
  - `src/app/(pages)/allorders/page.tsx`
  - `src/services/productServices.ts`
  - `src/app/(pages)/brands/[brandId]/page.tsx`
  - `src/app/(pages)/categories/[categoryId]/page.tsx`
  - `src/app/(pages)/products/[productId]/page.tsx`
  - `src/provider/cart-provider.tsx`
  - `src/provider/wishlist-provider.tsx`
