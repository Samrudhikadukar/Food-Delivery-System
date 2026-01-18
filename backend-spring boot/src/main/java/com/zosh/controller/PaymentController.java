//package com.zosh.controller;
//
//import com.zosh.model.Payment;
//import com.zosh.service.PaymentService;
//import com.zosh.service.RazorpayPaymentService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestHeader;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/payments")
//public class PaymentController {
//
//	@Autowired
//	private RazorpayPaymentService paymentService;
//
//	@GetMapping("/user")
//	public ResponseEntity<List<Payment>> getUsersPayments(
//			@RequestHeader("Authorization") String jwt) {
//		List<Payment> payments = paymentService.getPaymentsByUser(jwt);
//		return ResponseEntity.ok(payments);
//	}
//}