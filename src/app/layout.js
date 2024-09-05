
import Header from "../components/layout/header"
import "./globals.css";
import { Roboto } from "next/font/google";
import AppProvider from './AppContext'
import { Toaster } from "react-hot-toast";
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className="max-w-4xl  mx-auto border p-4">
          <AppProvider>
            <Toaster/>
          <Header/>
                      {children}
                      <footer className="border-t p-8 text-gray-500 text-center mt-16">
        &copy; 2023 All rights reserved
      </footer>
          </AppProvider>
      </main>
      </body>
    </html>
  );
}
