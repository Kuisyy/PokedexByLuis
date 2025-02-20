import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import { ROUTES } from "./paths";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import FavouritePage from "../pages/FavouritePage";
import AboutPage from "../pages/AboutPage";
import PokemonDetailPage from "../pages/PokemonDetailPage";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const router = createBrowserRouter([
    {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children:[
        {
            path:ROUTES.HOME,
            element:<Home />
        },
        {
            path:ROUTES.SEARCH,
            element:<SearchPage />
        },
        {
            path:ROUTES.FAVOURITES,
            element:<FavouritePage />
        },
        {
            path:"/details/:name",
            element:<PokemonDetailPage />,
            errorElement: <ErrorPage />,
            //loader: Loader permite hacer un fecth directo a la ruta
            loader: async ({params})=>{
                const response = await fetch(`${VITE_API_URL}/details/${params.name}`);
                if (!response.ok){
                    console.error("Error en la api en el endpoint details");
                }
                return await response.json();
            }
        },
        {
            path:ROUTES.ABOUT,
            element:<AboutPage />
        }
    ]
    }
]);

export default router;
