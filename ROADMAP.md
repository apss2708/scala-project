# Roadmap — everything that can be done next

This is a menu of realistic extensions for the notification system, roughly in
priority order. Checked items are already implemented

## Implemented

- [x] `NotificationChannel` trait with email, SMS, and push implementations
- [x] Sealed case-class message model (`EmailMessage`, `SmsMessage`, `PushMessage`)
- [x] Channel-specific recipient validation (email, E.164, device token)
- [x] `DeliveryReceipt` with provider id, timestamp, and attempt number
- [x] Custom exception hierarchy with a `retryable` flag
- [x] Service routing by channel
- [x] Exponential back-off with configurable attempts and delays
- [x] `Either`-based error handling (`send` / `sendAll`)
- [x] Pluggable `Transport` boundary with a console implementation
- [x] Deterministic test transport and 17 MUnit tests
- [x] Demo application and project documentation
- [x] Interactive terminal showcase on GitHub Pages (`docs/`)

## 1. Core product features

- [ ] Message templates with placeholders (`{{firstName}}`, `{{code}}`)
- [ ] Template validation, preview, and rendering per channel
- [ ] Localization / i18n and per-recipient language preferences
- [ ] Attachments and media for email and push
- [ ] Scheduled and delayed sends (send-at timestamp)
- [ ] Bulk/batch sending with per-recipient personalization
- [ ] Priority queues and channel-specific throttling
- [ ] Recipient preferences and opt-in / opt-out management
- [ ] Unsubscribe links and compliance footers for email
- [ ] Deduplication via idempotency keys
- [ ] Message expiry / TTL (do not send stale notifications)
- [ ] Quiet hours and per-user delivery windows
- [ ] Multi-channel fallback (email → SMS → push)
- [ ] Campaigns, user journeys, and simple workflow orchestration

## 2. Real provider integrations

- [ ] SMTP / Jakarta Mail transport
- [ ] Amazon SES, SendGrid, Mailgun, Postmark, Resend transports
- [ ] Twilio, Vonage, MessageBird, AWS SNS transports
- [ ] Firebase Cloud Messaging (FCM) transport
- [ ] Apple Push Notification Service (APNs) transport
- [ ] OneSignal / Expo push transport
- [ ] Generic webhook transport (HMAC-signed payloads)
- [ ] Provider-specific response mapping (provider ids, throttling, error codes)
- [ ] Sandbox/test modes for each provider
- [ ] Provider failover and routing rules (cost, region, deliverability)

## 3. Reliability and delivery semantics

- [ ] Jitter on retry delays to avoid thundering herds
- [ ] Per-channel/per-provider rate limiting (token bucket)
- [ ] Circuit breaker around failing providers
- [ ] Timeouts and bounded concurrency for provider calls
- [ ] Bulkheads so one slow channel cannot starve the others
- [ ] Dead-letter queue for permanently failed messages
- [ ] Delivery status state machine (`queued → sent → delivered → bounced`)
- [ ] Delivery receipts via provider webhooks/callbacks
- [ ] Webhook signature verification and replay protection
- [ ] Idempotent sends and exactly-once effects where possible
- [ ] Ordering guarantees per recipient
- [ ] At-least-once queue consumption with deduplication

## 4. Persistence and messaging infrastructure

- [ ] Message, receipt, and attempt repositories
- [ ] PostgreSQL schema (messages, attempts, receipts, preferences, templates)
- [ ] Database migrations with Flyway or Liquibase
- [ ] Doobie, Slick, or Skunk data access
- [ ] Transactional outbox for reliable publish-after-commit
- [ ] Queue integration: Kafka, RabbitMQ, AWS SQS, Redis Streams, Pekko
- [ ] Scheduled job store for delayed messages
- [ ] Object storage for attachments (S3/GCS)
- [ ] Retention policies and archival

## 5. API and interfaces

