# Feature Specification: RoomFinder Room-Rental Marketplace

**Feature Branch**: `001-roomfinder-marketplace`  
**Created**: 2026-11-06  
**Status**: Draft  
**Input**: User description: "Create/update the RoomFinder project specification. Include title/description, purpose and target audience, core workflows: sign up, log in, create listing, browse/filter by price/location, view details, edit/delete own listings, send owner inquiry, view own listings/inquiries profile. Include testable acceptance criteria per story, API endpoints, implementation priority. Inspect existing repository constitution and relevant specification templates before editing; honor required Next.js App Router, TypeScript, Tailwind and constitution. Clarify necessary assumptions in spec rather than expanding into implementation."

## Description

RoomFinder is a room-rental marketplace where room owners publish rooms for rent and renters find affordable rooms that fit their price and location preferences. The product provides account access, room listings and search, owner inquiries, and a profile view of each user's own listings and inquiries.

## Purpose and Target Audience

The purpose is to make it easier for renters to discover suitable rooms and contact owners, while giving owners a straightforward way to advertise and manage their rooms.

- **Renters** use RoomFinder to browse and filter listings, compare room details, and inquire with an owner.
- **Room owners** use RoomFinder to publish and maintain listings, and review inquiries about their rooms.
- A user may act as both a renter and an owner from one account.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create an account and log in (Priority: P1)

As a prospective renter or room owner, I want to create an account and log in so that I can contact owners and manage my RoomFinder activity.

**Why this priority**: Account access enables the marketplace's protected actions and keeps listings and inquiries associated with their owners.

**Independent Test**: Create a new account, log out, and log in using that account; verify invalid or duplicate credentials are rejected with a clear, non-sensitive message.

**Acceptance Scenarios**:

1. **Given** a visitor provides a valid, unused email address and a valid password, **When** they submit sign-up, **Then** an account is created and they are signed in.
2. **Given** an email address is already registered, **When** a visitor tries to sign up with it, **Then** no duplicate account is created and the visitor is told how to proceed without exposing another user's private information.
3. **Given** an existing account and valid credentials, **When** the user submits log-in, **Then** they are signed in and can access protected actions.
4. **Given** invalid credentials, **When** the user submits log-in, **Then** access is denied and a clear, non-sensitive error is shown.
5. **Given** a signed-in user, **When** they sign out, **Then** their protected actions and profile data are no longer available until they sign in again.

### User Story 2 - Create a room listing (Priority: P1)

As a room owner, I want to publish a room listing so that renters can discover it and contact me.

**Why this priority**: Search has no marketplace value without rooms to discover; owner listing creation supplies the marketplace's core inventory.

**Independent Test**: Sign in as an owner, submit a listing with all required information, and verify it appears in public browse results and its detail view.

**Acceptance Scenarios**:

1. **Given** a signed-in user, **When** they submit a listing with a title, description, monthly price, and location, **Then** the listing is saved under their account and is available in browse results.
2. **Given** a listing form is missing a required field or contains an invalid or non-positive price, **When** it is submitted, **Then** the listing is not created and the missing or invalid information is identified.
3. **Given** a visitor is not signed in, **When** they try to create a listing, **Then** they are asked to sign in and no listing is created.

### User Story 3 - Browse and filter rooms (Priority: P1)

As a renter, I want to browse rooms and narrow results by price and location so that I can find options that fit my needs.

**Why this priority**: Finding affordable rooms in a relevant area is the central renter value of RoomFinder.

**Independent Test**: With listings at different prices and locations, search with each filter separately and together; verify only matching listings appear and that clearing filters restores the broader results.

**Acceptance Scenarios**:

1. **Given** published listings exist, **When** a visitor opens the browse experience without filters, **Then** they can see the available listings and open each listing's details.
2. **Given** a renter enters a minimum and/or maximum price, **When** they apply the filter, **Then** results include only listings within the inclusive price range.
3. **Given** a renter enters a location, **When** they apply the filter, **Then** results include listings whose location matches the entered text without case sensitivity.
4. **Given** a renter applies both price and location filters, **When** results are shown, **Then** each result satisfies both filters.
5. **Given** no listing satisfies the selected filters, **When** results are shown, **Then** RoomFinder displays an empty-results message and allows the renter to revise or clear filters.
6. **Given** a renter enters an invalid price range, such as a minimum greater than the maximum or a negative amount, **When** they apply it, **Then** the invalid range is identified and is not treated as a valid search.
7. **Given** a user navigates the browse and listing flows at a mobile width using a keyboard, **When** they reach each interactive control, **Then** the control has an accessible name, can be operated by keyboard, and remains usable without horizontal page scrolling.

### User Story 4 - View room details and contact the owner (Priority: P1)

As a renter, I want to review a room's details and send its owner an inquiry so that I can decide whether to pursue the room.

**Why this priority**: Details support an informed choice, and inquiries connect renters to owners to advance the marketplace's primary purpose.

**Independent Test**: Open a listing's details, submit an inquiry while signed in as a different user, then verify confirmation for the renter and a received inquiry in the owner's profile.

