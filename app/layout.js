import "./globals.css";

export const metadata = {
  title: "Clinical Supervision Platform",
  description: "A supervision tool for graduate therapy students",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
