
import type { Metadata } from "next";
import { cookies } from "next/headers";

import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";



export const metadata: Metadata = {
  title: "Suprimentos",
  description: "Sistema de suprimentos",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

  return (
    <html lang="pt-Br" suppressHydrationWarning>
      <body >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableColorScheme
          storageKey="theme"
          themes={["light", "dark", "system"]}
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <SidebarInset>
              {children}
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
