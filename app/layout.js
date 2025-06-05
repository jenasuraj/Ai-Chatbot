import "./globals.css";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <main className="flex justify-center items-center bg-black">
        {children}
      </main>
      </body>
    </html>
  );
}