export type PlanId = "member" | "circle";

export type Plan = {
  id: PlanId;
  name: string;
  line: string;
  open: boolean;
  price: string;
  figure: string;
  unit: string;
};

export const plans: Plan[] = [
  {
    id: "member",
    name: "Free",
    figure: "0",
    price: "$0",
    unit: "USD",
    line: "In the house. $0.",
    open: true,
  },
  {
    id: "circle",
    name: "Paid",
    figure: "25",
    price: "$25",
    unit: "USD / mo",
    line: "Free to be found. $25 for a card that pays you back.",
    open: false,
  },
];

export type CompareRow = {
  perk: string;
  free: boolean;
  paid: boolean;
  back?: number;
};

export const planCompare: CompareRow[] = [
  {
    perk: "Your page: name, photo, city, LinkedIn",
    free: true,
    paid: true,
  },
  {
    perk: "Open the roster. Follow who you met",
    free: true,
    paid: true,
  },
  {
    perk: "AI credits you already spend",
    free: false,
    paid: true,
    back: 100,
  },
  {
    perk: "Workshops at the member rate",
    free: false,
    paid: true,
    back: 80,
  },
  {
    perk: "Hotels when you travel for work",
    free: false,
    paid: true,
    back: 100,
  },
  {
    perk: "A desk when you need to sit and build",
    free: false,
    paid: true,
    back: 100,
  },
  {
    perk: "Dinner after work at the member rate",
    free: false,
    paid: true,
    back: 80,
  },
  {
    perk: "Coffee on a laptop day",
    free: false,
    paid: true,
    back: 40,
  },
  {
    perk: "The card in your wallet",
    free: false,
    paid: true,
  },
];

export const planBack =
  planCompare.reduce((sum, row) => sum + (row.back ?? 0), 0);

export function planById(id: string | undefined) {
  return plans.find((plan) => plan.id === id) ?? plans[0];
}

export function planLabel(id: string | undefined) {
  return planById(id).id === "circle" ? "Paid" : "Free member";
}
