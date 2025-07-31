import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dicepass",
  description: "Diceware password generator",
  openGraph: {
    title: "Dicepass",
    description: "Diceware password generator",
    url: "https://dicepass.takiido.dev",
    siteName: "Dicepass",
    images: [
      {
        url: "https://dicepass.takiido.dev/preview.png",
        width: 1200,
        height: 630,
        alt: "Dicepass Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dicepass",
    description: "Diceware password generator",
    images: ["https://dicepass.takiido.dev/preview.png"],
    site: "@eviltakiido",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
