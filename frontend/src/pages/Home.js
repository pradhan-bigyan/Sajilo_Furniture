

// export default Home;

import React, { useState, useEffect } from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";
import PopupBanner from "../components/PopupBanner";

const CookieConsent = ({ onAccept }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#00274d",
        color: "#fff",
        padding: "2rem",
        textAlign: "center",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        width: "90%",
        maxWidth: "500px",
        zIndex: 1000,
      }}
    >
      <h2 style={{ marginBottom: "1rem" }}>It's your choice</h2>
      <p style={{ marginBottom: "1rem" }}>
        Sajilo Furniture 2025 use cookies and similar technologies to enhance your experience. By
        accepting, you agree to our privacy policy.
      </p>
      <div>
        <button
          onClick={onAccept}
          style={{
            margin: "0.5rem",
            padding: "0.7rem 1.5rem",
            backgroundColor: "#4caf50",
            border: "none",
            color: "#fff",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Yes, I Accept
        </button>
        <button
          onClick={() => alert("You can manage cookies in settings later.")}
          style={{
            margin: "0.5rem",
            padding: "0.7rem 1.5rem",
            backgroundColor: "#f44336",
            border: "none",
            color: "#fff",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          No, Thank You
        </button>
      </div>
    </div>
  );
};

const Home = () => {
  const [hasAccepted, setHasAccepted] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const consentGiven = localStorage.getItem("cookieConsent");
    if (consentGiven) {
      setHasAccepted(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setHasAccepted(true);
  };

  if (!hasAccepted) {
    return <CookieConsent onAccept={handleAccept} />;
  }

  return (
    <div>
      <PopupBanner />
      <BannerProduct />
      <CategoryList />

      <HorizontalCardProduct category={"sofas"} heading={"Top Sofas"} />
      <HorizontalCardProduct category={"beds"} heading={"Popular Beds"} />

      <VerticalCardProduct
        category={"dining_tables"}
        heading={"Dining Tables"}
      />
      <VerticalCardProduct category={"chairs"} heading={"Chairs"} />
      <VerticalCardProduct
        category={"coffee_tables"}
        heading={"Coffee Tables"}
      />
      <VerticalCardProduct category={"wardrobes"} heading={"Wardrobes"} />
      <VerticalCardProduct category={"bookshelves"} heading={"Bookshelves"} />
      <VerticalCardProduct category={"tv_units"} heading={"TV Units"} />
      <VerticalCardProduct category={"side_tables"} heading={"Side Tables"} />
      <VerticalCardProduct category={"shoe_racks"} heading={"Shoe Racks"} />
      <VerticalCardProduct category={"dressers"} heading={"Dressers"} />
      <VerticalCardProduct category={"study_tables"} heading={"Study Tables"} />
    </div>
  );
};

export default Home;
