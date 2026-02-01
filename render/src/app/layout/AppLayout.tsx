import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { PlayerBar } from "./PlayerBar";

export function AppLayout() {
  return (
    <div className="h-screen flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>

      <PlayerBar />
    </div>
  );
}
