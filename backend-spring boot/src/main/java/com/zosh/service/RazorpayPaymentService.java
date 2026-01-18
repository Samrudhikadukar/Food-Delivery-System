package com.zosh.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.zosh.model.Payment;
import com.zosh.model.PaymentResponse;
import com.zosh.repository.PaymentRepository;
import com.zosh.repository.UserRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RazorpayPaymentService implements PaymentService {

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UserRepository userRepository;
    @Override
    public PaymentResponse createOrder(com.zosh.model.Order order) throws RazorpayException {
        try {
            RazorpayClient razorpay = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", order.getTotalAmount() * 100); // amount in paise
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "order_" + order.getId());
            orderRequest.put("payment_capture", 1);

            // Correct way to create order
            Order razorpayOrder = razorpay.orders.create(orderRequest);

            PaymentResponse response = new PaymentResponse();
            response.setPayment_url("https://checkout.razorpay.com/v1/checkout.js?version=1&order_id=" + razorpayOrder.get("id"));
            response.setRazorpayOrderId(razorpayOrder.get("id"));
            response.setRazorpayKey(razorpayKeyId);
            response.setAmount(order.getTotalAmount());
            response.setOrderId(order.getId()); // Add this line
            System.out.println(razorpayKeySecret);
            return response;
        } catch (RazorpayException e) {
            throw new RazorpayException(e.getMessage());
        }
    }


}