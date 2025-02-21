import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Settings as SettingsIcon,
  Key,
  Globe,
  LogOut,
  ChevronRight,
} from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      alert("Logged out successfully!");
      setIsLoading(false);
      navigate("/");
    }, 1000);
  };

  const settingsOptions = [
    {
      title: "Profile Settings",
      description: "Update your personal information",
      icon: User,
      onClick: () => navigate("/settings/profile"),
    },
    {
      title: "Password",
      description: "Change your password",
      icon: Key,
      onClick: () => navigate("/settings/password"),
    },
    {
      title: "Manage Account",
      description: "Manage your account settings",
      icon: SettingsIcon,
      onClick: () => navigate("/settings/manage"),
    },
    {
      title: "Language",
      description: "Change your language preferences",
      icon: Globe,
      onClick: () => navigate("/settings/language"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-8 lg:p-12">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
          <p className="text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="space-y-4">
          {settingsOptions.map((option, index) => (
            <button
              key={index}
              onClick={option.onClick}
              className="w-full flex items-center justify-between p-4 rounded-lg border bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.01] active:scale-[0.99]"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                  <option.icon size={20} />
                </div>
                <div className="text-left">
                  <h3 className="font-medium">{option.title}</h3>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:translate-x-1" />
            </button>
          ))}

          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="w-full mt-8 flex items-center justify-center bg-red-500 text-white py-3 rounded-lg shadow-md hover:bg-red-600 transition disabled:opacity-50"
          >
            <LogOut className="mr-2 h-5 w-5" />
            {isLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
