import SessionProvider from "./SessionProvider";
import "./gloabl.css"

export default function RootLayout({ children, }: { children: React.ReactNode }) {
    return (
        <div>
          <SessionProvider>
            {children}
          </SessionProvider>
        </div>
    );
}