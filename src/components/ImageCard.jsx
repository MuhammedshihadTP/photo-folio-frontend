import { Box } from "@mui/material";
import React from "react";

import Card from "react-bootstrap/Card";

function ImageCard({ data }) {
  if (!Array.isArray(data)) {
    return <p>No data available</p>; 
  }

  return (
    <>
      <Box
        sx={{
          marginTop: "10px",
          marginLeft: "4rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        {data.map((item, index) => (
          <Card
            key={index}
            style={{
              width: "20rem",
              height: "auto",
              margin: "10px",
              padding: "10px",
            }}
          >
            <Card.Img
              variant="top"
              src={`${process.env.REACT_APP_SERVER_URL}/uploads/${item.image}`}
            />
          </Card>
        ))}
      </Box>
    </>
  );
}

export default ImageCard;

