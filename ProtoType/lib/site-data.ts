export interface CityPoint {
  name: string
  lat: number
  lng: number
}

export interface Plan {
  name: string
  slug: 'basic' | 'plus' | 'max'
  price: string
  buttonLabel: string
  badge?: string
  weeklyCoverage: string
  features: string[]
}

export interface FeedEvent {
  city: string
  event: string
  workers: number
  amount: string
}

export interface LiveEvent {
  city: string
  event: string
  emoji: string
  workers: number
  amount: string
  time: string
}

export const CITY_POINTS: CityPoint[] = [
  { name: 'Mumbai', lat: 19.07, lng: 72.87 },
  { name: 'Delhi', lat: 28.61, lng: 77.2 },
  { name: 'Bengaluru', lat: 12.97, lng: 77.59 },
  { name: 'Chennai', lat: 13.08, lng: 80.27 },
  { name: 'Hyderabad', lat: 17.38, lng: 78.48 },
  { name: 'Kolkata', lat: 22.57, lng: 88.36 },
  { name: 'Pune', lat: 18.52, lng: 73.85 },
  { name: 'Ahmedabad', lat: 23.02, lng: 72.57 },
]

export const HERO_TICKER_ITEMS = [
  'Raju K., Bengaluru — ₹892 credited',
  'Priya S., Mumbai — ₹1,200 credited',
  'Vikram T., Delhi — ₹456 credited',
  'Amit R., Chennai — ₹780 credited',
  'Sunita D., Pune — ₹1,100 credited',
  'Mohammed A., Hyderabad — ₹634 credited',
  'Deepa N., Kolkata — ₹920 credited',
  'Karan M., Ahmedabad — ₹540 credited',
  'Lakshmi V., Bengaluru — ₹1,050 credited',
  'Rahul S., Mumbai — ₹875 credited',
]

export const DISRUPTION_ROWS = [
  ['🌧 Heavy Rain', 'Rainfall > 115 mm/day', '80–100% drop'],
  ['☀️ Extreme Heat', 'Temp > 44°C or AQI > 300', '60–80% drop'],
  ['🌫 Dense Fog', 'Visibility < 50m', '70% drop'],
  ['🌪 Cyclone/Storm', 'Wind > 60 kmph', '90–100% drop'],
  ['🚫 Bandh/Strike', 'Govt declaration', '100% drop'],
  ['🚨 Curfew/Sec 144', 'Govt notification', '100% drop'],
  ['😷 Severe AQI', 'AQI > 400 (Hazardous)', '40–60% drop'],
]

export const JOURNEY_STEPS = [
  {
    title: 'Raju spots GigShield on Swiggy',
    icon: '📱',
    body: "A Swiggy in-app banner: 'Protect earnings from rains & bandhs — ₹49/week only. Zero paperwork.'",
  },
  {
    title: 'Onboards in 2 minutes 34 seconds',
    icon: '⚡',
    body: 'Login via Swiggy Partner ID. AI auto-pulls 12-week earnings, delivery zones, and working hours.',
  },
  {
    title: 'AI silently profiles his risk',
    icon: '🧠',
    body: 'Risk Score: 68/100 (Medium-High). 3 disruption windows detected in next 7 days.',
  },
  {
    title: 'Picks Shield Plus — pays ₹89 via UPI',
    icon: '🛡️',
    body: 'Policy live in 30 seconds. Auto-renews weekly from Swiggy earnings. Zero bank visits.',
  },
  {
    title: 'Thursday night — 148mm rain hits Bengaluru',
    icon: '🌧',
    body: '11:47 PM: Threshold breached. IMD + OpenWeather + IoT sensors cross-validated. Confidence: 97.4%.',
  },
  {
    title: 'Friday 6:13 AM — ₹892 in GPay',
    icon: '💸',
    body: "Raju didn't file anything. Didn't call anyone. Didn't even know it happened while he slept.",
  },
]

export const LIVE_SECTION_EVENTS: FeedEvent[] = [
  { city: 'Bengaluru', event: 'Heavy Rain 🌧', workers: 1247, amount: '₹11.2L' },
  { city: 'Delhi', event: 'AQI Alert 😷', workers: 3891, amount: '₹34.7L' },
  { city: 'Mumbai', event: 'Bandh 🚫', workers: 892, amount: '₹8.1L' },
  { city: 'Chennai', event: 'Cyclone Warning 🌪', workers: 2103, amount: '₹19.4L' },
  { city: 'Hyderabad', event: 'Heavy Rain 🌧', workers: 1567, amount: '₹14.1L' },
  { city: 'Pune', event: 'Flooding 🌊', workers: 445, amount: '₹4.0L' },
]

