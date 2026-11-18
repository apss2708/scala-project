package com.example.notifications

import com.example.notifications.transport.{Envelope, Transport, TransportException}

import scala.collection.mutable.ListBuffer

/** Deterministic fake transport for tests. */
final class RecordingTransport(
    failuresBeforeSuccess: Int = 0,
    failAlways: Boolean = false
) extends Transport:

  private val delivered = ListBuffer.empty[Envelope]
  private var failedAttempts = 0

  override def send(envelope: Envelope): String =
    if failAlways || failedAttempts < failuresBeforeSuccess then
      failedAttempts += 1
      throw new TransportException("simulated provider outage")
    delivered += envelope
    s"test-provider-${delivered.size}"

  def sent: List[Envelope] = delivered.toList

  /** Number of calls made to the transport, successful or not. */
  def attempts: Int = failedAttempts + delivered.size
