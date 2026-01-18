import { Button, Card, CardContent } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const AddressCard = ({ handleSelectAddress, item, showButton, isSelected }) => {
  return (
    <Card
      className={`w-64 transition-all ${
        isSelected ? "border-2 border-green-500" : "border border-gray-300"
      }`}
      sx={{
        borderRadius: 2,
        boxShadow: isSelected ? "0 0 0 2px #4CAF50" : "none",
        "&:hover": {
          boxShadow: "0 0 0 2px #1976D2"
        }
      }}
    >
      <CardContent className="space-y-3">
        <div className="flex items-start space-x-3">
          <div
            className={`pt-1 ${
              isSelected ? "text-green-500" : "text-gray-500"
            }`}
          >
            {isSelected ? <CheckCircleIcon color="success" /> : <HomeIcon />}
          </div>

          <div className="space-y-2">
            <h1 className="font-semibold text-lg">
              {item.addressType || "Home"}
            </h1>
            <p className="text-gray-600">
              {item.streetAddress}, {item.city}
              <br />
              {item.state} - {item.postalCode}
              <br />
              {item.country}
            </p>
          </div>
        </div>

        {showButton && (
          <Button
            onClick={() => handleSelectAddress(item)}
            variant={isSelected ? "contained" : "outlined"}
            color={isSelected ? "success" : "primary"}
            fullWidth
            size="small"
            startIcon={isSelected ? <CheckCircleIcon /> : null}
            sx={{
              marginTop: 1,
              textTransform: "none"
            }}
          >
            {isSelected ? "Selected" : "Select"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default AddressCard;
