import * as React from "react";
import {ClubhouseCard} from "@atoms/ClubhouseCard";
import {Link} from 'react-router-dom'

interface IDashboardTinderProps {}

const cards = [
  {
    title: 'Harry Potter',
    tags: ['movie', 'harry', 'tinder', 'fun'],
    peopleCount: 39,
  },
  {
    title: 'Футбол',
    tags: ['роналду', 'месси', 'барса', 'реал', 'юве'],
    peopleCount: 12,
  },
  {
    title: 'Путешествия',
    tags: ['путешествие', 'знакомства', 'париж', 'рим', 'италия'],
    peopleCount: 143,
  },
  {
    title: 'Мстители',
    tags: ['железный человек', 'Алая ведьма', 'Кэп', 'Тор', 'Халк', 'Соколиный глаз'],
    peopleCount: 57,
  },
  {
    title: 'Актобе',
    tags: ['актобе', 'ктл', 'ниш', 'Жубанов'],
    peopleCount: 4,
  }
]

const Switcher: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="shadow flex">
        <Link to="/">
          <div className="rounded-l p-2 border-l w-30 text-center">
            Tinder
          </div>
        </Link>
        <div className="rounded-r p-2 bg-red-500 text-white w-30 text-center">Clubhouse</div>
      </div>
    </div>
  );
};

const ClubHouse: React.FunctionComponent<IDashboardTinderProps> = (
  props,
) => {
  return (
    <div className="p-8">
      <Switcher />
      {cards.map(({title, tags, peopleCount}, index) =>
        <div className="mb-4">
          <ClubhouseCard key={title + index} title={title} tags={tags} peopleCount={peopleCount} />
        </div>
      )}
    </div>
  );
};

export default ClubHouse;
