// src/data/sidebarData.js
import { LayoutDashboard, BarChart2, MessageSquare, FileUp, FileText, HelpCircle, Home, User, Settings } from "lucide-react"; 
import {  } from 'lucide-react';

export const sidebarData = [
  {
    type: "main",  // Main navigation items
    items: [
      { text: "Dashboard", icon: LayoutDashboard, route: "/dashboard", alert: false },
      { text: "Statistics", icon: BarChart2, route: "/statistics", alert: false },
      { text: "Chat", icon: MessageSquare, route: "/chat", alert: false },
      { text: "File Upload", icon: FileUp, route: "/fileUpload", alert: false },
      { text: "Billings", icon: FileText, route: "/billings", alert: false },
      { text: "Help", icon: HelpCircle, route: "/help", alert: true },
    ],
  },
  {
    type: "user",  // User-related items
    items: [
      { text: "Home", icon: Home, route: "/home", alert: false },
      { text: "Profile", icon: User, route: "/profile", alert: true },
      { text: "Settings", icon: Settings, route: "/settings", alert: false },
    ],
  },
];
