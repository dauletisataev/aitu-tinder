import * as React from "react";
import StarSvg from "@heroicons/solid/star.svg";
interface ILocationsPageProps {}

const LocationsPage: React.FunctionComponent<ILocationsPageProps> = (props) => {
  return (
    <div className="grid grid-cols-2 gap-1 bg-gray-50 p-2">
      <div className="rounded-md shadow-lg flex flex-col h-48">
        <img
          src="https://i.ytimg.com/vi/uwnVPWXbwPw/maxresdefault.jpg"
          className="w-full object-cover h-32 rounded-t-md"
        />
        <div className="text-lg font-bold mx-2">Коктобе</div>
        <div className="flex space-x-1 items-center mx-2">
          <StarSvg className="w-4 h-4 text-gray-500" />
          <div className="text-base font-medium">4.5</div>
        </div>
      </div>
      <div className="rounded-md shadow-lg flex flex-col h-48">
        <img
          src="https://ticketon.kz/files/images/medeu-675.jpg"
          className="w-full object-cover h-32 rounded-t-md"
        />
        <div className="text-lg font-bold mx-2">Медеу</div>
        <div className="flex space-x-1 items-center mx-2">
          <StarSvg className="w-4 h-4 text-gray-500" />
          <div className="text-base font-medium">4.3</div>
        </div>
      </div>
      <div className="rounded-md shadow-lg flex flex-col h-48">
        <img
          src="https://sxodim.com/uploads/almaty/2018/06/image1-1-745x496.jpeg"
          className="w-full object-cover h-32 rounded-t-md"
        />
        <div className="text-lg font-bold mx-2">Крапива боулинг</div>
        <div className="flex space-x-1 items-center mx-2">
          <StarSvg className="w-4 h-4 text-gray-500" />
          <div className="text-base font-medium">4.1</div>
        </div>
      </div>
    </div>
  );
};

export default LocationsPage;
