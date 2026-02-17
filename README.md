# Sponsor Deliverables Assurance MVP

A comprehensive application for event teams to track sponsor deliverables, avoid missed obligations, and protect sponsor relationships with automated reminders and risk monitoring.

## Features

### Core Functionality
- **Authentication & Organization Management**: Secure user authentication with Supabase Auth and multi-tenant organization support
- **Event Management**: Create and manage events with sponsor tracking
- **Sponsor Package Templates**: Pre-built Bronze, Silver, Gold, and Platinum sponsorship tiers with customizable deliverables
- **Deliverable Tracking**: Complete lifecycle management of sponsor obligations with status tracking, deadlines, and assignments
- **Risk Dashboard**: Real-time visibility into overdue, due soon, and blocked deliverables
- **Automated Reminders**: Email notifications sent at configurable intervals (7 days, 3 days, 1 day, overdue)
- **Export & Reporting**: CSV exports for deliverables and sponsor fulfillment reports

### Advanced Features
- **Billing Integration**: Stripe-powered subscription management with test mode support
- **Team Collaboration**: User roles and deliverable assignments
- **Activity Logging**: Complete audit trail of actions and changes
- **Onboarding Flow**: Guided setup with sample data seeding

## Technology Stack

- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS, and Radix UI components
- **Backend**: Next.js API routes with server-side rendering
- **Database**: Supabase (PostgreSQL) with Row Level Security
- **Authentication**: Supabase Auth with email/password and OAuth
- **Payments**: Stripe (test mode configured)
- **Email**: Resend for automated reminder system
- **Deployment**: Optimized for Vercel deployment

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase project
- Stripe account (test mode)
- Resend account for email delivery

### Environment Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd sponsor-deliverables-assurance
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment template:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe Configuration (Test Mode)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email Configuration
RESEND_API_KEY=your_resend_api_key

# Application Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.your-project.supabase.co:5432/postgres
```

### Database Setup

1. Run the initial schema migration in your Supabase SQL editor:
```sql
-- Execute the contents of supabase/migrations/001_initial_schema.sql
```

2. Seed the database with sample data:
```sql
-- Execute the contents of supabase/migrations/002_seed_data.sql
```

### Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Stripe Webhook Setup

For subscription billing to work properly:

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login to Stripe CLI: `stripe login`
3. Forward webhooks to your local server:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```
4. Copy the webhook signing secret to your `.env.local`

## Architecture

### Database Schema

The application uses a normalized PostgreSQL schema with the following core entities:

- **Organizations**: Multi-tenant organization structure
- **Profiles**: User profiles linked to organizations
- **Events**: Event management with sponsor relationships
- **Sponsors**: Sponsor companies with contact information and package assignments
- **Sponsor Package Templates**: Reusable sponsorship tiers (Bronze, Silver, Gold, Platinum)
- **Deliverables**: Individual sponsor obligations with status tracking
- **Deliverable Templates**: Template deliverables for different sponsorship tiers
- **Subscription Plans**: Billing plan definitions
- **Organization Subscriptions**: Active subscriptions with Stripe integration

### API Routes

- `/api/stripe/checkout` - Create Stripe checkout sessions
- `/api/stripe/webhook` - Handle Stripe webhooks for subscription events
- `/api/reminders/send` - Automated email reminder system (designed for cron jobs)
- `/api/export/deliverables` - CSV export of deliverables data
- `/api/export/sponsors` - CSV export of sponsor fulfillment data

### Email System

Automated email reminders are sent using Resend with the following triggers:
- **7 days before due**: Initial heads-up reminder
- **3 days before due**: Urgent reminder
- **1 day before due**: Final warning
- **Due date**: Immediate action required
- **Overdue**: Daily reminders until completed

## Deployment

### Vercel Deployment

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Update your environment variables for production:
- Use your production Supabase project URLs and keys
- Switch to Stripe live mode keys
- Configure your production domain in `NEXTAUTH_URL`
- Set up webhook endpoints for your production domain

### Cron Jobs for Reminders

Set up a cron job to trigger reminder emails:
```bash
# Add to your cron service or use Vercel Cron Jobs
curl -X POST https://your-domain.com/api/reminders/send \
  -H "Authorization: Bearer your_cron_secret"
```

## Usage

### Initial Setup

1. **Sign up**: Create an account at `/auth/sign-up`
2. **Organization Setup**: Complete the onboarding flow
3. **Create Event**: Add your first event
4. **Add Sponsors**: Create sponsor records with package templates
5. **Assign Deliverables**: System automatically creates deliverables based on sponsor packages
6. **Monitor Progress**: Use the Risk Dashboard to track completion

### Daily Workflow

1. **Check Risk Dashboard**: Review overdue and upcoming deliverables
2. **Update Status**: Mark deliverables as in-progress or completed
3. **Review Reminders**: Act on email notifications
4. **Export Reports**: Generate fulfillment reports for sponsor relations

### Key Features Usage

- **Package Templates**: Use Bronze/Silver/Gold/Platinum templates or create custom packages
- **Risk Monitoring**: The Risk Dashboard provides real-time visibility into deliverable status
- **Team Collaboration**: Assign deliverables to team members for clear accountability
- **Automated Reminders**: Email notifications ensure nothing falls through the cracks
- **Export Reports**: Generate CSV reports for sponsor relations and compliance

## Limitations & Future Enhancements

### Current Limitations

- **Single Event Focus**: Optimized for organizations managing one event at a time
- **Basic User Roles**: Simple admin/member roles (no granular permissions)
- **Email Only**: No SMS or Slack integration (easily extensible)
- **Manual Deliverable Creation**: Deliverables created when sponsors are added (no bulk import)

### Planned Enhancements

- **Multi-Event Dashboard**: Enhanced views for organizations managing multiple events
- **Advanced Analytics**: Completion rates, sponsor satisfaction tracking
- **Integration Hub**: Slack, Microsoft Teams, and calendar integrations
- **Mobile App**: Native mobile application for field teams
- **API Access**: RESTful API for third-party integrations

## Support

### Documentation

- **Database Schema**: See `supabase/migrations/` for complete schema
- **API Documentation**: API routes are documented inline in their respective files
- **Component Documentation**: UI components are documented with TypeScript interfaces

### Common Issues

1. **Database Connection**: Ensure your Supabase credentials are correct and the database is accessible
2. **Email Delivery**: Verify your Resend API key and domain configuration
3. **Stripe Webhooks**: Make sure webhook endpoints are properly configured and accessible

### Getting Help

For technical issues:
1. Check the application logs in Vercel or your deployment platform
2. Verify environment variable configuration
3. Test database connectivity and permissions
4. Review Supabase logs for authentication issues

## Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly (especially authentication and billing flows)
5. Submit a pull request

### Code Standards

- **TypeScript**: Strict TypeScript configuration enforced
- **ESLint**: Code quality and consistency
- **Tailwind CSS**: Utility-first styling approach
- **Git Commits**: Meaningful commit messages describing changes

## License

Copyright 2024 - All rights reserved.

This is proprietary software developed for event teams managing sponsor relationships.