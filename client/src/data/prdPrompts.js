export const prdPrompts = [
  {
    id: "mobile-app",
    title: "Mobile App PRD",
    description: "Generate a complete PRD for a mobile application — Android, iOS, or cross-platform.",
    icon: "Smartphone",
    prompt: `You are a senior product manager. Write a comprehensive Product Requirements Document (PRD) for the mobile app I describe below. Use clear section headings, bullet points, and make it ready for a development team to execute.

## Product Overview
- Product Name: [Your app name]
- Platform: [Android / iOS / Cross-platform]
- One-line description: [What does this app do?]

## Target Users
- Primary audience: [Who is the main user?]
- Demographics: [Age, profession, tech literacy]
- Pain points: [What problem does this app solve for them?]

## Core Features (Priority-based)
### P0 — Must Have (Launch)
- [Feature 1]
- [Feature 2]
- [Feature 3]

### P1 — Should Have (v1.1)
- [Feature 4]
- [Feature 5]

### P2 — Nice to Have (Future)
- [Feature 6]

## User Stories
As a [user type], I want to [action] so that [benefit].
1. As a new user, I want to sign up quickly so that I can start using the app immediately.
2. As a returning user, I want to see my history so that I can pick up where I left off.
3. As a user, I want to receive notifications so that I stay updated on important events.

## Technical Requirements
- Framework: [React Native / Flutter / Kotlin / Swift]
- Backend: [Firebase / Node.js / Supabase / etc.]
- Authentication: [Email + Password / Google / Apple Sign-In]
- Database: [Firestore / PostgreSQL / MongoDB]
- Push Notifications: [FCM / APNs]

## UI/UX Guidelines
- Design system: [Material Design / Custom / HIG]
- Navigation pattern: [Bottom tabs / Drawer / Stack]
- Offline support: [Yes / No]
- Accessibility: [WCAG 2.1 AA compliance target]

## Success Metrics
- DAU/MAU target: [Number]
- Retention rate (Day 7): [Percentage]
- App Store rating target: [4.5+]
- Crash-free rate: [99.5%+]

## Timeline & Milestones
- Week 1-2: Setup & architecture
- Week 3-6: Core feature development
- Week 7-8: Testing & QA
- Week 9: Soft launch (beta)
- Week 10: Public release

Generate the full PRD document based on these inputs. Make it professional, detailed, and ready for a dev team.`,
  },
  {
    id: "saas-app",
    title: "SaaS / Web App PRD",
    description: "Generate a PRD for a SaaS product or web application with user roles and subscription tiers.",
    icon: "Cloud",
    prompt: `You are a senior product manager. Write a comprehensive Product Requirements Document (PRD) for the SaaS/web application I describe below. Include user roles, subscription tiers, and technical architecture considerations.

## Product Overview
- Product Name: [Your SaaS name]
- Type: [B2B / B2C / B2B2C]
- One-line description: [What problem does this solve?]
- Revenue model: [Freemium / Subscription / Usage-based]

## Target Users & Personas
### Persona 1: [Name/Role]
- Goal: [What do they want to achieve?]
- Frustration: [What's blocking them?]
- Technical skill: [Beginner / Intermediate / Advanced]

### Persona 2: [Name/Role]
- Goal: [What do they want to achieve?]
- Frustration: [What's blocking them?]

## User Roles & Permissions
- Admin: [Full access, user management, billing]
- Editor: [Can create and edit content]
- Viewer: [Read-only access]
- [Custom role]: [Specific permissions]

## Core Features
### Authentication & Onboarding
- [ ] Sign up / Login (Email, Google, SSO)
- [ ] Onboarding wizard
- [ ] Profile setup

### Dashboard
- [ ] Overview metrics
- [ ] Recent activity feed
- [ ] Quick actions

### [Main Feature Module]
- [ ] Feature A
- [ ] Feature B
- [ ] Feature C

### Settings & Billing
- [ ] Account settings
- [ ] Subscription management
- [ ] Team management

## Subscription Tiers
| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Users | 1 | 10 | Unlimited |
| Storage | 1GB | 10GB | 100GB |
| Support | Community | Email | Priority |
| API Access | No | Yes | Yes |

## Technical Requirements
- Frontend: [Next.js / React / Vue]
- Backend: [Node.js / Python / Go]
- Database: [PostgreSQL / MongoDB]
- Hosting: [Vercel / AWS / GCP]
- Auth: [Auth0 / Clerk / NextAuth]
- Payments: [Stripe / Paddle]

## API Design
- RESTful or GraphQL
- Rate limiting: [requests per minute]
- Versioning strategy: [URL / Header]

## Success Metrics
- MRR target: $[Amount]
- Free → Paid conversion: [Percentage]
- Churn rate (monthly): [Percentage]
- NPS score: [Target]

## Launch Plan
- Phase 1 (MVP): Core features only
- Phase 2 (v1.0): Full feature set
- Phase 3 (Growth): Integrations & API

Generate the full PRD based on these inputs. Make it structured and actionable for a development team.`,
  },
  {
    id: "ecommerce",
    title: "E-commerce PRD",
    description: "Generate a PRD for an online store — from product catalog to checkout and payment.",
    icon: "ShoppingCart",
    prompt: `You are a senior product manager. Write a comprehensive Product Requirements Document (PRD) for the e-commerce platform I describe below. Cover the full buyer journey from browsing to post-purchase.

## Product Overview
- Store Name: [Your store name]
- Type: [Single-vendor / Multi-vendor / Marketplace]
- Products: [Physical / Digital / Both]
- One-line description: [What do you sell and to whom?]

## Target Customers
- Primary audience: [Who shops here?]
- Geographic focus: [Local / National / International]
- Average order value: $[Amount]
- Purchase frequency: [One-time / Subscription / Repeat]

## Product Catalog
### Categories
- [Category 1]
- [Category 2]
- [Category 3]

### Product Attributes
- Name, description, price
- Images (multiple per product)
- Variants: [Size / Color / Weight]
- Inventory tracking: [Yes / No]
- Digital delivery: [Yes / No]

## Buyer Journey
### Discovery
- [ ] Homepage with featured products
- [ ] Category browsing
- [ ] Search with filters (price, category, rating)
- [ ] Product recommendations

### Product Page
- [ ] Image gallery / zoom
- [ ] Variant selection
- [ ] Add to cart / Buy now
- [ ] Reviews & ratings
- [ ] Related products

### Cart & Checkout
- [ ] Cart management (add, remove, quantity)
- [ ] Guest checkout option
- [ ] Shipping address form
- [ ] Shipping method selection
- [ ] Order summary
- [ ] Payment processing

### Post-Purchase
- [ ] Order confirmation page
- [ ] Email receipt
- [ ] Order tracking
- [ ] Return/refund flow
- [ ] Review request

## Payment Integration
- Gateway: [Stripe / Midtrans / Xendit / PayPal]
- Methods: [Credit card / Bank transfer / E-wallet / COD]
- Currency: [IDR / USD / Multi-currency]

## Admin Dashboard
- [ ] Product management (CRUD)
- [ ] Order management (status updates)
- [ ] Customer management
- [ ] Sales analytics
- [ ] Inventory alerts

## Technical Requirements
- Framework: [Next.js / Shopify / WooCommerce]
- Database: [PostgreSQL / Firestore]
- Storage: [Cloudinary / S3]
- Hosting: [Vercel / AWS]

## Success Metrics
- Conversion rate: [Percentage]
- Average order value: $[Amount]
- Cart abandonment rate: [Below 70%]
- Customer satisfaction: [4.5+ rating]

Generate the full PRD based on these inputs. Focus on the complete e-commerce flow.`,
  },
  {
    id: "api-backend",
    title: "API / Backend PRD",
    description: "Generate a PRD for a backend service, REST/GraphQL API, or microservice architecture.",
    icon: "Server",
    prompt: `You are a senior backend architect. Write a comprehensive Product Requirements Document (PRD) for the API or backend service I describe below. Focus on endpoints, data models, and scalability.

## Service Overview
- Service Name: [Your API name]
- Type: [REST API / GraphQL / gRPC / Microservice]
- Purpose: [What does this service do?]
- Consumers: [Web app / Mobile app / Third-party devs]

## Data Models
### [Entity 1]
- id: UUID
- field1: String (required)
- field2: Number
- field3: Boolean
- createdAt: DateTime
- updatedAt: DateTime

### [Entity 2]
- id: UUID
- foreignKey: UUID (references Entity 1)
- ...

## API Endpoints
### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register | Create account |
| POST | /auth/login | Get access token |
| POST | /auth/refresh | Refresh token |

### [Resource]
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/[resource] | List all |
| GET | /api/v1/[resource]/:id | Get one |
| POST | /api/v1/[resource] | Create |
| PUT | /api/v1/[resource]/:id | Update |
| DELETE | /api/v1/[resource]/:id | Delete |

### Filtering & Pagination
- GET /api/v1/[resource]?page=1&limit=20&sort=created_at&order=desc
- GET /api/v1/[resource]?filter[field]=value

## Authentication & Authorization
- JWT-based authentication
- Token expiry: [15min / 1hr / 24hr]
- Refresh token rotation: [Yes / No]
- Role-based access control (RBAC):
  - admin: full access
  - user: read + write own data
  - guest: read only

## Rate Limiting
- Tier 1: [100] requests / minute
- Tier 2: [1000] requests / minute
- Response: 429 Too Many Requests

## Error Handling
Standard error response format:
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": [...]
  }
}

Status codes: 400, 401, 403, 404, 409, 422, 429, 500

## Technical Requirements
- Runtime: [Node.js / Go / Python / Rust]
- Framework: [Express / Fastify / Gin / FastAPI]
- Database: [PostgreSQL / MongoDB]
- Cache: [Redis / Memcached]
- Message Queue: [RabbitMQ / Kafka] (if needed)
- Documentation: [OpenAPI / Swagger]

## Scalability Considerations
- Horizontal scaling strategy
- Database indexing plan
- Caching strategy
- CDN for static responses

## Monitoring & Logging
- Health check endpoint: GET /health
- Request logging: [method, path, status, latency]
- Error alerting: [Sentry / Datadog]
- Uptime target: [99.9%]

## Versioning Strategy
- URL-based: /api/v1/, /api/v2/
- Deprecation policy: [6 months notice]

## Testing Requirements
- Unit test coverage: [80%+]
- Integration tests for all endpoints
- Load testing: [1000 concurrent users]

Generate the full PRD based on these inputs. Make it actionable for backend developers.`,
  },
  {
    id: "landing-page",
    title: "Landing Page PRD",
    description: "Generate a PRD for a marketing landing page — from hero section to conversion flow.",
    icon: "Globe",
    prompt: `You are a senior product designer and conversion strategist. Write a comprehensive Product Requirements Document (PRD) for the landing page I describe below. Focus on layout, copy, and conversion optimization.

## Page Overview
- Product/Brand: [Name]
- Page Purpose: [Launch / Lead gen / App download / Event / Sales]
- Target Audience: [Who visits this page?]
- Primary CTA: [What action do you want visitors to take?]

## Hero Section
- Headline: [Main value proposition — 6-10 words]
- Subheadline: [Supporting detail — 1-2 sentences]
- CTA Button: [Text — e.g., "Get Started Free"]
- Secondary CTA: [Text — e.g., "Watch Demo"]
- Visual: [Product screenshot / Illustration / Video]

## Page Sections (in order)
### 1. Social Proof Bar
- Logos of: [Company 1, Company 2, Company 3]
- Or: [Number]+ users / [Number]+ teams / [Rating] rating

### 2. Problem Statement
- "Before [Product], [target user] struggled with..."
- 3 pain points with icons

### 3. Solution / Features
- Feature 1: [Name + 1-sentence description]
- Feature 2: [Name + 1-sentence description]
- Feature 3: [Name + 1-sentence description]
- Layout: [Grid / Alternating left-right / Tabs]

### 4. How It Works
- Step 1: [Action]
- Step 2: [Action]
- Step 3: [Result]
- Visual: [Numbered steps / Animated illustration]

### 5. Testimonials
- [Number] testimonials with name, role, company
- Format: [Cards / Carousel / Wall of love]

### 6. Pricing (if applicable)
- Free tier: [Features]
- Pro tier: $[Price] — [Features]
- Enterprise: Custom

### 7. FAQ
- [Question 1]
- [Question 2]
- [Question 3]
- [Question 4]

### 8. Final CTA
- Headline: [Urgency or value statement]
- CTA Button: [Same as hero or different]

## Conversion Elements
- Sticky header with CTA
- Exit-intent popup (optional)
- Live chat widget (optional)
- Countdown timer (if event/launch)

## SEO & Meta
- Title tag: [Primary keyword — 60 chars]
- Meta description: [Compelling summary — 155 chars]
- OG image: [Product visual]

## Technical Requirements
- Framework: [Next.js / Astro / HTML+CSS]
- Animations: [Framer Motion / GSAP / None]
- Analytics: [Google Analytics / Plausible]
- A/B testing: [None / Google Optimize / PostHog]

## Performance Targets
- Lighthouse score: 90+
- LCP: <2.5s
- CLS: <0.1
- FID: <100ms

## Success Metrics
- Conversion rate: [Percentage]
- Bounce rate: [Below 40%]
- Time on page: [2+ minutes]
- Scroll depth: [70%+ reach bottom]

Generate the full PRD based on these inputs. Include specific copy suggestions and layout recommendations.`,
  },
];
