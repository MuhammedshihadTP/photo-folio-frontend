import React, { useEffect, useState } from "react";
import { isAuth } from "../utils/isAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "../components/ImageCard";
import { Box, Button, FormControl } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [userdata, setUserData] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = isAuth();

        if (token) {
          console.log(token);
          const response = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/api/user/image`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserData(response.data.data);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [navigate]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = isAuth();
      if (token && image) {
        const formData = new FormData();
        formData.append("image", image);

        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/user/image`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <Box
        margin={"10px"}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <form onSubmit={handleFormSubmit}>
          <FormControl>
            <Button
              variant="contained"
              component="label"
              startIcon={<ImageIcon />}
            >
              Upload Image
              <input
                accept=".png, .jpg, .jpeg"
                type="file"
                hidden
                name="image"
                required
                onChange={(e) => {
                  if (e.target.files.length > 0) {
                    const selectedImage = e.target.files[0];
                    setImage(selectedImage);
                  } else {
                    setImage("");
                  }
                }}
              />
            </Button>
          </FormControl>
          <Button sx={{ marginLeft: "10px" }} type={"submit"} disabled={!image}>
            Submit
          </Button>
        </form>
        <Box margin={"10px"}>
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>
      <Card data={userdata} />

      <ToastContainer />
    </div>
  );
}
