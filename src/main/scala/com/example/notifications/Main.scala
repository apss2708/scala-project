package com.example.notifications

import com.example.notifications.model.*
import com.example.notifications.service.{NotificationService, RetryPolicy}
import com.example.notifications.transport.ConsoleTransport

@main def notificationDemo(): Unit =
  println("=== Scala Notification System ===")
  println("Trait-based channels | case-class messages | typed delivery failures\n")

  val service = NotificationService.default(
    transport = ConsoleTransport(),
    retryPolicy = RetryPolicy(maxAttempts = 2, initialDelayMillis = 50L)
  )

  val messages: List[NotificationMessage] = List(
    EmailMessage(
      recipient = "ada@example.com",
      subject = "Welcome aboard",
      body = "Thanks for joining the notification demo.",
      cc = List("grace@example.com")
    ),
    SmsMessage(
      recipient = "+14155550100",
      body = "Your verification code is 424242."
    ),
    PushMessage(
      recipient = "device-token-abc123",
      title = "New message",
      body = "You have a new message waiting.",
      data = Map("chatId" -> "42")
    ),
    EmailMessage(
      recipient = "not-an-email",
      subject = "Invalid recipient",
      body = "Validation should reject this message."
    )
  )

  val results = service.sendAll(messages)

  messages.zip(results).foreach { case (message, result) =>
    println(s"\n-> ${message.channel.label.toUpperCase} to ${message.recipient}")
    result match
      case Right(receipt) =>
        println(
          s"   DELIVERED id=${receipt.providerMessageId} attempt=${receipt.attempt}"
        )
      case Left(error) =>
        println(s"   FAILED ${error.getClass.getSimpleName}: ${error.getMessage}")
  }

  println("\nDemo complete.")
