# 💍 Kristin & Daniel — Hochzeitswebsite

## Schritt 1 — Supabase einrichten (kostenlos)

1. https://supabase.com → kostenloses Konto anlegen
2. Neues Projekt anlegen → Region: EU Frankfurt
3. Im **SQL Editor** ausführen:

```sql
create table rsvp_responses (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  attending boolean not null,
  guest_count integer default 0,
  guest_names text[] default '{}',
  food_preferences jsonb default '[]',
  allergies text default '',
  meal_confirmed boolean default false,
  language text default 'de'
);
alter table rsvp_responses enable row level security;
create policy "insert" on rsvp_responses for insert with check (true);
create policy "select" on rsvp_responses for select using (true);
```

4. **Storage** → "New bucket" → Name: `wedding-photos` → Public → Create
5. **Settings → API** → Project URL + anon key kopieren

## Schritt 2 — .env Datei anlegen

```
VITE_SUPABASE_URL=https://DEINE-URL.supabase.co
VITE_SUPABASE_ANON_KEY=DEIN-ANON-KEY
```

## Schritt 3 — Lokal starten

```bash
npm install
npm run dev
# → http://localhost:5173
```

## Schritt 4 — Auf Vercel deployen (kostenlos)

1. Code auf GitHub hochladen
2. https://vercel.com → New Project → Repo wählen
3. Environment Variables eintragen (VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY)
4. Deploy → fertig ✨

## Inhalte anpassen

| Was | Wo |
|-----|-----|
| Alle Texte (DE+EN) | `src/i18n.jsx` |
| Hotels | `src/components/Sections.jsx` → HOTELS array |
| Trauzeugen | `src/components/Sections.jsx` → witnesses array |
| PayPal-Link | `src/components/Gifts.jsx` |
| Google Maps | `src/components/Location.jsx` → iframe src |
| Admin-Passwort | `src/components/Admin.jsx` → PASSWORD |

## Fotos hochladen

→ `/admin` auf deiner Website → Tab "Fotos"
4 Slots: Hero · Foto-Streifen · Geschenke · Footer
Alle werden automatisch Schwarz-Weiß angezeigt.

## Admin-Dashboard

URL: `/admin` | Passwort: `kristindaniel2026`
- RSVP-Tabelle (Filter, Sort, CSV-Export)
- Statistik-Diagramme
- Foto-Upload

## Kosten: 0€

Supabase Free + Vercel Hobby = komplett kostenlos 🎉
