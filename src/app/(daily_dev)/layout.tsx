import Navbar from "@/components/base/Navbar";
import SideBar from "@/components/base/SideBar";

export default async function DailyDevLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" overflow-y-hidden h-screen">
      <Navbar />
      <div className="flex">
        <SideBar />
        <div className="flex justify-center items-center w-full overflow-y-scroll">
          {children}
        </div>
      </div>
    </div>
  );
}
