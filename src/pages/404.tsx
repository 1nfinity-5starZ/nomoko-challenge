import { navigate } from "gatsby";

// markup
const NotFoundPage = () => {
  if (typeof window !== "undefined") {
    navigate("/");
  }
  return null;
};

export default NotFoundPage;
