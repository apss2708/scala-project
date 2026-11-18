package com.example.notifications.service

import com.example.notifications.channel.{
  EmailChannel,
  NotificationChannel,
  PushChannel,
  SmsChannel
}
import com.example.notifications.error.*
import com.example.notifications.model.{Channel, DeliveryReceipt, NotificationMessage}
import com.example.notifications.transport.Transport

import scala.util.control.NonFatal

/**
 * Routes messages to the channel that declares the matching [[Channel]].
 *
 * Failures are returned as `Left(NotificationException)` rather than thrown,
 * so callers cannot accidentally lose a failed delivery. Retryable failures are
 * attempted again according to the configured [[RetryPolicy]].
 */
final class NotificationService(
    channels: List[NotificationChannel],
    retryPolicy: RetryPolicy = RetryPolicy(),
    sleeper: Sleeper = Sleeper.system
):

  private val channelsByType: Map[Channel, NotificationChannel] =
    channels.map(channel => channel.channel -> channel).toMap

  /** Delivers one message, returning a receipt or a typed failure. */
  def send(message: NotificationMessage): Either[NotificationException, DeliveryReceipt] =
    channelsByType.get(message.channel) match
      case None =>
        Left(NoChannelConfiguredException(message.channel))
      case Some(channel) =>
        attempt(channel, message, attemptNumber = 1)

  /** Delivers each message independently; one failure does not stop the batch. */
  def sendAll(
      messages: List[NotificationMessage]
  ): List[Either[NotificationException, DeliveryReceipt]] =
    messages.map(send)

  private def attempt(
      channel: NotificationChannel,
      message: NotificationMessage,
      attemptNumber: Int
  ): Either[NotificationException, DeliveryReceipt] =
    try
      Right(channel.send(message).copy(attempt = attemptNumber))
    catch
      case error: NotificationException
          if error.retryable && attemptNumber < retryPolicy.maxAttempts =>
        sleeper.sleep(retryPolicy.delayFor(attemptNumber))
        attempt(channel, message, attemptNumber + 1)
      case error: NotificationException =>
        Left(error)
      case NonFatal(error) =>
        Left(
          DeliveryFailedException(
            channel = message.channel,
            recipient = message.recipient,
            reason =
              Option(error.getMessage).filter(_.nonEmpty).getOrElse(error.getClass.getSimpleName),
            cause = error
          )
        )

object NotificationService:

  /** Builds a service with email, SMS, and push channels over one transport. */
  def default(
      transport: Transport,
      retryPolicy: RetryPolicy = RetryPolicy()
  ): NotificationService =
    NotificationService(
      channels = List(
        EmailChannel(transport),
        SmsChannel(transport),
        PushChannel(transport)
      ),
      retryPolicy = retryPolicy
    )
