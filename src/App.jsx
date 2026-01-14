import React, { useState } from 'react';
import {
  Search, ChevronRight, ChevronLeft, Globe, Monitor, User, Lock, Database, Plug,
  FileText, Link, Settings, X, Plus, Code, MousePointer, Variable, Shield, Users,
  Zap, Trash2, Edit2, Copy, Check, Upload, ExternalLink, ToggleLeft, ToggleRight,
  Play, Eye, EyeOff, ChevronDown, Folder, File, AlertCircle, Info, Sparkles,
  MessageSquare, Clock, Send, ChevronUp, Rocket, BarChart3, BookOpen
} from 'lucide-react';

// Main App Component
export default function AgentBuilderComplete() {
  const [currentView, setCurrentView] = useState('instructions');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [instructionText, setInstructionText] = useState('You are a knowledge agent, be polite and answer only from the knowledge base, nothing outside.');

  // Sample data
  const [frontendActions, setFrontendActions] = useState([
    { id: 'fa-1', name: 'Open Modal', description: 'Display a modal dialog', syntax: '@action:openModal', trigger: 'openModal(modalId)', enabled: true },
    { id: 'fa-2', name: 'Navigate To', description: 'Navigate to a specific page', syntax: '@action:navigateTo', trigger: 'navigateTo(path)', enabled: true },
    { id: 'fa-3', name: 'Show Toast', description: 'Display a notification toast', syntax: '@action:showToast', trigger: 'showToast(message, type)', enabled: true },
  ]);

  const [frontendVars, setFrontendVars] = useState([
    { id: 'fv-1', name: 'Website URL', key: 'websiteUrl', description: 'Current page URL', syntax: '@var:websiteUrl', source: 'window.location.href', enabled: true },
    { id: 'fv-2', name: 'Page Title', key: 'pageTitle', description: 'Current page title', syntax: '@var:pageTitle', source: 'document.title', enabled: true },
    { id: 'fv-3', name: 'Browser Type', key: 'browser', description: 'Chrome, Safari, Firefox, etc.', syntax: '@var:browser', source: 'navigator.userAgent', enabled: true },
    { id: 'fv-4', name: 'Device Type', key: 'deviceType', description: 'Desktop, Mobile, Tablet', syntax: '@var:deviceType', source: 'auto-detect', enabled: true },
    { id: 'fv-5', name: 'Screen Size', key: 'screenSize', description: 'Viewport dimensions', syntax: '@var:screenSize', source: 'window.innerWidth/Height', enabled: false },
  ]);

  const [authVars, setAuthVars] = useState([
    { id: 'ua-1', name: 'User ID', key: 'userId', description: 'Authenticated user identifier', syntax: '@auth:userId', sensitive: false, enabled: true },
    { id: 'ua-2', name: 'User Email', key: 'email', description: 'User email address', syntax: '@auth:email', sensitive: true, enabled: true },
    { id: 'ua-3', name: 'User Name', key: 'name', description: 'Display name', syntax: '@auth:name', sensitive: false, enabled: true },
    { id: 'ua-4', name: 'User Role', key: 'role', description: 'Permission role', syntax: '@auth:role', sensitive: false, enabled: true },
  ]);

  const [userVars, setUserVars] = useState([
    { id: 'uv-1', name: 'Subscription Plan', key: 'subscriptionPlan', description: 'User subscription tier', syntax: '@user:subscriptionPlan', type: 'string', enabled: true },
    { id: 'uv-2', name: 'Total Orders', key: 'totalOrders', description: 'Order count', syntax: '@user:totalOrders', type: 'number', enabled: true },
    { id: 'uv-3', name: 'Account Created', key: 'createdAt', description: 'Registration date', syntax: '@user:createdAt', type: 'date', enabled: true },
  ]);

  const [mcpTools, setMcpTools] = useState([
    { id: 'mcp-1', name: 'Google Suite', provider: 'Google', icon: '🔵', status: 'connected', tools: ['Send Email', 'Create Event', 'Find Event', 'Delete Event'] },
    { id: 'mcp-2', name: 'Slack', provider: 'Slack', icon: '💜', status: 'connected', tools: ['Send Message', 'Create Channel'] },
    { id: 'mcp-3', name: 'Stripe', provider: 'Stripe', icon: '💳', status: 'disconnected', tools: ['Get Invoice', 'Create Payment'] },
  ]);

  const [knowledgeBase, setKnowledgeBase] = useState([
    { id: 'kb-1', name: 'Product Documentation', type: 'files', description: '45 pages indexed', syntax: '@kb:productDocs', items: 12 },
    { id: 'kb-2', name: 'FAQ Collection', type: 'text', description: '120 Q&A pairs', syntax: '@kb:faq', items: 120 },
    { id: 'kb-3', name: 'Help Center', type: 'link', description: 'help.example.com', syntax: '@kb:helpCenter', url: 'https://help.example.com' },
  ]);

  const categories = [
    { id: 'frontend-actions', name: 'Front-end Actions', icon: MousePointer, color: '#8B5CF6', items: frontendActions, createType: 'action' },
    { id: 'frontend-vars', name: 'Front-end Variables', icon: Globe, color: '#14B8A6', items: frontendVars, createType: 'frontend-var' },
    { id: 'user-auth', name: 'User Auth Variables', icon: Shield, color: '#A3E635', items: authVars, createType: 'auth-var' },
    { id: 'user-vars', name: 'User Variables', icon: Users, color: '#FB923C', items: userVars, createType: 'user-var' },
    { id: 'mcp-tools', name: 'MCP Tools', icon: Plug, color: '#F43F5E', items: mcpTools.flatMap(m => m.tools.map(t => ({ name: `${m.name}: ${t}`, syntax: `@mcp:${m.name.toLowerCase()}.${t.replace(/\s/g, '')}` }))), createType: 'mcp' },
    { id: 'knowledge-base', name: 'Knowledge Base', icon: Database, color: '#6366F1', items: knowledgeBase, createType: 'knowledge' },
  ];

  const navItems = [
    { id: 'instructions', name: 'Instructions', icon: FileText },
    { id: 'tools', name: 'Tools', icon: Variable },
    { id: 'mcp', name: 'MCP', icon: Plug },
    { id: 'knowledge', name: 'Knowledge Base', icon: BookOpen },
    { id: 'logs', name: 'Logs', icon: BarChart3 },
    { id: 'deploy', name: 'Deploy', icon: Rocket },
  ];

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-60 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="p-4 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-900">comet<span className="font-normal">chat</span></h1>
        </div>

        {/* Agent Selector */}
        <div className="p-3">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 border border-gray-200">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-900 flex-1 text-left">Support Agent</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  currentView === item.id
                    ? 'bg-purple-50 text-purple-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* Dashboard Button */}
        <div className="p-3 border-t border-gray-100">
          <button className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Go to Dashboard
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex min-w-0">
        <div className="flex-1 p-6 overflow-y-auto">
          {currentView === 'instructions' && (
            <InstructionsView
              instructionText={instructionText}
              setInstructionText={setInstructionText}
              showDropdown={showDropdown}
              setShowDropdown={setShowDropdown}
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setShowCreateModal={setShowCreateModal}
              setCurrentView={setCurrentView}
            />
          )}

          {currentView === 'tools' && (
            <ToolsVariablesView
              frontendActions={frontendActions}
              setFrontendActions={setFrontendActions}
              frontendVars={frontendVars}
              setFrontendVars={setFrontendVars}
              authVars={authVars}
              setAuthVars={setAuthVars}
              userVars={userVars}
              setUserVars={setUserVars}
              setShowCreateModal={setShowCreateModal}
            />
          )}

          {currentView === 'mcp' && (
            <MCPConnectionsView
              mcpTools={mcpTools}
              setMcpTools={setMcpTools}
              setShowCreateModal={setShowCreateModal}
            />
          )}

          {currentView === 'knowledge' && (
            <KnowledgeBaseView
              knowledgeBase={knowledgeBase}
              setKnowledgeBase={setKnowledgeBase}
              setShowCreateModal={setShowCreateModal}
            />
          )}

          {currentView === 'logs' && (
            <div className="h-full flex flex-col">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Logs</h2>
              <p className="text-gray-500">View agent conversation logs and analytics.</p>
              <div className="flex-1 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p>Coming soon</p>
                </div>
              </div>
            </div>
          )}

          {currentView === 'deploy' && (
            <div className="h-full flex flex-col">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Deploy</h2>
              <p className="text-gray-500">Configure and deploy your agent.</p>
              <div className="flex-1 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <Rocket className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p>Coming soon</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Chat Preview (Only on Instructions) */}
        {currentView === 'instructions' && (
          <div className="w-80 border-l border-gray-200 bg-white flex flex-col flex-shrink-0">
            {/* Preview Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Support Agent</div>
                  <div className="text-xs text-green-600">Online</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Plus className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Clock className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Preview Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-6" style={{ background: 'radial-gradient(circle at center, transparent 0%, transparent 100%), repeating-linear-gradient(0deg, transparent, transparent 19px, #f3f4f6 19px, #f3f4f6 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, #f3f4f6 19px, #f3f4f6 20px)' }}>
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Support Agent</h3>
              <p className="text-sm text-gray-500">I am here to assist you!</p>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                <input
                  type="text"
                  placeholder="Ask anything"
                  className="flex-1 bg-transparent text-sm outline-none text-gray-600"
                />
                <button className="p-2 text-gray-400 hover:text-purple-600 rounded-lg">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Modals */}
      {showCreateModal && (
        <CreateModal
          type={showCreateModal}
          onClose={() => setShowCreateModal(null)}
          frontendActions={frontendActions}
          setFrontendActions={setFrontendActions}
          frontendVars={frontendVars}
          setFrontendVars={setFrontendVars}
          authVars={authVars}
          setAuthVars={setAuthVars}
          userVars={userVars}
          setUserVars={setUserVars}
          knowledgeBase={knowledgeBase}
          setKnowledgeBase={setKnowledgeBase}
        />
      )}
    </div>
  );
}

// Spotlight-style Mention Dropdown Component
function MentionDropdown({
  categories, activeCategory, setActiveCategory, searchQuery, setSearchQuery,
  setShowDropdown, setShowCreateModal, instructionText, setInstructionText,
  position, onClose, setCurrentView
}) {
  const inputRef = React.useRef(null);
  const [activePanel, setActivePanel] = useState('right'); // 'left' or 'right'
  const [leftSelectedIndex, setLeftSelectedIndex] = useState(0);
  const [rightSelectedIndex, setRightSelectedIndex] = useState(0);
  const leftPanelRef = React.useRef(null);
  const rightPanelRef = React.useRef(null);

  const filteredCategories = categories.map(cat => ({
    ...cat,
    items: cat.items.filter(item =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  // Get the items currently displayed in the right panel
  const rightPanelItems = activeCategory
    ? filteredCategories.find(c => c.id === activeCategory)?.items || []
    : categories.slice(0, 4);

  // Reset selected index when category changes or search changes
  React.useEffect(() => {
    setRightSelectedIndex(0);
  }, [activeCategory, searchQuery]);

  // Scroll selected item into view
  React.useEffect(() => {
    if (activePanel === 'right' && rightPanelRef.current) {
      const selectedElement = rightPanelRef.current.querySelector(`[data-index="${rightSelectedIndex}"]`);
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
    if (activePanel === 'left' && leftPanelRef.current) {
      const selectedElement = leftPanelRef.current.querySelector(`[data-left-index="${leftSelectedIndex}"]`);
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [rightSelectedIndex, leftSelectedIndex, activePanel]);

  React.useEffect(() => {
    // Focus input on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleClose = () => {
    setShowDropdown(false);
    setActiveCategory(null);
    if (onClose) onClose();
  };

  const handleItemSelect = (item) => {
    const newText = instructionText.slice(0, -1) + item.syntax + ' ';
    setInstructionText(newText);
    handleClose();
  };

  const handleCategorySelect = (categoryId) => {
    setActiveCategory(categoryId);
    setRightSelectedIndex(0);
    setActivePanel('right');
  };

  const handleKeyDown = (e) => {
    const rightMaxIndex = rightPanelItems.length - 1;
    const leftMaxIndex = filteredCategories.length - 1;

    switch (e.key) {
      case 'Escape':
        handleClose();
        break;
      case 'Tab':
        e.preventDefault();
        if (e.shiftKey) {
          // Shift+Tab: go to left panel
          setActivePanel('left');
        } else {
          // Tab: toggle between panels
          setActivePanel(prev => prev === 'left' ? 'right' : 'left');
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (activePanel === 'right') {
          setRightSelectedIndex(prev => (prev < rightMaxIndex ? prev + 1 : 0));
        } else {
          setLeftSelectedIndex(prev => (prev < leftMaxIndex ? prev + 1 : 0));
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (activePanel === 'right') {
          setRightSelectedIndex(prev => (prev > 0 ? prev - 1 : rightMaxIndex));
        } else {
          setLeftSelectedIndex(prev => (prev > 0 ? prev - 1 : leftMaxIndex));
        }
        break;
      case 'ArrowRight':
        if (activePanel === 'left') {
          e.preventDefault();
          setActivePanel('right');
        }
        break;
      case 'ArrowLeft':
        if (activePanel === 'right') {
          e.preventDefault();
          setActivePanel('left');
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (activePanel === 'right' && rightPanelItems.length > 0) {
          const selectedItem = rightPanelItems[rightSelectedIndex];
          if (activeCategory) {
            // If viewing items, select the item
            handleItemSelect(selectedItem);
          } else {
            // If viewing categories in quick access, expand the category
            handleCategorySelect(selectedItem.id);
          }
        } else if (activePanel === 'left' && filteredCategories.length > 0) {
          const selectedCategory = filteredCategories[leftSelectedIndex];
          handleCategorySelect(selectedCategory.id);
        }
        break;
      case 'Backspace':
        // If search is empty and a category is selected, go back to quick access
        if (searchQuery === '' && activeCategory) {
          e.preventDefault();
          setActiveCategory(null);
          setRightSelectedIndex(0);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)', backdropFilter: 'blur(4px)' }}
      onClick={handleClose}
    >
      <div
        className="w-[680px] bg-white rounded-2xl shadow-2xl overflow-hidden"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Spotlight Search Bar */}
        <div className="p-4">
          <div className="flex items-center gap-4 px-5 py-4 bg-gray-50 rounded-xl border border-gray-200">
            <Search className="w-6 h-6 text-gray-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search all variables, actions, tools..."
              className="bg-transparent flex-1 text-lg outline-none text-gray-900 placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="flex border-t border-gray-100" style={{ maxHeight: '420px' }}>
          {/* Left - Categories */}
          <div
            className={`w-60 border-r overflow-y-auto transition-colors ${
              activePanel === 'left'
                ? 'bg-purple-50/50 border-r-purple-200'
                : 'bg-gray-50/80 border-r-gray-100'
            }`}
            ref={leftPanelRef}
          >
            <div className="p-3">
              <div className={`text-[11px] font-semibold uppercase tracking-wider px-3 py-2 flex items-center gap-2 ${
                activePanel === 'left' ? 'text-purple-600' : 'text-gray-400'
              }`}>
                {activePanel === 'left' && <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>}
                Categories
              </div>
              {filteredCategories.map((category, idx) => {
                const Icon = category.icon;
                const isSelected = activePanel === 'left' && leftSelectedIndex === idx;
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    data-left-index={idx}
                    onClick={() => handleCategorySelect(category.id === activeCategory ? null : category.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all ${
                      isSelected
                        ? 'bg-purple-50 ring-1 ring-purple-200'
                        : isActive
                          ? 'bg-white shadow-sm ring-1 ring-gray-200'
                          : 'hover:bg-white/60'
                    }`}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: category.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium truncate ${isSelected ? 'text-purple-900' : 'text-gray-900'}`}>
                        {category.name}
                      </div>
                      <div className={`text-xs ${isSelected ? 'text-purple-600' : 'text-gray-500'}`}>
                        {category.items.length} items
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right - Quick Access / Items */}
          <div
            className={`flex-1 overflow-y-auto transition-colors ${
              activePanel === 'right' ? 'bg-purple-50/30' : 'bg-white'
            }`}
            ref={rightPanelRef}
          >
            <div className="p-3">
              <div className={`text-[11px] font-semibold uppercase tracking-wider px-3 py-2 flex items-center gap-2 ${
                activePanel === 'right' ? 'text-purple-600' : 'text-gray-400'
              }`}>
                {activePanel === 'right' && <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>}
                {activeCategory ? 'Items' : 'Quick Access'}
              </div>
              {activeCategory ? (
                <>
                  {filteredCategories.find(c => c.id === activeCategory)?.items.map((item, idx) => {
                    const isSelected = activePanel === 'right' && rightSelectedIndex === idx;
                    return (
                      <button
                        key={idx}
                        data-index={idx}
                        onClick={() => handleItemSelect(item)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left group transition-colors ${
                          isSelected
                            ? 'bg-purple-50 ring-1 ring-purple-200'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm font-medium ${isSelected ? 'text-purple-900' : 'text-gray-900'}`}>
                            {item.name}
                          </div>
                          {item.description && (
                            <div className={`text-xs mt-0.5 truncate ${isSelected ? 'text-purple-600' : 'text-gray-500'}`}>
                              {item.description}
                            </div>
                          )}
                        </div>
                        <ChevronRight className={`w-4 h-4 transition-colors ${
                          isSelected ? 'text-purple-500' : 'text-gray-300 group-hover:text-purple-500'
                        }`} />
                      </button>
                    );
                  })}
                </>
              ) : (
                categories.slice(0, 4).map((category, idx) => {
                  const Icon = category.icon;
                  const isSelected = activePanel === 'right' && rightSelectedIndex === idx;
                  return (
                    <button
                      key={category.id}
                      data-index={idx}
                      onClick={() => handleCategorySelect(category.id)}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left group transition-colors ${
                        isSelected
                          ? 'bg-purple-50 ring-1 ring-purple-200'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${category.color}15` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: category.color }} />
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm font-medium ${isSelected ? 'text-purple-900' : 'text-gray-900'}`}>
                          {category.name}
                        </div>
                        <div className={`text-xs ${isSelected ? 'text-purple-600' : 'text-gray-500'}`}>
                          {category.items.length} available
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-colors ${
                        isSelected ? 'text-purple-500' : 'text-gray-300 group-hover:text-purple-500'
                      }`} />
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-200 text-[10px] font-medium">↑↓</kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-200 text-[10px] font-medium">tab</kbd>
              switch panel
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-200 text-[10px] font-medium">↵</kbd>
              select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-200 text-[10px] font-medium">esc</kbd>
              close
            </span>
          </div>
          <button
            onClick={() => {
              handleClose();
              if (setCurrentView) setCurrentView('tools');
            }}
            className="text-sm text-purple-600 hover:text-purple-700 font-medium"
          >
            + Create custom
          </button>
        </div>
      </div>
    </div>
  );
}

// Instructions View
function InstructionsView({
  instructionText, setInstructionText, showDropdown, setShowDropdown,
  categories, activeCategory, setActiveCategory, searchQuery, setSearchQuery,
  setShowCreateModal, setCurrentView
}) {
  const textareaRef = React.useRef(null);
  const mirrorRef = React.useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const handleDropdownClose = () => {
    // Refocus textarea when dropdown closes
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 10);
  };

  const handleTextChange = (e) => {
    const value = e.target.value;
    setInstructionText(value);
    const lastChar = value[value.length - 1];
    if (lastChar === '@') {
      // Get cursor position using mirror technique
      const textarea = textareaRef.current;
      if (textarea) {
        const textareaRect = textarea.getBoundingClientRect();
        const style = getComputedStyle(textarea);

        // Create mirror div
        const mirror = document.createElement('div');
        mirror.style.cssText = `
          position: absolute;
          visibility: hidden;
          white-space: pre-wrap;
          word-wrap: break-word;
          font-family: ${style.fontFamily};
          font-size: ${style.fontSize};
          font-weight: ${style.fontWeight};
          line-height: ${style.lineHeight};
          padding: ${style.padding};
          width: ${textarea.clientWidth}px;
          border: ${style.border};
        `;

        // Text before @
        const textBeforeAt = value.substring(0, value.length - 1);
        mirror.textContent = textBeforeAt;

        // Marker span for @ position
        const marker = document.createElement('span');
        marker.textContent = '@';
        mirror.appendChild(marker);

        document.body.appendChild(mirror);

        const markerRect = marker.getBoundingClientRect();
        const mirrorRect = mirror.getBoundingClientRect();

        // Calculate position relative to textarea
        const relativeTop = markerRect.top - mirrorRect.top;
        const relativeLeft = markerRect.left - mirrorRect.left;

        document.body.removeChild(mirror);

        setDropdownPosition({
          top: textareaRect.top + relativeTop + 20 - textarea.scrollTop, // Line height offset
          left: textareaRect.left + relativeLeft + 15 // Offset to right of @
        });
      }
      setShowDropdown(true);
      setActiveCategory(null);
      setSearchQuery('');
    }
  };

  return (
    <div className="h-full flex flex-col relative">
      {/* Header with Save Button */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Instructions</h2>
          <p className="text-gray-500 mt-1">Define the agent's role, tone, and behavior rules.</p>
        </div>
        <button className="px-5 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800">
          Save & Run
        </button>
      </div>

      {/* Model Selector Row */}
      <div className="flex items-center gap-3 mb-4">
        <select className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 pr-10 cursor-pointer hover:border-gray-300">
          <option>gpt-5-mini</option>
          <option>gpt-4-turbo</option>
          <option>claude-3-opus</option>
        </select>
        <button className="p-2.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 hover:border-gray-300">
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* @ Reference Row */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center text-gray-500 font-medium text-xs">@</span>
          <span>Type @ to reference tools or MCP.</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2">
            <Variable className="w-4 h-4" />
            Tools
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2">
            <Plug className="w-4 h-4" />
            MCP
          </button>
        </div>
      </div>

      {/* Text Area */}
      <div className="flex-1 bg-white rounded-xl border border-gray-200 overflow-hidden min-h-0 relative">
        <textarea
          ref={textareaRef}
          value={instructionText}
          onChange={handleTextChange}
          className="w-full h-full p-5 resize-none focus:outline-none text-gray-900 text-sm leading-relaxed"
          placeholder="Type @ to reference tools, variables, or knowledge..."
        />

        {/* @ Mention Dropdown - positioned at cursor */}
        {showDropdown && (
          <MentionDropdown
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setShowDropdown={setShowDropdown}
            setShowCreateModal={setShowCreateModal}
            instructionText={instructionText}
            setInstructionText={setInstructionText}
            position={dropdownPosition}
            onClose={handleDropdownClose}
            setCurrentView={setCurrentView}
          />
        )}
      </div>
    </div>
  );
}

// Tools View (merged production design + prototype features)
function ToolsVariablesView({
  frontendActions, setFrontendActions,
  frontendVars, setFrontendVars,
  authVars, setAuthVars,
  userVars, setUserVars,
  setShowCreateModal
}) {
  const [activeTab, setActiveTab] = useState('tools');

  // External tools (production design)
  const [externalTools, setExternalTools] = useState([
    { id: 't-1', name: 'Custom API Tool', icon: '⚙️', description: 'Manage and interact with your custom API tools and easily settings for enhanced functionality.', authType: null, enabled: true },
    { id: 't-2', name: 'Zendesk', icon: '💬', description: 'Zendesk provides customer support software with ticketing, live chat, and knowledge base featu...', authType: 'OAUTH', enabled: false },
    { id: 't-3', name: 'Google Suite', icon: '🔵', description: 'Google Suite combines all Google services including Drive, Calendar, Gmail, Sheets, Analytics, A...', authType: 'OAUTH', enabled: false },
  ]);

  const tabs = [
    { id: 'tools', name: 'External Tools', icon: Plug, color: '#8B5CF6' },
    { id: 'actions', name: 'Frontend Actions', icon: MousePointer, color: '#EC4899', data: frontendActions, setData: setFrontendActions, createType: 'action' },
    { id: 'frontend', name: 'Frontend Variables', icon: Globe, color: '#14B8A6', data: frontendVars, setData: setFrontendVars, createType: 'frontend-var' },
    { id: 'auth', name: 'Auth Variables', icon: Shield, color: '#A3E635', data: authVars, setData: setAuthVars, createType: 'auth-var' },
    { id: 'user', name: 'User Variables', icon: Users, color: '#FB923C', data: userVars, setData: setUserVars, createType: 'user-var' },
  ];

  const currentTab = tabs.find(t => t.id === activeTab);

  const toggleExternalTool = (id) => {
    setExternalTools(externalTools.map(tool =>
      tool.id === id ? { ...tool, enabled: !tool.enabled } : tool
    ));
  };

  const toggleItem = (id) => {
    if (currentTab.setData) {
      currentTab.setData(currentTab.data.map(item =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      ));
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Tools</h2>
          <p className="text-gray-500 mt-1">Manage and interact with tools that help your agent generate responses, access external data, or perform specific actions.</p>
        </div>
        <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
          Documentation
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 border-b border-gray-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                activeTab === tab.id
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.name}
              {tab.data && (
                <span className={`px-1.5 py-0.5 rounded text-xs ${
                  activeTab === tab.id ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'
                }`}>
                  {tab.data.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col min-h-0">
        {/* External Tools Tab */}
        {activeTab === 'tools' && (
          <>
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-500">
              <div className="col-span-3">Name</div>
              <div className="col-span-6">Description</div>
              <div className="col-span-2">Auth Type</div>
              <div className="col-span-1"></div>
            </div>

            {/* Table Body */}
            <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
              {externalTools.map((tool) => (
                <div key={tool.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors">
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                      {tool.icon}
                    </div>
                    <span className="font-medium text-gray-900">{tool.name}</span>
                  </div>
                  <div className="col-span-6 text-sm text-gray-500 truncate">
                    {tool.description}
                  </div>
                  <div className="col-span-2">
                    {tool.authType && (
                      <span className="px-2.5 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                        {tool.authType}
                      </span>
                    )}
                  </div>
                  <div className="col-span-1 flex items-center justify-end gap-2">
                    <button
                      onClick={() => toggleExternalTool(tool.id)}
                      className={`${tool.enabled ? 'text-green-500' : 'text-gray-300'}`}
                    >
                      {tool.enabled ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Variable/Action Tabs */}
        {activeTab !== 'tools' && currentTab.data && (
          <>
            {/* Header with Add button */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${currentTab.color}20` }}
                >
                  <currentTab.icon className="w-4 h-4" style={{ color: currentTab.color }} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{currentTab.name}</h3>
                  <p className="text-xs text-gray-500">{currentTab.data.filter(i => i.enabled).length} of {currentTab.data.length} enabled</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(currentTab.createType)}
                className="px-3 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add New
              </button>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-100 text-sm font-medium text-gray-500">
              <div className="col-span-3">Name</div>
              <div className="col-span-5">Description</div>
              <div className="col-span-3">Syntax</div>
              <div className="col-span-1"></div>
            </div>

            {/* Table Body */}
            <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
              {currentTab.data.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors">
                  <div className="col-span-3 flex items-center gap-3">
                    <span className={`font-medium ${item.enabled ? 'text-gray-900' : 'text-gray-400'}`}>
                      {item.name}
                    </span>
                    {item.sensitive && (
                      <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-medium rounded">
                        Sensitive
                      </span>
                    )}
                  </div>
                  <div className="col-span-5 text-sm text-gray-500 truncate">
                    {item.description}
                  </div>
                  <div className="col-span-3">
                    <code className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded">
                      {item.syntax}
                    </code>
                  </div>
                  <div className="col-span-1 flex items-center justify-end gap-2">
                    <button
                      onClick={() => toggleItem(item.id)}
                      className={`${item.enabled ? 'text-green-500' : 'text-gray-300'}`}
                    >
                      {item.enabled ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {currentTab.data.length === 0 && (
                <div className="p-12 text-center">
                  <currentTab.icon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-gray-900 font-medium mb-2">No {currentTab.name.toLowerCase()} yet</h3>
                  <p className="text-gray-500 text-sm mb-4">Create your first item to get started.</p>
                  <button
                    onClick={() => setShowCreateModal(currentTab.createType)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700"
                  >
                    Add {currentTab.name.split(' ')[0]}
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// MCP Connections View
function MCPConnectionsView({ mcpTools, setMcpTools, setShowCreateModal }) {
  const availableMCPs = [
    { id: 'gmail', name: 'Gmail', icon: '📧', description: 'Send and manage emails' },
    { id: 'calendar', name: 'Google Calendar', icon: '📅', description: 'Manage calendar events' },
    { id: 'notion', name: 'Notion', icon: '📝', description: 'Access Notion workspace' },
    { id: 'github', name: 'GitHub', icon: '🐙', description: 'Manage repositories and issues' },
    { id: 'linear', name: 'Linear', icon: '🔷', description: 'Project management' },
    { id: 'shopify', name: 'Shopify', icon: '🛍️', description: 'E-commerce management' },
  ];

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">MCP Connections</h2>
          <p className="text-gray-500 mt-1">Connect external services to extend your agent's capabilities.</p>
        </div>
        <button
          onClick={() => setShowCreateModal('mcp')}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Connection
        </button>
      </div>

      {/* Connected */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Connected Services</h3>
        <div className="grid grid-cols-2 gap-4">
          {mcpTools.filter(m => m.status === 'connected').map((mcp) => (
            <div key={mcp.id} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{mcp.icon}</span>
                  <div>
                    <h4 className="font-medium text-gray-900">{mcp.name}</h4>
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Connected</span>
                  </div>
                </div>
                <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-gray-500 mb-2">{mcp.tools.length} tools available:</div>
                {mcp.tools.slice(0, 3).map((tool, idx) => (
                  <div key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                    <Check className="w-3 h-3 text-green-500" />
                    {tool}
                  </div>
                ))}
                {mcp.tools.length > 3 && (
                  <div className="text-xs text-purple-600">+{mcp.tools.length - 3} more</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Available Integrations</h3>
        <div className="grid grid-cols-3 gap-4">
          {availableMCPs.map((mcp) => (
            <button
              key={mcp.id}
              className="bg-white rounded-xl border border-gray-200 p-4 text-left hover:border-purple-300 hover:shadow-sm transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{mcp.icon}</span>
                <h4 className="font-medium text-gray-900">{mcp.name}</h4>
              </div>
              <p className="text-xs text-gray-500">{mcp.description}</p>
              <div className="mt-3 text-xs text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Connect →
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Knowledge Base View
function KnowledgeBaseView({ knowledgeBase, setKnowledgeBase, setShowCreateModal }) {
  const getTypeIcon = (type) => {
    switch(type) {
      case 'files': return Folder;
      case 'link': return Link;
      default: return FileText;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'files': return '#8B5CF6';
      case 'link': return '#3B82F6';
      default: return '#10B981';
    }
  };

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Knowledge Base</h2>
          <p className="text-gray-500 mt-1">Add text, files, and links for your agent to reference.</p>
        </div>
        <button
          onClick={() => setShowCreateModal('knowledge')}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Knowledge
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { type: 'text', name: 'Text', icon: FileText, color: '#10B981', desc: 'Add custom text content' },
          { type: 'files', name: 'Files', icon: Upload, color: '#8B5CF6', desc: 'Upload documents & PDFs' },
          { type: 'link', name: 'Links', icon: Link, color: '#3B82F6', desc: 'Index web pages' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.type}
              onClick={() => setShowCreateModal('knowledge')}
              className="bg-white rounded-xl border border-gray-200 border-dashed p-6 text-center hover:border-purple-300 hover:bg-purple-50/30 transition-all group"
            >
              <div
                className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <Icon className="w-6 h-6" style={{ color: item.color }} />
              </div>
              <h4 className="font-medium text-gray-900">{item.name}</h4>
              <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium text-gray-900">Knowledge Items</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {knowledgeBase.map((item) => {
            const Icon = getTypeIcon(item.type);
            const color = getTypeColor(item.type);
            return (
              <div key={item.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.description}</div>
                  <code className="text-xs text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded mt-1 inline-block">
                    {item.syntax}
                  </code>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Create Modal Component
function CreateModal({
  type, onClose,
  frontendActions, setFrontendActions,
  frontendVars, setFrontendVars,
  authVars, setAuthVars,
  userVars, setUserVars,
  knowledgeBase, setKnowledgeBase
}) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    key: '',
    syntax: '',
    trigger: '',
    source: '',
    sensitive: false,
    type: 'string',
    knowledgeType: 'text',
    content: '',
    url: '',
  });

  const [step, setStep] = useState(1);

  const modalConfig = {
    'action': {
      title: 'Create Front-end Action',
      icon: MousePointer,
      color: '#8B5CF6',
      fields: ['name', 'description', 'trigger'],
    },
    'frontend-var': {
      title: 'Create Front-end Variable',
      icon: Globe,
      color: '#3B82F6',
      fields: ['name', 'key', 'description', 'source'],
    },
    'auth-var': {
      title: 'Create Auth Variable',
      icon: Shield,
      color: '#10B981',
      fields: ['name', 'key', 'description', 'sensitive'],
    },
    'user-var': {
      title: 'Create User Variable',
      icon: Users,
      color: '#F59E0B',
      fields: ['name', 'key', 'description', 'type'],
    },
    'knowledge': {
      title: 'Add Knowledge',
      icon: Database,
      color: '#6366F1',
      fields: ['knowledgeType'],
    },
    'mcp': {
      title: 'Connect MCP Service',
      icon: Plug,
      color: '#EC4899',
      fields: [],
    },
  };

  const config = modalConfig[type];
  const Icon = config?.icon || Database;

  const handleSave = () => {
    const id = `${type}-${Date.now()}`;
    const syntax = `@${type === 'action' ? 'action' : type === 'frontend-var' ? 'var' : type === 'auth-var' ? 'auth' : type === 'user-var' ? 'user' : 'kb'}:${formData.key || formData.name.toLowerCase().replace(/\s/g, '')}`;

    if (type === 'action') {
      setFrontendActions([...frontendActions, { id, ...formData, syntax, enabled: true }]);
    } else if (type === 'frontend-var') {
      setFrontendVars([...frontendVars, { id, ...formData, syntax, enabled: true }]);
    } else if (type === 'auth-var') {
      setAuthVars([...authVars, { id, ...formData, syntax, enabled: true }]);
    } else if (type === 'user-var') {
      setUserVars([...userVars, { id, ...formData, syntax, enabled: true }]);
    } else if (type === 'knowledge') {
      setKnowledgeBase([...knowledgeBase, { id, name: formData.name, type: formData.knowledgeType, description: formData.description, syntax }]);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${config?.color}15` }}
            >
              <Icon className="w-5 h-5" style={{ color: config?.color }} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{config?.title}</h2>
              <p className="text-sm text-gray-500">Step {step} of 2</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {type === 'knowledge' && step === 1 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">What type of knowledge?</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { type: 'text', name: 'Text', icon: FileText, desc: 'Raw text or Q&A' },
                  { type: 'files', name: 'Files', icon: Upload, desc: 'Documents & PDFs' },
                  { type: 'link', name: 'Link', icon: Link, desc: 'Web pages' },
                ].map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <button
                      key={item.type}
                      onClick={() => setFormData({ ...formData, knowledgeType: item.type })}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        formData.knowledgeType === item.type
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <ItemIcon className={`w-6 h-6 mx-auto mb-2 ${
                        formData.knowledgeType === item.type ? 'text-purple-600' : 'text-gray-400'
                      }`} />
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {(type !== 'knowledge' || step === 2) && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Show Cart Modal"
                />
              </div>

              {(config?.fields.includes('key') || type === 'frontend-var' || type === 'auth-var' || type === 'user-var') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Variable Key</label>
                  <div className="flex">
                    <span className="px-3 py-2.5 bg-gray-100 border border-r-0 border-gray-200 rounded-l-lg text-gray-500 text-sm">
                      @{type === 'frontend-var' ? 'var' : type === 'auth-var' ? 'auth' : 'user'}:
                    </span>
                    <input
                      type="text"
                      value={formData.key}
                      onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                      className="flex-1 px-3 py-2.5 border border-gray-200 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="variableKey"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Brief description of what this does"
                />
              </div>

              {type === 'action' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Trigger Function</label>
                  <input
                    type="text"
                    value={formData.trigger}
                    onChange={(e) => setFormData({ ...formData, trigger: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
                    placeholder="showCartModal(userId)"
                  />
                  <p className="text-xs text-gray-500 mt-1.5">The JavaScript function to call when this action is triggered</p>
                </div>
              )}

              {type === 'frontend-var' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Data Source</label>
                  <select
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select source...</option>
                    <option value="window.location.href">window.location.href</option>
                    <option value="document.title">document.title</option>
                    <option value="navigator.userAgent">navigator.userAgent</option>
                    <option value="custom">Custom JavaScript</option>
                  </select>
                </div>
              )}

              {type === 'auth-var' && (
                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span className="text-sm text-amber-800">Mark as sensitive data</span>
                  </div>
                  <button
                    onClick={() => setFormData({ ...formData, sensitive: !formData.sensitive })}
                    className={formData.sensitive ? 'text-amber-600' : 'text-gray-400'}
                  >
                    {formData.sensitive ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                  </button>
                </div>
              )}

              {type === 'user-var' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Data Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                    <option value="date">Date</option>
                    <option value="array">Array</option>
                    <option value="object">Object</option>
                  </select>
                </div>
              )}

              {type === 'knowledge' && formData.knowledgeType === 'text' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Content</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 h-32 resize-none"
                    placeholder="Enter your knowledge content here..."
                  />
                </div>
              )}

              {type === 'knowledge' && formData.knowledgeType === 'files' && (
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-2">Drag & drop files here, or click to browse</p>
                  <p className="text-xs text-gray-500">Supports PDF, DOCX, TXT, MD (max 10MB)</p>
                </div>
              )}

              {type === 'knowledge' && formData.knowledgeType === 'link' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">URL</label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://example.com/docs"
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-200 flex justify-between">
          {type === 'knowledge' && step === 2 ? (
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium"
            >
              Back
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium"
            >
              Cancel
            </button>
          )}

          {type === 'knowledge' && step === 1 ? (
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Create
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
