import * as React from "react";
import { ClubhouseCard } from "@atoms/ClubhouseCard";
import PlusIcon from '@heroicons/outline/plus.svg'

interface IDashboardTinderProps {}

const cards = [
  {
    title: "Harry Potter",
    tags: ["movie", "harry", "tinder", "fun"],
    peopleCount: 39,
  },
  {
    title: "Футбол",
    tags: ["роналду", "месси", "барса", "реал", "юве"],
    peopleCount: 12,
  },
  {
    title: "Путешествия",
    tags: ["путешествие", "знакомства", "париж", "рим", "италия"],
    peopleCount: 143,
  },
  {
    title: "Мстители",
    tags: [
      "железный человек",
      "Алая ведьма",
      "Кэп",
      "Тор",
      "Халк",
      "Соколиный глаз",
    ],
    peopleCount: 57,
  },
  {
    title: "Актобе",
    tags: ["актобе", "ктл", "ниш", "Жубанов"],
    peopleCount: 4,
  },
];

const AddButton: React.FC = () => {
  return <button className="rounded-full fixed bottom-4 right-2 p-3 bg-pink-500">
    <PlusIcon className="h-6 w-6 text-white" />
  </button>
}

const ClubHouse: React.FunctionComponent<IDashboardTinderProps> = (props) => {
  return (
    <div className="p-2">
      {cards.map(({ title, tags, peopleCount }, index) => (
        <div className="mb-4">
          <ClubhouseCard
            key={title + index}
            title={title}
            tags={tags}
            peopleCount={peopleCount}
          />
        </div>
      ))}
      <AddButton />
    </div>
  );
};

export default ClubHouse;
