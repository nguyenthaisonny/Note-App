
import { Outlet, Navigate} from "react-router-dom";

export default function ProtectedRoute({ children }) {
    
    
    if(!localStorage.getItem("accessToken")) {
        return <Navigate to='/Login'/>
    }
  return <Outlet />;
}
