import LocationStyle from "./Location.module.scss";

function Location() {
  return (
    <>
      <h3 className={LocationStyle["location-title"]}>Location</h3>
      <div className={LocationStyle["location-container"]}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15343.455683547993!2d108.2605568!3d15.9684812!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x365b35580f52e8d5!2zxJDhuqFpIGjhu41jIEZQVCAoRlBUIHVuaXZlcnNpdHkp!5e0!3m2!1sen!2s!4v1665597686260!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0, width: "100%", height: "100%" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="hotel-location-booking-infor"
        ></iframe>
      </div>
    </>
  );
}

export default Location;
