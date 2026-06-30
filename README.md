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
| Auth | JWT stored in cookie, validated by middleware |

---

## Prerequisites

- Node.js ≥ 18
- MetaMask browser extension
- Backend (`Souldem-Backend`) running and reachable
- Contracts deployed from `souldem-v1/` — you need the `BaseContract` address

---

## Local Development Setup

### 1. Install dependencies

```bash
cd Souldem-Frontend
npm install
```

### 2. Create `.env`

```bash
cp .env.example .env
```

Fill in these values:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_BACKEND_URL` | Backend URL — `http://localhost:8000/` for local dev |
| `NEXT_PUBLIC_BASE_FACTORY_ADDRESS` | `BaseContract` address from `truffle migrate` output |
| `JWT_SECRET` | Must be the **exact same string** as `JWT_SECRET_PHASE` in backend `.env` |
| `NEXT_PUBLIC_FRONTEND_URL` | `http://localhost:3000` for local dev |

### 3. Configure MetaMask

- Add **Base Mainnet** to MetaMask:
  - Network name: `Base`
  - RPC URL: `https://base-rpc.publicnode.com`
  - Chain ID: `8453`
  - Currency: `ETH`
- Import the wallet using the private key from your deployer wallet (or any funded Base wallet)

### 4. Start development server

```bash
npm run dev
```

App runs at `http://localhost:3000`.

---

## Production Setup (Vercel)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "initial"
git remote add origin https://github.com/YOUR_USERNAME/souldem-frontend.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → sign in with GitHub
2. **Add New Project** → import your frontend repo
3. Framework is auto-detected as Next.js
4. Go to **Environment Variables** and add:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_BACKEND_URL` | Your Railway backend URL (ends with `/`) |
| `NEXT_PUBLIC_BASE_FACTORY_ADDRESS` | `BaseContract` address |
| `JWT_SECRET` | Same value as `JWT_SECRET_PHASE` in backend |
| `NEXT_PUBLIC_FRONTEND_URL` | Your Vercel URL e.g. `https://souldem.vercel.app` |

5. Click **Deploy**

---

## App Structure

```
app/
  page.js                         — Landing page
  university/
    login/                        — University login
    signup/                       — University registration
    (university)/
      governance/                 — Governance list + creation
        invite/[govAdd]/          — Send invitations (HOD / Mentor / Grader)
        marksEntryToggle/         — Open / close mark entry windows
      certificates/
        certificateCreate/        — Marksheet template builder
  user/
    login/                        — User login
    signup/                       — User registration
    wallet/                       — Certificate wallet
      certificate/                — View minted certificates
      addSubjects/[govAdd]/       — Add subjects for a semester
      marksheet/[cid]/            — View individual marksheet
    grader/
      marksDatabase/[govAdd]/     — Enter internal / external marks
    mentor/
      invite/[govAdd]/            — Invite students
      approval/[govAdd]/          — Approve student enrollments
      mint/[mentorAdd]/           — Sign and mint marksheet certificates
    hod/
      invite/[govAdd]/            — Invite mentors / graders
    aadhaarIntr/                  — Aadhaar KYC
  join/[signature]/               — Accept role invitation (from email link)
  mint/[mentorAdd]/               — Certificate minting (from email link)
  verify/                         — Public certificate verification
```

---

## User Roles

| Role | Login path | Landing after login |
|---|---|---|
| University admin | `/university/login` | `/university/governance` |
| Student | `/user/login` | `/user/wallet` |
| Mentor | `/user/login` | `/user/mentor` |
| Grader | `/user/login` | `/user/grader` |
| HOD | `/user/login` | `/user/hod` |

---

## Key Flows

### University
1. Sign up at `/university/signup` → verify OTP
2. Create a governance contract at `/university/governance`
3. Invite HOD and Grader via the invite page
4. Build marksheet template at `/university/certificates/certificateCreate`
5. Toggle marks entry open when grader is ready

### Student
1. Receive invite email → click link → accept at `/join/...`
2. Complete Aadhaar KYC at `/user/aadhaarIntr`
3. Add subjects at `/user/wallet/addSubjects/...`
4. After grader enters marks and mentor mints → click mint link from email
5. View certificate at `/user/wallet/certificate`

### Mentor
1. Accept HOD's invite via email link
2. Invite students at `/user/mentor/invite/...`
3. Approve student enrollments at `/user/mentor/approval/...`
4. When marks are ready → go to `/user/mentor/mint/...` → sign marksheet → sends mint email to student

### Grader
1. Accept university's invite via email link
2. Enter internal and external marks at `/user/grader/marksDatabase/...`

---

## Route Protection

`middleware.js` protects all `/university/*` and `/user/*` routes using the JWT cookie set by the backend on login.

| Route | Unauthenticated | Authenticated |
|---|---|---|
| `/university/login`, `/university/signup` | Allowed | Redirects to `/university/governance` |
| `/university/*` | Redirects to `/university/login` | Allowed |
| `/user/login`, `/user/signup` | Allowed | Redirects to `/user/wallet` |
| `/user/*` | Redirects to `/user/login` | Allowed |
| `/join/*`, `/verify/*` | Always allowed | Always allowed |

---

## Common Issues

| Problem | Fix |
|---|---|
| API calls failing | Check `NEXT_PUBLIC_BACKEND_URL` ends with `/` |
| MetaMask wrong network | Switch MetaMask to Base (Chain ID 8453) |
| JWT errors / infinite redirect | Ensure `JWT_SECRET` matches `JWT_SECRET_PHASE` in backend |
| Certificate PDF blank | Ensure html2canvas can access all images (check CORS on image hosts) |
| Wrong contract address | Redeploy contracts and update `NEXT_PUBLIC_BASE_FACTORY_ADDRESS` and backend's `FACTORY_CONTRACT_ADDRESS` |
