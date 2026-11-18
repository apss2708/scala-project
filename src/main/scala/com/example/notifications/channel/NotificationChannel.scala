package com.example.notifications.channel

import com.example.notifications.model.{Channel, DeliveryReceipt, NotificationMessage}

/**
 * Abstraction implemented by every delivery mechanism. Adding a new channel
 * means implementing this trait and registering the instance with the service.
 */
trait NotificationChannel:
  def channel: Channel

  /** True when this channel can handle the message's channel type. */
  def supports(message: NotificationMessage): Boolean =
    message.channel == channel

  /**
   * Delivers a message.
   *
   * @throws com.example.notifications.error.NotificationException
   *   when validation fails or the provider cannot deliver the message
   */
  def send(message: NotificationMessage): DeliveryReceipt
