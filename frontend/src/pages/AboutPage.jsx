import { FaInstagram, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-purple-800 mb-6">Sobre Mí</h1>
        <p className="text-gray-700 text-lg mb-8">
          ¡Hola! Soy un apasionado desarrollador web con experiencia en React, Tailwind CSS y más.
          Me encanta crear aplicaciones modernas y eficientes. ¡Conéctate conmigo en mis redes sociales!
        </p>
        <div className="flex justify-center space-x-6">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/luis223_va"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-800 transition-colors duration-300"
          >
            <FaInstagram size={32} />
          </a>
          {/* Twitter */}
          <a
            href="https://twitter.com/luis223_va"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600 transition-colors duration-300"
          >
            <FaTwitter size={32} />
          </a>
          {/* GitHub */}
          <a
            href="https://github.com/Kuisyy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-black transition-colors duration-300"
          >
            <FaGithub size={32} />
          </a>
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/LuisMH"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
          >
            <FaLinkedin size={32} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;