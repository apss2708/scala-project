package com.example.notifications.model

import java.time.Instant

/** Proof that a channel handed a message to its provider. */
final case class DeliveryReceipt(
    messageId: String,
    channel: Channel,
    recipient: String,
    providerMessageId: String,
    deliveredAt: Instant,
    attempt: Int = 1
)
