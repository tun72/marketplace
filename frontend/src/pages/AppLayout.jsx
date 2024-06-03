import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

export default function AppLayout() {
  return (
    <section className="max-w-6xl mx-auto">
      <Nav />

      <div className="relative h-[100vh] overflow-y-scroll w-full  px-3 py-8 pb-20">
        <Outlet />
      </div>
      {/* </section> */}
    </section>
  );
}
