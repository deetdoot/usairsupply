# United States Air Supply - HVAC Website

## Overview

This is a professional HVAC website for United States Air Supply, built as a full-stack web application. The site provides comprehensive HVAC services including installation, repair, and maintenance for both residential and commercial properties. It features product browsing with advanced filtering, quote request functionality, and a professional design following industrial/professional service website standards.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses a modern React-based frontend with TypeScript, built with Vite for fast development and optimized builds. The UI is constructed using shadcn/ui components with Radix UI primitives, providing a consistent and accessible component library. Styling is handled through Tailwind CSS with a custom design system implementing professional HVAC industry aesthetics (navy blue, light blue, and white color palette).

**Key Frontend Decisions:**
- **React with TypeScript**: Provides type safety and better development experience
- **Vite**: Chosen for fast builds and hot module replacement during development
- **Wouter**: Lightweight client-side routing solution instead of React Router
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **shadcn/ui + Radix UI**: Pre-built accessible components that can be customized

### State Management
The application uses TanStack Query (React Query) for server state management, handling API calls, caching, and synchronization. Local component state is managed with React hooks, keeping the state architecture simple and focused.

### Database Layer
The data layer uses Drizzle ORM with PostgreSQL for type-safe database operations. The schema includes tables for quote requests and products, with proper relationships and constraints defined.

**Database Design:**
- **quote_requests**: Stores customer quote requests with contact info and project details
- **products**: Catalog of HVAC equipment with specifications, pricing, and inventory status
- **Schema validation**: Uses Drizzle-Zod for runtime validation and type safety

### Backend Architecture
Built on Express.js with TypeScript, providing a REST API for the frontend. The server implements middleware for request logging, error handling, and static file serving. In development, it integrates with Vite for seamless full-stack development.

**Storage Strategy:**
- **Development**: In-memory storage implementation for rapid prototyping
- **Production**: Designed to connect to PostgreSQL via Neon Database serverless
- **Interface-based design**: Storage layer uses interfaces allowing easy switching between implementations

### Form Handling
Uses React Hook Form with Zod validation for robust form management. The quote request form supports multi-step workflows and includes comprehensive validation for customer information, project requirements, and equipment specifications.

### Design System
Implements a professional HVAC industry design system with:
- **Color palette**: Navy blue (trust), light blue (cooling), white (cleanliness)
- **Typography**: Inter font family for clean, professional appearance  
- **Component consistency**: Standardized spacing, borders, and interaction states
- **Responsive design**: Mobile-first approach with breakpoint-specific layouts

## External Dependencies

### UI Framework & Styling
- **React**: Core frontend framework with TypeScript support
- **shadcn/ui**: Component library built on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Radix UI**: Accessible, unstyled UI components for complex interactions

### Data & API Layer
- **Drizzle ORM**: Type-safe ORM for PostgreSQL with schema migrations
- **Neon Database**: Serverless PostgreSQL for production deployment
- **TanStack Query**: Server state management and API synchronization

### Development Tools
- **Vite**: Build tool and development server with React plugin
- **TypeScript**: Static type checking across the entire codebase
- **React Hook Form**: Form state management with validation
- **Zod**: Schema validation and type inference

### Server Infrastructure
- **Express.js**: Web server framework for API endpoints
- **tsx**: TypeScript execution for development server
- **esbuild**: Fast bundling for production builds

The application is designed to be deployed on platforms like Replit, Vercel, or similar services that support Node.js applications with PostgreSQL databases.