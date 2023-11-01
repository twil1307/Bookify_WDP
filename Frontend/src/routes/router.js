import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import {
  Home,
  Introduction,
  Register,
  Update,
  Profile,
  PersonalInfo,
  LoginandSecurity,
  BookingHistory,
  Hotel,
} from "@/pages";
import { DefaultLayout, HostingRegisterLayout } from "@/layouts";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="" element={<Home />} />
        <Route path="profile">
          <Route path="" element={<Profile />} />
          <Route path="info" element={<PersonalInfo />} />
          <Route path="loginandsecurity" element={<LoginandSecurity />} />
          <Route path="history" element={<BookingHistory />} />
        </Route>
        <Route path="hotel">
          <Route
            path=":id"
            element={<Hotel />}
            errorElement={<div>Can not found...</div>}
          >
            {/* <Route path="booking" element={<BookingPayment />} /> */}
          </Route>
        </Route>
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
