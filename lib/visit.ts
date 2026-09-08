const ENTERED = "soulhause-entered-v1";
const HERO_SEEN = "soulhause-hero-seen-v1";

export function hasEnteredThisVisit() {
  return (
    typeof window !== "undefined" &&
    window.sessionStorage.getItem(ENTERED) === "1"
  );
}

export function markEntered() {
  window.sessionStorage.setItem(ENTERED, "1");
}

export function hasSeenHeroThisVisit() {
  return (
    typeof window !== "undefined" &&
    window.sessionStorage.getItem(HERO_SEEN) === "1"
  );
}

export function markHeroSeen() {
  window.sessionStorage.setItem(HERO_SEEN, "1");
}
