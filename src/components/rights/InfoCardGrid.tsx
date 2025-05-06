
import React, { ReactNode } from "react";
import InfoCard from "@/components/common/InfoCard";

interface InfoCardItem {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

interface InfoCardGridProps {
  cards: InfoCardItem[];
  columns?: 2 | 3;
  className?: string;
}

/**
 * Reusable grid of info cards used across rights pages
 */
const InfoCardGrid = ({ cards, columns = 3, className = "" }: InfoCardGridProps) => {
  return (
    <div className={`grid md:grid-cols-${columns} gap-6 my-8 ${className}`}>
      {cards.map((card, index) => (
        <InfoCard
          key={index}
          icon={card.icon}
          title={card.title}
          description={card.description}
          className={card.className}
        />
      ))}
    </div>
  );
};

export default InfoCardGrid;
