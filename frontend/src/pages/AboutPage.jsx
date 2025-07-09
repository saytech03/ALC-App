import Navbar from '../components/Navbar';

function AboutPage() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('./desert_.jpg')"
      }}
    >
      {/* Navbar - Removed extra wrapper div */}
      <Navbar />
      
      {/* Content - Adjusted z-index and padding-top to account for fixed navbar */}
      <div className="pt-20 flex items-center justify-center min-h-screen">
        <div className="text-center text-white bg-black bg-opacity-50 p-8 rounded-lg max-w-4xl mx-4">
          <h1 className="text-4xl font-bold mb-6">About Us</h1>
          <p className="text-xl mb-4">Welcome to our organization</p>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
            Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus 
            rhoncus ut eleifend nibh porttitor.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;