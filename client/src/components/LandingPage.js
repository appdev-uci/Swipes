import React from "react";

const LandingPage = props => {
  return (
    <div className="container d-flex justify-content-around p-4">
      <div className="p-4">
        <img
          src={"https://via.placeholder.com/400.png/09f/fff"}
          alt="boohoo"
          className="img-thumbnaild"
        />
      </div>
      <div className="p-4">
        <h3>Swipes</h3>
        <p>
          Simple website that helps UCI students post swipes or connect with
          people that has swipes
        </p>
        <a href="auth/google">
          <img src={"./images/google_sign_in.png"} alt="boohoo" />
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
