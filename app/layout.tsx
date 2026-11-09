import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LivesProvider } from "@/components/misiones/lives-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "COGIT - Plataforma de Pensamiento Computacional",
  description:
    "Plataforma educativa para fomentar el pensamiento computacional a través de un enfoque gamificado e interactivo.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LivesProvider>
            {children}
          </LivesProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
