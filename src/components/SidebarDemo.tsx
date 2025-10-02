"use client";

import React, { useState, useEffect } from "react";
import {
  Home, Settings, User, FileText, Folder, Star, Bell, Search,
  Database, Code, Palette, Layout, ChevronRight, Menu, X
} from "lucide-react";

// Utility function for class names
const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

// Types
export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  children?: MenuItem[];
  badge?: string | number;
}

interface SidebarContextType {
  isOpen: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(
  undefined
);

const useSidebar = () => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

// Provider
export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(true);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        isMobile,
        toggleSidebar: () => setIsOpen(!isOpen),
        closeSidebar: () => setIsOpen(false),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

// Button
const Button: React.FC<{
  variant?: "ghost" | "default";
  size?: "icon" | "default";
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
}> = ({ variant = "default", size = "default", onClick, className, children, "aria-label": ariaLabel }) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    className={cn(
      "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:pointer-events-none",
      variant === "ghost" && "hover:bg-gray-100 dark:hover:bg-gray-800",
      size === "icon" && "h-10 w-10",
      size === "default" && "px-4 py-2",
      className
    )}
  >
    {children}
  </button>
);

// Sidebar Trigger
export const SidebarTrigger: React.FC<{ className?: string }> = ({ className }) => {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      className={cn("md:hidden hover:scale-105 active:scale-95", className)}
      aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
    >
      {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </Button>
  );
};

