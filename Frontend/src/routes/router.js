import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Home, Introduction, Register, Update } from "@/pages";
import { DefaultLayout, HostingRegisterLayout } from "@/layouts";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="" element={<Home />} />
      </Route>
      <Route path="hosting" element={<HostingRegisterLayout />}>
        <Route path="introduction" element={<Introduction />} />
        <Route path="register" element={<Register />} />
        <Route path="update">
          <Route path=":hotelId" element={<Update />} />
        </Route>
      </Route>
    </Route>
  )
);

export default router;
