import { Link } from "react-router-dom";
import { ROUTES } from "../routes/paths";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-600 to-yellow-400 text-white py-8 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold mb-4">¡Gracias por visitarnos!</h2>
          <p className="mb-4">
            Explora más sobre Pokémon y descubre todas las criaturas increíbles que tenemos para ti.
          </p>
          <div className="flex space-x-4">
            <Link
              to={ROUTES.HOME}
              className="hover:text-yellow-200 transition-colors duration-300"
            >
              Inicio
            </Link>
            <Link
              to={ROUTES.ABOUT}
              className="hover:text-yellow-200 transition-colors duration-300"
            >
              Acerca de
            </Link>
            <Link
              to={ROUTES.ABOUT}
              className="hover:text-yellow-200 transition-colors duration-300"
            >
              Contacto
            </Link>
          </div>
          <p className="mt-4 text-sm">
            © {new Date().getFullYear()} Pokémon Company. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;