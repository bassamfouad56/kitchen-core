import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of transactions in production (adjust as needed)

  // Session Replay
  replaysSessionSampleRate: 0.1, // 10% of sessions
  replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors

  // Configure integrations
  // Note: BrowserTracing and Replay are automatically configured in @sentry/nextjs v10+
  integrations: [],

  // Environment
  environment: process.env.NODE_ENV,

  // Ignore certain errors
  ignoreErrors: [
    // Browser extensions
    'top.GLOBALS',
    'Can\'t find variable: ZiteReader',
    'jigsaw is not defined',
    'ComboSearch is not defined',
    // Network errors
    'NetworkError',
    'Failed to fetch',
    // Cancelled requests
    'AbortError',
  ],

  // Before sending events
  beforeSend(event, hint) {
    // Filter out local development
    if (window.location.hostname === 'localhost') {
      return null
    }

    // Add custom context
    if (event.user) {
      // Remove sensitive data
      delete event.user.email
      delete event.user.ip_address
    }

    return event
  },
})
