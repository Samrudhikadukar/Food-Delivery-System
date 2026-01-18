package com.zosh.service;

import com.zosh.model.Order;
import com.razorpay.RazorpayException;
import com.zosh.model.Payment;
import com.zosh.model.PaymentResponse;
import com.zosh.request.PaymentConfirmationRequest;

import java.util.List;

public interface PaymentService {
	public PaymentResponse createOrder(Order order) throws RazorpayException;


}