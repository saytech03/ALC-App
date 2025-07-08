import { useAuth } from "../store/AuthContext";
import NotFoundPage from "../pages/404";

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, loading } = useAuth();

	// Show loading while checking authentication
	if (loading) {
		return (
			<div className='h-screen flex justify-center items-center bg-black'>
				<div className='text-white text-lg'>Loading...</div>
			</div>
		);
	}

	// If user is not authenticated, show 404 page
	if (!isAuthenticated) {
		return <NotFoundPage />;
	}

	// If user is authenticated, render the protected component
	return children;
};

export default ProtectedRoute;