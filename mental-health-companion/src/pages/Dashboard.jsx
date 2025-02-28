import { HeartPulse, Calendar, Activity, User } from "lucide-react";

const Dashboard = () => {
  // User information
  const userInfo = {
    name: "User",
    email: "email@gmail.com",
    healthStatus: {
      currentMood: "Stable",
      anxiety: "Low",
      lastCheckIn: "Today, 9:00 AM",
      stressLevel: "Moderate",
    },
  };

  // Past activities
  const activities = [
    { title: "Therapy Session", date: "March 15", time: "2:00 PM", status: "Completed" },
    { title: "Mindfulness Exercise", date: "March 17", time: "10:00 AM", status: "Completed" },
    { title: "Group Support", date: "March 18", time: "3:00 PM", status: "Completed" },
  ];

  // Upcoming sessions
  const upcomingSessions = [
    { title: "Weekly Check-in", date: "March 21", time: "2:00 PM" },
    { title: "Therapy Session", date: "March 23", time: "11:00 AM" },
  ];

  // Emergency number
  const emergencyNumber = "+918106609324";

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      {/* Header */}
      <header className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-full">
            <User className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{userInfo.name}</h2>
            <p className="text-gray-600">{userInfo.email}</p>
          </div>
        </div>
      </header>

      {/* Health Status and Emergency Button */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Health Status */}
        <div className="col-span-1 sm:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <HeartPulse className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Current Health Status</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(userInfo.healthStatus).map(([key, value]) => (
              <div key={key} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                <p className="text-lg font-medium text-gray-900">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Button */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <a
            href={`tel:${emergencyNumber}`}
            className="w-full h-full flex items-center justify-center p-4 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
          >
            <span className="text-black font-semibold">EMERGENCY ASSISTANCE</span>
          </a>
        </div>
      </div>

      {/* Past Activities and Upcoming Sessions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        {/* Past Activities */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Past Activities</h3>
          </div>
          <div className="space-y-3">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.date}, {activity.time}</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h3>
          </div>
          <div className="space-y-3">
            {upcomingSessions.map((session, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{session.title}</p>
                  <p className="text-sm text-gray-600">{session.date}, {session.time}</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Scheduled
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;