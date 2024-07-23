import Navbar from "@/components/base/Navbar";
import SideBar from "@/components/base/SideBar";

export default async function DailyDevLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" h-screen">
      <Navbar />
      <div className="flex">
        <SideBar />
        <div className="">{children}</div>
      </div>
    </div>
  );
}
