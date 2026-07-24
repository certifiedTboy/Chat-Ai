import { Moon, Sun } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useTheme } from "../../helpers/theme-provider";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { logoutUserHandler } from "../../../lib/redux/authActions";
import profileImage from "../../assets/images/dummy.jpg";

function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const MainNav = () => {
  const dispatch = useDispatch();
  // const { currentUser } = useSelector((state: any) => state.auth);

  const currentUser = {
    username: "Tosin",
    picture: profileImage,
    email: "etosin70@gmail.com",
  };

  // const logoutUser = async () => {
  //   dispatch(logoutUserHandler());
  // };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <NavLink to="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">T-AI</span>
        </NavLink>
        <nav className="flex items-center gap-6 text-sm">
          {currentUser && (
            <>
              <NavLink
                to="/"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Home
              </NavLink>
              <NavLink
                to="/chat"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Chat
              </NavLink>
            </>
          )}
          {!currentUser && (
            <NavLink
              to="/get-started/sign-in"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Get Started
            </NavLink>
          )}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ModeToggle />
          {currentUser && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={currentUser.picture || profileImage}
                      alt={currentUser.username}
                    />
                    <AvatarFallback>
                      {currentUser.username.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {currentUser.username}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {currentUser.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuItem onClick={() => {}}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default MainNav;