export const WEEKLY_PLANS: Plan[] = [
  {
    name: 'Shield Basic',
    slug: 'basic',
    price: '₹49/week',
    weeklyCoverage: 'Up to ₹800/week payout',
    buttonLabel: 'Get Basic',
    features: [
      'Heavy Rain coverage only',
      'Up to ₹800/week payout',
      'Sub-15 min payout',
      'WhatsApp notifications',
    ],
  },
  {
    name: 'Shield Plus',
    slug: 'plus',
    price: '₹89/week',
    weeklyCoverage: 'Up to ₹1,800/week payout',
    buttonLabel: 'Get Shield Plus',
    badge: 'Most Popular',
    features: [
      'Rain + Pollution + Bandh coverage',
      'Up to ₹1,800/week payout',
      'Sub-15 min payout',
      'WhatsApp + App notifications',
      '7-day risk forecast',
    ],
  },
  {
    name: 'Shield Max',
    slug: 'max',
    price: '₹149/week',
    weeklyCoverage: 'Up to ₹3,500/week payout',
    buttonLabel: 'Get Shield Max',
    features: [
      'All 7 disruption types covered',
      'Up to ₹3,500/week payout',
      'Sub-15 min payout',
      'Priority support',
      'Earnings forecast + ESS score',
      'Platform-sponsored premium eligible',
    ],
  },
]

export const TRUST_POINTS = [
  'IMD API + OpenWeatherMap + Tomorrow.io + 3 IoT sensors',
  '97.4% minimum confidence required before any payout triggers',
  '200+ peer workers in same zone cross-validated',
  'GPS must confirm worker was active in disruption zone',
]

export const FRAUD_BADGES = [
  '🕸 GNN fraud ring detection',
  '📍 Real-time GPS boundary validation',
  '#️⃣ Blockchain event ID — no double claims',
  '📱 Device fingerprinting — no SIM sharing',
]

export const RAJU_STORY = [
  {
    title: 'Tuesday evening, HSR Layout, Bengaluru',
    text: "Raju Kumar, 27. Swiggy partner for 3 years. Average week: ₹4,800–₹5,500. He's parked near a restaurant, waiting for orders. His biggest fear: the monsoon.",
    visual: 'sunset',
  },
  {
    title: 'He sees the Swiggy notification',
    text: "'Protect your earnings from rains and bandhs — GigShield AI. Weekly plan starts at ₹49 only. Zero paperwork.' He thinks: 'I lost ₹3,000 last monsoon.'",
    visual: 'notification',
  },
  {
    title: 'Onboarding: 2 minutes 34 seconds',
    text: 'App opens in Kannada. Logs in via Swiggy ID. AI pulls his zones and 12-week earnings. Risk Score: 68/100. Recommended: Shield Plus.',
    visual: 'profile',
  },
  {
    title: 'He picks Shield Plus. Pays ₹89 via UPI.',
    text: "One tap. raju@okaxis. Policy is LIVE in 30 seconds. 'It feels too easy,' he thinks. It is.",
    visual: 'payment',
  },
  {
    title: 'Thursday, 11:47 PM — 148mm rain hits Bengaluru',
    text: "Swiggy order volumes drop 94% in his zone. GigShield's Disruption Engine detects the threshold breach. Confidence: 97.4%. Fraud score: 4/100. Auto-approved. Raju is already asleep.",
    visual: 'rain',
  },
  {
    title: 'The pipeline fires — he knows nothing',
    text: '1,247 workers. Auto-approved. ₹11.2L in UPI transfers. Razorpay payout API called. WhatsApp notifications queued. Time elapsed: 8 minutes 14 seconds.',
    visual: 'pipeline',
  },
  {
    title: 'Friday, 6:13 AM — WhatsApp ping',
    text: "He didn't file anything. He didn't call anyone. Net benefit this month: ₹1,428. He told Suresh to sign up.",
    visual: 'whatsapp',
  },
]

export const WHATSAPP_MESSAGE =
  'Namaskar Raju! 🙏 Heavy rain disruption detected in your zone last night. Your Shield Plus claim has been AUTO-PROCESSED. ₹892 credited to raju@okaxis ✅'

