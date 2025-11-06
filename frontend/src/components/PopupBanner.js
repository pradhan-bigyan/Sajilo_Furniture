import React, { useState, useEffect } from "react";

const PopupBanner = () => {
  const [show, setShow] = useState(false); // Initially false, we will set it to true after 5 seconds.

  useEffect(() => {
    // After 5 seconds, show the banner
    const timer = setTimeout(() => {
      setShow(true);
    }, 5000); // 5 seconds

    // Cleanup function to clear the timeout if the component unmounts (for safety)
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this only runs once, on mount.

  const handleClose = () => {
    setShow(false); // Hide the banner when the close button is clicked.
  };

  return (
    show && (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          zIndex: "100",
          backgroundColor: "rgb(235, 235, 235)",
          padding: "10px",
          minHeight: "400px",
          textAlign: "center",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            color: "#FF5733",
            textShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
            marginBottom: "15px",
          }}
        >
          <b>🎉 New Year Mega Sale 🎉</b>
        </h2>

        <p
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#28A745",
            textShadow: "1px 1px 3px rgba(191, 181, 181, 0.2)",
            marginBottom: "20px",
          }}
        >
          <b>Up to 70% Off | Free Delivery | Limited Time Offer | Ends today</b>
        </p>

        <a href="https://sajilofurniturefrontend.onrender.com/">
          <img
            src="http://res.cloudinary.com/dgjrmt9st/image/upload/v1736182170/xeekoigelfz7cbcz5nos.jpg"
            alt="Mega Sale"
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "auto",
              margin: "20px 2px",
              borderRadius: "1px",
              objectFit: "contain",
            }}
          />
        </a>

        <button
          onClick={handleClose}
          style={{
            margin: "10px",
            padding: "10px 20px",
            cursor: "pointer",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          Close
        </button>
      </div>
    )
  );
};

export default PopupBanner;
