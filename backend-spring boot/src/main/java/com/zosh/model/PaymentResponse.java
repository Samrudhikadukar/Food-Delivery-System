package com.zosh.model;

import lombok.Data;

@Data
public class PaymentResponse {
	private String payment_url;
	private String razorpayOrderId;
	private String razorpayKey;
	private Long amount;
	private Long OrderId;
}