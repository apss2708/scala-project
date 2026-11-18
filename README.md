# SCALA Project — Notification System

A compact **Scala 3** notification service built to demonstrate clean
object-oriented/functional design:

- a `NotificationChannel` **trait** with `EmailChannel`, `SmsChannel`, and
  `PushChannel` implementations,
- immutable **case classes** for messages (`EmailMessage`, `SmsMessage`,
  `PushMessage`),
- a **custom exception hierarchy** for invalid input and failed deliveries,
- a service layer with routing, retry/back-off, and typed results,
- a pluggable transport boundary and a full MUnit test suite.

> GitHub does not allow spaces in repository names, so the requested name
> "SCALA Project" is published as **`scala-project`**.

## Features

| Feature | Where |
| --- | --- |
| Channel abstraction | `channel/NotificationChannel.scala` |
| Shared channel template | `channel/BaseNotificationChannel.scala` |
| Email / SMS / push channels | `channel/EmailChannel.scala`, `SmsChannel.scala`, `PushChannel.scala` |
| Case-class message model | `model/NotificationMessage.scala` |
| Delivery receipts | `model/DeliveryReceipt.scala` |
| Custom exceptions | `error/NotificationException.scala` |
| Routing + retries | `service/NotificationService.scala` |
| Retry configuration | `service/RetryPolicy.scala` |
| Transport abstraction | `transport/Transport.scala` |
| Console demo | `Main.scala` |
| Tests (17) | `src/test/scala` |

## Architecture

```text
                    NotificationService
                    (routing + retries)
                            |
          +-----------------+-----------------+
          |                 |                 |
    EmailChannel       SmsChannel        PushChannel     <- NotificationChannel trait
          |                 |                 |
          +-----------------+-----------------+
                            |
                         Transport                       <- pluggable provider boundary
                            |
                    ConsoleTransport
                    (swap for SMTP / Twilio / FCM ...)
```

The channels validate their own payloads before handing an `Envelope` to the
transport. Transport failures are translated into `DeliveryFailedException`.
The service never lets those exceptions escape: `send` returns
`Either[NotificationException, DeliveryReceipt]`.

## Message model

`NotificationMessage` is a sealed trait; every message is an immutable case
class with a generated id and timestamp:

```scala
EmailMessage(
  recipient = "ada@example.com",
  subject = "Welcome aboard",
  body = "Thanks for joining!",
  cc = List("grace@example.com")
)

SmsMessage(
  recipient = "+14155550100",
  body = "Your verification code is 424242."
)

PushMessage(
  recipient = "device-token-abc123",
  title = "New message",
  body = "You have a new message waiting.",
  data = Map("chatId" -> "42")
)
```

## Error handling

All expected failures live under `NotificationException`:

| Exception | Meaning | Retried? |
| --- | --- | --- |
| `InvalidRecipientException` | Bad email address, phone number, or device token | No |
| `InvalidMessageException` | Missing required field (subject, body, sender id, ...) | No |
| `UnsupportedMessageException` | Channel received the wrong case-class message | No |
| `DeliveryFailedException` | Provider/transport failed | Yes |
| `NoChannelConfiguredException` | No channel registered for that message type | No |

`NotificationService` retries only `retryable` failures, using exponential
back-off. Exhausted retries are returned as `Left(DeliveryFailedException)`.

## Run the demo

With **Scala CLI** (installed in this environment):

```bash
scala-cli test .
scala-cli run .
```

With **sbt**:

```bash
sbt test
sbt run
```

Sample output:

```text
=== Scala Notification System ===
Trait-based channels | case-class messages | typed delivery failures

   [transport:console] email to=ada@example.com subject="Welcome aboard" :: Thanks for joining the notification demo.
   [transport:console] sms to=+14155550100 :: Your verification code is 424242.
   [transport:console] push to=device-token-abc123 subject="New message" :: You have a new message waiting.

-> EMAIL to ada@example.com
   DELIVERED id=console-... attempt=1

-> SMS to +14155550100
   DELIVERED id=console-... attempt=1

-> PUSH to device-token-abc123
   DELIVERED id=console-... attempt=1

-> EMAIL to not-an-email
   FAILED InvalidRecipientException: Invalid email recipient 'not-an-email': expected a valid email address

Demo complete.
```

## Project structure

```text
scala-project/
├── build.sbt
├── project.scala                 # Scala CLI configuration
├── project/build.properties
├── src/main/scala/com/example/notifications/
│   ├── Main.scala
│   ├── channel/
│   │   ├── NotificationChannel.scala
│   │   ├── BaseNotificationChannel.scala
│   │   ├── EmailChannel.scala
│   │   ├── SmsChannel.scala
│   │   └── PushChannel.scala
│   ├── error/NotificationException.scala
│   ├── model/
│   │   ├── Channel.scala
│   │   ├── Priority.scala
│   │   ├── NotificationMessage.scala
│   │   └── DeliveryReceipt.scala
│   ├── service/
│   │   ├── NotificationService.scala
│   │   ├── RetryPolicy.scala
│   │   └── Sleeper.scala
│   └── transport/
│       ├── Transport.scala
│       ├── Envelope.scala
│       └── ConsoleTransport.scala
└── src/test/scala/com/example/notifications/
    ├── RecordingTransport.scala
    ├── ChannelSpec.scala
    └── NotificationServiceSpec.scala
```

## Design notes

- **Trait-based polymorphism** — the service depends on `NotificationChannel`,
  not concrete classes. Add a channel by implementing the trait and registering
  it.
- **Case classes** give structural equality, copying, and safe defaults for
  message ids and timestamps.
- **Two-layer error translation** — infrastructure throws `TransportException`;
  channels translate it to a domain-level `DeliveryFailedException`; the service
  converts exceptions to `Either`.
- **Retries belong to the service**, not the channels, so validation failures
  are never retried and every channel gets the same policy.
- **Transport is a seam** — tests use a recording fake; production code can plug
  in SMTP, Twilio, FCM, etc. without touching channel logic.
- **No external runtime dependencies** — only MUnit is used, and only for tests.

## Roadmap

A complete list of possible extensions (persistence, real providers, queues,
observability, security, CI, and more) is in [ROADMAP.md](ROADMAP.md).
