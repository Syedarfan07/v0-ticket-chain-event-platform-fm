export interface Event {
  id: string
  title: string
  description: string
  venue: string
  date: string
  time: string
  category: string
  imageUrl: string
  price: number
  supply: number
  sold: number
  organizer: string
  status: "active" | "cancelled" | "sold-out"
}

export interface Ticket {
  id: string
  eventId: string
  eventTitle: string
  venue: string
  date: string
  time: string
  imageUrl: string
  tokenId: string
  ownerAddress: string
  isUsed: boolean
  purchasePrice: number
  resalePrice?: number
  isListedForResale: boolean
}

export const MOCK_EVENTS: Event[] = [
  {
    id: "evt-001",
    title: "ETH Global Hackathon 2026",
    description:
      "Join the world's largest Ethereum hackathon. Build, ship, and win prizes in 48 hours. Network with top Web3 builders and investors.",
    venue: "Moscone Center, San Francisco",
    date: "2026-04-15",
    time: "09:00",
    category: "Conference",
    imageUrl: "/images/event-1.jpg",
    price: 0.15,
    supply: 500,
    sold: 342,
    organizer: "0x1234...abcd",
    status: "active",
  },
  {
    id: "evt-002",
    title: "DeFi Summit Tokyo",
    description:
      "The premier DeFi conference in Asia. Explore the future of decentralized finance with panels, workshops, and exclusive networking.",
    venue: "Tokyo International Forum",
    date: "2026-05-20",
    time: "10:00",
    category: "Conference",
    imageUrl: "/images/event-2.jpg",
    price: 0.25,
    supply: 300,
    sold: 178,
    organizer: "0x5678...efgh",
    status: "active",
  },
  {
    id: "evt-003",
    title: "NFT Art Basel",
    description:
      "A curated exhibition of digital art and NFT collections from the world's most innovative artists. Live minting experiences on-site.",
    venue: "Art Basel, Miami Beach",
    date: "2026-06-10",
    time: "18:00",
    category: "Art",
    imageUrl: "/images/event-3.jpg",
    price: 0.08,
    supply: 1000,
    sold: 1000,
    organizer: "0x9abc...ijkl",
    status: "sold-out",
  },
  {
    id: "evt-004",
    title: "Web3 Music Festival",
    description:
      "An immersive music and blockchain experience. Enjoy live performances while earning token rewards. All tickets are dynamic NFTs.",
    venue: "Warehouse District, Berlin",
    date: "2026-07-22",
    time: "20:00",
    category: "Music",
    imageUrl: "/images/event-4.jpg",
    price: 0.12,
    supply: 2000,
    sold: 856,
    organizer: "0xdef0...mnop",
    status: "active",
  },
  {
    id: "evt-005",
    title: "DAO Governance Workshop",
    description:
      "A hands-on workshop exploring DAO governance models, voting mechanisms, and treasury management best practices.",
    venue: "Online / Virtual",
    date: "2026-03-28",
    time: "14:00",
    category: "Workshop",
    imageUrl: "/images/event-5.jpg",
    price: 0.02,
    supply: 200,
    sold: 45,
    organizer: "0x1234...abcd",
    status: "active",
  },
  {
    id: "evt-006",
    title: "Blockchain Gaming Expo",
    description:
      "Play-to-earn meets esports. Demo the latest blockchain games, compete for prizes, and connect with gaming studios building in Web3.",
    venue: "Convention Center, Seoul",
    date: "2026-08-05",
    time: "11:00",
    category: "Gaming",
    imageUrl: "/images/event-6.jpg",
    price: 0.05,
    supply: 800,
    sold: 423,
    organizer: "0x5678...efgh",
    status: "active",
  },
]

export const MOCK_TICKETS: Ticket[] = [
  {
    id: "tkt-001",
    eventId: "evt-001",
    eventTitle: "ETH Global Hackathon 2026",
    venue: "Moscone Center, San Francisco",
    date: "2026-04-15",
    time: "09:00",
    imageUrl: "/images/event-1.jpg",
    tokenId: "#4521",
    ownerAddress: "0xUser...1234",
    isUsed: false,
    purchasePrice: 0.15,
    isListedForResale: false,
  },
  {
    id: "tkt-002",
    eventId: "evt-004",
    eventTitle: "Web3 Music Festival",
    venue: "Warehouse District, Berlin",
    date: "2026-07-22",
    time: "20:00",
    imageUrl: "/images/event-4.jpg",
    tokenId: "#1089",
    ownerAddress: "0xUser...1234",
    isUsed: false,
    purchasePrice: 0.12,
    resalePrice: 0.18,
    isListedForResale: true,
  },
  {
    id: "tkt-003",
    eventId: "evt-005",
    eventTitle: "DAO Governance Workshop",
    venue: "Online / Virtual",
    date: "2026-03-28",
    time: "14:00",
    imageUrl: "/images/event-5.jpg",
    tokenId: "#0032",
    ownerAddress: "0xUser...1234",
    isUsed: true,
    purchasePrice: 0.02,
    isListedForResale: false,
  },
]

export const CATEGORIES = [
  "All",
  "Conference",
  "Music",
  "Art",
  "Workshop",
  "Gaming",
]
