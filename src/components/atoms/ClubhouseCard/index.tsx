import * as React from "react";
import UserIcon from "@heroicons/solid/user.svg";
import { useHistory } from "react-router-dom";

export interface IClubhouseCardProps {
  title: string;
  tags: Array<{
    id: string;
    name: string;
  }>;
  peopleCount: number;
}

export const ClubhouseCard: React.FC<IClubhouseCardProps> = (
  props: IClubhouseCardProps,
) => {
  const { title, tags, peopleCount } = props;
  const history = useHistory();
  return (
    <div
      className="rounded-xl w-full p-4 bg-white shadow-xl"
      onClick={(_) => history.push("/clubhouse/room")}
    >
      <p className="text-black text-xl font-medium mb-3">{title}</p>
      <div className="flex justify-between">
        <div className="flex flex-wrap">
          {tags.map((tag) => (
            <p
              key={tag.id}
              className="border border-green-700 mr-1 rounded-md px-1 text-sm mb-1"
            >
              {tag.name}
            </p>
          ))}
        </div>
        <div className="flex items-center">
          <p className="text-gray-600">{peopleCount}</p>
          <UserIcon className="h-4 w-4 text-gray-600" />
        </div>
      </div>
    </div>
  );
};
