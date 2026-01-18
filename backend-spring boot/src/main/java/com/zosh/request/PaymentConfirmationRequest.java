package com.zosh.request;

import lombok.Data;

@Data
public class PaymentConfirmationRequest {
    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;
}