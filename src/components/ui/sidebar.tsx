"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  children?: MenuItem[];
  badge?: string | number;
}

interface SidebarProps {
  items: MenuItem[];
  className?: string;
  onItemClick?: (item: MenuItem) => void;
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

export const useSidebar = () => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

interface SidebarProviderProps {
  children: React.ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <SidebarContext.Provider
      value={{ isOpen, isMobile, toggleSidebar, closeSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

// Hamburger Menu Button Component
export const SidebarTrigger: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      className={cn(
        "md:hidden hover:scale-105 active:scale-95 transition-transform",
        className
      )}
      aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
    >
      {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </Button>
  );
};

// Individual Menu Item Component
interface MenuItemComponentProps {
  item: MenuItem;
  level?: number;
  onItemClick?: (item: MenuItem) => void;
}

const MenuItemComponent: React.FC<MenuItemComponentProps> = ({
  item,
  level = 0,
  onItemClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { closeSidebar, isMobile } = useSidebar();
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else {
      onItemClick?.(item);
      if (isMobile) {
        closeSidebar();
      }
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={cn(
          "w-full flex items-center text-left text-sm transition-all duration-200 rounded-lg group relative",
          "hover:bg-gradient-to-r hover:from-accent/50 hover:to-transparent",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          "active:scale-[0.98]",
          "py-2.5 my-0.5"
        )}
        style={{
          paddingLeft: `${16 + level * 16}px`,
          paddingRight: "12px",
        }}
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-label={item.label}
      >
        {/* Icon with subtle scale animation */}
        <span className="flex-shrink-0 w-5 h-5 mr-3 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
          {item.icon ||
            (level > 0 && (
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
            ))}
        </span>

        {/* Label with color transition */}
        <span className="flex-1 truncate font-medium text-foreground group-hover:text-primary transition-colors">
          {item.label}
        </span>

        {/* Badge */}
        {item.badge && (
          <span className="flex-shrink-0 ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-primary/10 text-primary">
            {item.badge}
          </span>
        )}

        {/* Chevron with smooth rotation */}
        {hasChildren && (
          <span
            className={cn(
              "flex-shrink-0 ml-2 transition-all duration-300",
              isExpanded && "rotate-90"
            )}
          >
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
          </span>
        )}
      </button>

      {/* Nested Items with smooth expansion and visual hierarchy */}
      {hasChildren && (
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-out",
            isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="py-1 space-y-0.5 border-l-2 border-border/50 ml-4">
            {item.children?.map((child) => (
              <MenuItemComponent
                key={child.id}
                item={child}
                level={level + 1}
                onItemClick={onItemClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Main Sidebar Component
export const Sidebar: React.FC<SidebarProps> = ({
  items,
  className,
  onItemClick,
}) => {
  const { isOpen, isMobile, closeSidebar } = useSidebar();

  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isMobile, isOpen]);

  return (
    <>
      {/* Enhanced Mobile Overlay with blur */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar with glass morphism effect */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-background/95 backdrop-blur-xl border-r border-border z-50",
          "transition-all duration-300 ease-out shadow-2xl",
          "w-72",
          "md:relative md:translate-x-0 md:z-auto md:shadow-none",
          isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "",
          !isMobile &&
            (isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"),
          className
        )}
        aria-label="Sidebar navigation"
        style={{ width: "288px" }}
      >
        <div className="flex flex-col h-full">
          {/* Enhanced Sidebar Header with gradient accent */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-gradient-to-r from-accent/20 to-transparent backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-bold text-sm">
                  D
                </span>
              </div>
              <h2 className="text-lg font-bold text-foreground">Navigation</h2>
            </div>
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={closeSidebar}
                aria-label="Close sidebar"
                className="h-8 w-8 hover:bg-accent"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Navigation Items with custom scrollbar */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent hover:scrollbar-thumb-muted-foreground">
            <div className="space-y-1">
              {items.map((item) => (
                <MenuItemComponent
                  key={item.id}
                  item={item}
                  onItemClick={onItemClick}
                />
              ))}
            </div>
          </nav>

          {/* Enhanced Footer with user info */}
          <div className="px-4 py-4 border-t border-border bg-muted/30">
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-accent transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-semibold shadow-md">
                JD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                  John Doe
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  john@example.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

// Sidebar Content Wrapper
interface SidebarContentProps {
  children: React.ReactNode;
  className?: string;
}

export const SidebarContent: React.FC<SidebarContentProps> = ({
  children,
  className,
}) => {
  const { isOpen, isMobile } = useSidebar();

  return (
    <main
      className={cn(
        "flex-1 transition-all duration-300 ease-out min-h-0 flex flex-col",
        !isMobile && isOpen && "md:ml-72",
        className
      )}
    >
      {children}
    </main>
  );
};
