import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import {
  Home,
  Profile,
  PersonalInfo,
  LoginandSecurity,
  BookingHistory,
  Introduction,
  HotelManageMain,
  HotelManageBooking,
  HotelManageDetail,
  Dashboard,
  Payment,
  Register,
  Hotel,
  Update,
  BookingPayment,
} from "@/pages";
import {
  DefaultLayout,
  HostingRegisterLayout,
  HotelManageLayout,
} from "@/layouts";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="" element={<Home />} />
        <Route path="hotel">
          <Route
            path=":id"
            element={<Hotel />}
            errorElement={<div>Can not found...</div>}
          >
            <Route path="booking" element={<BookingPayment />} />
          </Route>
        </Route>
        <Route path="profile">
          <Route path="" element={<Profile />} />
          <Route path="info" element={<PersonalInfo />} />
          <Route path="loginandsecurity" element={<LoginandSecurity />} />
          <Route path="history" element={<BookingHistory />} />
          <Route path="payment" element={<Payment />} />
        </Route>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
      <Route path="hosting" element={<HostingRegisterLayout />}>
        <Route path="introduction" element={<Introduction />} />
        <Route path="register" element={<Register />} />
        <Route path="update">
          <Route path=":hotelId" element={<Update />} />
        </Route>
      </Route>
      <Route path="manager" element={<HotelManageLayout />}>
        <Route path="hotel" element={<HotelManageMain />} />
        <Route path="detail" element={<HotelManageDetail />} />
        <Route path="booking" element={<HotelManageBooking />} />
      </Route>
    </Route>
  )
);

export default router;
