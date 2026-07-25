import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Plus, Moon, Sun, PanelLeftClose, Bot, LogOut } from "lucide-react";
import { useAuthContext } from "@/features/context/auth-context";
import { useHttp } from "@/hooks/use-http";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isMobile: boolean;
  onNewChat?: () => void;
}

export function Sidebar({
  isOpen,
  onToggle,
  isMobile,
  onNewChat,
}: SidebarProps) {
  const { theme, setTheme } = useTheme();

  const [getCurrentUser, { data, error }] = useHttp<{ currentUser: any }>();

  const { user, isLoggedIn, checkUserIsAuthenticated, logout } =
    useAuthContext();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const sidebarVariants = {
    open: {
      x: 0,
      width: isMobile ? "100%" : "260px",
      opacity: 1,
    },
    closed: {
      x: isMobile ? "-100%" : "-100%",
      width: isMobile ? "100%" : "0px",
      opacity: isMobile ? 0 : 1,
    },
  };

  useEffect(() => {
    getCurrentUser("/auth/me", "GET", "include", null, {
      "Content-Type": "application/json",
    });
  }, []);

  useEffect(() => {
    if (data && data?.currentUser) {
      checkUserIsAuthenticated(data.currentUser);
    }
  }, [data]);

  useEffect(() => {
    if (error === "jwt expired") {
      logout();
    }
  }, [error]);

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      <motion.div
        variants={sidebarVariants}
        initial={isMobile ? "closed" : "open"}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed md:relative z-50 h-[100dvh] flex flex-col bg-sidebar border-r border-sidebar-border overflow-hidden shrink-0`}
      >
        <div className="p-3 pb-2 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={onNewChat}
            className="flex-1 cursor-pointer justify-start gap-2 h-10 px-3 bg-sidebar border-sidebar-border hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg no-default-hover-elevate"
          >
            <Bot size={18} className="text-primary" />
            <span className="font-medium text-sm">New Chat</span>
            <Plus size={16} className="ml-auto text-muted-foreground" />
          </Button>

          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="ml-2 h-10 w-10"
            >
              <PanelLeftClose size={18} />
            </Button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 pt-4 custom-scrollbar"></div>

        <div className="p-3 border-t border-sidebar-border space-y-1">
          {/* <Button
            variant="ghost"
            className="w-full cursor-pointer justify-start gap-3 h-10 px-3 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg"
          >
            <Settings size={16} />
            <span className="text-sm">Settings</span>
          </Button> */}
          <Button
            variant="ghost"
            onClick={toggleTheme}
            className="w-full cursor-pointer justify-start gap-3 h-10 px-3 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            <span className="text-sm">
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </span>
          </Button>

          <Button
            variant="ghost"
            onClick={logout}
            className="w-full cursor-pointer justify-start gap-3 h-10 px-3 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg"
          >
            <LogOut size={16} />
            <span className="text-sm">Logout</span>
          </Button>
          <div className="mt-2 pt-2 border-t border-sidebar-border flex items-center gap-3 px-3 py-2">
            {isLoggedIn && user?.avatar ? (
              <div className="flex items-center gap-2">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-medium text-xs">
                {user?.name?.split(" ")[0]?.[0]?.toUpperCase()}{" "}
                {user?.name?.split(" ")[1]?.[0]?.toUpperCase()}
              </div>
            )}
            <div className="flex-1 truncate text-sm font-medium">
              {user?.name}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
