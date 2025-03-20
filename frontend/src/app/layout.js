import "../app/globals.css";
import Sidebar from "@/components/Sidebar";
import ProfileDropdown from "@/components/ProfileDropdown";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen text-white">
        <Sidebar className="hidden md:block w-64" />
        <div className="flex-1 p-6 overflow-x-hidden" style={{ backgroundImage: 'radial-gradient(ellipse at 17% 10%, rgb(40, 27, 71) 0%, #0a0a0a 25%)' }}>
          <div className="relative flex flex-col md:flex-row justify-between items-start">
            
            <div className="px-8 py-14 md:px-16 lg:px-24">
              <h1 className="text-2xl font-normal">EXPLORE <span className="font-extrabold">DNA</span></h1>
              <p className="text-gray-400 mt-2">One-of-a-kind AI music experience, powered by real artists and musicians.</p>
            </div>

            
            <div className="absolute top-6 right-6 md:top-8 md:right-16 z-[10]">
              <ProfileDropdown />
            </div>
          </div>

          {children}
        </div>
      </body>
    </html>
  );
}
