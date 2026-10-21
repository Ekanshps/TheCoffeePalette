# The Coffee Palette — Premium Website V2

A mobile-first, multi-page static website concept for The Coffee Palette in Gomti Nagar, Lucknow. This rebuild focuses on visits and enquiries—not simply a hero landing page.

## Site map
- `index.html`: brand intro, Google review proof, menu highlights, photo gallery and direction/call CTAs.
- `menu.html`: live client-side search/filter menu, “Add to my picks” shortlist and pre-filled WhatsApp enquiry. No checkout is implied.
- `experiences.html`: art and group-visit ideas plus a client-side enquiry form that prepares a WhatsApp message.
- `visit.html`: address, opening hours, phone, embedded map and accessible FAQ.
- `404.html`: branded fallback page.

## Stack
Semantic HTML5, custom responsive CSS, vanilla JavaScript, GSAP 3 + ScrollTrigger via CDN, Google Fonts via CDN, inline SVG icons. No package manager or server-side code is required.

## Business details shown (verify before launch)
- Address: 3/545, Vivek Khand 2, Gomti Nagar, Lucknow, Uttar Pradesh 226010.
- Phone: +91 80907 53057.
- Publicly listed hours: daily, 11 AM–11 PM.
- Public aggregate rating: Google 4.4/5 with roughly 1.4k+ reviews (number changes over time; verify the live profile).
- Approximate spend publicly listed by Zomato: around ₹1,100 for two (not a guarantee of current price).

## Google review excerpts
The review carousel uses short excerpts of public Google reviews surfaced on the café's Wanderlog listing, retaining review attribution and a rating/date where shown. Each is linked back to the supplied Google Maps profile. Confirm the excerpt, name display and current review context with the owner before the public launch. The site intentionally does **not** publish AggregateRating/Review JSON-LD for first-party reviews: self-serving LocalBusiness review markup is not eligible for Google review snippets.

Sources reviewed 21 October 2026:
- Google Maps profile provided by user: https://maps.app.goo.gl/r9Le7ncyLVTgqxL1A
- Wanderlog listing and review excerpts: https://wanderlog.com/place/details/3971012/the-coffee-palette
- Zomato overview and menu categories/items/address/hours/price estimate: https://www.zomato.com/lucknow/the-coffee-palette-gomti-nagar and https://www.zomato.com/lucknow/the-coffee-palette-gomti-nagar/menu
- KnockSense venue article/photo: https://www.knocksense.com/amp/story/lucknow/coffee-palette-boho-ambience-lucknow
- Swiggy Dineout photo page: https://www.swiggy.com/restaurants/the-coffee-palette-gomti-nagar-lucknow-310377/dineout/photos

## Image sources / attribution
External photos are referenced from third-party listing/editorial CDNs (Zomato, Swiggy Dineout). They are not stored in this ZIP, both to keep the download lightweight and because usage rights should be confirmed before a client-facing public launch. Replace with owner-provided photos or images with explicit use permission when approved. URLs use available CDN sizing/cropping parameters where possible and images use `loading="lazy"` outside the primary hero. External hosting means images can change, be rate-limited or fail to load; this should be reviewed before handoff.

## How to run

```bash
python -m http.server 8000
```
Then open `http://localhost:8000`. (On Windows, `py -m http.server 8000` also works.) `requirements.txt` is intentionally empty of package dependencies because this is static HTML/CSS/JS.

## Preview/SEO
The page metadata is configured for `https://thecoffeepalette.epsingh.in` and the pages are deliberately marked `noindex, nofollow` while being previewed to the business owner. `robots.txt` allows crawlers to reach the noindex meta tag. After approval, update canonicals/OG URLs/sitemap/robots to the selected public domain and change the robots meta tags to `index, follow`. Never index a client preview or leave the preview as canonical if the final website moves domains.

## Interactions
- Mobile menu toggler with ARIA state
- GSAP intro motion and ScrollTrigger staggered reveals; prefers-reduced-motion is respected
- Infinite CSS marquee with pause-on-hover
- Review carousel arrows + touch swipe
- Menu search, category filters and item shortlist
- Shortlisted items / experience enquiry opens a prefilled WhatsApp message after user action
- FAQ accordion and sticky mobile call/directions bar

## Launch caveats
No integration here can confirm table bookings, save leads to a database or take payment. The WhatsApp action assumes the business number has WhatsApp enabled; verify and edit the configurable number in `body[data-whatsapp]`, `assets/main.js` and `assets/menu.js` if necessary. Google reviews and rating/count can change. Menu prices are not presented because current dish prices couldn't be reliably verified. No SEO process guarantees ranking or out-ranking competitors.