**Acceptance Scenarios**:

1. **Given** a published listing, **When** a visitor opens its detail view, **Then** the title, description, monthly price, location, and owner identity are displayed.
2. **Given** a signed-in renter viewing another user's active listing, **When** they submit a non-empty inquiry message, **Then** the inquiry is recorded for that listing, renter, and owner, and the renter sees confirmation.
3. **Given** a visitor is not signed in, **When** they try to send an inquiry, **Then** RoomFinder prompts them to sign in and does not create an inquiry.
4. **Given** the listing owner attempts to inquire about their own listing, **When** they submit the inquiry, **Then** it is rejected and no inquiry is created.
5. **Given** a listing no longer exists, **When** a visitor opens its former detail address or attempts to inquire, **Then** RoomFinder reports that the listing is unavailable and creates no inquiry.

### User Story 5 - Edit or delete own listings (Priority: P2)

As a room owner, I want to update or remove my listings so that renters see accurate information and no longer see rooms I have withdrawn.

**Why this priority**: Listing management keeps marketplace information trustworthy after the initial publish flow is available.

**Independent Test**: Create a listing, edit its price and description, verify the changes publicly, then delete it and verify it is no longer browsable.

**Acceptance Scenarios**:

1. **Given** a signed-in owner viewing a listing they own, **When** they save valid edits, **Then** the updated information appears in the listing details and browse results.
2. **Given** a user tries to edit a listing they do not own, **When** they submit the edit, **Then** the change is denied and the listing remains unchanged.
3. **Given** a signed-in owner viewing a listing they own, **When** they confirm deletion, **Then** the listing is removed from public browse and detail views.
4. **Given** a user tries to delete a listing they do not own, **When** they submit the deletion, **Then** the action is denied and the listing remains available.
5. **Given** an edit contains missing or invalid required data, **When** it is submitted, **Then** the listing remains unchanged and the invalid fields are identified.

### User Story 6 - Review own listings and inquiries in a profile (Priority: P2)

As a signed-in user, I want my profile to show my listings and inquiries I sent or received so that I can manage my activity in one place.

**Why this priority**: A consolidated profile makes both owner and renter activity easy to revisit after the marketplace's discovery and contact flows are available.

**Independent Test**: Create listings and send and receive inquiries using two accounts; verify each profile shows only that account's listings and sent/received inquiries.

**Acceptance Scenarios**:

1. **Given** a signed-in user with listings, **When** they open their profile's listings view, **Then** only their own listings are shown with links to view and manage them.
2. **Given** a signed-in user has sent inquiries, **When** they open their profile's inquiries view, **Then** their sent inquiries are shown with the associated listing and owner.
3. **Given** a signed-in user has received inquiries, **When** they open their profile's inquiries view, **Then** inquiries for their listings are shown with the associated listing and sender.
4. **Given** a user has no listings or inquiries in one or more categories, **When** they open that profile view, **Then** an informative empty state is shown.
5. **Given** a visitor is not signed in, **When** they try to access profile data, **Then** they are asked to sign in and no private profile data is disclosed.
6. **Given** an inquiry remains in a user's history after its listing is deleted, **When** the user opens their inquiries view, **Then** the inquiry remains identifiable and its related listing is marked unavailable without exposing private data.

### Edge Cases

- Search with no matching listings, only one price bound, equal minimum and maximum, and whitespace-only location input.
- Attempts to create or update a listing with missing required fields, an excessively long text value, or a zero, negative, or malformed price.
- Listing owner, inquiry sender, or listing referenced by an inquiry is removed or otherwise unavailable.
- A user attempts to read or change another user's listings or inquiries by changing a listing or profile identifier.
- A user submits an inquiry to their own listing, submits an empty message, or submits after the listing has been deleted.
- A profile has no activity, or a listing is deleted after an inquiry has already been sent.
- An unauthenticated or expired session attempts a protected action.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: RoomFinder MUST let a visitor create one account per registered email address using an email address and password.
- **FR-002**: RoomFinder MUST let an existing account sign in and sign out; invalid sign-in attempts MUST be denied with a non-sensitive error.
- **FR-003**: RoomFinder MUST let visitors browse published listings and view their details without signing in.
- **FR-004**: A listing MUST include a title, description, positive monthly price, location, and associated owner.
- **FR-005**: RoomFinder MUST validate required listing fields and price values before creating or updating a listing, and MUST identify invalid fields without saving invalid data.
- **FR-006**: RoomFinder MUST let signed-in users create listings and MUST associate each listing with its creator.
- **FR-007**: RoomFinder MUST let a renter filter listings by inclusive minimum and maximum price and by case-insensitive location text. When multiple filters are set, all MUST apply together.
- **FR-008**: RoomFinder MUST show a useful empty state when a browse query has no matching listings.
- **FR-009**: Listing details MUST show the listing's title, description, monthly price, location, and owner identity.
- **FR-010**: RoomFinder MUST let a signed-in user send a non-empty inquiry to the owner of another user's published listing and MUST confirm successful submission to the sender.
- **FR-011**: RoomFinder MUST reject inquiries from a listing's owner to themself and MUST reject inquiries for unavailable listings.
- **FR-012**: RoomFinder MUST let a listing owner edit or delete their own listing. Listing changes MUST be reflected in browse and detail views; deleted listings MUST no longer be publicly available.
- **FR-013**: RoomFinder MUST deny edits and deletions by anyone other than the listing owner, without changing the listing.
- **FR-014**: A signed-in user's profile MUST show only that user's own listings, inquiries they sent, and inquiries received for their listings.
- **FR-015**: RoomFinder MUST deny unauthenticated access to profile data and other protected actions without disclosing private data.
- **FR-016**: Empty profile categories MUST show an informative empty state. If an inquiry refers to a subsequently deleted listing, the profile MUST retain a safe indication that the listing is unavailable without exposing private data.
- **FR-017**: Interactive controls MUST have accessible names and support keyboard operation; user-facing flows MUST remain usable at mobile widths.

