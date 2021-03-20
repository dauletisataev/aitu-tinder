import * as React from "react";
import TinderCard = require("react-tinder-card");
import HeartSvg from "@heroicons/solid/heart.svg";
import CancelSvg from "@heroicons/solid/x.svg";

const TinderCards: React.FC = () => {
  const people = [
    {
      name: "Daulet",
      imageUrl:
        "https://images.unsplash.com/photo-1558507652-2d9626c4e67a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      age: 21,
    },
    {
      name: "Daneker",
      imageUrl:
        "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80",
      age: 21,
    },
    {
      name: "Saddam",
      imageUrl:
        "https://images.unsplash.com/photo-1527082395-e939b847da0d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80",
      age: 21,
    },
    {
      name: "Nursultan",
      imageUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=668&q=80",
      age: 21,
    },
  ];
  return (
    <div className="relative flex justify-center items-center mt-2 flex-col h-full">
      {people.map((person, index) => {
        return (
          <TinderCard
            key={`person-${index}`}
            preventSwipe={["up", "down"]}
            className="absolute"
          >
            <div className="rounded-2xl">
              <img
                src={person.imageUrl}
                className="w-80 h-80 object-cover rounded-2xl shadow-2xl"
              />
              <h3 className="text-lg text-white absolute bottom-2 left-2">
                {person.name}, {person.age}
              </h3>
            </div>
          </TinderCard>
        );
      })}
      <div className="mt-auto mb-24 flex space-x-4">
        <div className="rounded-full shadow-button p-2 ">
          <CancelSvg className="w-8 h-8 text-indigo-700" />
        </div>
        <div className="rounded-full shadow-button p-2">
          <HeartSvg className="w-8 h-8 text-red-600" />
        </div>
      </div>
    </div>
  );
};

interface IDashboardTinderProps {}

const DashboardTinder: React.FunctionComponent<IDashboardTinderProps> = (
  props,
) => {
  return (
    <div className="flex-1">
      <TinderCards />
    </div>
  );
};

export default DashboardTinder;
