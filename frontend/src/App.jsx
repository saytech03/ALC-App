import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HomePage_ from "./pages/HomePage_";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import NotFoundPage from "./pages/404";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import Blogspot from "./pages/Blogspot";
import Blogspot_ from "./pages/Blogspot_";
import MembersPage from "./pages/MembersPage";
import MembersPage_ from "./pages/MembersPage_";
import ContactPage from "./pages/ContactPage";
import ContactPage_ from "./pages/ContactPage_";
import Footer from "./components/Footer";
import EventPage from "./pages/EventPage";
import EventPage_ from "./pages/EventPage_";
import { AuthProvider } from "./store/AuthContext";

function App() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Set a timer for 5 seconds
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 5000);

		// Cleanup timer on component unmount
		return () => clearTimeout(timer);
	}, []);

	// Show loading screen for 5 seconds with slow elegant blink
	if (isLoading) {
		return (
			<div className='h-screen'>
				<div className='flex flex-col justify-center items-center bg-black h-full'>
					{/* Replace with your logo image - Slow Elegant Blink */}
					<img 
						src="/ellip_logo.png" 
						alt="Loading..." 
						className="w-50 h-40 mb-4 animate-slow-blink"
					/>
					<p className="text-white text-lg font-medium">Loading...</p>
				</div>
				
				{/* Custom CSS for slow elegant blink animation */}
				<style jsx>{`
					@keyframes slow-blink {
						0%, 50% {
							opacity: 1;
						}
						51%, 100% {
							opacity: 0.3;
						}
					}
					
					.animate-slow-blink {
						animation: slow-blink 1.2s ease-in-out infinite;
					}
				`}</style>
			</div>
		);
	}

	return (
		<>
		  <AuthProvider>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/signup' element={<SignUpPage />} />
				<Route path='/blog' element={<Blogspot />} />
				<Route path='/member' element={<MembersPage />} />
				<Route path='/contact' element={<ContactPage />} />
				<Route path='/event' element={<EventPage />} />
				<Route path='/*' element={<NotFoundPage />} />
				<Route path='/h' element={<HomePage_ />} />
				<Route path='/blogh' element={<Blogspot_ />} />
				<Route path='/memberh' element={<MembersPage_ />} />
				<Route path='/contacth' element={<ContactPage_ />} />
				<Route path='/eventh' element={<EventPage_ />} />
			</Routes>
            <Footer/>
			<Toaster />
		</AuthProvider>
		</>
	);
}

export default App;