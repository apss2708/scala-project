package com.example.notifications.service

/** Small seam that keeps retry tests fast and deterministic. */
trait Sleeper:
  def sleep(millis: Long): Unit

object Sleeper:
  val system: Sleeper = millis => Thread.sleep(millis)
  val noop: Sleeper = _ => ()
