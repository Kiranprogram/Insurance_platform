// GigShield AI Mock Data System
export interface Worker {
  id: string;
  name: string;
  city: string;
  zone: string;
  platform: string;
  weeklyEarnings: number;
  monthlyPremium: number;
  coverage: string;
}

export interface Claim {
  id: string;
  workerId: string;
  workerName: string;
  city: string;
  zone: string;
  eventType: string;
  claimDate: string;
  claimTime: string;
  amount: number;
  paidDate: string;
  paidTime: string;
  payoutTime: number;
  fraudScore: number;
  status: 'approved' | 'rejected' | 'pending';
}

export interface DisruptionEvent {
  id: string;
  type: string;
  city: string;
  zone: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  affectedWorkers: number;
  totalPayout: number;
}

export interface ForecastDay {
  day: string;
  probability: number;
}

// Indian Cities with lat/lng
export const CITIES = [
  { name: 'Mumbai', lat: 19.076, lng: 72.8776, zone: 'Western' },
  { name: 'Delhi', lat: 28.7041, lng: 77.1025, zone: 'Northern' },
  { name: 'Bengaluru', lat: 12.9716, lng: 77.5946, zone: 'Southern' },
  { name: 'Chennai', lat: 13.0827, lng: 80.2707, zone: 'Southern' },
  { name: 'Hyderabad', lat: 17.3850, lng: 78.4867, zone: 'Southern' },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639, zone: 'Eastern' },
];

// Disruption Types
export const DISRUPTION_TYPES = [
  { type: 'Rain', color: '#2196F3', icon: '🌧️' },
  { type: 'Pollution', color: '#FF9800', icon: '💨' },
  { type: 'Cyclone', color: '#9C27B0', icon: '🌪️' },
  { type: 'Bandh', color: '#F44336', icon: '🚫' },
  { type: 'Fog', color: '#607D8B', icon: '🌫️' },
  { type: 'Heat Wave', color: '#FF5722', icon: '🔥' },
  { type: 'Flood', color: '#00BCD4', icon: '🌊' },
];

