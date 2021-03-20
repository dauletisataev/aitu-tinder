import * as React from "react";
import UserIcon from '@heroicons/outline/user.svg'

export interface IClubhouseCardProps {
  title: string;
  tags: string[];
  peopleCount: number;
}

export const ClubhouseCard : React.FC<IClubhouseCardProps> = (props: IClubhouseCardProps) => {
  const {title, tags, peopleCount} = props;
  return (
    <div className="rounded-xl w-full p-4 bg-white shadow-xl">
      <p className="text-black text-xl font-medium mb-3">{title}</p>
      <div className="flex justify-between">
        <div className="flex flex-wrap">
          {tags.map((tag, index) =>
            <p
              key={index}
              className="border border-green-700 mr-1 rounded-md px-1 text-sm mb-1"
            >
              {tag}
            </p>
          )}
        </div>
        <div className="flex items-center">
          <UserIcon className="h-5 w-5 text-red-800" />
          <p className="text-red-800">{peopleCount}</p>
        </div>
      </div>
    </div>
  );
}
