package com.example.notifications.model

/** The delivery mechanisms supported by the service. */
enum Channel:
  case Email, Sms, Push

  def label: String = this match
    case Email => "email"
    case Sms   => "sms"
    case Push  => "push"
