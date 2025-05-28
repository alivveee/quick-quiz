import Header from "@/components/header/header";
import { Outlet } from "react-router";

const HeaderOnlyLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col flex-1 px-22 py-8 bg-primary/15">
        <Outlet />
      </main>
    </div>
  );
};

export default HeaderOnlyLayout;
