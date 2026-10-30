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

## Appearance

Open the theme menu in the sidebar to choose Light, Dark, or System. Selecting
Dark reveals Gray (the original dark palette) and Black (near-black app-wide
surfaces). The choice is saved in the existing theme cookie and restored on
reload. System follows the operating system and uses Gray when dark.

The Black palette overrides shared background, layer, field, and border tokens
in `src/styles/globals.scss`, preserving semantic status colors. Its base color
is defined by `--color-dashboard` in `src/styles/tailwind.css`.

Standard action buttons use pale tinted backgrounds with dark text in light mode,
and dark tinted backgrounds with light text in dark mode, with a matching 1px
outline in both. Blue, destructive red, green, neutral, and
external-tool variants retain their semantic colors. Ghost, link, and icon-only
buttons remain minimal. These styles are shared through
`src/components/shadcn/button.tsx`.

The sidebar highlights the current page with blue text/icons and a tinted
background in both expanded and icon-only modes. Nested pages highlight their
matching navigation item and parent section, including links in collapsed popovers.

### Dashboard releases

The release header shows the latest release's tags, title, and description.
When collapsed, the dashboard shows the number of unread releases among the four
most recent entries, or "Recent releases" once all four have been viewed.
Clicking a release in the header or either release table marks it as viewed,
saved in local storage. Expanding the table does not mark releases as viewed.
The dashboard's collapse preference never hides the full release-notes table.

### Dashboard customization

Choose **Customize dashboard** in the top bar to show or hide Releases, Greeting, Search,
Overview, Favorite clusters, and Favorite VMs. Use the handles on the right to
drag sections into a new order. The arrow buttons, or Up/Down keys on a focused
handle, also move sections; Escape cancels an active drag.

The checklist restores hidden sections, and **Reset layout** restores the default
section order and visibility. Changes are saved automatically in local storage
under `dashboard:layout`; **Done** closes customization. Hiding a favorites section
never removes starred resources. Overview metrics retain their separate add/remove
preferences, and resetting the section layout does not reset those metrics.
Hiding Releases only affects the dashboard, not the Help release-notes page.

The dashboard shows a loading spinner until its initial data, saved preferences,
and favorite resources are ready, avoiding a flash of the default layout on reload.

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

## Health Checks

The application provides health check endpoints for Kubernetes and other monitoring systems:

- `/api/health`: Liveness probe endpoint for Kubernetes that returns basic status
- `/api/healthz`: Readiness probe endpoint with more detailed application state

These endpoints are accessible without authentication and are automatically bypassed by the middleware.
