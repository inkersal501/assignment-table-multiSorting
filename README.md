# Multi‑Column Sorting Table (React + TypeScript)

A lightweight, production‑ready multi‑column sorting system for a data table in React + TypeScript with:
- Drag‑and‑drop sort priority (optional)
- Modal to add/remove sort columns
- Badge indicator on the toolbar icon
- Type‑safe comparator for `string | number | Date`
- Optional client‑type filter before sorting

---

##  Features

- **Prioritized multi‑sort**: sort by multiple fields in order (e.g., `Client ID: desc`, then `Client Name: asc`).
- **Stable comparator**: strings via `localeCompare`, numbers via subtraction, dates via `getTime()`.
- **Guarded type‑safety**: safe narrow for `string | number | Date` fields; no TS errors on `instanceof`.
- **UI helpers**:
  - Hide already‑selected columns in “Available Columns”
  - Drag to reorder sort priority (if using a DnD library)
  - Badge showing active sort count
- **Pre‑filtering**: filter by client type (`All` or a specific type) before sorting.

---

##  Tech Stack

- **React** + **TypeScript**
- **State**: Redux Toolkit (or Context API)
- **Styles**: Tailwind CSS
- (Optional) **Drag‑and‑Drop**: `@dnd-kit` or `react-beautiful-dnd`

---

##  Install

```bash
# if starting fresh
npm i react redux @reduxjs/toolkit react-redux tailwindcss

# if you plan to add drag and drop
npm i @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

---

##  Optional: Drag‑and‑Drop Sort Priority

Use `@dnd-kit/sortable` to reorder `SortItem[]`. Update your Redux state with the new order; `applyMultiSort` will respect it.

---

##  Edge Cases & Tips

- **Mixed types** in the same column are treated as equal (comparison `0`). Prefer consistent data types per column.
- **Null/undefined**: pre‑clean your dataset or coerce via accessors (`value ?? ''` / `?? 0`).
- **Locale**: if you need locale‑aware sorting for specific languages, pass locale/options into `localeCompare`.
- **Dates as strings**: parse to `Date` objects where possible to avoid brittle string comparisons.
- **Performance**: avoid creating new Date objects in the comparator; normalize data beforehand.

---

##  Testing Ideas

- Sorting by a single column (asc/desc).
- Ties on first column resolved by the second.
- Dragging priority changes results.
- Filtering by `clientType` produces the expected subset before sorting.
- Columns with identical values retain stable relative order for subsequent keys.

---

##  Troubleshooting

- **TS error** “left-hand side of an 'instanceof' …”: Make sure you cast to `unknown` before narrowing to `Date` as shown above.
- **Badge misaligned**: Ensure parent has `relative` and badge uses `absolute -top-2 -right-2`.
- **Duplicates in ‘Available Columns’**: Confirm the `.filter(!sorts.some(...))` logic is in place.

---

##  License

MIT
