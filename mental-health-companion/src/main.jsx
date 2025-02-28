import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./pages/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <App />
    </AuthProvider>
);
