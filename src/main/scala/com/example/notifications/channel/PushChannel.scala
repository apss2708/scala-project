package com.example.notifications.channel

import com.example.notifications.error.*
import com.example.notifications.model.*
import com.example.notifications.transport.{Envelope, Transport}

import java.util.regex.Pattern

/** Delivers push notifications using an opaque device token. */
final class PushChannel(transport: Transport) extends BaseNotificationChannel(transport):

  override val channel: Channel = Channel.Push

  private val tokenPattern = Pattern.compile("^[A-Za-z0-9:_-]{8,}$")

  override protected def validate(message: NotificationMessage): Unit =
    message match
      case push: PushMessage =>
        if !tokenPattern.matcher(push.recipient).matches() then
          throw InvalidRecipientException(
            Channel.Push,
            push.recipient,
            "expected a device token of at least 8 characters"
          )
        if push.title.trim.isEmpty then
          throw InvalidMessageException(Channel.Push, "title must not be empty")
        if push.body.trim.isEmpty then
          throw InvalidMessageException(Channel.Push, "body must not be empty")
      case other =>
        throw UnsupportedMessageException(Channel.Push, other.channel)

  override protected def toEnvelope(message: NotificationMessage): Envelope =
    message match
      case push: PushMessage =>
        Envelope(
          channel = Channel.Push,
          recipient = push.recipient,
          subject = Some(push.title),
          body = push.body,
          metadata = push.data + ("priority" -> push.priority.toString)
        )
      case other =>
        throw UnsupportedMessageException(Channel.Push, other.channel)
