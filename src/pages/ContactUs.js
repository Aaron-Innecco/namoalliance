import "./ContactUs.css";

function ContactUs() {
  return (
    <div className="page contact-page">
      <section className="page-section">
        <h1>Contact Us</h1>
        <p className="textbox">
          If you have any questions or would like to get in touch with us, please feel free to reach out!
        </p>
        <div className="contact-info">
          <p>Email: <a href="mailto:staff@namoalliance.org">staff@namoalliance.org</a></p>
        </div>
        <div className="organization-info">
          <h2>Organization Information</h2>
          <p><a href="mailto:staff@namoalliance.org">Request Mailing Address</a></p>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;