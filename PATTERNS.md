# Agent Builder Prototype — Pattern Reference

Last updated: 2026-04-09

Use this file during `/design` instead of reading through all prototype code. Update this file whenever the prototype is modified.

---

## Tech Stack

- React 19.2.0, Vite 7.2.4, Tailwind CSS v4.1.18
- Lucide React 0.562.0 (icon library — 30+ icons)
- No router — state-based view switching via `currentView`
- No global state library — pure React hooks (useState, useRef)
- Single-file architecture: everything in `src/App.jsx` (~1521 lines)

## File Structure

```
src/
├── App.jsx       — All components (AgentBuilderComplete, InstructionsView,
│                   ToolsVariablesView, MCPConnectionsView, KnowledgeBaseView,
│                   MentionDropdown, CreateModal)
├── main.jsx      — Entry point
├── index.css     — Tailwind imports
└── assets/       — Minimal assets
```

## Master Layout

**Three-Column (Instructions page):**
```
┌──────────┬─────────────────┬──────────┐
│ Sidebar  │  Main Content   │  Chat    │
│ (240px)  │  (flex-1)       │ Preview  │
│          │                 │ (320px)  │
└──────────┴─────────────────┴──────────┘
```

**Two-Column (all other pages):**
```
┌──────────┬──────────────────────────────┐
│ Sidebar  │  Main Content (flex-1)       │
│ (240px)  │                              │
└──────────┴──────────────────────────────┘
```

## Navigation Structure

| Nav Item | Icon | View ID | Purpose |
|----------|------|---------|---------|
| Instructions | FileText | `instructions` | Agent behavior via @ mention system |
| Tools | Variable | `tools` | Frontend actions, variables, auth, user vars |
| MCP | Plug | `mcp` | External service connections |
| Knowledge Base | BookOpen | `knowledge` | Knowledge sources (text, files, links) |
| Logs | BarChart3 | `logs` | Conversation logs (placeholder) |
| Deploy | Rocket | `deploy` | Deploy config (placeholder) |

Sidebar also has:
- Logo area: "cometchat" branding
- Agent selector dropdown ("Support Agent")
- Dashboard button at bottom
- Active state: `bg-purple-50 text-purple-700`

## Page Patterns

### Instructions Page
- Header: Title + "Save & Run" button (purple)
- Model selector dropdown (gpt-5-mini, gpt-4-turbo, claude-3-opus)
- Settings button (icon)
- @ reference hint row with Tools/MCP quick buttons
- Full textarea with @ trigger detection
- Right panel: Chat preview (avatar, online status, message area, input bar)

### Tools & Variables Page
- 5 tabs: External Tools, Frontend Actions, Frontend Variables, Auth Variables, User Variables
- Active tab shows count of enabled items
- Table per tab: Name | Description | Syntax | Toggle columns
- Empty state: Icon + message + "Add New" CTA button
- Grid layout: `grid grid-cols-12 gap-4`

### MCP Connections Page
- Connected services: 2-column grid of cards
- Available integrations: 3-column grid of cards
- Card content: Icon + name, status badge, tools list
- Settings button per connected service

### Knowledge Base Page
- Quick add cards: 3 dashed-border cards (Text, Files, Links)
- Knowledge items table below
- Color coding: files=purple, link=blue, text=green
- Actions: View/Edit/Delete buttons per row

## Components

### @ Mention Dropdown (MentionDropdown)
Spotlight-style two-panel search modal:
```
┌──────────────────────────────────────┐
│  Search Bar                          │
├──────────┬──────────────────────────┤
│Categories│ Quick Access / Items     │
│ (240px)  │ (flex)                   │
└──────────┴──────────────────────────┘
│ Keyboard hints + "+ Create custom"   │
└──────────────────────────────────────┘
```
- Triggered by typing `@` in instructions textarea
- Uses mirror technique for cursor position calculation
- Keyboard navigation: Tab/Shift+Tab (panels), arrows (items), Enter (select), Escape (close)
- Search filters categories and items in real-time
- Item selection inserts syntax into textarea

### Create Modal
- Types: action, frontend-var, auth-var, user-var, knowledge, mcp
- Knowledge: 2-step (type selection → details). Others: 1-step.
- Layout: Header (icon + title + close) | Form | Footer (Cancel + Create)
- Size: `max-w-lg` (512px)
- Auto-generates syntax: `@category:key`