// Indian Gig Workers (50 total)
export const WORKERS: Worker[] = [
  { id: '1', name: 'Raju Kumar', city: 'Bengaluru', zone: 'South', platform: 'Swiggy', weeklyEarnings: 8500, monthlyPremium: 89, coverage: 'Shield Plus' },
  { id: '2', name: 'Priya Singh', city: 'Mumbai', zone: 'West', platform: 'Zomato', weeklyEarnings: 7200, monthlyPremium: 49, coverage: 'Shield Basic' },
  { id: '3', name: 'Amit Patel', city: 'Delhi', zone: 'North', platform: 'Amazon Flex', weeklyEarnings: 9100, monthlyPremium: 149, coverage: 'Shield Max' },
  { id: '4', name: 'Neha Sharma', city: 'Hyderabad', zone: 'South', platform: 'Rapido', weeklyEarnings: 6800, monthlyPremium: 89, coverage: 'Shield Plus' },
  { id: '5', name: 'Rajesh Nair', city: 'Chennai', zone: 'South', platform: 'Swiggy', weeklyEarnings: 7500, monthlyPremium: 49, coverage: 'Shield Basic' },
  { id: '6', name: 'Anjali Rao', city: 'Bengaluru', zone: 'South', platform: 'Uber Eats', weeklyEarnings: 8200, monthlyPremium: 149, coverage: 'Shield Max' },
  { id: '7', name: 'Vikram Singh', city: 'Delhi', zone: 'North', platform: 'Swiggy Instamart', weeklyEarnings: 7900, monthlyPremium: 89, coverage: 'Shield Plus' },
  { id: '8', name: 'Pooja Gupta', city: 'Kolkata', zone: 'East', platform: 'Zomato', weeklyEarnings: 6500, monthlyPremium: 49, coverage: 'Shield Basic' },
  { id: '9', name: 'Karan Verma', city: 'Mumbai', zone: 'West', platform: 'Rapido', weeklyEarnings: 8900, monthlyPremium: 149, coverage: 'Shield Max' },
  { id: '10', name: 'Sneha Das', city: 'Hyderabad', zone: 'South', platform: 'Amazon Flex', weeklyEarnings: 7600, monthlyPremium: 89, coverage: 'Shield Plus' },
  { id: '11', name: 'Arjun Kumar', city: 'Bengaluru', zone: 'South', platform: 'Ola', weeklyEarnings: 8400, monthlyPremium: 89, coverage: 'Shield Plus' },
  { id: '12', name: 'Divya Choudhury', city: 'Delhi', zone: 'North', platform: 'Swiggy', weeklyEarnings: 7300, monthlyPremium: 49, coverage: 'Shield Basic' },
  { id: '13', name: 'Rahul Pandey', city: 'Chennai', zone: 'South', platform: 'Zomato', weeklyEarnings: 6900, monthlyPremium: 49, coverage: 'Shield Basic' },
  { id: '14', name: 'Sanya Khan', city: 'Mumbai', zone: 'West', platform: 'Swiggy', weeklyEarnings: 8100, monthlyPremium: 149, coverage: 'Shield Max' },
  { id: '15', name: 'Harsh Malhotra', city: 'Hyderabad', zone: 'South', platform: 'Rapido', weeklyEarnings: 7800, monthlyPremium: 149, coverage: 'Shield Max' },
  { id: '16', name: 'Meera Iyer', city: 'Kolkata', zone: 'East', platform: 'Amazon Flex', weeklyEarnings: 6700, monthlyPremium: 89, coverage: 'Shield Plus' },
  { id: '17', name: 'Dev Nambiar', city: 'Bengaluru', zone: 'South', platform: 'Uber', weeklyEarnings: 8600, monthlyPremium: 89, coverage: 'Shield Plus' },
  { id: '18', name: 'Shreya Joshi', city: 'Delhi', zone: 'North', platform: 'Zomato', weeklyEarnings: 7400, monthlyPremium: 49, coverage: 'Shield Basic' },
  { id: '19', name: 'Nikhil Roy', city: 'Mumbai', zone: 'West', platform: 'Amazon Flex', weeklyEarnings: 9200, monthlyPremium: 149, coverage: 'Shield Max' },
  { id: '20', name: 'Avni Desai', city: 'Chennai', zone: 'South', platform: 'Rapido', weeklyEarnings: 7100, monthlyPremium: 89, coverage: 'Shield Plus' },
  { id: '21', name: 'Anand Kumar', city: 'Hyderabad', zone: 'South', platform: 'Swiggy', weeklyEarnings: 8300, monthlyPremium: 89, coverage: 'Shield Plus' },
  { id: '22', name: 'Puja Mishra', city: 'Kolkata', zone: 'East', platform: 'Zomato', weeklyEarnings: 6600, monthlyPremium: 49, coverage: 'Shield Basic' },
  { id: '23', name: 'Siddharth Nair', city: 'Bengaluru', zone: 'South', platform: 'Swiggy Instamart', weeklyEarnings: 7700, monthlyPremium: 149, coverage: 'Shield Max' },
  { id: '24', name: 'Ishita Kapoor', city: 'Delhi', zone: 'North', platform: 'Rapido', weeklyEarnings: 7500, monthlyPremium: 49, coverage: 'Shield Basic' },
  { id: '25', name: 'Vikram Das', city: 'Mumbai', zone: 'West', platform: 'Ola Delivery', weeklyEarnings: 8700, monthlyPremium: 149, coverage: 'Shield Max' },
  { id: '26', name: 'Nisha Agarwal', city: 'Chennai', zone: 'South', platform: 'Swiggy', weeklyEarnings: 7000, monthlyPremium: 89, coverage: 'Shield Plus' },
  { id: '27', name: 'Rohan Bhatt', city: 'Hyderabad', zone: 'South', platform: 'Amazon Flex', weeklyEarnings: 8000, monthlyPremium: 89, coverage: 'Shield Plus' },
  { id: '28', name: 'Deepa Sinha', city: 'Kolkata', zone: 'East', platform: 'Rapido', weeklyEarnings: 6800, monthlyPremium: 49, coverage: 'Shield Basic' },
  { id: '29', name: 'Aryan Singh', city: 'Bengaluru', zone: 'South', platform: 'Zomato', weeklyEarnings: 8200, monthlyPremium: 149, coverage: 'Shield Max' },
  { id: '30', name: 'Lakshmi Reddy', city: 'Delhi', zone: 'North', platform: 'Swiggy', weeklyEarnings: 7200, monthlyPremium: 89, coverage: 'Shield Plus' },
  { id: '31', name: 'Suresh Kumar', city: 'Mumbai', zone: 'West', platform: 'Rapido', weeklyEarnings: 8500, monthlyPremium: 49, coverage: 'Shield Basic' },
  { id: '32', name: 'Chandini Verma', city: 'Chennai', zone: 'South', platform: 'Amazon Flex', weeklyEarnings: 7600, monthlyPremium: 149, coverage: 'Shield Max' },
  { id: '33', name: 'Kunal Sharma', city: 'Hyderabad', zone: 'South', platform: 'Swiggy', weeklyEarnings: 7900, monthlyPremium: 89, coverage: 'Shield Plus' },
  { id: '34', name: 'Anita Chatterjee', city: 'Kolkata', zone: 'East', platform: 'Zomato', weeklyEarnings: 6700, monthlyPremium: 49, coverage: 'Shield Basic' },
  { id: '35', name: 'Madhav Nayak', city: 'Bengaluru', zone: 'South', platform: 'Uber Eats', weeklyEarnings: 8100, monthlyPremium: 149, coverage: 'Shield Max' },
  { id: '36', name: 'Ritika Singh', city: 'Delhi', zone: 'North', platform: 'Swiggy Instamart', weeklyEarnings: 7400, monthlyPremium: 89, coverage: 'Shield Plus' },
  { id: '37', name: 'Sameer Khan', city: 'Mumbai', zone: 'West', platform: 'Rapido', weeklyEarnings: 8800, monthlyPremium: 149, coverage: 'Shield Max' },
  { id: '38', name: 'Vanshika Reddy', city: 'Chennai', zone: 'South', platform: 'Swiggy', weeklyEarnings: 7100, monthlyPremium: 49, coverage: 'Shield Basic' },
  { id: '39', name: 'Naveen Patel', city: 'Hyderabad', zone: 'South', platform: 'Amazon Flex', weeklyEarnings: 8300, monthlyPremium: 89, coverage: 'Shield Plus' },
  { id: '40', name: 'Priyanka Roy', city: 'Kolkata', zone: 'East', platform: 'Rapido', weeklyEarnings: 6900, monthlyPremium: 89, coverage: 'Shield Plus' },
  { id: '41', name: 'Aditya Kulkarni', city: 'Bengaluru', zone: 'South', platform: 'Zomato', weeklyEarnings: 8400, monthlyPremium: 49, coverage: 'Shield Basic' },
  { id: '42', name: 'Sakshi Yadav', city: 'Delhi', zone: 'North', platform: 'Swiggy', weeklyEarnings: 7500, monthlyPremium: 149, coverage: 'Shield Max' },
  { id: '43', name: 'Rajesh Gupta', city: 'Mumbai', zone: 'West', platform: 'Ola', weeklyEarnings: 8600, monthlyPremium: 89, coverage: 'Shield Plus' },
  { id: '44', name: 'Anjana Prabhu', city: 'Chennai', zone: 'South', platform: 'Zomato', weeklyEarnings: 7000, monthlyPremium: 49, coverage: 'Shield Basic' },
  { id: '45', name: 'Saurabh Singh', city: 'Hyderabad', zone: 'South', platform: 'Swiggy', weeklyEarnings: 8200, monthlyPremium: 149, coverage: 'Shield Max' },
  { id: '46', name: 'Divyaa Banerjee', city: 'Kolkata', zone: 'East', platform: 'Amazon Flex', weeklyEarnings: 6800, monthlyPremium: 89, coverage: 'Shield Plus' },
  { id: '47', name: 'Harsh Kalia', city: 'Bengaluru', zone: 'South', platform: 'Rapido', weeklyEarnings: 8000, monthlyPremium: 49, coverage: 'Shield Basic' },
  { id: '48', name: 'Neha Kapoor', city: 'Delhi', zone: 'North', platform: 'Zomato', weeklyEarnings: 7600, monthlyPremium: 149, coverage: 'Shield Max' },
  { id: '49', name: 'Vikrant Verma', city: 'Mumbai', zone: 'West', platform: 'Swiggy', weeklyEarnings: 8300, monthlyPremium: 89, coverage: 'Shield Plus' },
  { id: '50', name: 'Simran Kaur', city: 'Chennai', zone: 'South', platform: 'Amazon Flex', weeklyEarnings: 7400, monthlyPremium: 49, coverage: 'Shield Basic' },
];

