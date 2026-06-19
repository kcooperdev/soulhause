"use client";

import { PathwayAnchor } from "./PathwayAnchor";

type Tab = {
  id: string;
  label: string;
  tone: number;
};

export function PathwayTabs({ tabs }: { tabs: Tab[] }) {
  return (
    <div className="pathway-tabs">
      {tabs.map((tab) => (
        <PathwayAnchor
          key={tab.id}
          id={tab.id}
          className={`pathway-tab pathway-tab--${tab.tone}`}
        >
          {tab.label}
        </PathwayAnchor>
      ))}
    </div>
  );
}
