package com.example.notifications.transport

/**
 * Low-level delivery boundary. Implementations talk to a real provider
 * (SMTP, Twilio, FCM, ...) or to an in-memory fake in tests.
 */
trait Transport:
  /** Delivers the envelope and returns the provider-side message id. */
  def send(envelope: Envelope): String

/** Infrastructure failure raised by a transport implementation. */
final class TransportException(message: String, cause: Throwable = null)
    extends RuntimeException(message, cause)