- [ ] REST API with http4s, Pekko HTTP, or Play
- [ ] OpenAPI/Swagger specification and generated clients
- [ ] GraphQL API
- [ ] gRPC service
- [ ] CLI for send/preview/status operations
- [ ] Admin dashboard (message search, attempts, resend, templates)
- [ ] Self-service preference center for recipients
- [ ] Bulk import via CSV/JSON
- [ ] Webhook endpoints for provider callbacks
- [ ] Health, readiness, and version endpoints

## 6. Observability

- [ ] Structured logging with SLF4J + Logback/Log4j2
- [ ] Correlation ids propagated through channels and providers
- [ ] Metrics with Micrometer or Prometheus (sent, failed, latency, retries)
- [ ] Per-provider dashboards and SLO alerts
- [ ] Distributed tracing with OpenTelemetry
- [ ] Audit log of who sent what to whom
- [ ] Dead-letter and failure dashboards
- [ ] Log redaction for message bodies and recipient PII

## 7. Security and compliance

- [ ] Secrets from environment variables / Vault / AWS Secrets Manager
- [ ] TLS enforcement for provider calls
- [ ] PII encryption at rest and in logs
- [ ] Data retention and deletion (GDPR/DSGVO)
- [ ] Consent tracking and lawful-basis records
- [ ] Authentication and authorization for the API/admin UI
- [ ] Per-tenant isolation and quotas
- [ ] Rate limiting and abuse prevention on public endpoints
- [ ] Audit trail for template and preference changes
- [ ] Dependency and container vulnerability scanning

## 8. Testing and quality

- [ ] Property-based tests for validation and retry policy (ScalaCheck)
- [ ] Integration tests against WireMock provider stubs
- [ ] Testcontainers for PostgreSQL/Kafka/RabbitMQ
- [ ] Contract tests for provider adapters
- [ ] Load tests with Gatling (throughput and p99 latency)
- [ ] Chaos tests for provider outages and timeouts
- [ ] Coverage reporting with sbt-scoverage
- [ ] Mutation testing with Stryker4s
- [ ] Golden tests for templates and rendering
- [ ] Scalafmt for formatting
- [ ] Scalafix + WartRemover for linting
- [ ] `-Werror`, `-Wunused`, and stricter compiler flags in CI

## 9. Build, release, and documentation

- [ ] GitHub Actions CI (compile, test, format check, coverage)
- [ ] Dependency caching and matrix builds (JDK 21/25/27)
- [ ] Dockerfile and Docker Compose (app + Postgres + queue)
- [ ] GraalVM native-image build
- [ ] sbt-ci-release and semantic versioning
- [ ] Publish as a library to Maven Central
- [ ] Cross-build for Scala 2.13 and Scala 3
- [ ] mdoc/website documentation with examples
- [ ] Architecture decision records (ADRs)
- [ ] Benchmark suite (JMH) for serialization and routing
- [ ] Example projects for each provider
- [ ] CONTRIBUTING.md, issue templates, and a license

## 10. Advanced / product experiments

- [ ] A/B testing of subject lines and templates
- [ ] Send-time optimization per recipient
- [ ] Deliverability analytics (open, click, bounce, complaint)
- [ ] Cost tracking and provider cost optimization
- [ ] Multi-tenant SaaS packaging
- [ ] End-user notification inbox (in-app channel)
- [ ] Real-time WebSocket/SSE notifications
- [ ] ML-based spam/abuse classification
- [ ] Natural-language template authoring
- [ ] Analytics pipeline (Kafka → warehouse → BI)

## Suggested next five issues

1. Add an SMTP `Transport` with integration tests against a local mail server.
2. Persist messages/attempts in PostgreSQL with a transactional outbox.
3. Add per-provider rate limiting and a circuit breaker.
4. Expose a small http4s REST API with OpenAPI docs.
5. Add GitHub Actions CI with formatting, tests, and coverage.
