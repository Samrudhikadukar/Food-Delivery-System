import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { clearCartAction } from "../../../State/Customers/Cart/cart.action";
import { useDispatch } from "react-redux";
import { green } from "@mui/material/colors";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Button } from "@mui/material";
const PaymentSuccess = () => {
  const { orderId } = useParams(); // Get the order ID from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCartAction());
    // You could also verify the payment here using the orderId
  }, [dispatch, orderId]);

  return (
    <div className="min-h-screen px-5 bg-gray-900 text-white">
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <div className="box w-full lg:w-1/4 flex flex-col items-center rounded-md p-8 bg-gray-800">
          <TaskAltIcon sx={{ fontSize: "5rem", color: green[600] }} />
          <h1 className="py-5 text-2xl font-semibold">Order Success!</h1>
          <p className="py-3 text-center text-gray-400">
            Your order #{orderId} has been placed successfully.
          </p>
          <p className="py-2 text-center text-gray-300 text-lg">
            Thank you for choosing our restaurant!
          </p>
          <Button
            variant="contained"
            color="success"
            className="my-5"
            sx={{ margin: "1rem 0rem", padding: "12px 24px" }}
            onClick={() => navigate("/")}
          >
            Go To Home
          </Button>
        </div>
      </div>
    </div>
  );
};
export default PaymentSuccess;
