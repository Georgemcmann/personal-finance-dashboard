import { useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Menu,
  LayoutDashboard,
  CreditCard,
  PieChart,
  Settings,
  Plus,
} from "lucide-react";
import { cn } from "../../../utils/cn";
import { TransactionModal } from "../../../features/transactions/components/TransactionModal";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Transactions", href: "/transactions", icon: CreditCard },
  { name: "Budgets & Goals", href: "/budgets", icon: PieChart },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      {/* Desktop Sidebar */}
      <motion.aside
        className={cn(
          "hidden md:flex flex-col border-r border-sky-200 bg-sky-50/80 backdrop-blur-xl h-full z-20 relative",
          isSidebarOpen ? "w-64" : "w-20",
        )}
        animate={{ width: isSidebarOpen ? 256 : 80 }}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-sky-200">
          <span
            className={cn(
              "font-bold text-lg tracking-tight",
              !isSidebarOpen && "hidden",
            )}
          >
            ApexFinance
          </span>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-sky-100"
          >
            <Menu className="h-5 w-5 text-sky-700" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-slate-600 hover:bg-sky-100 hover:text-foreground",
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0 text-sky-600" />
                <span className={cn(!isSidebarOpen && "hidden")}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </motion.aside>

      {/* Main Framework View wrapper */}
      <div className="flex flex-col flex-1 h-full min-w-0 overflow-hidden">
        <header className="h-16 border-b border-sky-200 bg-sky-50/80 flex items-center justify-between px-4 md:px-8 flex-shrink-0">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-sky-100"
          >
            <Menu className="h-5 w-5 text-sky-700" />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <button
              onClick={() => setIsModalOpen(true)}
              className="glass-button flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Transaction</span>
            </button>
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
              JD
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