export const PLATFORM_BADGES = [
  '🟠 Swiggy',
  '🔴 Zomato',
  '🟡 Blinkit',
  '🔵 Zepto',
  '📦 Amazon Flex',
  '🚚 Porter',
  '🛵 Dunzo',
  '🟣 Rapido',
]

export const TOAST_WORKERS = [
  { name: 'Raju K.', city: 'Bengaluru', amount: '₹892' },
  { name: 'Priya S.', city: 'Mumbai', amount: '₹1,200' },
  { name: 'Vikram T.', city: 'Delhi', amount: '₹456' },
  { name: 'Amit R.', city: 'Chennai', amount: '₹780' },
  { name: 'Sunita D.', city: 'Pune', amount: '₹1,100' },
  { name: 'Mohammed A.', city: 'Hyderabad', amount: '₹634' },
  { name: 'Deepa N.', city: 'Kolkata', amount: '₹920' },
  { name: 'Karan M.', city: 'Ahmedabad', amount: '₹540' },
  { name: 'Lakshmi V.', city: 'Bengaluru', amount: '₹1,050' },
  { name: 'Rahul S.', city: 'Mumbai', amount: '₹875' },
  { name: 'Anita G.', city: 'Chennai', amount: '₹990' },
  { name: 'Sanjay P.', city: 'Delhi', amount: '₹670' },
  { name: 'Meera K.', city: 'Hyderabad', amount: '₹1,340' },
  { name: 'Suresh B.', city: 'Pune', amount: '₹560' },
  { name: 'Divya M.', city: 'Bengaluru', amount: '₹892' },
]

export const LIVE_EVENTS: LiveEvent[] = [
  { city: 'Bengaluru', event: 'Heavy Rain', emoji: '🌧', workers: 1247, amount: '₹11.2L', time: 'just now' },
  { city: 'Delhi', event: 'AQI 418', emoji: '😷', workers: 3891, amount: '₹34.7L', time: '2 min ago' },
  { city: 'Mumbai', event: 'Bandh', emoji: '🚫', workers: 892, amount: '₹8.1L', time: '5 min ago' },
  { city: 'Chennai', event: 'Cyclone Warning', emoji: '🌪', workers: 2103, amount: '₹19.4L', time: '8 min ago' },
  { city: 'Hyderabad', event: 'Heavy Rain', emoji: '🌧', workers: 1567, amount: '₹14.1L', time: '11 min ago' },
  { city: 'Pune', event: 'Flooding', emoji: '🌊', workers: 445, amount: '₹4.0L', time: '14 min ago' },
  { city: 'Kolkata', event: 'Dense Fog', emoji: '🌫', workers: 678, amount: '₹6.1L', time: '17 min ago' },
]

export const SIMULATION_LINES = [
  '> Querying IMD API...',
  '✓ IMD API: 148mm rainfall detected in Bengaluru North Zone',
  '> Cross-validating sources...',
  '✓ OpenWeatherMap: 151mm confirmed',
  '✓ IoT Sensor Network: 3/3 sensors triggered',
  '✓ Confidence Score: 97.4% — THRESHOLD BREACHED (>115mm)',
  '> Running fraud detection on 1,247 eligible workers...',
  '✓ GPS validation: 1,247/1,247 workers in disruption zone',
  '✓ Platform order history: avg 0.3 orders/hr (baseline: 8.2)',
  '✓ Peer income cross-check: 94% drop confirmed',
  '✓ Fraud Score: 6.2/100 — AUTO-APPROVED',
  '> Initiating UPI payouts via Razorpay...',
  '✓ ₹11,20,000 dispatched to 1,247 UPI accounts',
  '✓ WhatsApp notifications sent: 1,247/1,247',
]

export const DASHBOARD_CLAIMS = [
  ['Mar 14, 2026', 'Heavy Rain 🌧', 'HSR Layout', 'Shield Plus', '₹892', '✅ Paid'],
  ['Mar 08, 2026', 'Bandh 🚫', 'Koramangala', 'Shield Plus', '₹450', '✅ Paid'],
  ['Feb 28, 2026', 'Heavy Rain 🌧', 'Indiranagar', 'Shield Plus', '₹892', '✅ Paid'],
  ['Feb 20, 2026', 'AQI Alert 😷', 'HSR Layout', 'Shield Plus', '₹550', '✅ Paid'],
  ['Feb 12, 2026', 'Cyclone Warning 🌪', 'All Zones', 'Shield Plus', '₹0', '⚪ Not triggered'],
]

