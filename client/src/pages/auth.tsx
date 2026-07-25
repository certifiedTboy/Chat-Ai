import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useGoogleLogin } from "@react-oauth/google";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHttp } from "@/hooks/use-http";
import { useAuthContext } from "@/features/context/auth-context";
import { useToast } from "@/hooks/use-toast";

const visitGithubConsentScreen = () => {
  const params = new URLSearchParams({
    client_id: import.meta.env.VITE_GITHUB_CLIENT_ID,
    scope: "read:user user:email",
  });

  window.location.href = `https://github.com/login/oauth/authorize?${params.toString()}`;
};

export default function AuthPage() {
  const [
    loginWithGoogle,
    { isLoading: loadingGoogle, error: googleError, data: googleData },
  ] = useHttp<any>();
  const [
    loginWithGithub,
    { isLoading: loadingGithub, error: githubError, data: githubData },
  ] = useHttp<any>();

  const { checkUserIsAuthenticated } = useAuthContext();

  const [, setLocation] = useLocation();

  const { toast } = useToast();
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) =>
      loginWithGoogle(
        "auth/google/login",
        "POST",
        "include",
        {
          authToken: tokenResponse.access_token,
        },

        { "Content-Type": "application/json" },
      ),
    flow: "implicit",
  });

  useEffect(() => {
    const queryString = window?.location.search;

    const urlParams = new URLSearchParams(queryString);

    const githubToken = urlParams.get("code");

    if (githubToken) {
      loginWithGithub(
        "auth/github/login",
        "POST",
        "include",
        { code: githubToken },
        { "Content-Type": "application/json" },
      );
    }
  }, []);

  useEffect(() => {
    if (githubData) {
      localStorage.setItem("isAuth", "true");

      checkUserIsAuthenticated(githubData);
      setLocation("/chat", { replace: true });
    }
    if (githubError) {
      toast({
        title: "GitHub Sign-in Error",
        description: githubError,
        variant: "destructive",
      });
    }

    if (googleData) {
      localStorage.setItem("isAuth", "true");

      checkUserIsAuthenticated(googleData);
      setLocation("/chat", { replace: true });
    }
    if (googleError) {
      toast({
        title: "Google Sign-in Error",
        description: googleError,
        variant: "destructive",
      });
    }
  }, [githubData, googleData, githubError, googleError, toast]);

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center bg-background selection:bg-primary/20 p-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[380px] p-8 md:p-10 bg-card border border-border/50 rounded-2xl shadow-xl shadow-black/5"
      >
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
            <Bot size={28} className="stroke-[1.5]" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-medium tracking-tight text-foreground">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground font-sans">
              Sign in to continue to your workspace.
            </p>
          </div>

          <div className="w-full space-y-3 pt-4">
            <Button
              variant="outline"
              size="lg"
              className="w-full cursor-pointer h-12 font-medium hover-elevate transition-all border-border/60 hover:bg-muted/50 relative overflow-hidden"
              onClick={() => handleGoogleLogin()}
              // @ts-ignore
              disabled={loadingGoogle || loadingGithub}
            >
              <div
                className={`flex items-center justify-center gap-2 transition-transform duration-300 ${loadingGoogle ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.89 16.79 15.73 17.57V20.34H19.29C21.38 18.42 22.56 15.6 22.56 12.25Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23C14.97 23 17.46 22.02 19.29 20.34L15.73 17.57C14.74 18.23 13.48 18.63 12 18.63C9.13 18.63 6.7 16.7 5.84 14.09H2.17V16.94C3.98 20.53 7.68 23 12 23Z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09C5.62 13.43 5.49 12.73 5.49 12C5.49 11.27 5.62 10.57 5.84 9.91V7.06H2.17C1.42 8.56 1 10.23 1 12C1 13.77 1.42 15.44 2.17 16.94L5.84 14.09Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38C13.62 5.38 15.06 5.93 16.2 7.02L19.38 3.84C17.45 2.04 14.97 1 12 1C7.68 1 3.98 3.47 2.17 7.06L5.84 9.91C6.7 7.3 9.13 5.38 12 5.38Z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Continue with Google</span>
              </div>
              {loadingGoogle && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full h-12 font-medium cursor-pointer hover-elevate transition-all border-border/60 hover:bg-muted/50 relative overflow-hidden"
              onClick={visitGithubConsentScreen}
              // @ts-ignore
              disabled={loadingGoogle || loadingGithub}
            >
              <div
                className={`flex items-center justify-center gap-2 transition-transform duration-300 ${loadingGithub ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-foreground"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>Continue with GitHub</span>
              </div>
              {loadingGithub && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </Button>
          </div>

          <div className="pt-6 w-full text-center">
            <p className="text-xs text-muted-foreground font-sans">
              By continuing, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
