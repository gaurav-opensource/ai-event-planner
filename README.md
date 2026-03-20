
# AI Event Concierge

A small project I built to generate event/venue suggestions using AI.  
You just describe your event in plain English, and it gives back a structured plan.

---

## Live Demo

https://ai-event-planner-tawny.vercel.app

---

## What it does

- Takes a simple text input like:
  > "team offsite for 15 people in hills under 3L budget"
- Sends it to backend
- AI generates:
  - venue name
  - location
  - cost
  - reason (why this fits)

Also stores previous searches so you can revisit them.

---

## Tech Stack

Frontend:
- React
- Axios
- Plain CSS (no framework)

Backend:
- Node + Express
- MongoDB (Mongoose)

AI:
- Gemini API (can switch to OpenAI)

---

## How it works (simple flow)

1. User enters prompt
2. Backend hits AI with structured instruction
3. AI returns JSON
4. Save to DB
5. Show on UI + history sidebar

---

## API

POST `/api/generate-event`

Request:
```json
{
  "prompt": "corporate retreat for 20 people in Goa"
}
````

Response:

```json
{
  "venueName": "Beachside Resort",
  "location": "Goa",
  "cost": "₹2.5L",
  "justification": "Good for team bonding and within budget"
}
```

---

## Running locally

Clone repo:

```bash
git clone https://github.com/your-username/ai-event-concierge.git
cd ai-event-concierge
```

### backend

```bash
cd backend
npm install
```

create `.env`:

```env
MONGO_URI=your_mongo_uri
GEMINI_API_KEY=your_key
PORT=5000
```

run:

```bash
npm start
```

### frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Notes

* AI sometimes gives broken JSON → handled fallback in code
* UI is kept simple intentionally
* Not optimized for production yet

---

## Future ideas

* multiple suggestions instead of one
* better UI (chat style)
* user login + personal history
* caching responses (reduce API cost)

---

## Author

Gaurav Yadav
(MERN + a bit of AI stuff)



