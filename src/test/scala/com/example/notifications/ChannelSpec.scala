package com.example.notifications

import com.example.notifications.channel.*
import com.example.notifications.error.*
import com.example.notifications.model.*
import com.example.notifications.transport.TransportException

import munit.FunSuite

class ChannelSpec extends FunSuite:

  test("email channel delivers a valid message") {
    val transport = RecordingTransport()
    val message = EmailMessage(
      recipient = "ada@example.com",
      subject = "Hello",
      body = "World",
      cc = List("grace@example.com")
    )

    val receipt = EmailChannel(transport).send(message)

    assertEquals(receipt.channel, Channel.Email)
    assertEquals(receipt.recipient, "ada@example.com")
    assertEquals(receipt.messageId, message.id)
    assertEquals(receipt.attempt, 1)
    assertEquals(transport.sent.size, 1)
    assertEquals(transport.sent.head.subject, Some("Hello"))
    assertEquals(transport.sent.head.metadata.get("cc"), Some("grace@example.com"))
  }

  test("email channel rejects a malformed address") {
    val error = intercept[InvalidRecipientException] {
      EmailChannel(RecordingTransport())
        .send(EmailMessage(recipient = "not-an-email", subject = "Hello", body = "World"))
    }

    assertEquals(error.channel, Channel.Email)
    assertEquals(error.recipient, "not-an-email")
    assert(!error.retryable)
  }

  test("email channel rejects an empty subject") {
    val error = intercept[InvalidMessageException] {
      EmailChannel(RecordingTransport())
        .send(EmailMessage(recipient = "ada@example.com", subject = "   ", body = "World"))
    }

    assertEquals(error.channel, Channel.Email)
  }

  test("sms channel accepts E.164 numbers") {
    val transport = RecordingTransport()

    val receipt = SmsChannel(transport)
      .send(SmsMessage(recipient = "+14155550100", body = "Hello"))

    assertEquals(receipt.channel, Channel.Sms)
    assertEquals(transport.sent.head.subject, None)
    assertEquals(transport.sent.head.metadata.get("senderId"), Some("NOTIFY"))
  }

  test("sms channel rejects a non-E.164 number") {
    val error = intercept[InvalidRecipientException] {
      SmsChannel(RecordingTransport())
        .send(SmsMessage(recipient = "415-555-0100", body = "Hello"))
    }

    assertEquals(error.channel, Channel.Sms)
  }

  test("push channel forwards custom data") {
    val transport = RecordingTransport()

    val receipt = PushChannel(transport).send(
      PushMessage(
        recipient = "device-token-abc123",
        title = "Ping",
        body = "Hello",
        data = Map("chatId" -> "42")
      )
    )

    assertEquals(receipt.channel, Channel.Push)
    assertEquals(transport.sent.head.subject, Some("Ping"))
    assertEquals(transport.sent.head.metadata.get("chatId"), Some("42"))
  }

  test("push channel rejects a short device token") {
    val error = intercept[InvalidRecipientException] {
      PushChannel(RecordingTransport())
        .send(PushMessage(recipient = "short", title = "Ping", body = "Hello"))
    }

    assertEquals(error.channel, Channel.Push)
  }

  test("channels reject messages belonging to another channel") {
    val error = intercept[UnsupportedMessageException] {
      EmailChannel(RecordingTransport())
        .send(SmsMessage(recipient = "+14155550100", body = "Wrong channel"))
    }

    assertEquals(error.expected, Channel.Email)
    assertEquals(error.actual, Channel.Sms)
  }

  test("transport failures become retryable DeliveryFailedException") {
    val error = intercept[DeliveryFailedException] {
      SmsChannel(RecordingTransport(failAlways = true))
        .send(SmsMessage(recipient = "+14155550100", body = "Hello"))
    }

    assertEquals(error.channel, Channel.Sms)
    assert(error.retryable)
    assert(error.getCause.isInstanceOf[TransportException])
  }
