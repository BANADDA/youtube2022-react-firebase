import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { superAuth } from "../../firebase";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

export default function MultiActionAreaCard() {

  const { dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    signOut(superAuth)
      .then(() => {
        dispatch({ type: "LOGOUT" });
        // Add any necessary code to redirect or perform additional actions after logout
      })
      .catch((error) => {
        console.log("Logout error:", error);
      });
  };
  

  const cardRef = React.useRef(null);

  React.useEffect(() => {
    const handleResize = () => {
      const cardWidth = cardRef.current.offsetWidth;
      const cardHeight = cardWidth * 0.4;
      cardRef.current.style.height = `${cardHeight}px`;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Card
      ref={cardRef}
      sx={{ maxWidth: 1000, marginBottom: 15, backgroundColor: 'rgba(255,255,255,0.9)'}}
      className="featured"
    >
      <CardActionArea>
        <Typography
          gutterBottom
          sx={{ pt: 5, pb: 0}}
          variant="h2"
          component="div"
          align="center"
        >
          AgriXpert
        </Typography>
        <CardContent align="center">
          <Typography
            variant="body2"
            color="text.secondary"
            align="left"
            sx={{ p: 15, pt: 0, pb: 0, fontWeight: 'bold', color: 'black' }}
          >
            Welcome to the AgriXpert Admin Platform! As an admin, you hold a
            crucial role in managing and overseeing the agricultural operations.
            We are thrilled to have you join our community of agricultural
            professionals. Our platform is specifically designed to meet the
            unique needs of administrators like you, providing powerful tools
            and features to streamline administrative tasks and enhance
            productivity. With our user-friendly interface and intuitive design,
            you can easily navigate through various sections and efficiently
            manage user accounts, permissions, data analysis, and reporting.
            Stay organized and stay ahead with our comprehensive task management
            system, ensuring smooth collaboration and effective communication.
            Thank you for choosing AgriXpert, and we are committed to supporting
            your success in agricultural administration.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="large" color="primary" sx={{ fontWeight:'bold' }} onClick={handleLogout}>
          Logout
        </Button>
      </CardActions>
    </Card>
  );
}
