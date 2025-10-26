# Roya Core - Privy Authentication Demo

## Getting Started

### Prerequisites

- Node.js 18+ 
- Yarn, npm, or pnpm
- A Privy account ([Sign up here](https://dashboard.privy.io/))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd roya-core
```

2. Install dependencies:
```bash
yarn install
# or
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Add your Privy credentials to `.env`:
   - Get your `NEXT_PUBLIC_PRIVY_APP_ID` and `PRIVY_APP_SECRET` from [Privy Dashboard](https://dashboard.privy.io/)
   - Update the `.env` file with your credentials

5. Run the development server:
```bash
yarn dev
# or
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

See `.env.example` for all available environment variables:

- `NEXT_PUBLIC_PRIVY_APP_ID`: Your Privy App ID (required)
- `PRIVY_APP_SECRET`: Your Privy App Secret (required)
- `NEXT_PUBLIC_SUPPORTED_CHAINS`: Comma-separated list of chains (optional)
- `NEXT_PUBLIC_DEFAULT_CHAIN`: Default blockchain network (optional)

### Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/token/      # Token management endpoint
│   │   ├── protected/        # Protected API routes
│   │   └── user/            # User profile API
│   ├── components/
│   │   └── LoginButton.tsx  # Authentication UI
│   ├── dashboard/           # Protected dashboard page
│   └── providers.tsx         # Privy provider setup
├── lib/
│   ├── auth.ts              # Server-side auth utilities
│   └── privy-server.ts      # Privy server client
└── middleware.ts             # Route protection middleware
```
