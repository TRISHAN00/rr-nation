import { DashboardHeader } from "./_components/DashboardHeader";
import { DashboardSidebar } from "./_components/DashboardSidebar";
import { ThemeProvider } from "./context/ThemeContext";

const DashboardLayout = ({ children }) => {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  );
};
export default DashboardLayout;