// Sample Claims (20 total)
export const CLAIMS: Claim[] = [
  {
    id: 'CLM001',
    workerId: '1',
    workerName: 'Raju Kumar',
    city: 'Bengaluru',
    zone: 'South',
    eventType: 'Rain',
    claimDate: '2026-03-15',
    claimTime: '22:47',
    amount: 850,
    paidDate: '2026-03-16',
    paidTime: '06:13',
    payoutTime: 7,
    fraudScore: 8,
    status: 'approved',
  },
  {
    id: 'CLM002',
    workerId: '2',
    workerName: 'Priya Singh',
    city: 'Mumbai',
    zone: 'West',
    eventType: 'Pollution',
    claimDate: '2026-03-14',
    claimTime: '18:23',
    amount: 600,
    paidDate: '2026-03-15',
    paidTime: '04:41',
    payoutTime: 10,
    fraudScore: 5,
    status: 'approved',
  },
  {
    id: 'CLM003',
    workerId: '3',
    workerName: 'Amit Patel',
    city: 'Delhi',
    zone: 'North',
    eventType: 'Bandh',
    claimDate: '2026-03-12',
    claimTime: '06:15',
    amount: 1200,
    paidDate: '2026-03-12',
    paidTime: '14:02',
    payoutTime: 8,
    fraudScore: 12,
    status: 'approved',
  },
  {
    id: 'CLM004',
    workerId: '4',
    workerName: 'Neha Sharma',
    city: 'Hyderabad',
    zone: 'South',
    eventType: 'Heat Wave',
    claimDate: '2026-03-10',
    claimTime: '13:44',
    amount: 400,
    paidDate: '2026-03-10',
    paidTime: '21:17',
    payoutTime: 7,
    fraudScore: 3,
    status: 'approved',
  },
  {
    id: 'CLM005',
    workerId: '5',
    workerName: 'Rajesh Nair',
    city: 'Chennai',
    zone: 'South',
    eventType: 'Flood',
    claimDate: '2026-03-08',
    claimTime: '11:29',
    amount: 950,
    paidDate: '2026-03-09',
    paidTime: '02:36',
    payoutTime: 15,
    fraudScore: 9,
    status: 'approved',
  },
  {
    id: 'CLM006',
    workerId: '6',
    workerName: 'Anjali Rao',
    city: 'Bengaluru',
    zone: 'South',
    eventType: 'Rain',
    claimDate: '2026-03-07',
    claimTime: '20:11',
    amount: 750,
    paidDate: '2026-03-08',
    paidTime: '05:44',
    payoutTime: 9,
    fraudScore: 7,
    status: 'approved',
  },
  {
    id: 'CLM007',
    workerId: '7',
    workerName: 'Vikram Singh',
    city: 'Delhi',
    zone: 'North',
    eventType: 'Fog',
    claimDate: '2026-03-05',
    claimTime: '07:32',
    amount: 600,
    paidDate: '2026-03-05',
    paidTime: '15:58',
    payoutTime: 8,
    fraudScore: 4,
    status: 'approved',
  },
  {
    id: 'CLM008',
    workerId: '8',
    workerName: 'Pooja Gupta',
    city: 'Kolkata',
    zone: 'East',
    eventType: 'Cyclone',
    claimDate: '2026-03-03',
    claimTime: '17:46',
    amount: 1100,
    paidDate: '2026-03-04',
    paidTime: '08:19',
    payoutTime: 14,
    fraudScore: 11,
    status: 'approved',
  },
  {
    id: 'CLM009',
    workerId: '9',
    workerName: 'Karan Verma',
    city: 'Mumbai',
    zone: 'West',
    eventType: 'Pollution',
    claimDate: '2026-03-01',
    claimTime: '19:21',
    amount: 500,
    paidDate: '2026-03-02',
    paidTime: '03:47',
    payoutTime: 8,
    fraudScore: 2,
    status: 'approved',
  },
  {
    id: 'CLM010',
    workerId: '10',
    workerName: 'Sneha Das',
    city: 'Hyderabad',
    zone: 'South',
    eventType: 'Rain',
    claimDate: '2026-02-28',
    claimTime: '23:08',
    amount: 800,
    paidDate: '2026-03-01',
    paidTime: '07:22',
    payoutTime: 8,
    fraudScore: 6,
    status: 'approved',
  },
  {
    id: 'CLM011',
    workerId: '11',
    workerName: 'Arjun Kumar',
    city: 'Bengaluru',
    zone: 'South',
    eventType: 'Bandh',
    claimDate: '2026-02-25',
    claimTime: '05:44',
    amount: 1050,
    paidDate: '2026-02-25',
    paidTime: '13:15',
    payoutTime: 7,
    fraudScore: 10,
    status: 'approved',
  },
  {
    id: 'CLM012',
    workerId: '12',
    workerName: 'Divya Choudhury',
    city: 'Delhi',
    zone: 'North',
    eventType: 'Fog',
    claimDate: '2026-02-22',
    claimTime: '08:33',
    amount: 650,
    paidDate: '2026-02-22',
    paidTime: '16:48',
    payoutTime: 8,
    fraudScore: 5,
    status: 'approved',
  },
  {
    id: 'CLM013',
    workerId: '13',
    workerName: 'Rahul Pandey',
    city: 'Chennai',
    zone: 'South',
    eventType: 'Heat Wave',
    claimDate: '2026-02-20',
    claimTime: '14:19',
    amount: 450,
    paidDate: '2026-02-20',
    paidTime: '22:34',
    payoutTime: 8,
    fraudScore: 1,
    status: 'approved',
  },
  {
    id: 'CLM014',
    workerId: '14',
    workerName: 'Sanya Khan',
    city: 'Mumbai',
    zone: 'West',
    eventType: 'Flood',
    claimDate: '2026-02-18',
    claimTime: '12:47',
    amount: 1000,
    paidDate: '2026-02-19',
    paidTime: '01:26',
    payoutTime: 12,
    fraudScore: 8,
    status: 'approved',
  },
  {
    id: 'CLM015',
    workerId: '15',
    workerName: 'Harsh Malhotra',
    city: 'Hyderabad',
    zone: 'South',
    eventType: 'Rain',
    claimDate: '2026-02-15',
    claimTime: '21:02',
    amount: 900,
    paidDate: '2026-02-16',
    paidTime: '06:45',
    payoutTime: 9,
    fraudScore: 7,
    status: 'approved',
  },
  {
    id: 'CLM016',
    workerId: '16',
    workerName: 'Meera Iyer',
    city: 'Kolkata',
    zone: 'East',
    eventType: 'Cyclone',
    claimDate: '2026-02-12',
    claimTime: '16:33',
    amount: 1150,
    paidDate: '2026-02-13',
    paidTime: '09:11',
    payoutTime: 16,
    fraudScore: 12,
    status: 'approved',
  },
  {
    id: 'CLM017',
    workerId: '17',
    workerName: 'Dev Nambiar',
    city: 'Bengaluru',
    zone: 'South',
    eventType: 'Pollution',
    claimDate: '2026-02-10',
    claimTime: '18:56',
    amount: 550,
    paidDate: '2026-02-11',
    paidTime: '04:02',
    payoutTime: 9,
    fraudScore: 4,
    status: 'approved',
  },
  {
    id: 'CLM018',
    workerId: '18',
    workerName: 'Shreya Joshi',
    city: 'Delhi',
    zone: 'North',
    eventType: 'Bandh',
    claimDate: '2026-02-08',
    claimTime: '06:11',
    amount: 1100,
    paidDate: '2026-02-08',
    paidTime: '14:28',
    payoutTime: 8,
    fraudScore: 11,
    status: 'approved',
  },
  {
    id: 'CLM019',
    workerId: '19',
    workerName: 'Nikhil Roy',
    city: 'Mumbai',
    zone: 'West',
    eventType: 'Rain',
    claimDate: '2026-02-05',
    claimTime: '22:17',
    amount: 875,
    paidDate: '2026-02-06',
    paidTime: '05:39',
    payoutTime: 7,
    fraudScore: 6,
    status: 'approved',
  },
  {
    id: 'CLM020',
    workerId: '20',
    workerName: 'Avni Desai',
    city: 'Chennai',
    zone: 'South',
    eventType: 'Flood',
    claimDate: '2026-02-02',
    claimTime: '11:44',
    amount: 925,
    paidDate: '2026-02-03',
    paidTime: '02:51',
    payoutTime: 15,
    fraudScore: 9,
    status: 'approved',
  },
];

