// src/data/sidebarData.js
import { LayoutDashboard, MessageSquare, FileUp, Settings, Activity  } from "lucide-react";

export const sidebarData = [
  {
    type: "main",  // Main navigation items
    items: [
      { text: "Dashboard", icon: LayoutDashboard, route: "/dashboard", alert: false },
      { text: "Chat", icon: MessageSquare, route: "/chat", alert: false },
      { text: "Assessment", icon: Activity, route: "/quiz", alert: false },
      { text: "File Upload", icon: FileUp, route: "/fileUpload", alert: false },
    ],
  },
  {
    type: "user",  // User-related items
    items: [
      { text: "Settings", icon: Settings, route: "/settings", alert: false },
    ],
  },
];
