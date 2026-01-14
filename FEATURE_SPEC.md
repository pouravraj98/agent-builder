# Agent Builder - New Features Specification

## Overview

We are adding new capabilities to the Agent Builder that allow users to reference frontend actions, variables, and other resources directly within their agent instructions using an `@` mention system. This document outlines the functionality and required UI changes.

**Prototype Reference:** https://pouravraj98.github.io/agent-builder/

---

## Feature 1: @ Mention System (Instructions Page)

### Functionality
Users can type `@` anywhere in the instructions textarea to open a Spotlight-style popup that allows them to:
- Search and insert references to tools, variables, and knowledge base items
- Browse by category
- Create new items directly

### What Gets Inserted
When a user selects an item, a syntax reference is inserted into the instructions:
- `@action:openModal` - Frontend action
- `@var:websiteUrl` - Frontend variable
- `@auth:userId` - User auth variable
- `@user:subscriptionPlan` - User variable
- `@mcp:google.sendEmail` - MCP tool
- `@kb:productDocs` - Knowledge base item

### UI Requirements

**Trigger:** User types `@` in instructions textarea

**Popup Design:**
- Centered modal positioned 15% from top of viewport
- Blurred backdrop overlay (rgba(0,0,0,0.25) + blur 4px)
- Width: 680px
- Rounded corners (16px)
- Drop shadow

**Popup Layout:**
1. **Search Bar** (top)
   - Large search input with placeholder "Search all variables, actions, tools..."
   - Clear button when text is entered

2. **Two-Column Content**
   - Left panel (240px): Category list
   - Right panel (flex): Items from selected category or Quick Access

3. **Footer**
   - Keyboard shortcut hints: ↑↓ navigate, Tab switch panel, ↵ select, Esc close
   - "+ Create custom" link (navigates to Tools page)

**Categories to Display:**
| Category | Icon | Color | Description |
|----------|------|-------|-------------|
| Front-end Actions | MousePointer | #8B5CF6 | Actions triggered on the frontend |
| Front-end Variables | Globe | #14B8A6 | Data from the current page/browser |
| User Auth Variables | Shield | #A3E635 | Authenticated user data |
| User Variables | Users | #FB923C | Custom user attributes |
| MCP Tools | Plug | #F43F5E | Connected MCP service tools |
| Knowledge Base | Database | #6366F1 | Indexed knowledge sources |

**Keyboard Navigation:**
- Arrow Up/Down: Navigate within active panel
- Tab: Switch between left and right panels
- Arrow Left/Right: Also switches panels
- Enter: Select highlighted item
- Escape: Close popup
- Backspace (when search empty): Go back from category view

**Active Panel Indicator:**
- Subtle purple background tint on active panel
- Purple dot indicator next to panel header
- Purple text color for header when active

---

## Feature 2: Tools Page Updates

### New Tabs to Add

The Tools page needs additional tabs for managing the items that can be referenced via @ mentions.

**Tab Structure:**
1. **External Tools** (existing) - Third-party integrations
2. **Frontend Actions** (new) - Triggerable frontend functions
3. **Frontend Variables** (new) - Browser/page data sources
4. **Auth Variables** (new) - User authentication data
5. **User Variables** (new) - Custom user attributes

### Frontend Actions Tab

**Purpose:** Define JavaScript functions the agent can trigger on the frontend.

**Table Columns:**
| Column | Description |
|--------|-------------|
| Name | Display name (e.g., "Open Modal") |
| Description | What the action does |
| Syntax | Reference syntax (e.g., `@action:openModal`) |
| Toggle | Enable/disable |

**Fields for Creating/Editing:**
- Name (text)
- Description (text)
- Trigger Function (code input, e.g., `showCartModal(userId)`)

---

### Frontend Variables Tab

**Purpose:** Define data sources from the browser/page that the agent can access.

**Table Columns:**
| Column | Description |
|--------|-------------|
| Name | Display name (e.g., "Website URL") |
| Description | What data it provides |
| Syntax | Reference syntax (e.g., `@var:websiteUrl`) |
| Toggle | Enable/disable |

**Fields for Creating/Editing:**
- Name (text)
- Variable Key (text, prefixed with `@var:`)
- Description (text)
- Data Source (dropdown: window.location.href, document.title, navigator.userAgent, custom)

---

### Auth Variables Tab

**Purpose:** Define authenticated user data the agent can reference.

**Table Columns:**
| Column | Description |
|--------|-------------|
| Name | Display name (e.g., "User Email") |
| Description | What data it provides |
| Syntax | Reference syntax (e.g., `@auth:email`) |
| Sensitive Badge | Shows if marked sensitive |
| Toggle | Enable/disable |

**Fields for Creating/Editing:**
- Name (text)
- Variable Key (text, prefixed with `@auth:`)
- Description (text)
- Mark as Sensitive (toggle) - Shows warning badge

---

### User Variables Tab

**Purpose:** Define custom user attributes from your system.

**Table Columns:**
| Column | Description |
|--------|-------------|
| Name | Display name (e.g., "Subscription Plan") |
| Description | What data it provides |
| Syntax | Reference syntax (e.g., `@user:subscriptionPlan`) |
| Toggle | Enable/disable |

**Fields for Creating/Editing:**
- Name (text)
- Variable Key (text, prefixed with `@user:`)
- Description (text)
- Data Type (dropdown: String, Number, Boolean, Date, Array, Object)

---

## Feature 3: Instructions Page Updates

### @ Reference Hint
Add a hint row above the textarea:
- Left side: `@` icon badge + "Type @ to reference tools or MCP."
- Right side: Quick access buttons for "Tools" and "MCP"

---

## Design Notes

1. **Consistency:** Follow existing color palette and spacing from current Agent Builder
2. **Icons:** Use Lucide icons throughout
3. **Syntax highlighting:** Display syntax references in purple monospace (`text-purple-600 bg-purple-50`)
4. **Toggle switches:** Match existing toggle style (green when enabled)
5. **Empty states:** Provide helpful empty state with icon + CTA button when no items exist

---

## Prototype Navigation

To test the features in the prototype:

1. **@ Mention Popup:** Go to Instructions page → Type `@` in textarea
2. **Tools Tabs:** Click "Tools" in sidebar → Navigate between tabs
3. **Keyboard Nav:** With popup open, use Tab, Arrow keys, Enter, Escape

---

## Questions for Design

1. Should the @ popup have a different style for mobile/tablet?
2. Do we need confirmation before inserting sensitive auth variables?
3. Should there be a preview of what the syntax will look like before inserting?
