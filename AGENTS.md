<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Woman Med Spa - Project Instructions

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 19
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Language**: TypeScript
- **Database**: Postgres (`postgres` package)
- **Auth**: Custom JWT auth (`jsonwebtoken`, `bcryptjs`, `cookie`)

## Workflow: Figma to Code (via Screenshots)
This project utilizes a "Figma to Code" workflow where the primary input is design screenshots.
- **Process**: The user provides a screenshot of a Figma design. You must analyze it using native vision and write the corresponding Next.js/Tailwind code.
- **Verification**: Use the `/browser` slash command to navigate to the local dev server (e.g., `localhost:3000`) to verify that the implementation visually matches the screenshot. Iterate until it's pixel-perfect.
- **Tools**: **Do not** attempt to use any Figma MCP plugins or tools. Rely entirely on your vision capabilities to read the screenshots.

## Architecture & Code Conventions
- **Directory Structure**: 
  - `src/app/` for Next.js App Router pages and layouts.
  - `src/components/` for reusable React components.
  - `src/lib/` for utilities and database connections.
  - `src/i18n/` for internationalization.
- **Component Paradigm**: Default to React Server Components. Add `"use client"` directive at the top of the file only when client-side interactivity, state (hooks), or animations (Framer Motion) are required.
- **Styling Guidelines**: Use Tailwind CSS 4 utility classes exclusively. Avoid custom CSS unless absolutely necessary.
- **Typing**: Use strict TypeScript typing for all new files and components.
