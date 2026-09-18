import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0D12] text-[#00E5FF]">
        Loading...
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
