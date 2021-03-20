import * as React from "react";
import TinderCard = require("react-tinder-card");
import HeartSvg from "@heroicons/solid/heart.svg";
import CancelSvg from "@heroicons/solid/x.svg";
import cn from "classnames";
import { useStoreActions, useStoreState } from "@src/hooks";
import { Api } from "@src/api/Kis";

const TinderCards: React.FC<{ users: any[] }> = ({ users }) => {
  const [currentUsers, setUsers] = React.useState(users);
  const id = useStoreState((store) => store.id);

  return (
    <div className="relative flex items-center mt-2 flex-col h-full">
      {currentUsers.map((person, index) => {
        return (
          <TinderCard
            key={`person-${index}`}
            preventSwipe={["up", "down"]}
            className="absolute top-10"
            onSwipe={(direction) => {
              const api = new Api(id);
              api.likeUser(person.id, {
                hacknu_user: {
                  like_type: direction == "right" ? "like" : "dislike",
                },
              });
              setUsers(currentUsers.slice(1));
            }}
          >
            <div className="rounded-2xl">
              <img
                src={
                  person.imageUrl ||
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=668&q=80"
                }
                className={cn("w-80 h-80 object-cover rounded-2xl", {
                  "shadow-2xl": index < 2,
                })}
              />
              <h3 className="text-lg text-white absolute bottom-2 left-2">
                {person.name}, {person.age}
              </h3>
            </div>
          </TinderCard>
        );
      })}
      {currentUsers.length == 0 && (
        <div className="text-lg font-semibold">На сегодня все</div>
      )}
      <div className="mt-96 flex space-x-4">
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

interface IDashboardTinderProps {
  users: any[];
}

const DashboardTinder: React.FunctionComponent<IDashboardTinderProps> = ({
  users,
}) => {
  return (
    <div className="flex-1">
      <TinderCards users={users} />
    </div>
  );
};

export default DashboardTinder;
