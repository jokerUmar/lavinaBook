import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const usePreventBackNavigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();
      navigate("/home", { replace: true }); // Redirect to a specific page
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);
};

export default usePreventBackNavigation;
