import * as React from "react";
import cn from "classnames";
import { useStoreState } from "@src/hooks";
import { Api } from "@src/api/Kis";
import LoadingContainer from "../atoms/LoadingContainer";
import CancelSvg from "@heroicons/solid/x.svg";
import LoadingSpinner, { Size } from "../atoms/LoadingSpinner";

interface ILikesPageProps {}

const Switcher: React.FC<{ tab: string; settab: any }> = ({ tab, settab }) => {
  return (
    <div className="flex justify-center items-center mt-2">
      <div className="shadow flex">
        <div
          className={cn("rounded-l p-2 w-40 text-center", {
            "bg-indigo-500 text-white": tab == "me",
          })}
          onClick={() => {
            settab("me");
          }}
        >
          Мои лайки
        </div>
        <div
          className={cn("rounded-r p-2 border-l w-40 text-center", {
            "bg-indigo-500 text-white": tab == "users",
          })}
          onClick={() => {
            settab("users");
          }}
        >
          Меня лайкнули
        </div>
      </div>
    </div>
  );
};

const ILikedUsers: React.FC = () => {
  const id = useStoreState((store) => store.id);
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = React.useState([]);
  const [removingLikeId, setRemovingLikeId] = React.useState("");

  React.useEffect(() => {
    const api = new Api(id);
    api
      .iLikedUsers()
      .then(({ data }) => {
        setUsers(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const onRemove = (user) => {
    setRemovingLikeId(user.id);
    const api = new Api(id);
    api
      .removeMyLike(user.id)
      .then(() => {
        setUsers(users.filter((u) => u.id != user.id));
      })
      .finally(() => setRemovingLikeId(""));
  };

  return (
    <LoadingContainer loading={loading}>
      <div className="flex flex-col space-y-2 mt-4">
        {users.map((user) => (
          <div className="rounded-md shadow-md p-2 flex items-center">
            <img
              src={
                user.avatar_url ||
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=668&q=80"
              }
              className="w-10 h-10 object-cover bg-gray-50 rounded-full"
              key={`user-${user.id}`}
            />
            <div className="font-bold text-lg ml-3">
              {user.name}, {user.age}
            </div>
            {removingLikeId == user.id ? (
              <LoadingSpinner size={Size.m} />
            ) : (
              <button className="ml-auto" onClick={(_) => onRemove(user)}>
                <CancelSvg className="w-8 h-8 shadow-md rounded-full text-red-600" />
              </button>
            )}
          </div>
        ))}
      </div>
    </LoadingContainer>
  );
};

const UsersLikedMe: React.FC = () => {
  const id = useStoreState((store) => store.id);
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    const api = new Api(id);
    api
      .usersLikedMe()
      .then(({ data }) => {
        setUsers(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <LoadingContainer loading={loading}>
      <div className="flex flex-col space-y-2 mt-4">
        {users.map((user) => (
          <div className="rounded-md shadow-md p-2 flex items-center">
            <img
              src={
                user.avatar_url ||
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=668&q=80"
              }
              className="w-10 h-10 object-cover bg-gray-50 rounded-full"
            />
            <div className="font-bold text-lg ml-3">
              {user.name}, {user.age}
            </div>
          </div>
        ))}
      </div>
    </LoadingContainer>
  );
};

const LikesPage: React.FunctionComponent<ILikesPageProps> = (props) => {
  let [tab, settab] = React.useState("me");

  return (
    <div className="">
      <Switcher tab={tab} settab={settab} />
      {tab == "me" ? <ILikedUsers /> : <UsersLikedMe />}
    </div>
  );
};

export default LikesPage;
