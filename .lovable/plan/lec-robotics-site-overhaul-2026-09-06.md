# LEC Robotics site overhaul

Benchmarked against the product-page layout of a competitor, Pudu Robotics, to
work out what most needs fixing on LEC Robotics right now, and to set out an
overhaul that can actually be executed.

Note: the current site is built in Webflow and I cannot edit it directly. What
this produces is a written overhaul brief plus a clickable reference build inside
this project (homepage + product index + product detail page). You can either use
it as a guide for editing Webflow, or adopt the new build outright.

## 1. The worst problems today

**1. Template placeholder content is still live on product pages**
The Dinerbot T10 page carries five blocks of "Lorem ipsum", a "Short heading
here" title and a button labelled "Button"; the three case studies below it are
entirely dummy text. The prices are real (£8,247 + VAT, £192/week financed) — so
a customer sees a genuine quote and an unfinished page at the same time. That is
very costly in trust.

**2. The same placeholder image is used repeatedly**
The industry cards at the bottom of the booking and product pages use one image
for C30 / C40 / T8 / T9 / T10 / UGOT alike; Xbot Lite on the homepage is still
Webflow's stock grey placeholder. UGOT's description is also wrong — it reads
"3-in-1 Intelligent Floor Cleaning", which is C30's copy.

**3. There is no navigation bar**
The top of the site has only a logo and a "Book a Call". No entry point for
products, industry solutions, resources or about. Compare Pudu: Products /
Industries / Resources / About across the top, with products further divided into
cleaning robots / commercial delivery / industrial delivery / embodied AI /
accessories. LEC has eleven robots and no product index at all — visitors can
only scroll the homepage hunting for them.

**4. The homepage opens on an expired event**
The largest heading on the homepage is "Robot Week" (7–18 September, Chelsea
showroom). The event is over, and the first thing a new visitor sees is not who
you are or what you solve for them.

**5. The same products appear twice on the homepage**
C40, C30, Xbot S Pro, T10, W3, T9 and S100 each appear twice, with inconsistent
copy — it reads like two versions that were never reconciled.

**6. The conversion path is muddled**
The "Contact Us" button on the "Book a Call" page links to `#` and does nothing;
other buttons on the same page point at `/contact-us`. Five different labels are
in play — Book a Call, Contact Us, Enquire Now, Book a Demo, Learn More —
pointing at two or three different pages.

**7. SEO fundamentals**
The homepage title is "Home | LEC Robotics"; "Home" wastes the most valuable
position there is. Almost no product image has alt text. Product pages carry no
structured data — an obvious fit, given the prices are already public.

## 2. What is worth borrowing from Pudu

Pudu's product system is three layers — category → model → industry solution —
and every model has a very short positioning line ("Light-payload Industrial
Delivery Robot"), a status badge (NEW / Hot) and a consistently framed product
shot. LEC already has good one-liners ("Delivery robot. Digital display. Two jobs
at once."); what is missing is the skeleton that organises them.

Proposed structure:

```text
Home
 ├─ Product index /products   by job: food service / cleaning / building delivery /
 │    │                       coffee & ice cream / industrial transport / education
 │    └─ Product detail /products/xxx
 ├─ Solutions /solutions      hotel / restaurant / healthcare / retail / warehouse /
 │                            education (currently just tags; should be pages)
 ├─ Resources /resources      spec sheet downloads, case studies, events
 └─ Booking /book-a-call
```

LEC's advantages over Pudu should be amplified: **published prices, finance
options, and UK deployment and compliance.** Pudu quotes no prices anywhere; LEC
already does. That is strong differentiation and belongs in a comparison table on
the product index (model / payload / runtime / outright price / weekly), not
buried across individual detail pages.

## 3. The overhaul, by priority

**First priority: clean-up (a day or two, biggest return)**
- Delete every Lorem ipsum, "Short heading here" and "Button" placeholder; hide
  whole blocks where there is nothing real to say yet
- Replace every duplicated placeholder image; supply a real Xbot Lite shot;
  correct the UGOT description
- De-duplicate the homepage so each robot appears once
- Unify the CTA: one primary label site-wide, "Book a Demo", pointing at one
  page; fix the dead `#` links
- Replace the homepage hero with a brand proposition, and move Robot Week to a
  swappable event strip below the fold

**Second priority: structure**
- Add a site navigation bar: Products / Solutions / Resources / About / Book a Demo
- Build the product index with category switching, cards carrying the one-liner
  plus a starting price
- Add a full comparison table to the product index (payload, runtime, speed,
  price, weekly)
- Turn the six industry tags into real solution pages, each with the matching
  models and one genuine case study

**Third priority: content and conversion**
- Write three real case studies (they are dummy text today) — this needs customer
  names, settings and outcome figures from you
- Put a spec sheet download on every product page (T10 already has a PDF; the
  rest need one) and gate it behind an email to capture leads
- Build an ROI calculator: labour cost in, payback period out. The homepage
  already promises "get the ROI figures" and does not deliver it
- Rewrite page titles around keywords, and add Product structured data (including
  price) to product pages

## 4. What I will deliver

1. A complete overhaul brief (page-by-page issue list and suggested copy) that can
   be handed straight to whoever edits Webflow
2. A clickable reference build in this project:
   - a new homepage (proposition hero + categorised product grid + six
     capabilities + event strip + conversion block)
   - a product index (category switching + full comparison table)
   - one product detail template (Dinerbot T10, with specs, price, finance and
     spec sheet download)

## What I need from you

- Real case study material — customer, setting, outcome figures. Without it I
  will leave the slots empty rather than invent anything.
- The missing product shots, Xbot Lite in particular.
- Whether you want to keep an event slot (Robot Week) on the homepage.
