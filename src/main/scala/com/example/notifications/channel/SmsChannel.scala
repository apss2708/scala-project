package com.example.notifications.channel

import com.example.notifications.error.*
import com.example.notifications.model.*
import com.example.notifications.transport.{Envelope, Transport}

import java.util.regex.Pattern

/** Delivers SMS messages to E.164 phone numbers. */
final class SmsChannel(transport: Transport) extends BaseNotificationChannel(transport):

  override val channel: Channel = Channel.Sms

  private val phonePattern = Pattern.compile("^\\+[1-9]\\d{6,14}$")

  override protected def validate(message: NotificationMessage): Unit =
    message match
      case sms: SmsMessage =>
        if !phonePattern.matcher(sms.recipient).matches() then
          throw InvalidRecipientException(
            Channel.Sms,
            sms.recipient,
            "expected E.164 format, for example +14155550100"
          )
        if sms.body.trim.isEmpty then
          throw InvalidMessageException(Channel.Sms, "body must not be empty")
        if sms.senderId.trim.isEmpty then
          throw InvalidMessageException(Channel.Sms, "senderId must not be empty")
      case other =>
        throw UnsupportedMessageException(Channel.Sms, other.channel)

  override protected def toEnvelope(message: NotificationMessage): Envelope =
    message match
      case sms: SmsMessage =>
        Envelope(
          channel = Channel.Sms,
          recipient = sms.recipient,
          subject = None,
          body = sms.body,
          metadata = Map(
            "senderId" -> sms.senderId,
            "priority" -> sms.priority.toString
          )
        )
      case other =>
        throw UnsupportedMessageException(Channel.Sms, other.channel)
