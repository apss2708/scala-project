package com.example.notifications.model

import java.time.Instant
import java.util.UUID

/**
 * Immutable message model. Each concrete case class carries only the fields
 * that make sense for its channel.
 */
sealed trait NotificationMessage:
  def id: String
  def recipient: String
  def body: String
  def priority: Priority
  def createdAt: Instant
  def channel: Channel

final case class EmailMessage(
    recipient: String,
    subject: String,
    body: String,
    cc: List[String] = Nil,
    attachments: List[String] = Nil,
    priority: Priority = Priority.Normal,
    id: String = UUID.randomUUID().toString,
    createdAt: Instant = Instant.now()
) extends NotificationMessage:
  val channel: Channel = Channel.Email

final case class SmsMessage(
    recipient: String,
    body: String,
    senderId: String = "NOTIFY",
    priority: Priority = Priority.Normal,
    id: String = UUID.randomUUID().toString,
    createdAt: Instant = Instant.now()
) extends NotificationMessage:
  val channel: Channel = Channel.Sms

final case class PushMessage(
    recipient: String,
    title: String,
    body: String,
    data: Map[String, String] = Map.empty,
    priority: Priority = Priority.Normal,
    id: String = UUID.randomUUID().toString,
    createdAt: Instant = Instant.now()
) extends NotificationMessage:
  val channel: Channel = Channel.Push
