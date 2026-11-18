package com.example.notifications.transport

import java.util.UUID

/** Prints deliveries to stdout and returns a fake provider id. */
final class ConsoleTransport(provider: String = "console") extends Transport:

  override def send(envelope: Envelope): String =
    val providerId = s"$provider-${UUID.randomUUID()}"
    val subject = envelope.subject.fold("")(value => s" subject=\"$value\"")
    println(
      s"   [transport:$provider] ${envelope.channel.label} to=${envelope.recipient}$subject :: ${envelope.body}"
    )
    providerId
