# Tasks Tracker

## Feature A: Resume Management
- [x] Task A.1: Update `Profile` backend schema with `resumeEnabled` and `resumeType` with safe backward-compatible defaults.
- [x] Task A.2: Support PDF file upload (base64 Data URI) and Google Drive / external URL in `AdminProfile.tsx`.
- [x] Task A.3: Allow updating, enabling, and disabling the resume status in `AdminProfile.tsx`.
- [x] Task A.4: Update `Hero.tsx` so the public Resume button dynamically appears ONLY when resume is enabled and a valid URL/file exists.
- [x] Task A.5: Verify and test Resume Management flow.

## Feature B: About Me Enhancement
- [x] Task B.1: Update `About` backend model with `journey`, `journeyTitle`, `interests`, `interestsTitle`, `hobbies`, `hobbiesTitle` with backward-compatible defaults.
- [x] Task B.2: Update `AdminAbout.tsx` to support editing Programming Journey, Professional Interests, and Hobbies.
- [x] Task B.3: Update public `About.tsx` to display Programming Journey, Professional Interests, and Hobbies cleanly matching the design system.
- [x] Task B.4: Verify and test About Me updates.

## Feature C: Project Details Page & Admin Management
- [ ] Task C.1: Update `Project` backend model with `overview`, `features`, `screenshots`, `contributions`, `challenges`, `solutions`, and `futureImprovements`.
- [ ] Task C.2: Add backend `getProjectById` controller and public route `GET /api/projects/:id`.
- [ ] Task C.3: Update `AdminProjects.tsx` to allow adding and editing all detailed project fields.
- [ ] Task C.4: Add dynamic Project Details page (`frontend/src/pages/ProjectDetails.tsx`) displaying overview, features, tech stack, screenshots gallery, live demo, github, contributions, challenges, solutions, and future improvements.
- [ ] Task C.5: Add routing in `App.tsx` for `/projects/:id`.
- [ ] Task C.6: Add "Details" action link/button to existing project cards in `Projects.tsx` while preserving existing layout and cards.
- [ ] Task C.7: Verify and test Project Details flow.

## Feature D: Predefined Ask Me (Q&A) System
- [ ] Task D.1: Create Mongoose model `AskMe.ts` (`question`, `answer`, `category`, `order`, `isActive`).
- [ ] Task D.2: Create backend controller `askMeController.ts` and routes `askMeRoutes.ts` with public endpoint for active questions and protected admin CRUD endpoints.
- [ ] Task D.3: Register `/api/ask-me` routes in `server.ts`.
- [ ] Task D.4: Build floating chat bubble and compact interactive Q&A popup window in frontend (`AskMeWidget.tsx`).
- [ ] Task D.5: Build dedicated `/en/ask-me` full page (`frontend/src/pages/AskMePage.tsx`) using the same Q&A API data.
- [ ] Task D.6: Build `AdminAskMe.tsx` page with full CRUD, category management, display order, active/inactive toggle, and live preview.
- [ ] Task D.7: Register `/admin/ask-me` and `/en/ask-me` routes in `App.tsx` and add links in Admin navigation / AdminDashboard.
- [ ] Task D.8: Verify and test Ask Me functionality.

## Feature E: Responsive Quality & Polish
- [ ] Task E.1: Verify responsive layout on mobile (360px+), tablet, and desktop for all new and existing components.
- [ ] Task E.2: Ensure light/dark visual consistency, contrast, and clean layout across mobile viewport.
- [ ] Task E.3: Run full TypeScript and production builds on frontend and backend.
- [ ] Task E.4: Commit and push changes according to Git workflow.
