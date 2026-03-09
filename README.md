# Welcome to ROR GUI

Frontend for admin GUI in the ROR project.

## Tech Stack

- 🔒 TypeScript by default
- 📖 [Next.js](https://nextjs.org/docs)
- 🎨 Styling we primarily use [Tailwind CSS](https://tailwindcss.com/), but have [SASS](https://sass-lang.com/) in [`packages/styles`](packages/styles) (component library, not maintained).

## Getting Started

### Run project

You can either choose to run ror-web with or without dex.

#### Without dex

To run without dex, run the following command:

```bash
npm run dev
```

#### With dex

To run with dex, run the following command:

```bash
npm run dev:all
```

The `:all` suffix runs the [`scripts/dev-with-compose.sh`](/scripts/dev-with-compose.sh) script, that runs both `docker-compose up` and `npm run dev`.

### Setup environmental variables

#### For apps/web

Create a new file `apps/web/.env.local`, and copy the contents of [`apps/web/.env.example`](/apps/web/.env.example). Fill in the necessary values.

**Note**: Environmental variables will be validated running runtime and mapped to a different naming convention. See `/env.ts` for implementation details.

To generate a secret for `AUTH_SECRET` you can run the following command:

```bash
openssl rand -base64 32
```

The secret is used for session management by the `next-auth` library.

#### For docker setup (used for dex)

Create a new file `.env`, and copy the contents of `.env.example`. Fill in the necessary values.

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:11100`.

## Mocking

The web application uses [mswjs](https://mswjs.io/) to mock API requests. To enable mocking, set `NEXT_PUBLIC_MOCKING_ENABLED` to `true` in the appropriate environment file.
Further configuration and which requests that are mocked can be found in `/apps/web/__mocks__/handlers.ts`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Open Telemetry

The web application is instrumented with Open Telemetry to collect telemetry data. See `apps/web/instrumentation.ts` for implementation and [Next.js Open Telemetry Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/open-telemetry).

It is possible to configure custom spans, see [Next.js Custom Spans](https://nextjs.org/docs/app/building-your-application/optimizing/open-telemetry#custom-spans) for more information.
