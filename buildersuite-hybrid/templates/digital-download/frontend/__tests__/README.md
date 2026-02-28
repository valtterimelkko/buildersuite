# Test Suite

This directory contains the test infrastructure for the MVP template.

## Quick Start

```bash
# Install dependencies (includes jest, ts-jest)
npm install

# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- stripe-webhook

# Run with coverage
npm test -- --coverage
```

## Directory Structure

```
__tests__/
├── api/                    # API route tests
│   ├── lead-capture.test.ts
│   └── stripe-webhook.test.ts
├── lib/                    # Library/utility tests
│   └── (add tests for lib/ code here)
├── mocks/                  # Mock utilities
│   ├── stripe.ts          # Stripe mocks and helpers
│   └── supabase.ts        # Supabase mocks and helpers
├── setup/                  # Test configuration
│   └── jest.setup.ts      # Global test setup
└── README.md              # This file
```

## Mock Utilities

### Stripe Mocks (`mocks/stripe.ts`)

- `generateStripeSignature()` - Create valid webhook signatures for testing
- `mockCheckoutSessionCompleted` - Pre-built checkout event
- `mockSubscriptionCreated/Updated/Deleted` - Subscription lifecycle events
- `mockInvoicePaid/PaymentFailed` - Invoice events
- `createMockStripeClient()` - Full Stripe client mock
- `createWebhookRequest()` - Helper to build complete webhook requests

Example:
```typescript
import { generateStripeSignature, mockCheckoutSessionCompleted } from '../mocks/stripe';

const body = JSON.stringify(mockCheckoutSessionCompleted);
const signature = generateStripeSignature(body, 'whsec_test_secret');
```

### Supabase Mocks (`mocks/supabase.ts`)

- `createMockSupabaseClient()` - Full Supabase client mock
- `createMockQueryChain()` - Chainable query builder mock
- `mockSuccessResponse()` / `mockErrorResponse()` - Response helpers
- Pre-built records: `mockUser`, `mockProfile`, `mockLead`, `mockPurchase`

Example:
```typescript
import { createMockSupabaseClient, mockSuccessResponse, mockLead } from '../mocks/supabase';

const mockClient = createMockSupabaseClient();
mockClient.from.mockReturnValue(
  createMockQueryChain(mockSuccessResponse(mockLead))
);
```

## Writing Tests

### API Route Tests

Test patterns for Next.js API routes:

```typescript
describe('POST /api/endpoint', () => {
  it('should validate input', async () => {
    // Test input validation
  });

  it('should handle success case', async () => {
    // Test happy path
  });

  it('should handle errors', async () => {
    // Test error handling
  });
});
```

### Testing with Mocks

Always reset mocks between tests:

```typescript
beforeEach(() => {
  jest.clearAllMocks();
});
```

### Coverage Requirements

The project targets 70% code coverage:
- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

## Environment Variables

Test environment variables are set in `setup/jest.setup.ts`:

```typescript
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test-project.supabase.co';
process.env.STRIPE_SECRET_KEY = 'sk_test_mock_key';
// ... etc
```

## Common Test Patterns

### Testing Webhook Signature Verification

```typescript
import { generateStripeSignature } from '../mocks/stripe';

it('should verify valid signature', () => {
  const payload = JSON.stringify(event);
  const signature = generateStripeSignature(payload, WEBHOOK_SECRET);

  // Test your verification function
  expect(verifySignature(payload, signature, WEBHOOK_SECRET)).toBe(true);
});
```

### Testing Rate Limiting

```typescript
it('should block after limit exceeded', () => {
  const requests = Array(6).fill(null);

  requests.forEach((_, i) => {
    if (i < 5) {
      expect(checkRateLimit(ip)).toBe(true);
    } else {
      expect(checkRateLimit(ip)).toBe(false);
    }
  });
});
```

### Testing Database Operations

```typescript
import { createMockSupabaseClient, mockSuccessResponse } from '../mocks/supabase';

it('should insert record', async () => {
  const mockClient = createMockSupabaseClient();
  mockClient.from.mockReturnValue({
    insert: jest.fn().mockResolvedValue(mockSuccessResponse({ id: 'new-id' }))
  });

  // Test your insert function
});
```

## Troubleshooting

### Tests timing out

Increase Jest timeout in the test file:
```typescript
jest.setTimeout(10000); // 10 seconds
```

### Mock not being used

Ensure you're mocking at the right level:
```typescript
// Mock the import
jest.mock('@/lib/supabase', () => ({
  createClient: () => createMockSupabaseClient()
}));
```

### Type errors in tests

Add type assertions:
```typescript
const result = await handler(request as NextRequest);
```

## Adding New Tests

1. Create test file in appropriate directory
2. Import relevant mocks from `mocks/`
3. Follow existing naming pattern: `*.test.ts`
4. Run `npm test` to verify
5. Check coverage with `npm test -- --coverage`
