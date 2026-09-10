import { events } from "@/lib/events";
import { ADMIN_ID, MEMBER_ID, memberById, pendingDemoMember } from "@/lib/members";
import { seedDemoCheckins } from "@/lib/presence";
import { seedDemoFeed } from "@/lib/feed";
import {
  readGuests,
  upsertGuest,
  writeDemoRole,
  writeFollow,
  writeGoing,
  writeIntents,
  writeIntros,
  writeProfile,
  writePulses,
  writeRsvp,
  writeTaste,
  writeWent,
  writeSeekConfirmed,
  writeDemoWalk,
  clearMemberAccount,
  type DemoRole,
} from "@/lib/prefs";

export function applyDemo(role: DemoRole) {
  const night = events[0]?.id ?? "hause-of-soul";
  const admin = memberById(ADMIN_ID);
  const member = memberById(MEMBER_ID);
  if (!admin || !member) return;

  writeDemoRole(role);
  writeSeekConfirmed(false);

  const niaGuest = readGuests().find((item) => item.id === MEMBER_ID);
  const niaStatus = niaGuest?.status ?? "pending";

  if (!readGuests().some((item) => item.id === pendingDemoMember.id)) {
    upsertGuest(pendingDemoMember);
  }

  if (role === "admin") {
    writeProfile({ ...admin, status: "approved", planId: "member" });
    writeTaste({ roles: ["Founder", "Builder"] });
    writeFollow([]);
    writeRsvp([night]);
    writeWent([night]);
    writeGoing([
      {
        id: admin.id,
        eventId: night,
        name: admin.name,
        link: admin.link,
      },
      {
        id: member.id,
        eventId: night,
        name: member.name,
        link: member.link,
      },
    ]);
    writeIntents(["hiring", "learning"]);
    writePulses([
      {
        eventId: night,
        room: "great",
        again: true,
        nextHost: "A cyber + career-change night",
      },
    ]);
    writeIntros([
      {
        toId: "sam",
        toName: "Sam Okonkwo",
        note: "Nia asked for an intro — first developer role.",
      },
    ]);
    seedDemoCheckins(night, admin.id);
    seedDemoFeed();
    return;
  }

  const nia = { ...member, status: niaStatus, planId: "member" as const };
  upsertGuest(nia);
  writeProfile(nia);
  writeTaste({ roles: ["Transitioning", "Job seeker"] });
  writeFollow([]);
  writeRsvp([night]);
  writeWent([]);
  writeGoing([
    {
      id: member.id,
      eventId: night,
      name: member.name,
      link: member.link,
    },
  ]);
  writeIntents(member.interests ?? ["learning"]);
  writePulses([]);
  writeIntros([]);
  seedDemoCheckins(night, member.id);
  seedDemoFeed();
}

export function startClickthroughDemo(role: DemoRole = "admin") {
  writeDemoWalk(true);
  applyDemo(role);
}

export function startNewUserDemo() {
  clearMemberAccount();
  writeDemoWalk(true);
}
