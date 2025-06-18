import Header from "@/components/header";
import { Outlet } from "react-router";

const HeaderOnlyLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col flex-1 p-4 md:px-22 md:py-8 bg-secondary/5">
        <Outlet />
      </main>
    </div>
  );
};

export default HeaderOnlyLayout;
