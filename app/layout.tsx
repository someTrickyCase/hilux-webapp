import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const font = Jost({
    subsets: ["latin", "cyrillic"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "Hilux Toyota",
    description: "Специализированный магазин тюнинга для Toyota Hilux",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`${font} antialiased`}>{children}</body>
        </html>
    );
}
