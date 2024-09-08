import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/shared/theme/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import RecoilContextProvider from "./recoilContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Buzzys - Dive into the Hive",
  description:
    "Buzzys: Dive into the hive of lively chats and make new connections! Join the buzz of real-time conversations and explore a world of dynamic interactions.",
  keywords:
    "Buzzys, chat, live chat, messaging, connections, real-time conversations, social, online chat",
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <RecoilContextProvider>{children}</RecoilContextProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
