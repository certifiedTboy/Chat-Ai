import { createRoot } from "react-dom/client";
import { AuthContextProvider } from "./features/context/auth-context";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ChatContextProvider } from "./features/context/chat-context";

import App from "./App";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_APP_GOOGLE_OAUTH_CLIENT_ID}
    >
      <ChatContextProvider>
        <App />
      </ChatContextProvider>
    </GoogleOAuthProvider>
  </AuthContextProvider>,
);
