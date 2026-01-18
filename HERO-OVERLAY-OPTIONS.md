# Hero Background Overlay Options

Try these different overlay effects in your Hero.tsx component to find the perfect balance:

## Current Implementation (Line 35):
```tsx
<div className="absolute inset-0 bg-black/40" />
```

## Alternative Options:

### Option 1: Lighter Overlay (More Image Visible)
```tsx
<div className="absolute inset-0 bg-black/30" />
```

### Option 2: Gradient Overlay (Top/Bottom Dark, Center Lighter)
```tsx
<div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
```

### Option 3: Radial Gradient (Center Lighter, Edges Dark)
```tsx
<div className="absolute inset-0 bg-gradient-radial from-black/20 via-black/40 to-black/70" />
```

### Option 4: Bottom Heavy Gradient (Good for Text at Top)
```tsx
<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
```

### Option 5: Tinted Overlay (Teal/Blue Tint)
```tsx
<div className="absolute inset-0 bg-gradient-to-br from-teal-900/40 via-black/50 to-blue-900/40" />
```

### Option 6: Very Dark (Maximum Contrast)
```tsx
<div className="absolute inset-0 bg-black/70" />
```

### Option 7: Blur Effect (Softer Look)
```tsx
<div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
```

## How to Test:
1. Open `src/components/sections/Hero.tsx`
2. Find line 35 (the overlay div)
3. Replace with any option above
4. Save and check in browser
5. Pick the one that looks best with your hero-bg.jpg image

## Troubleshooting:

### If image still doesn't show:
1. Clear Next.js cache: `rm -rf .next` then `npm run dev`
2. Hard refresh browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
3. Check if image path is correct: Should be in `public/images/hero-bg.jpg`
4. Try adding this to your next.config.ts:
```ts
images: {
  unoptimized: true,
  domains: [],
  formats: ['image/webp', 'image/avif'],
}
```
