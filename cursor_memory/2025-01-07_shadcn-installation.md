# shadcn/ui Installation Memory - gsiorders.com

**Date:** 2025-01-07  
**Task:** Install shadcn/ui component system into Next.js project  
**Branch:** feat/shadcn-installation  

## Installation Process

### 1. Prerequisites Fixed
- **Issue:** Project was using Tailwind CSS v4, incompatible with shadcn/ui
- **Solution:** Downgraded to Tailwind CSS v3.4.0
- **Issue:** Missing import aliases in tsconfig.json
- **Solution:** Added baseUrl and paths configuration
- **Issue:** globals.css using CDN import instead of proper directives
- **Solution:** Replaced with `@tailwind base/components/utilities`

### 2. Components Installed
- Button (`src/components/ui/button.tsx`)
- Card (`src/components/ui/card.tsx`)
- Dialog (`src/components/ui/dialog.tsx`)
- Input (`src/components/ui/input.tsx`)
- Toast (`src/components/ui/toast.tsx`, `src/hooks/use-toast.ts`, `src/components/ui/toaster.tsx`)

### 3. Configuration Applied
- **Style:** New York (Recommended)
- **Base Color:** Slate
- **Component Directory:** `src/components/ui`
- **Import Alias:** `@/components/ui`

### 4. Brand Theming Integration
Added brand CSS variables to tailwind.config.js:
```js
colors: {
  'brand-primary': 'var(--brand-primary)',
  'brand-secondary': 'var(--brand-secondary)',
  'brand-accent': 'var(--brand-accent)',
  'brand-success': 'var(--brand-success)',
  'brand-warning': 'var(--brand-warning)',
  'brand-error': 'var(--brand-error)'
}
```

### 5. Testing
- Created `pages/test-shadcn.tsx` to verify installation
- Tests button variants, inputs, and brand theming
- All components render correctly with brand colors

## Files Modified
- `tsconfig.json` - Added import aliases
- `package.json` - Downgraded Tailwind CSS
- `postcss.config.js` - Updated for Tailwind v3
- `src/styles/globals.css` - Added proper Tailwind directives
- `tailwind.config.js` - Added shadcn config + brand theming
- `pages/api/checkout.ts` - Fixed Stripe API version

## Files Created
- `components.json` - shadcn/ui configuration
- `src/lib/utils.ts` - Utility functions
- `src/components/ui/*` - UI components
- `src/hooks/use-toast.ts` - Toast hook
- `pages/test-shadcn.tsx` - Test page

## Success Criteria Met
✅ shadcn/ui components install and render properly  
✅ Brand theming (CSS variables) applies correctly  
✅ Import aliases work (`@/components/ui/button`)  
✅ No ESLint/TypeScript errors in core components  
✅ Development server runs successfully  

## Next Steps
- Remove test page after verification
- Update existing components to use shadcn/ui where appropriate
- Add more shadcn components as needed (select, dialog, etc.)
- Consider replacing custom button/input components with shadcn versions

## Lessons Learned
- Always check Tailwind CSS version compatibility with shadcn/ui
- Proper import aliases are essential for shadcn/ui
- Must use proper Tailwind directives, not CDN imports
- Brand theming integration requires explicit CSS variable mapping 