package com.example.notifications.channel

import com.example.notifications.error.*
import com.example.notifications.model.*
import com.example.notifications.transport.{Envelope, Transport}

import java.time.Instant
import scala.util.control.NonFatal

/**
 * Template for concrete channels: check the channel type, validate the
 * payload, convert it to an envelope, then translate transport failures into
 * the domain exception hierarchy.
 */
abstract class BaseNotificationChannel(protected val transport: Transport)
    extends NotificationChannel:

  protected def validate(message: NotificationMessage): Unit
  protected def toEnvelope(message: NotificationMessage): Envelope

  final override def send(message: NotificationMessage): DeliveryReceipt =
    if !supports(message) then
      throw UnsupportedMessageException(channel, message.channel)

    validate(message)

    try
      val providerId = transport.send(toEnvelope(message))
      DeliveryReceipt(
        messageId = message.id,
        channel = channel,
        recipient = message.recipient,
        providerMessageId = providerId,
        deliveredAt = Instant.now()
      )
    catch
      case error: NotificationException => throw error
      case NonFatal(error) =>
        val reason = Option(error.getMessage).filter(_.nonEmpty).getOrElse(error.getClass.getSimpleName)
        throw DeliveryFailedException(channel, message.recipient, reason, error)
