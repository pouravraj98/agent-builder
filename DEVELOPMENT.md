# Agent Builder - Development Guide

## Project Overview

Agent Builder is a dashboard prototype for CometChat's AI Agent Builder product. It allows users to create, configure, and deploy AI agents with features like instructions, tools, MCP connections, knowledge bases, and pricing plans.

**Live Demo:** https://pouravraj98.github.io/agent-builder/

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **Deployment:** GitHub Pages

## File Structure

```
agentbuilder/
├── src/
│   ├── App.jsx          # Main application (all components)
│   ├── index.css        # Global styles & theme CSS variables
│   └── main.jsx         # React entry point
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies & scripts
├── vite.config.js       # Vite configuration
└── DEVELOPMENT.md       # This file
```

## Theme Configuration

The app uses a custom accent color (#6852D6) with variations:

```javascript
const theme = {
  accent: '#6852D6',      // Primary accent color
  accentHover: '#5A47B8', // Hover state
  accentLight: '#F3F1FD', // Light background
  accentMuted: '#E8E4F9', // Muted/subtle background
};
```

CSS custom properties are also available in `index.css`:
```css
:root {
  --accent: #6852D6;
  --accent-hover: #5A47B8;
  --accent-light: #F3F1FD;
  --accent-muted: #E8E4F9;
}
```

## Routing

Hash-based routing is used for shareable URLs:

| Route | Page |
|-------|------|
| `#/instructions` | Instructions editor |
| `#/tools` | Tools & variables management |
| `#/mcp` | MCP connections |
| `#/knowledge` | Knowledge base |
| `#/logs` | Logs (coming soon) |
| `#/deploy` | Deploy (coming soon) |
| `#/pricing` | Pricing plans |

## Components

### Main App (`AgentBuilderComplete`)
The root component containing:
- Left sidebar with navigation
- Main content area
- Right panel (chat preview, only on Instructions page)
- Modal system

### Navigation Items
```javascript
const navItems = [
  { id: 'instructions', name: 'Instructions', icon: FileText },
  { id: 'tools', name: 'Tools', icon: Variable },
  { id: 'mcp', name: 'MCP', icon: Plug },
  { id: 'knowledge', name: 'Knowledge Base', icon: BookOpen },
  { id: 'logs', name: 'Logs', icon: BarChart3 },
  { id: 'deploy', name: 'Deploy', icon: Rocket },
  { id: 'pricing', name: 'Pricing', icon: CreditCard },
];
```

### Page Components

#### `InstructionsView`
- Text editor for agent instructions
- Model selector dropdown
- `@` mention system for referencing tools/variables
- Triggers `MentionDropdown` on `@` key

#### `MentionDropdown`
- Spotlight-style dropdown for selecting variables/tools
- Two-panel layout (categories left, items right)
- Keyboard navigation support (arrows, tab, enter, escape)
- Search filtering

#### `ToolsVariablesView`
- Tabbed interface for managing:
  - External Tools
  - Frontend Actions
  - Frontend Variables
  - Auth Variables
  - User Variables
- Table layout with enable/disable toggles

#### `MCPConnectionsView`
- Grid of connected MCP services
- Available integrations list
- Connection status indicators

#### `KnowledgeBaseView`
- Upload cards for text, files, links
- Knowledge items list with type icons

#### `PricingView`
- Current plan banner (Free Trial)
- Plan cards (Web-only, Core, Plus, Done-for-you)
- Contact us modals
- Link to full pricing page

#### `CreateModal`
- Multi-step modal for creating new items
- Supports: actions, variables, knowledge items, MCP connections

## Data Structures

### Frontend Actions
```javascript
{
  id: 'fa-1',
  name: 'Open Modal',
  description: 'Display a modal dialog',
  syntax: '@action:openModal',
  trigger: 'openModal(modalId)',
  enabled: true
}
```

### Frontend Variables
```javascript
{
  id: 'fv-1',
  name: 'Website URL',
  key: 'websiteUrl',
  description: 'Current page URL',
  syntax: '@var:websiteUrl',
  source: 'window.location.href',
  enabled: true
}
```

### Auth Variables
```javascript
{
  id: 'ua-1',
  name: 'User ID',
  key: 'userId',
  description: 'Authenticated user identifier',
  syntax: '@auth:userId',
  sensitive: false,
  enabled: true
}
```

### User Variables
```javascript
{
  id: 'uv-1',
  name: 'Subscription Plan',
  key: 'subscriptionPlan',
  description: 'User subscription tier',
  syntax: '@user:subscriptionPlan',
  type: 'string',
  enabled: true
}
```

### MCP Tools
```javascript
{
  id: 'mcp-1',
  name: 'Google Suite',
  provider: 'Google',
  icon: '🔵',
  status: 'connected', // or 'disconnected'
  tools: ['Send Email', 'Create Event', 'Find Event', 'Delete Event']
}
```

### Knowledge Base Items
```javascript
{
  id: 'kb-1',
  name: 'Product Documentation',
  type: 'files', // or 'text', 'link'
  description: '45 pages indexed',
  syntax: '@kb:productDocs',
  items: 12
}
```

### Pricing Plans
```javascript
{
  id: 'core',
  name: 'Core',
  subtitle: 'Full-featured chat, moderation...',
  price: 99, // or null for PAYG
  priceLabel: '/month',
  priceSubtext: 'Billed annually',
  credits: '2,500 Monthly Credits',
  popular: true,
  features: ['Feature 1', 'Feature 2', ...]
}
```

## State Management

All state is managed with React `useState` hooks in the main `AgentBuilderComplete` component:

```javascript
// View/routing
const [currentView, setCurrentView] = useState(getInitialView);

// Modal states
const [showDropdown, setShowDropdown] = useState(false);
const [showCreateModal, setShowCreateModal] = useState(null);

// Data states
const [frontendActions, setFrontendActions] = useState([...]);
const [frontendVars, setFrontendVars] = useState([...]);
const [authVars, setAuthVars] = useState([...]);
const [userVars, setUserVars] = useState([...]);
const [mcpTools, setMcpTools] = useState([...]);
const [knowledgeBase, setKnowledgeBase] = useState([...]);
```

## Key Patterns

### Inline Styles for Theme Colors
Since Tailwind can't use dynamic hex values, theme colors are applied via inline styles:
```jsx
<div style={{ backgroundColor: theme.accent }}>
```

### Conditional Styling
```jsx
className={`base-classes ${isActive ? 'active-classes' : 'inactive-classes'}`}
style={isActive ? { color: theme.accent } : {}}
```

### Modal Pattern
```jsx
{showModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl ...">
      {/* Modal content */}
    </div>
  </div>
)}
```

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npx gh-pages -d dist
```

## Adding New Features

### Adding a New Page
1. Add route to `validRoutes` array
2. Add nav item to `navItems` array
3. Create the view component
4. Add conditional render in main content area

### Adding a New Data Type
1. Define the data structure
2. Add useState for the data
3. Add to categories array if mentionable
4. Create UI for managing the data

### Modifying Theme
1. Update `theme` object in App.jsx
2. Update CSS variables in index.css
3. Update any hardcoded color values

## External Links

- **Full Pricing:** https://www.cometchat.com/pricing
- **GitHub Repo:** https://github.com/pouravraj98/agent-builder
- **Live Demo:** https://pouravraj98.github.io/agent-builder/

## Contact Modal Behavior

All "Contact us" buttons show a modal with:
- Success checkmark icon
- "Thank you for your interest!" heading
- "Our team will get back to you shortly." message
- "Got it" dismiss button
