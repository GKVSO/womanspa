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

## i18n & Layout Rules (CRITICAL)
- **Task List (MANDATORY)**: Before writing or modifying any code, the agent MUST generate a detailed step-by-step TODO list covering each section of the page, specific bug-prevention checks, and follow it step by step.
- **Strict Doc Compliance for Buttons**: Check the exact wording for button labels in the Google Doc for EACH screen. If the doc says "Записаться на консультацию", do NOT use "Записаться на индивидуальную/персональную консультацию". Match the exact wording from the doc.
- **JSX Syntax for t() hook**: Never use `{t("Text\\nNext")}` directly inside JSX conditional rendering, as JS interprets `{}` as an object. Always wrap in fragments: `<>{t("Text\\nNext")}</>`.
- **Titles & Line Breaks**: For titles with line breaks, use `\\n` inside the translation key `t("Line 1\\nLine 2")`, and ALWAYS add `whitespace-pre-line` to the `h1`/`h2` tag's className.
- **BookButton Wrapping**: Always add `whitespace-nowrap` to the `<BookButton>` component (e.g. `className="whitespace-nowrap"`) so the text never wraps into 2 lines. Do not add `mt-*` classes directly to the button if it breaks flex layout; wrap the button in a div instead.
- **Card Layouts (Candidate Sections)**: For cards with text on the left and a button on the right, use `flex-wrap` and `<div className="basis-[57%] grow">` for the text container to prevent the button from overlapping or breaking the layout on different screen sizes.
- **Translation Keys**: Keys in `ru.json` and `es.json` MUST perfectly match the English string inside the `t("...")` hook in the `.tsx` file. Update the English string in `.tsx` if needed to match the Google Doc text before adding translations.
- **Git & Builds**: Do NOT run `npm run build`. Do NOT run `git merge`. Do NOT run `git push` unless explicitly asked.
