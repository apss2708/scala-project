package com.example.notifications.error

import com.example.notifications.model.Channel

/**
 * Base type for every expected notification failure.
 *
 * `retryable` lets the service decide whether another attempt is worthwhile
 * without pattern-matching on concrete exception types.
 */
sealed abstract class NotificationException(message: String, cause: Throwable = null)
    extends RuntimeException(message, cause):

  def retryable: Boolean = false

/** The recipient is malformed for the selected channel. */
final class InvalidRecipientException(
    val channel: Channel,
    val recipient: String,
    val reason: String
) extends NotificationException(s"Invalid ${channel.label} recipient '$recipient': $reason")

/** A required channel-specific field is missing or blank. */
final class InvalidMessageException(val channel: Channel, val reason: String)
    extends NotificationException(s"Invalid ${channel.label} message: $reason")

/** The channel was given a message type it cannot deliver. */
final class UnsupportedMessageException(val expected: Channel, val actual: Channel)
    extends NotificationException(
      s"${expected.label} channel cannot deliver a ${actual.label} message"
    )

/** The provider/transport failed while delivering an otherwise valid message. */
final class DeliveryFailedException(
    val channel: Channel,
    val recipient: String,
    val reason: String,
    cause: Throwable = null
) extends NotificationException(
      s"${channel.label} delivery to '$recipient' failed: $reason",
      cause
    ):
  override def retryable: Boolean = true

/** No implementation was registered for the message's channel. */
final class NoChannelConfiguredException(val channel: Channel)
    extends NotificationException(s"No ${channel.label} channel is configured")
