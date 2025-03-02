import { NavLink } from "react-router-dom";
import { ROUTES } from "../routes/paths";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from bg-purple-500 to-yellow-300 shadow-lg">
        <div className="container mx-auto p-4 justify-between flex items-center">
          <NavLink to={ROUTES.HOME} className="text-white text-2xl font-bold">Pokedex</NavLink>
          
          <div className="space-x-5">

          <NavLink
          to={ROUTES.HOME}
          className={({ isActive }) =>
            isActive
              ? "text-white text-2xl font-bold"
              : "text-purple-500 text-2xl hover:text-black"
          }
        >
          Inicio
        </NavLink>

          <NavLink to={ROUTES.SEARCH} className="text-white text-2xl font-bold">Buscar</NavLink>
          <NavLink to={ROUTES.FAVOURITES} className="text-white text-2xl font-bold">Favoritos</NavLink>
          <NavLink to={ROUTES.ABOUT} className="text-white text-2xl font-bold">About</NavLink>

          </div>
        </div>
    </nav>
  )
}

export default Navbar;