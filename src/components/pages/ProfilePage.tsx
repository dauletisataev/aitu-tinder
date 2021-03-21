import * as React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { Api } from "@src/api/Kis";
import cn from "classnames";
import LogoUrl from "@assets/img/baq-logo.jpg";
import aituBridge from "@btsd/aitu-bridge";
import { useHistory } from "react-router-dom";
import { hashString, setKisToken } from "@src/utils/utils";
import { useStoreActions, useStoreState } from "@src/hooks";
import { firebaseapp } from "@src/utils/firebase";
import { useState } from "react";
import LocationIcon from "@heroicons/solid/location-marker.svg";
import LoadingContainer from "@atoms/LoadingContainer";

interface IRegistrationPageProps {}

const ProfilePage: React.FunctionComponent<IRegistrationPageProps> = (
  props,
) => {
  const history = useHistory();
  const id = useStoreState((store) => store.id);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setLoading(true);
    const api = new Api(id);
    api.userInfo(id).then(({ data }) => {
      setUserInfo(data);
      setLoading(false);
      console.log(data);
    });
  }, []);

  return (
    <LoadingContainer loading={loading}>
      {userInfo && (
        <div className="flex flex-col mt-5 items-center px-5">
          <img
            className="rounded-full w-36 h-36"
            src={
              userInfo.avatar_url ||
              "https://image.freepik.com/free-vector/portrait-caucasian-woman-profile-with-long-hair-avatar-young-white-girl_102172-419.jpg"
            }
          />
          <p className="text-2xl mt-4">
            {userInfo.name} {userInfo.lastname}
          </p>
          <div className="flex mt-4 items-center">
            <LocationIcon className="text-gray-600 w-6 h-6" />
            <p className="text-xl">{userInfo.city}</p>
          </div>
          <p className="text-xl mt-4">Ваши предпочтения:</p>
          <div className="flex row flex-wrap items-center justify-center ">
            {userInfo.user_tags &&
              userInfo.user_tags.map((tag) => (
                <div
                  key={tag.id}
                  className="mt-2 border border-green-500 px-4 py-1 text-md rounded-xl mr-2"
                >
                  {tag.tag.name}
                </div>
              ))}
          </div>
        </div>
      )}
    </LoadingContainer>
  );
};

export default ProfilePage;