// Demo Profile: Raju Kumar
export const RAJU_PROFILE = {
  id: '1',
  name: 'Raju Kumar',
  city: 'Bengaluru',
  zone: 'South',
  platform: 'Swiggy',
  coverage: 'Shield Plus',
  monthlyPremium: 89,
  weeklyEarnings: [8200, 8500, 7900, 8300],
  claimsHistory: [
    { date: 'Mar 15', event: 'Rain', amount: 850, status: 'paid' },
    { date: 'Feb 25', event: 'Bandh', amount: 1050, status: 'paid' },
  ],
};

// Statistics for home page
export const STATISTICS = {
  workers: '450M+',
  coverage: '<3%',
  losses: '₹1.2L Cr',
};

// Helper function to generate realistic payout times
export function getRandomPayoutTime(): number {
  return Math.floor(Math.random() * 8) + 7; // 7-14 minutes
}

// Helper function to generate fraud score
export function getRandomFraudScore(): number {
  return Math.floor(Math.random() * 10) + 2; // 2-12 out of 100
}

// Helper function to get random city
export function getRandomCity() {
  return CITIES[Math.floor(Math.random() * CITIES.length)];
}

// Helper function to get random worker
export function getRandomWorker() {
  return WORKERS[Math.floor(Math.random() * WORKERS.length)];
}

// Helper function to get random disruption type
export function getRandomDisruptionType() {
  return DISRUPTION_TYPES[Math.floor(Math.random() * DISRUPTION_TYPES.length)];
}
