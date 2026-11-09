import type React from "react"
import "@/app/globals.css"
import { Inter, Poppins } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LivesProvider } from "@/components/misiones/lives-context"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" })
const poppins = Poppins({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display", display: "swap" })

export const metadata = {
  title: "COGIT - Plataforma de Pensamiento Computacional",
  description:
    "Plataforma educativa para fomentar el pensamiento computacional a través de un enfoque gamificado e interactivo.",
  icons: { icon: "/brand/favicon.ico", apple: "/brand/apple-touch-icon-180.png" },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LivesProvider>
            {children}
          </LivesProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
