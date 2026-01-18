import { Button, Card, Divider, Snackbar } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import AddressCard from "../../components/Address/AddressCard";
import CartItemCard from "../../components/CartItem/CartItemCard";
import { useDispatch, useSelector } from "react-redux";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { Box, Modal, Grid, TextField } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createOrder } from "../../../State/Customers/Orders/Action";
import { findCart } from "../../../State/Customers/Cart/cart.action";
import { isValid } from "../../util/ValidToOrder";
import { cartTotal } from "./totalPay";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { API_URL } from "../../../config/api";

const initialValues = {
  streetAddress: "",
  state: "",
  pincode: "",
  city: ""
};

const validationSchema = Yup.object().shape({
  streetAddress: Yup.string().required("Street Address is required"),
  state: Yup.string().required("State is required"),
  pincode: Yup.string()
    .required("Pincode is required")
    .matches(/^\d{6}$/, "Pincode must be 6 digits"),
  city: Yup.string().required("City is required")
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  p: 4
};

const Cart = () => {
  const [openSnackbar, setOpenSnakbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [openAddressModal, setOpenAddressModal] = useState(false);

  const dispatch = useDispatch();
  const { cart, auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(findCart(localStorage.getItem("jwt")));
  }, [dispatch]);

  const handleCloseAddressModal = () => {
    setOpenAddressModal(false);
  };

  const handleOpenAddressModal = () => setOpenAddressModal(true);

  const handleAddressSubmit = (values, { resetForm }) => {
    // In a real app, you would save this address to the user's profile
    const newAddress = {
      ...values,
      postalCode: values.pincode,
      id: Date.now() // temporary ID for new address
    };

    setDeliveryAddress(newAddress);
    setSelectedAddress(newAddress);
    setOpenAddressModal(false);
    resetForm();
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setDeliveryAddress(address);
  };
  const loadRazorpayScript = async () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        console.log("Razorpay script loaded");
        resolve(true);
      };
      script.onerror = () => {
        console.error("Failed to load Razorpay script");
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  const handleCheckout = async () => {
    try {
      // Validation checks
      if (cart.cartItems.length === 0) {
        setSnackbarMessage("Your cart is empty");
        setOpenSnakbar(true);
        return;
      }

      if (!isValid(cart.cartItems)) {
        setSnackbarMessage("All items must be from the same restaurant");
        setOpenSnakbar(true);
        return;
      }

      if (!deliveryAddress) {
        setSnackbarMessage("Please select a delivery address");
        setOpenSnakbar(true);
        return;
      }

      // Load Razorpay script first
      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded) {
        throw new Error("Payment service unavailable");
      }

      // Prepare order data
      const orderData = {
        jwt: localStorage.getItem("jwt"),
        order: {
          restaurantId: cart.cartItems[0].food?.restaurant.id,
          deliveryAddress: {
            fullName: auth.user?.fullName,
            streetAddress: deliveryAddress.streetAddress,
            city: deliveryAddress.city,
            state: deliveryAddress.state,
            postalCode: deliveryAddress.pincode || deliveryAddress.postalCode,
            country: "India"
          }
        }
      };

      // Create a promise wrapper for the dispatch
      const response = await new Promise((resolve, reject) => {
        dispatch(createOrder(orderData))
          .then((action) => {
            if (action.payload) {
              // Check your action structure here
              resolve(action.payload);
            } else {
              reject(new Error("No payload received"));
            }
          })
          .catch(reject);
      });

      console.log("Order creation response:", response);

      if (response?.payment_url) {
        handleRazorpayPayment(response);
      } else {
        throw new Error("No payment URL received");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setSnackbarMessage(error.message || "Failed to create order");
      setOpenSnakbar(true);
    }
  };
  const handleRazorpayPayment = (paymentResponse) => {
    const options = {
      key: paymentResponse.razorpayKey,
      amount: paymentResponse.amount * 100, // Convert to paise
      currency: "INR",
      name: "Zosh Food",
      description: "Food Order Payment",
      order_id: paymentResponse.razorpayOrderId,
      handler: function (response) {
        // Simply redirect on payment success - no backend verification
        console.log("Payment success:", response);
        window.location.href = `/payment/success/${paymentResponse.razorpayOrderId}`;
      },
      prefill: {
        name: auth.user?.fullName || "",
        email: auth.user?.email || "",
        contact: auth.user?.mobile || ""
      },
      theme: {
        color: "#3399cc"
      },
      modal: {
        ondismiss: function () {
          console.log("Payment closed");
          // Optional: Handle when user closes the payment modal
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleCloseSnackbar = () => setOpenSnakbar(false);

  return (
    <Fragment>
      {cart.cartItems.length > 0 ? (
        <main className="lg:flex justify-between">
          {/* Left Section - Cart Items and Bill Details */}
          <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
            {cart.cartItems.map((item, i) => (
              <CartItemCard key={item.id || i} item={item} />
            ))}

            <Divider />
            <div className="billDetails px-5 text-sm">
              <p className="font-extralight py-5">Bill Details</p>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-400">
                  <p>Item Total</p>
                  <p>₹{cartTotal(cart.cartItems)}</p>
                </div>
                <div className="flex justify-between text-gray-400">
                  <p>Delivery Fee</p>
                  <p>₹21</p>
                </div>
                <div className="flex justify-between text-gray-400">
                  <p>Platform Fee</p>
                  <p>₹5</p>
                </div>
                <div className="flex justify-between text-gray-400">
                  <p>GST and Restaurant Charges</p>
                  <p>₹33</p>
                </div>
                <Divider />
                <div className="flex justify-between text-gray-400">
                  <p>Total Pay</p>
                  <p>₹{cartTotal(cart.cartItems) + 59}</p>
                </div>
              </div>
            </div>
            <Divider />
            <div className="mt-10 flex justify-center">
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleCheckout}
                sx={{
                  padding: "0.5rem 0.8rem",
                  fontSize: "1rem",
                  width: "300px"
                }}
                disabled={!deliveryAddress}
              >
                Proceed to Checkout
              </Button>
            </div>
          </section>

          <Divider orientation="vertical" flexItem />

          {/* Right Section - Address Selection and Checkout */}
          <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
            <div className="w-full">
              <h1 className="text-center font-semibold text-2xl py-10">
                Choose Delivery Address
              </h1>

              {/* Address Selection */}
              <div className="flex gap-5 flex-wrap justify-center">
                {auth.user?.addresses.map((item) => (
                  <AddressCard
                    key={item.id}
                    handleSelectAddress={handleAddressSelect}
                    item={item}
                    showButton={true}
                    isSelected={selectedAddress?.id === item.id}
                  />
                ))}

                <Card className="flex flex-col justify-center items-center p-5 w-64">
                  <div className="flex space-x-5">
                    <AddLocationAltIcon />
                    <div className="space-y-5">
                      <p>Add New Address</p>
                      <Button
                        onClick={handleOpenAddressModal}
                        sx={{ padding: ".75rem" }}
                        fullWidth
                        variant="contained"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Checkout Button */}
            </div>
          </section>
        </main>
      ) : (
        <div className="flex h-[90vh] justify-center items-center">
          <div className="text-center space-y-5">
            <RemoveShoppingCartIcon sx={{ width: "10rem", height: "10rem" }} />
            <p className="font-bold text-3xl">Your Cart Is Empty</p>
          </div>
        </div>
      )}

      {/* Add Address Modal */}
      <Modal open={openAddressModal} onClose={handleCloseAddressModal}>
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleAddressSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    name="streetAddress"
                    as={TextField}
                    label="Street Address"
                    fullWidth
                    variant="outlined"
                  />
                  <ErrorMessage name="streetAddress">
                    {(msg) => <span className="text-red-600">{msg}</span>}
                  </ErrorMessage>
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="state"
                    as={TextField}
                    label="State"
                    fullWidth
                    variant="outlined"
                  />
                  <ErrorMessage name="state">
                    {(msg) => <span className="text-red-600">{msg}</span>}
                  </ErrorMessage>
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="pincode"
                    as={TextField}
                    label="Pincode"
                    fullWidth
                    variant="outlined"
                  />
                  <ErrorMessage name="pincode">
                    {(msg) => <span className="text-red-600">{msg}</span>}
                  </ErrorMessage>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="city"
                    as={TextField}
                    label="City"
                    fullWidth
                    variant="outlined"
                  />
                  <ErrorMessage name="city">
                    {(msg) => <span className="text-red-600">{msg}</span>}
                  </ErrorMessage>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Save Address
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>

      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Fragment>
  );
};

export default Cart;
