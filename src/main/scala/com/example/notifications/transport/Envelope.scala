package com.example.notifications.transport

import com.example.notifications.model.Channel

/** Provider-agnostic payload handed to a transport. */
final case class Envelope(
    channel: Channel,
    recipient: String,
    subject: Option[String],
    body: String,
    metadata: Map[String, String] = Map.empty
)
