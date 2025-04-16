# Motivo AI Q2 Execution System

This repository contains everything needed to launch the AI-powered Rocks + KPI Execution Engine for Q2.

---

## 🚀 What's Inside

- ✅ Super Checklist milestone tracking
- 📊 Live KPI dashboard with visual alerts
- 🤖 Chatbot commands for milestone updates
- 🔁 SmartSheet sync and automated reminders
- 🔔 Slack + Email alert system
- 📈 Burn-up chart tracking execution velocity

---

## 📁 Folder Structure

```
/configs         → KPI rules, sync configs, alert settings
/assets          → CSVs, milestone data, chatbot text
/frontend.env    → Vercel environment variables
/backend.env     → Railway environment variables
```

---

## 🛠️ Deployment Instructions

### 🔧 Backend via Railway

1. Create a new Railway project: https://railway.app
2. Connect your `motivo-backend2` GitHub repo
3. Upload `backend.env` variables in **Settings > Variables**
4. Replace:
   - `SMARTSHEET_API_TOKEN`
   - `SMARTSHEET_SHEET_ID`
   - `SLACK_WEBHOOK_URL`
5. Click **Deploy**

### 🌐 Frontend via Vercel

1. Go to: https://vercel.com
2. Connect your `motivo-frontend` GitHub repo
3. Upload `frontend.env` variables under Project > Settings > Environment
4. Click **Deploy**

---

## 🔁 SmartSheet Integration

Ensure the following columns exist:
- `Milestone`
- `Due Date`
- `Milestone Complete`
- `Progress %`
- `Notes`
- `Rock Category`

> Use the `SmartSheet_AutoTask_Reminders.csv` file to auto-create rows

---

## 🤖 Chatbot Commands

Example commands:
```
/rock_tracker
/update_rock "Define dashboard KPIs" complete
/remind_me_for "Build chatbot integration"
/show_rocks_by_week
/rock_status "AI Chatbot super-duper checklist tool built"
```

---

## 📊 Tracked KPIs

1. Milestone Completion Rate
2. On-Time Task Execution
3. Checklist Compliance Rate
4. Sales ↔ Ops Handoff Integrity
5. Role Assignment Accuracy
6. Equipment Readiness Score
7. Burn-Up Velocity

> Defined in: `KPI_Dashboard_Config.json`

---

## 📬 Alerts

- Email: `blake.derango@motivo-group.com`
- Slack Webhook: [Insert yours here]
- Triggered on: overdue milestones, handoff misses, low compliance

---

## 📅 Reporting

- Weekly execution report sent to dashboard + inbox
- Real-time sync every 30 minutes

---

Prepared by: **Blake DeRango**  
Effective: **Q2 2025**