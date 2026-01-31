import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
import App from "./App.jsx";
import StarRating from "./StarRating.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <StarRating
      maxRating={5}
      messages={["terrible", "bad", "ok", "good", "great"]}
    />
    <StarRating
      maxRating={10}
      color="red"
      size={24}
      className="test"
      defaultRating={1}
    />
  </StrictMode>,
);
