# Caroline Black Reiki — website prototype

A first-pass static site for Caroline's Reiki practice in Durham, NC. Plain HTML/CSS with a small JS file and **no build step**, set up the same way as Buster's other GitHub Pages sites: Pages serves the `main` branch from the repo root.

| Page | File |
|---|---|
| Home | `index.html` |
| About Reiki | `reiki.html` |
| About Caroline | `about.html` |
| FAQ | `faq.html` |
| Contact / request a session | `contact.html` |

Shared styles are in `css/style.css`. `js/site.js` holds the mobile menu and contact-form behavior. The header and footer are repeated in each HTML file, so a nav or footer change has to be made in all five files.

## Preview locally

```bash
cd ~/caroline-reiki && python3 -m http.server 8742
```

Then open http://localhost:8742.

## Finding placeholders

Anything still to be written is marked with the literal text `[[PLACEHOLDER: …]]`. It shows on the page in a yellow dashed box, so it's hard to miss. To list every one:

```bash
grep -rn "PLACEHOLDER" --include=*.html --include=*.js .
```

Delete the surrounding `<span class="ph">` or `<div class="ph">` when you fill one in. Photo slots are `<figure class="photo-ph">`: swap each one for an `<img src="images/…" alt="…">`, or delete it. The layout works without photos.

### Current list

**Business details**
- [ ] Session lengths: `index.html` (pricing cards), `reiki.html` (“What happens in a session”), `faq.html` (“How long is a session?”)
- [ ] Prices and first-session rate: `index.html` pricing cards, `faq.html` (“How much does it cost…”)
- [ ] Intro line for pricing (sliding scale, packages, payment methods): `index.html`
- [ ] Third pricing option (90-minute session, package?) or delete that card: `index.html`
- [ ] Accepted payment methods: `faq.html`
- [ ] Cancellation policy: `faq.html`
- [ ] Typical hours / availability: `contact.html` sidebar
- [ ] Reply time: `contact.html` sidebar
- [ ] Public contact email (optional): `contact.html` sidebar
- [ ] Neighborhood or general area, parking: `faq.html` (“Where is the studio?”)
- [ ] Parking, stairs/accessibility, pets in the home: `about.html` (“The studio”)

**Caroline**
- [ ] Her story (“Why I do this”), 2–4 short paragraphs in her own words: `about.html`
- [ ] Reiki lineage or teacher: `about.html`
- [ ] Other training, certifications, memberships: `about.html`
- [ ] Anything else about how she works: `about.html`
- [ ] Portrait photo (4:5, natural light): `about.html`
- [ ] Studio photo (16:9): `about.html`

**Technical**
- [ ] Formspree form ID: `contact.html` (`action="https://formspree.io/f/PLACEHOLDER_FORM_ID"`). See below.
- [ ] Domain: none yet. See “Going live” below.

## Contact form setup (Formspree)

GitHub Pages can't send email itself, so the form posts to [Formspree](https://formspree.io). Until the form ID is filled in, the form runs in **demo mode**: it shows a yellow notice and sends nothing.

Buster needs to:

1. Sign up at formspree.io. The free plan allows 50 submissions a month. Sign up with the email address that should **receive** the requests, or add that address in Formspree and verify it.
2. Create a new form, e.g. “Reiki session requests”, and copy its ID: the part after `/f/` in the endpoint, like `xyzabcde`.
3. In `contact.html`, replace `PLACEHOLDER_FORM_ID` with that ID. Commit and push.
4. Send a test from the live site. Formspree asks you to confirm the first submission.
5. Optional, in Formspree settings: restrict submissions to the site's domain, and turn on reCAPTCHA if spam shows up. The form already has a hidden `_gotcha` honeypot field.

The destination email lives only in the Formspree dashboard, never in the site code. Submissions arrive with the subject “New Reiki session request” and include the name, email, phone, message, preferred days, preferred times and timing notes.

## Design proposal (to run by Caroline)

- **Name / wordmark:** “Caroline Black” in a serif, with “REIKI · DURHAM, NC” in small spaced capitals beneath. It's text only, so it's easy to change. The favicon is a simple “CB” on pine green (`favicon.svg`).
- **Type:** Newsreader (serif headings) and Public Sans (body), both free from Google Fonts.
- **Palette** (all in `:root` at the top of `css/style.css`):
  - Paper `#F6F3EE`: warm off-white background
  - Linen `#ECE6DD`: alternate section tint
  - Ink `#1F2421`: text
  - Pine `#2E4A3F`: buttons, links, the medical-care band
  - Clay `#B0603C`: small accents only (step numbers, bullets, focus ring)
- **Deliberately avoided:** lotus flowers, chakra colors, purple gradients, mandalas, guru language, stock “hands over belly” photos.

## Accessibility notes

- Semantic landmarks, a skip link, one `h1` per page, and labeled form fields
- Visible focus rings, keyboard-usable FAQ (native `<details>`), and 44px+ tap targets
- Text colors meet WCAG AA contrast on the background. Clay is used only for decoration or large text.
- Works without JavaScript: the nav shows in full and the form posts normally
- Respects `prefers-reduced-motion`

## Going live (later)

1. Remove the prototype banner (`<div class="proto-banner">` in each page).
2. Remove `<meta name="robots" content="noindex">` from each page so search engines can index the site.
3. Buy a domain, then add a `CNAME` file with it, as in Buster's other sites (e.g. `lobster-dice`). Point DNS at GitHub Pages and turn on “Enforce HTTPS” in the repo's Pages settings.
4. Optional: add an Open Graph image for nicer link previews.
