import { Brain, MessageCircle, HeartPulse, AlertCircle } from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: <Brain className="w-5 h-5" />,
      title: "AI-Powered Analysis",
      description: "Advanced mood tracking through text and speech analysis",
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "Personalized Therapy",
      description: "Get customized recommendations based on AI insights",
    },
    {
      icon: <HeartPulse className="w-5 h-5" />,
      title: "Health Monitoring",
      description: "Track and manage stress levels with wearables integration",
    },
    {
      icon: <AlertCircle className="w-5 h-5" />,
      title: "Emergency Support",
      description: "Quick access to crisis resources and professional help",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-purple-100">

      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-block bg-purple-100 text-purple-600 px-4 py-1.5 rounded-full text-sm font-medium mb-3">
            Your Mental Wellness Companion
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Mental Health Companion
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Experience personalized mental health support powered by advanced AI technology.
            Connect through chat or voice interactions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 
                       hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
            >
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 w-8 h-8 rounded-lg flex items-center justify-center">
                  <div className="text-purple-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8">
          <button className="bg-purple-600 text-white px-6 py-2 rounded-full text-base font-medium
                         hover:bg-purple-700 transition-all duration-300 transform hover:scale-105
                         shadow-sm hover:shadow-md">
            Start Your Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;