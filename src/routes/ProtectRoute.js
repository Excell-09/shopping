import { Navigate } from 'react-router-dom';
const ProtectRoute = ({ children }) => {
  const user = localStorage.getItem('user');

  if (user === null) {
    return <Navigate to={'/login'} />;
  }

  return children;
};

export default ProtectRoute;
