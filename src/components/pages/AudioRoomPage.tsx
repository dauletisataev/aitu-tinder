import { Api } from "@src/api/Kis";
import { useStoreState } from "@src/hooks";
import * as React from "react";
import SoundSvg from "@heroicons/solid/volume-up.svg";
import { useHistory } from "react-router-dom";

interface IAudioRoomPageProps {}

const AudioRoomPage: React.FunctionComponent<IAudioRoomPageProps> = (props) => {
  const [loadinng, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const id = useStoreState((store) => store.id);
  const router = useHistory();

  React.useEffect(() => {
    const api = new Api(id);
    api.getRandomUser().then(({ data }) => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="h-full flex flex-col items-center bg-gray-50">
      {loadinng ? (
        <div className="text-lg font-bold animate-bounce my-auto">
          Подбираем для вас собеседника...
        </div>
      ) : (
        <>
          <div className="mt-20 w-56 h-56 shadow-xl bg-white rounded-lg flex items-center justify-center">
            <SoundSvg className="w-20 h-20 text-gray-800 animate-pulse" />
          </div>
          <button
            onClick={() => {
              const api = new Api(id);
              api.createChats({ user_id: user.id }).then(({ data, status }) => {
                if (status === 200 || status === 201) {
                  router.push(`/chat/${data.id}/${user.id}`);
                }
              });
            }}
            className="mt-4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Перейти в чат
          </button>
        </>
      )}
    </div>
  );
};

export default AudioRoomPage;
