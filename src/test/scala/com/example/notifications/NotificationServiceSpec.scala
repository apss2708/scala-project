package com.example.notifications

import com.example.notifications.channel.{EmailChannel, NotificationChannel, PushChannel, SmsChannel}
import com.example.notifications.error.*
import com.example.notifications.model.*
import com.example.notifications.service.{NotificationService, RetryPolicy, Sleeper}
import com.example.notifications.transport.TransportException

import munit.FunSuite

class NotificationServiceSpec extends FunSuite:

  private def service(
      transport: RecordingTransport,
      maxAttempts: Int = 3
  ): NotificationService =
    NotificationService(
      channels = List(EmailChannel(transport), SmsChannel(transport), PushChannel(transport)),
      retryPolicy = RetryPolicy(maxAttempts = maxAttempts, initialDelayMillis = 1L),
      sleeper = Sleeper.noop
    )

  test("routes messages to the matching channel") {
    val transport = RecordingTransport()

    val result = service(transport).send(
      PushMessage(recipient = "device-token-abc123", title = "Ping", body = "Hello")
    )

    assertEquals(result.toOption.map(_.channel), Some(Channel.Push))
    assertEquals(transport.sent.map(_.channel), List(Channel.Push))
  }

  test("retries retryable failures and reports the successful attempt") {
    val transport = RecordingTransport(failuresBeforeSuccess = 2)

    val result = service(transport, maxAttempts = 3).send(
      EmailMessage(recipient = "ada@example.com", subject = "Hello", body = "Retry me")
    )

    assertEquals(result.toOption.map(_.attempt), Some(3))
    assertEquals(transport.attempts, 3)
    assertEquals(transport.sent.size, 1)
  }

  test("returns the failure after retries are exhausted") {
    val transport = RecordingTransport(failAlways = true)

    val result = service(transport, maxAttempts = 2).send(
      SmsMessage(recipient = "+14155550100", body = "Hello")
    )

    result match
      case Left(error: DeliveryFailedException) =>
        assertEquals(error.channel, Channel.Sms)
        assert(error.getCause.isInstanceOf[TransportException])
      case other =>
        fail(s"expected DeliveryFailedException, got $other")

    assertEquals(transport.attempts, 2)
  }

  test("does not retry validation failures") {
    val transport = RecordingTransport()

    val result = service(transport).send(
      EmailMessage(recipient = "bad", subject = "Hello", body = "World")
    )

    result match
      case Left(error: InvalidRecipientException) =>
        assertEquals(error.recipient, "bad")
      case other =>
        fail(s"expected InvalidRecipientException, got $other")

    assertEquals(transport.attempts, 0)
  }

  test("reports a missing channel as a typed failure") {
    val result = NotificationService(channels = Nil).send(
      PushMessage(recipient = "device-token-abc123", title = "Ping", body = "Hello")
    )

    result match
      case Left(error: NoChannelConfiguredException) =>
        assertEquals(error.channel, Channel.Push)
      case other =>
        fail(s"expected NoChannelConfiguredException, got $other")
  }

  test("sendAll keeps going after a failure") {
    val transport = RecordingTransport()

    val results = service(transport).sendAll(
      List(
        EmailMessage(recipient = "ada@example.com", subject = "Hi", body = "One"),
        SmsMessage(recipient = "bad", body = "Two"),
        PushMessage(recipient = "device-token-abc123", title = "Hi", body = "Three")
      )
    )

    assertEquals(results.size, 3)
    assert(results.head.isRight)
    assert(results(1).isLeft)
    assert(results(2).isRight)
  }

  test("RetryPolicy computes exponential delays") {
    val policy =
      RetryPolicy(maxAttempts = 4, initialDelayMillis = 100L, backoffMultiplier = 2.0)

    assertEquals(policy.delayFor(1), 100L)
    assertEquals(policy.delayFor(2), 200L)
    assertEquals(policy.delayFor(3), 400L)
  }

  test("RetryPolicy rejects invalid settings") {
    intercept[IllegalArgumentException] {
      RetryPolicy(maxAttempts = 0)
    }
  }
