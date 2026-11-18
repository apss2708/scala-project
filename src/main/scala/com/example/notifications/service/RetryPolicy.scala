package com.example.notifications.service

/** Exponential back-off configuration for retryable delivery failures. */
final case class RetryPolicy(
    maxAttempts: Int = 3,
    initialDelayMillis: Long = 200L,
    backoffMultiplier: Double = 2.0
):
  require(maxAttempts >= 1, "maxAttempts must be at least 1")
  require(initialDelayMillis >= 0L, "initialDelayMillis must be non-negative")
  require(backoffMultiplier >= 1.0, "backoffMultiplier must be at least 1.0")

  /** Delay before the next attempt. `attempt` is 1-based. */
  def delayFor(attempt: Int): Long =
    val exponent = math.max(0, attempt - 1)
    (initialDelayMillis * math.pow(backoffMultiplier, exponent)).toLong