export const DASHBOARD_FORECAST = [
  { day: 'Mon', value: 22 },
  { day: 'Tue', value: 15 },
  { day: 'Wed', value: 67 },
  { day: 'Thu', value: 71 },
  { day: 'Fri', value: 44 },
  { day: 'Sat', value: 18 },
  { day: 'Sun', value: 12 },
]

export const ONBOARDING_TERMINAL_LINES = [
  '✓ Pulling 12-week earnings history from Swiggy...',
  '✓ Avg weekly earnings: ₹4,950 (stable)',
  '✓ Delivery zones identified: HSR Layout, Koramangala, Indiranagar',
  '✓ Checking monsoon disruption frequency for Bengaluru (2020–2025)...',
  '✓ Historical disruption days/year: 22 (above average)',
  '✓ Comparing profile with 40,000 similar Bengaluru workers...',
  '✓ Income Stability Score: 74/100',
  '✓ Risk Score calculated: 68/100 (Medium-High)',
  '✓ Disruption windows in next 7 days: 3 (rain forecast: HIGH)',
]

export const INSURER_OVERVIEW_STATS = [
  ['Active Policies', '1,24,351'],
  ['Gross Premium (Month)', '₹1.1 Cr'],
  ['Claims Paid (Month)', '₹63.2 L'],
  ['Loss Ratio', '57.4%'],
  ['Avg Payout Time', '8.3 min'],
  ['Fraud Rejection Rate', '2.1%'],
]

export const PREMIUM_CLAIMS_DATA = [
  { month: 'Oct', premium: 82, claims: 47 },
  { month: 'Nov', premium: 89, claims: 51 },
  { month: 'Dec', premium: 94, claims: 54 },
  { month: 'Jan', premium: 101, claims: 58 },
  { month: 'Feb', premium: 108, claims: 62 },
  { month: 'Mar', premium: 110, claims: 63 },
]

export const ZONE_RISK_ROWS = [
  ['HSR Layout', '8,234', '🔴 High', '₹8.2L'],
  ['Koramangala', '6,121', '🟡 Medium', '₹4.1L'],
  ['Indiranagar', '5,890', '🟡 Medium', '₹3.8L'],
  ['Whitefield', '4,200', '🟢 Low', '₹1.2L'],
  ['Electronic City', '3,100', '🟢 Low', '₹0.9L'],
  ['Jayanagar', '2,840', '🟢 Low', '₹0.7L'],
]

export const INSURER_CLAIMS = [
  ['CLM-001', 'Raju K.', 'HSR Layout', 'Heavy Rain', '₹892', 'Score: 4', '✅ Paid', '7m 32s'],
  ['CLM-002', 'Priya S.', 'Koramangala', 'Bandh', '₹1,200', 'Score: 8', '✅ Paid', '9m 11s'],
  ['CLM-003', 'Vikram T.', 'Whitefield', 'AQI Alert', '₹550', 'Score: 12', '✅ Paid', '11m 04s'],
  ['CLM-004', 'Amit R.', 'Indiranagar', 'Heavy Rain', '₹892', 'Score: 6', '✅ Paid', '8m 47s'],
  ['CLM-005', 'Sunita D.', 'HSR Layout', 'Heavy Rain', '₹892', 'Score: 3', '✅ Paid', '7m 55s'],
  ['CLM-006', 'Rajesh P.', 'Electronic City', 'Cyclone', '₹1,800', 'Score: 5', '✅ Paid', '6m 23s'],
  ['CLM-007', 'Meena K.', 'Koramangala', 'Bandh', '₹1,200', 'Score: 91', '❌ Rejected', 'Fraud'],
  ['CLM-008', 'Suresh B.', 'Jayanagar', 'AQI Alert', '₹550', 'Score: 7', '✅ Paid', '10m 18s'],
  ['CLM-009', 'Divya M.', 'HSR Layout', 'Heavy Rain', '₹892', 'Score: 15', '✅ Paid', '8m 02s'],
  ['CLM-010', 'Arjun N.', 'Whitefield', 'Dense Fog', '₹450', 'Score: 9', '✅ Paid', '12m 41s'],
]
