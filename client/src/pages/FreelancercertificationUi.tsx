import React from 'react';
import { useNavigate } from 'react-router-dom';

const FreelancerCertificationUI: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  const handleTakeTest = () => {
    navigate('/quiz'); 
  };

  const handleConnectCoursera = () => {
    window.location.href = 'https://www.coursera.org/auth/'; // Replace with the actual OAuth URL for Coursera
  };

  const handleConnectLinkedIn = () => {
    window.location.href = 'https://www.linkedin.com/in/srinitha-devaraneni-561506272/'; // Replace with actual LinkedIn OAuth URL
  };

  const handleConnectUdemy = () => {
    window.location.href = 'https://www.udemy.com/oauth2/authorize'; // Replace with actual Udemy OAuth URL
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-4xl">
      {/* Header */}
      <div className="border-b pb-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Professional Certifications</h1>
        <p className="text-gray-600 mt-1">Add certifications and skills verification to boost your profile credibility</p>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Platform Skills Tests */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">ProConnect Skill Verification</h2>
          <p className="text-sm text-gray-600 mb-4">Take in-platform tests to verify your skills and earn badges</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 bg-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Web Development</h3>
                  <p className="text-sm text-gray-500">HTML, CSS, JavaScript</p>
                </div>
                {/* <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm">Take Test</button> */}
                <button
                  onClick={handleTakeTest} // Trigger navigation on button click
                  className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                >
                  Take Test
                </button>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">UX Design</h3>
                  <p className="text-sm text-gray-500">User Research, Prototyping</p>
                </div>
                <button
                  onClick={handleTakeTest} // Trigger navigation on button click
                  className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                >
                  Take Test
                </button>
              </div>
            </div>
          </div>

          {/* <button className="text-blue-600 mt-4 text-sm font-medium">View more skill tests →</button> */}
        </div>

        {/* Third-party Integration */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Connect Third-Party Certifications</h2>
          <p className="text-sm text-gray-600 mb-4">Link your existing certifications from trusted providers</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Coursera */}
            <button onClick={handleConnectCoursera} className="bg-gray-100 text-gray-600 px-3 py-2 rounded-md flex items-center space-x-2">
            <ThirdPartyCard platform="Coursera" initial="C" description="Connect to import your course certificates" />
            </button>
            
            {/* LinkedIn Learning */}
            <button onClick={handleConnectLinkedIn} className="bg-gray-100 text-gray-600 px-3 py-2 rounded-md flex items-center space-x-2">
            <ThirdPartyCard platform="LinkedIn Learning" initial="L" description="Import your LinkedIn Learning certificates" />
            </button>
            {/* <ThirdPartyCard platform="LinkedIn Learning" initial="L" description="Import your LinkedIn Learning certificates" /> */}

            {/* Udemy */}
            <button onClick={handleConnectUdemy} className="bg-gray-100 text-gray-600 px-3 py-2 rounded-md flex items-center space-x-2">
            <ThirdPartyCard platform="Udemy" initial="U" description="Connect to validate your Udemy courses" />
            </button>
            
          </div>
        </div>

        {/* Manual Certificate Upload */}
        {/* <div className="border-t pt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Upload Certificates Manually</h2>
          <p className="text-sm text-gray-600 mb-4">Add other certifications you've earned</p>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <span className="text-lg">+</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Drag and drop files here</p>
            <p className="text-xs text-gray-500 mb-3">Supports PDF, JPG, PNG files</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">Browse Files</button>
          </div>
        </div> */}

        {/* Active Certifications */}
        {/* <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Your Verified Certifications</h2>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">3 Active</span>
          </div>

          <div className="space-y-3">
            <VerifiedCertificate
              title="React Development"
              issuer="Coursera"
              date="May 2024"
              initial="C"
            />
            <VerifiedCertificate
              title="JavaScript Advanced Skills"
              issuer="ProConnect Skill Test"
              date="June 2024"
              initial="PC"
            />
          </div>
        </div> */}
      </div>

      {/* Footer */}
      <div className="border-t mt-8 pt-6 flex justify-end">
        <button className="bg-blue-600 text-center text-white px-4 py-2 rounded-md">Save Changes</button>
      </div>
    </div>
  );
};

interface ThirdPartyCardProps {
  platform: string;
  initial: string;
  description: string;
}

const ThirdPartyCard: React.FC<ThirdPartyCardProps> = ({ platform, initial, description }) => (
  <div className="border rounded-lg p-4 flex flex-col items-center">
    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
      <span className="font-bold text-blue-700">{initial}</span>
    </div>
    <h3 className="font-medium mb-1">{platform}</h3>
    <p className="text-xs text-gray-500 text-center mb-3">{description}</p>
    <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 w-full py-2 rounded-md text-sm">Connect Account</button>
  </div>
);

interface VerifiedCertificateProps {
  title: string;
  issuer: string;
  date: string;
  initial: string;
}

const VerifiedCertificate: React.FC<VerifiedCertificateProps> = ({ title, issuer, date, initial }) => (
  <div className="border rounded-lg p-4 bg-white">
    <div className="flex justify-between">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="font-bold text-blue-700">{initial}</span>
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-xs text-gray-500">{issuer} • Issued {date}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Verified
        </span>
        <button className="text-gray-400 hover:text-gray-600">•••</button>
      </div>
    </div>
  </div>
);

export default FreelancerCertificationUI;
