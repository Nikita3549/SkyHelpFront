
import React, { useState } from "react";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from "@/components/ui/tabs";
import { 
  Home, 
  Link, 
  BarChart2, 
  CreditCard, 
  FileText, 
  HelpCircle, 
  Settings, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { AffiliateData } from "@/pages/AffiliateDashboard";

// Define props type
type AffiliateLayoutProps = {
  children: React.ReactNode;
  data: AffiliateData;
};

// Tab configuration
const tabConfig = [
  { id: "overview", label: "Dashboard", icon: Home },
  { id: "referral", label: "My Referral Link", icon: Link },
  { id: "statistics", label: "Statistics", icon: BarChart2 },
  { id: "payouts", label: "Payouts", icon: CreditCard },
  { id: "promomaterials", label: "Promo Materials", icon: FileText },
  { id: "support", label: "Support/FAQ", icon: HelpCircle },
  { id: "settings", label: "Settings", icon: Settings }
];

const AffiliateLayout: React.FC<AffiliateLayoutProps> = ({ children, data }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Find the index of the active child based on the active tab
  const activeIndex = tabConfig.findIndex(tab => tab.id === activeTab);

  // Filter out only the component we want to display based on active tab
  const activeChild = React.Children.toArray(children)[activeIndex];

  // Toggle sidebar collapsed state
  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div 
        className={`fixed md:relative z-30 h-full transition-all duration-300 ease-in-out bg-white border-r shadow-sm ${
          sidebarCollapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b">
            {!sidebarCollapsed && (
              <h2 className="text-lg font-semibold text-primary">Affiliate Portal</h2>
            )}
            <button 
              onClick={toggleSidebar}
              className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
            >
              {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 p-2 space-y-1 overflow-auto">
            {tabConfig.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center w-full py-3 px-3 rounded-md transition-all ${
                    activeTab === tab.id 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="flex-shrink-0" size={18} />
                  {!sidebarCollapsed && <span className="ml-3">{tab.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          {!sidebarCollapsed && (
            <div className="p-4 border-t">
              <div className="text-xs text-gray-500">
                <p>Logged in as:</p>
                <p className="font-medium">{data.user.name}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className={`flex-1 transition-all duration-300 ${
        sidebarCollapsed ? "md:ml-16" : "md:ml-64"
      }`}>
        {/* Mobile Tab Navigation */}
        <div className="block md:hidden sticky top-0 z-20 bg-white border-b shadow-sm">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full overflow-x-auto">
              {tabConfig.map(tab => (
                <TabsTrigger key={tab.id} value={tab.id} className="flex items-center">
                  <tab.icon className="mr-2" size={16} />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Content */}
        <div className="p-4 md:p-8">
          {activeChild}
        </div>
      </div>
    </div>
  );
};

export default AffiliateLayout;
