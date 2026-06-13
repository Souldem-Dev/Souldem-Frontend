# Souldem — Frontend

Next.js 14 web application for the Souldem academic governance and certificate platform.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | TailwindCSS 3 + DaisyUI + Radix UI |
| Blockchain | Ethers.js 6 + Web3.js 4 |
| Forms | Formik + Yup |
| Notifications | React Toastify |
| PDF Export | jsPDF + html2canvas |
| IPFS | IPFS HTTP Client |
| Auth | JWT stored in cookie, validated by middleware |

## Prerequisites

| Tool | Version |
|---|---|
| Node.js | ≥ 18 |
| MetaMask | Browser extension (for wallet interactions) |

The backend API (`Souldem-Backend`) must be running before starting the frontend.

## Setup

### 1. Install dependencies

```bash
cd Souldem-Frontend
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Open `.env` and set:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_BACKEND_URL` | URL of your running backend (default: `http://localhost:8000/`) |
| `NEXT_PUBLIC_BASE_FACTORY_ADDRESS` | Deployed `BaseContract` address from `souldem-v1/` |
| `JWT_SECRET` | **Must match** `JWT_SECRET_PHASE` in `Souldem-Backend/.env` |

### 3. Start development server

```bash
npm run dev
```

App runs at `http://localhost:3000`.

### 4. Build for production

```bash
npm run build
npm start
```

## App Structure

```
app/
  page.js                         — Landing page
  university/
    login/                        — University login
    signup/                       — University registration
    (university)/
      governance/                 — Governance list + creation
        invite/[govAdd]/...       — Send invitations (HOD/Mentor/Grader)
        marksEntryToggle/...      — Open/close mark entry windows
      certificates/               — Certificate management
        certificateCreate/        — Marksheet template builder
  user/
    login/                        — User login
    signup/                       — User registration
    wallet/                       — Certificate wallet
      certificate/                — View minted certificates
      addSubjects/[govAdd]/...    — Add subjects for a semester
      marksheet/[cid]/...         — View individual marksheet
    grader/
      marksDatabase/[govAdd]/...  — Enter internal/external marks
    mentor/
      invite/[govAdd]/...         — Invite students
      approval/[govAdd]/...       — Approve student enrollments
      mint/[mentorAdd]/...        — Sign and mint marksheet certificates
    hod/
      invite/[govAdd]/...         — Invite mentors/graders
    aadhaarIntr/                  — Aadhaar KYC integration
  join/[signature]/...            — Accept role invitation (from email link)
  mint/[mentorAdd]/...            — Certificate minting page (from email link)
  proposal/                       — Governance proposals + voting
  verify/                         — Public certificate verification
```

## Authentication & Route Protection

Middleware in `middleware.js` protects all `/university/*` and `/user/*` routes.

| Route type | Unauthenticated | Authenticated |
|---|---|---|
| `/university/login`, `/university/signup` | Allowed | Redirects to `/university/governance` |
| `/university/*` (protected) | Redirects to `/university/login` | Allowed |
| `/user/login`, `/user/signup` | Allowed | Redirects to `/user/wallet` |
| `/user/*` (protected) | Redirects to `/user/login` | Allowed |
| `/join/*`, `/verify/*`, `/proposal/*` | Always allowed | Always allowed |

JWT is stored in a cookie named `jwt`. It is set by the backend on login.

## User Roles

| Role | Login path | Dashboard |
|---|---|---|
| University admin | `/university/login` | `/university/governance` |
| Student | `/user/login` | `/user/wallet` |
| Mentor | `/user/login` | `/user/mentor` |
| Grader | `/user/login` | `/user/grader` |
| HOD | `/user/login` | `/user/hod` |

## Key Flows

### University Flow
1. Sign up at `/university/signup`
2. Verify OTP sent to email
3. Go to `/university/governance` → create governance contract for a batch
4. Invite HOD and Grader via the invite page
5. Configure marksheet template at `/university/certificates/certificateCreate`
6. Toggle marks entry open/close

### Student Flow
1. Receive invite email → click link → accept at `/join/...`
2. Complete Aadhaar KYC at `/user/aadhaarIntr`
3. Add subjects at `/user/wallet/addSubjects/...`
4. After grader enters marks, wait for mint invitation email
5. Click mint link → go to `/mint/...` → sign and mint certificate
6. View certificates at `/user/wallet/certificate`

### Mentor Flow
1. Accept HOD's invite (email link)
2. Go to `/user/mentor/invite/...` → invite students
3. Approve student enrollments at `/user/mentor/approval/...`
4. When marks are ready, go to `/user/mentor/mint/...` → sign marksheet → sends mint link to student

### Grader Flow
1. Accept university's invite
2. Go to `/user/grader/marksDatabase/...` → enter internal and external marks per student

## MetaMask

Most write operations require MetaMask to sign EIP-712 typed data messages. Users need:
- MetaMask installed in the browser
- Account imported from the wallet created during registration (private key shown once at signup)
- Network set to match the backend's `GANACHE_RPC_PROVIDER` or Alchemy network

## Environment Variables

Full reference in `.env.example`. Never commit `.env` — it is in `.gitignore`.

## Common Issues

| Problem | Fix |
|---|---|
| API calls failing | Check `NEXT_PUBLIC_BACKEND_URL` ends with `/` |
| MetaMask wrong network | Switch to the same network as the backend |
| JWT mismatch errors | Ensure `JWT_SECRET` == `JWT_SECRET_PHASE` in backend |
| Certificate PDF blank | Ensure html2canvas can access all images (CORS on image hosts) |
| Contract address mismatch | Redeploy contracts and update both `NEXT_PUBLIC_BASE_FACTORY_ADDRESS` and backend's `FACTORY_CONTRACT_ADDRESS` |


