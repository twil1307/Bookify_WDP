import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import {
  Home, 
} from "@/pages";
import {
  DefaultLayout,

} from "@/layouts";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<DefaultLayout />}>
        <Route
          path=""
          element={           
              <Home />            
          }
        /> 
      </Route>
    </Route>
  )
);

export default router;
