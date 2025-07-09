
import Navbar from '../components/Navbar';

function AboutPage() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('./desert.jpg')" // <-- ADD YOUR IMAGE PATH HERE
      }}
    >
      
      {/* Navbar */}
      <div className="relative z-10">
        <Navbar />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-xl">Your content goes here</p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;