// Menu Item
const MenuItemComponent: React.FC<{
  item: MenuItem;
  level?: number;
  onItemClick?: (item: MenuItem) => void;
}> = ({ item, level = 0, onItemClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { closeSidebar, isMobile } = useSidebar();
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else {
      onItemClick?.(item);
      if (isMobile) closeSidebar();
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={cn(
          "w-full flex items-center text-left text-sm transition-all duration-200 rounded-lg group relative",
          "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent dark:hover:from-blue-950/30",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1",
          "active:scale-[0.98]",
          "py-2.5 my-0.5"
        )}
        style={{ paddingLeft: `${16 + level * 16}px`, paddingRight: "12px" }}
        aria-expanded={hasChildren ? isExpanded : undefined}
      >
        <span className="flex-shrink-0 w-5 h-5 mr-3 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
          {item.icon || (level > 0 && (
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600" />
          ))}
        </span>
        <span className="flex-1 truncate font-medium text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {item.label}
        </span>
        {item.badge && (
          <span className="flex-shrink-0 ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
            {item.badge}
          </span>
        )}
        {hasChildren && (
          <span className={cn("flex-shrink-0 ml-2 transition-all duration-300", isExpanded && "rotate-90")}>
            <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </span>
        )}
      </button>

      {hasChildren && (
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-out",
            isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="py-1 space-y-0.5 border-l-2 border-gray-200 dark:border-gray-700 ml-4">
            {item.children?.map((child) => (
              <MenuItemComponent key={child.id} item={child} level={level + 1} onItemClick={onItemClick} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Sidebar
export const Sidebar: React.FC<{ items: MenuItem[]; onItemClick?: (item: MenuItem) => void }> = ({ items, onItemClick }) => {
  const { isOpen, isMobile, closeSidebar } = useSidebar();

  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = "unset"; };
    }
  }, [isMobile, isOpen]);

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl",
          "border-r border-gray-200 dark:border-gray-800",
          "transition-all duration-300 ease-out shadow-2xl md:shadow-none",
          "w-72 h-full",
          isMobile
            ? cn("fixed top-0 left-0 z-50", isOpen ? "translate-x-0" : "-translate-x-full")
            : "relative translate-x-0"
        )}
        aria-label="Sidebar navigation"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-950/20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Layout className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">DevUI</h2>
            </div>
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={closeSidebar} className="h-8 w-8" aria-label="Close sidebar">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
            <div className="space-y-1">
              {items.map((item) => (
                <MenuItemComponent key={item.id} item={item} onItemClick={onItemClick} />
              ))}
            </div>
          </nav>

          <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold shadow-lg">
                JD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">John Doe</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">john@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

// Sidebar Content
export const SidebarContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <main className={cn("flex-1 flex flex-col min-h-0 transition-all duration-300 ease-out", className)}>
    {children}
  </main>
);

// Navigation config
const navigationItems: MenuItem[] = [
  { id: "home", label: "Home", icon: <Home className="w-4 h-4" />, href: "/" },
  {
    id: "components", label: "Components", icon: <Layout className="w-4 h-4" />, badge: "New",
    children: [
      {
        id: "ui-components", label: "UI Components", icon: <Palette className="w-4 h-4" />,
        children: [
          { id: "buttons", label: "Buttons", href: "/components/buttons" },
          { id: "inputs", label: "Inputs", href: "/components/inputs" },
          { id: "cards", label: "Cards", href: "/components/cards", badge: "3" },
        ],
      },
      {
        id: "layout-components", label: "Layout", icon: <Layout className="w-4 h-4" />,
        children: [
          { id: "sidebar", label: "Sidebar", href: "/components/sidebar" },
          { id: "header", label: "Header", href: "/components/header" },
        ],
      },
    ],
  },
  {
    id: "documentation", label: "Documentation", icon: <FileText className="w-4 h-4" />,
    children: [
      { id: "getting-started", label: "Getting Started", href: "/docs/getting-started" },
      { id: "installation", label: "Installation", href: "/docs/installation" },
      { id: "theming", label: "Theming", href: "/docs/theming" },
    ],
  },
  {
    id: "data", label: "Data Management", icon: <Database className="w-4 h-4" />,
    children: [
      { id: "api", label: "API", href: "/data/api" },
      { id: "state", label: "State Management", href: "/data/state" },
    ],
  },
  { id: "tools", label: "Developer Tools", icon: <Code className="w-4 h-4" />, href: "/tools" },
  {
    id: "projects", label: "Projects", icon: <Folder className="w-4 h-4" />,
    children: [
      { id: "my-projects", label: "My Projects", href: "/projects/my" },
      { id: "templates", label: "Templates", href: "/projects/templates" },
      { id: "examples", label: "Examples", href: "/projects/examples" },
    ],
  },
  {
    id: "user", label: "User Account", icon: <User className="w-4 h-4" />,
    children: [
      { id: "profile", label: "Profile", icon: <User className="w-3 h-3" />, href: "/user/profile" },
      { id: "notifications", label: "Notifications", icon: <Bell className="w-3 h-3" />, href: "/user/notifications", badge: "5" },
      { id: "favorites", label: "Favorites", icon: <Star className="w-3 h-3" />, href: "/user/favorites" },
      { id: "settings", label: "Settings", icon: <Settings className="w-3 h-3" />, href: "/user/settings" },
    ],
  },
  { id: "search", label: "Search", icon: <Search className="w-4 h-4" />, href: "/search" },
];

// Demo Component
export function SidebarDemo() {
  const handleItemClick = (item: MenuItem) => console.log("Clicked:", item.label);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-950 overflow-hidden">
        <Sidebar items={navigationItems} onItemClick={handleItemClick} />

        <SidebarContent>
          <div className="flex flex-col h-full">
            <header className="sticky top-0 z-10 flex items-center gap-4 px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
              <SidebarTrigger className="flex-shrink-0" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex-1">
                DevUI Component Library
              </h1>
            </header>

            <main className="flex-1 overflow-auto p-6">
              <div className="max-w-5xl mx-auto space-y-8">
                <section>
                  <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                    Enhanced Sidebar Navigation
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    A premium sidebar component with glass morphism, smooth animations,
                    badge support, and delightful micro-interactions.
                  </p>
                </section>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <FeatureCard title="Modern Design" description="Glass morphism effects, gradients, and contemporary styling" icon="🎨" />
                  <FeatureCard title="Smooth Animations" description="Fluid transitions and micro-interactions throughout" icon="✨" />
                  <FeatureCard title="Badge Support" description="Show notifications and counts on menu items" icon="🔔" />
                  <FeatureCard title="Nested Menus" description="Unlimited nesting levels with visual hierarchy" icon="📂" />
                  <FeatureCard title="Responsive" description="Perfect on desktop, tablet, and mobile devices" icon="📱" />
                  <FeatureCard title="Accessible" description="Full keyboard navigation and ARIA support" icon="♿" />
                </div>

                <section className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-blue-200 dark:border-blue-800">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Try it out!</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Resize your browser to see responsive behavior. Click menu items with arrows
                    to expand nested sections. Notice the smooth animations, hover effects, and
                    badge indicators throughout the interface.
                  </p>
                </section>
              </div>
            </main>
          </div>
        </SidebarContent>
      </div>
    </SidebarProvider>
  );
}

const FeatureCard: React.FC<{ title: string; description: string; icon: string }> = ({
  title, description, icon
}) => (
  <div className="group p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
    <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);
