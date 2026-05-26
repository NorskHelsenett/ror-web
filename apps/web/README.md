# ROR Web App

This is the web application for ROR (Release Operate Report), providing a dashboard for monitoring and managing Kubernetes clusters.

## Getting Started

1. Set up environment variables:

```bash
cp apps/web/.env.example apps/web/.env.local
```

Edit the `.env.local` file with your configuration:

- `AUTH_SECRET`: Secret for signing authentication tokens
- `AUTH_ISSUER`: Your authentication issuer URL
- `AUTH_CLIENT_ID`: Client ID for authentication
- `AUTH_CLIENT_SECRET`: Client secret for authentication
- `AUTH_AUDIENCE`: Authentication audience
- `NEXT_PUBLIC_ROR_API_URL`: URL to the ROR API backend
- `NEXT_PUBLIC_MOCKING_ENABLED`: Set to 'true' to enable MSW mocking during development

### Development

Start the development server:

```bash
npm run dev
```

This will start the Next.js development server at http://localhost:11100.

### Building for Production

```bash
npm run build
```

## Project Structure

The ROR Web app follows a Next.js 15 App Router architecture:

```
apps/web/
├── __mocks__/          # Mock data and handlers for development/testing
├── public/             # Static assets
└── src/
    ├── actions/        # Next.js Server Actions
    ├── app/            # Next.js App Router routes and components
    ├── components/     # Reusable UI components
    │   ├── layout/     # Layout components like app shell, navigation
    │   └── ui/         # UI components
    ├── config/         # Configuration files
    │   ├── env.ts      # Environment variables configuration
    │   ├── next-auth.ts # Authentication configuration
    │   └── routes.ts   # Application routes
    ├── features/       # Feature-based modules
    │   └── auth/       # Authentication feature
    ├── services/       # Service integrations
    │   └── ror-api.ts  # ROR API client integration
    ├── styles/         # Global styles
    └── utils/          # Utility functions
```

### Key Directories and Files

- `__mocks__/`: Contains mock data and MSW handlers for development without a real backend
- `src/app/`: Next.js App
- `src/components/`: Reusable UI components separated by functionality
- `src/config/`: Configuration files for environment variables, authentication, and routes
- `src/features/`: Feature-based code organization for more complex features
- `src/services/`: External service integrations
- `src/utils/`: Utility functions for common operations across the app

## Authentication

Authentication uses [NextAuth v4](https://next-auth.js.org/) with [Dex](https://dexidp.io/) as the OIDC identity provider.  
For a full explanation of the login redirect, token verification, session management, and token refresh flow see
[docs/how-tos/authentication.md](../../docs/how-tos/authentication.md).

## Health Checks

The application provides health check endpoints for Kubernetes and other monitoring systems:

- `/api/health`: Liveness probe endpoint for Kubernetes that returns basic status
- `/api/healthz`: Readiness probe endpoint with more detailed application state

These endpoints are accessible without authentication and are automatically bypassed by the middleware.