### Toggle Switch
```jsx
// Uses Lucide ToggleRight/ToggleLeft icons
// Enabled: text-green-500 (ToggleRight)
// Disabled: text-gray-300 (ToggleLeft)
```

### Tables
- Grid layout: `grid grid-cols-12 gap-4`
- Header: `bg-gray-50` with uppercase labels
- Rows: `border-b hover:bg-gray-50`
- Toggle in last column

### Cards
- MCP cards: `bg-white border border-gray-200 rounded-xl`
- Quick add cards: Dashed border `border-dashed border-2`
- Hover: `hover:border-purple-300` or `hover:bg-gray-50`

### Modals
- Fixed position with backdrop: `bg-black/50`
- Content: `rounded-2xl shadow-2xl max-w-lg`
- Header + form body + footer buttons

### Empty States
- Icon + title + description + CTA button
- Centered in content area

## Design Tokens

### Category Colors
| Category | Color | Usage |
|----------|-------|-------|
| Frontend Actions | Purple `#8B5CF6` | Icon bg + accents |
| Frontend Variables | Teal `#14B8A6` | Icon bg + accents |
| User Auth Variables | Lime `#A3E635` | Icon bg + accents |
| User Variables | Orange `#FB923C` | Icon bg + accents |
| MCP Tools | Rose `#F43F5E` | Icon bg + accents |
| Knowledge Base | Indigo `#6366F1` | Icon bg + accents |

Icon backgrounds use hex + `20` opacity suffix for light tint.

### Semantic Colors
| Purpose | Token |
|---------|-------|
| Primary action | `purple-600` (buttons, links, active) |
| Hover | `purple-700` |
| Enabled/Success | `green-500` |
| Warning/Sensitive | `amber-600`, `amber-100` bg |
| Disabled | `gray-300`, `gray-400` |
| Primary text | `text-gray-900` |
| Secondary text | `text-gray-500` |
| Tertiary text | `text-gray-400` |
| Borders | `border-gray-200` |
| Page background | `bg-white` (cards), `bg-gray-50` (hover) |

### Typography
| Use | Classes |
|-----|---------|
| Page title | `text-xl font-semibold text-gray-900` |
| Section title | `text-sm font-medium text-gray-900` |
| Body | `text-sm text-gray-900` |
| Secondary | `text-sm text-gray-500` |
| Labels | `text-sm font-medium text-gray-700` |
| Code/Syntax | `text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded` |

No custom fonts — uses system defaults.

### Spacing
- Padding: `px-3 py-2.5`, `p-4`, `p-5`, `p-6`
- Gap: `gap-2`, `gap-3`, `gap-4`, `gap-6`
- Tailwind 4px base unit throughout

### Border Radius
- Buttons/inputs: `rounded-lg`
- Cards/containers: `rounded-xl`
- Modals: `rounded-2xl`
- Badges: `rounded-full`

### Shadows
- Dropdowns/modals: `shadow-2xl`
- Hover cards: `shadow-sm`

## Interaction Patterns

### @ Mention Flow
1. User types `@` in instructions textarea
2. Mirror technique calculates cursor position
3. Dropdown appears at cursor location
4. User navigates categories → items via keyboard or click
5. Selecting item inserts `@category:key` syntax into textarea
6. Dropdown closes, textarea refocuses

### Form Save (Create Modal)
1. Click "Add New" → modal opens
2. Fill form fields → syntax auto-generated from type + key
3. Click "Create" → new item added to array, modal closes
4. For knowledge: Step 1 (select type) → Step 2 (fill details)

### Toggle Enable/Disable
- Click toggle icon → `.enabled` flips immediately
- Visual: green ToggleRight (on) ↔ gray ToggleLeft (off)
- Disabled items: text becomes `gray-400`

### Chat Preview (Instructions Page)
- Static preview showing agent avatar + online status
- Welcome message display
- Input bar (non-functional in prototype)
- Grid pattern background via repeating-linear-gradient

## Status Badges
- Connected: `bg-green-50 text-green-600`
- Auth type: `bg-purple-100 text-purple-700`
- Sensitive: `bg-amber-100 text-amber-700`
- Count: `bg-gray-100 text-gray-500`

## States NOT Yet Implemented
- Loading states / skeletons
- Network error handling
- Input validation feedback
- Mobile responsive layouts
- Logs page content
- Deploy page content