### API Endpoints and Implementation Priority

The following endpoint contract names the user-visible actions and access rules expected for planning and acceptance testing. Request and response field formats are not fixed by this specification.

| Priority | Method and endpoint | Purpose and access |
|---|---|---|
| P1 | `POST /api/auth/signup` | Create an account; reject invalid or duplicate registration. |
| P1 | `POST /api/auth/login` | Authenticate an existing account; reject invalid credentials. |
| P1 | `POST /api/auth/logout` | End the current user's authenticated session. |
| P1 | `GET /api/listings` | Browse public listings; accepts optional `minPrice`, `maxPrice`, and `location` filters. |
| P1 | `GET /api/listings/{listingId}` | View a public listing and owner details; unavailable listings return an unavailable result. |
| P1 | `POST /api/listings` | Create a listing for the signed-in user. |
| P1 | `POST /api/listings/{listingId}/inquiries` | Send a non-empty inquiry to the listing owner as the signed-in user. |
| P2 | `PATCH /api/listings/{listingId}` | Update a listing; only its owner may update it. |
| P2 | `DELETE /api/listings/{listingId}` | Delete a listing; only its owner may delete it. |
| P2 | `GET /api/profile/listings` | List the signed-in user's own listings. |
| P2 | `GET /api/profile/inquiries` | List the signed-in user's sent and received inquiries, with the related listing and participant. |

### Project Constraints

- The implementation MUST honor the repository constitution: Next.js App Router, TypeScript with strict type safety, and Tailwind CSS as the default styling approach.
- User-visible behavior MUST have appropriate automated tests, including coverage for the important account, listing, search, ownership, and inquiry journeys. The existing constitution notes that a test runner is not yet configured; its setup must be planned before implementation tasks that require automated coverage.
- Components and interactions MUST follow the constitution's Server Component-by-default guidance, with client-side boundaries only where interaction requires them.
- This specification defines product behavior and endpoint intent; it does not prescribe endpoint payloads, visual design, persistence technology, or authentication implementation.

### Key Entities

- **User**: A RoomFinder account identified by a unique email address; may act as renter, owner, or both.
- **Room Listing**: A room offered for rent, with a title, description, monthly price, location, and owning user.
- **Inquiry**: A message from one user to the owner of a listing, associated with its sender, recipient/owner, listing, and submission time.
- **Authenticated Session**: A signed-in user's access context, used to authorize protected actions and private profile views.

### Assumptions

- Sign-up and sign-in use an email address and password. Social sign-in, password recovery, and account deletion are outside this feature's scope.
- Browsing and viewing listing details are public; creating or managing listings, sending inquiries, and viewing a profile require a signed-in account.
- Listing prices are positive amounts in Philippine pesos (₱) per month. A listing's location is represented as free-text city/province information; location search is case-insensitive text matching.
- Price filter bounds are inclusive. If only one bound is provided, only that bound applies; blank location input does not filter results.
- Every listing is available for browsing until its owner deletes it. Availability calendars, room booking, payments, reviews, and image uploads are outside scope.
- Inquiry is an in-product message rather than public display of an owner's email or phone number. Both sent and received inquiries appear in the associated user's profile.
- A user may have both renter and owner activity using the same account. There is no separate role-selection workflow.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At least 90% of participants in acceptance testing can complete account creation and a subsequent sign-in in under two minutes without assistance.
- **SC-002**: At least 90% of renter participants can find listings matching a supplied price range and location within one minute; every returned listing satisfies all applied filters.
- **SC-003**: At least 90% of participants can review a listing and successfully send an inquiry in under three minutes after signing in.
- **SC-004**: All ownership and privacy acceptance tests pass: non-owners cannot edit or delete another user's listing, and users cannot view another user's profile listings or inquiries.
- **SC-005**: All valid listing creation and update acceptance cases show the saved values in public listing details; all deleted listings are absent from browse results and cannot be opened as available listings.
- **SC-006**: In usability acceptance testing, at least 90% of participants can locate their own listings and sent or received inquiries from their profile without assistance.
