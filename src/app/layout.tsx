import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dicepass",
  description: "Diceware password generator",
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
