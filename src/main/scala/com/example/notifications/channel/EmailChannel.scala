package com.example.notifications.channel

import com.example.notifications.error.*
import com.example.notifications.model.*
import com.example.notifications.transport.{Envelope, Transport}

import java.util.regex.Pattern

/** Delivers email messages after validating the address and content. */
final class EmailChannel(transport: Transport) extends BaseNotificationChannel(transport):

  override val channel: Channel = Channel.Email

  private val emailPattern =
    Pattern.compile("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")

  override protected def validate(message: NotificationMessage): Unit =
    message match
      case email: EmailMessage =>
        if !emailPattern.matcher(email.recipient).matches() then
          throw InvalidRecipientException(
            Channel.Email,
            email.recipient,
            "expected a valid email address"
          )
        if email.subject.trim.isEmpty then
          throw InvalidMessageException(Channel.Email, "subject must not be empty")
        if email.body.trim.isEmpty then
          throw InvalidMessageException(Channel.Email, "body must not be empty")
      case other =>
        throw UnsupportedMessageException(Channel.Email, other.channel)

  override protected def toEnvelope(message: NotificationMessage): Envelope =
    message match
      case email: EmailMessage =>
        val metadata = Map(
          "priority" -> email.priority.toString,
          "cc" -> email.cc.mkString(","),
          "attachments" -> email.attachments.mkString(",")
        ).filter(_._2.nonEmpty)

        Envelope(
          channel = Channel.Email,
          recipient = email.recipient,
          subject = Some(email.subject),
          body = email.body,
          metadata = metadata
        )
      case other =>
        throw UnsupportedMessageException(Channel.Email, other.channel)
