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

interface IRegistrationPageProps {}

const RegistrationPage: React.FunctionComponent<IRegistrationPageProps> = (
  props,
) => {
  const history = useHistory();

  const [user, setUser] = React.useState(null);

  const [name, setName] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [city, setCity] = React.useState("");
  const [lat, setLat] = React.useState(0);
  const [lng, setLng] = React.useState(0);
  const [tags, setTags] = React.useState([]);
  const [avatar, setAvatar] = React.useState("");
  const [age, setAge] = React.useState(0);
  const [gender, setGender] = React.useState("");
  const [inFirstStage, setInFirstStage] = React.useState(true);

  const setId = useStoreActions((store) => store.setId);
  const id = useStoreState((store) => store.id);

  const onUploadFile = (e) => {
    const file = e.target.files[0];
    const storageRef = firebaseapp.storage().ref();
    const fileRef = storageRef.child(file.name);
    fileRef.put(file).then(() => {
      fileRef.getDownloadURL().then(setAvatar);
    });
  };

  React.useEffect(() => {
    const api = new Api("");
    api.tags().then(({ data }) => {
      setTags(
        data.map((tag) => {
          return { ...tag, selected: false };
        }),
      );
      console.log(tags);
    });
    aituBridge.getMe().then((data) => {
      setUser(data);
      setName(data.name);
      setLastname(data.lastname);
      setAvatar(data.avatar);
      setId(`${hashString(data.id)}`);
    });

    aituBridge.getGeo().then((data) => {
      setLat(data.latitude);
      setLng(data.longitude);
    });
  }, []);

  const onRegister = () => {
    // alert("id = " + id);
    const api = new Api(id);

    api
      .register({
        user_tags_attributes: tags
          .filter((tag) => tag.selected)
          .map((tag) => ({ tag_id: tag.id })),
        hacknu_preference_attributes: {
          min_age: 18,
          max_age: 30,
          distance: 25000,
        },
        name,
        lastname,
        gender,
        age,
        city,
        lat,
        lng,
        sign: user.sign,
        avatar_url: avatar,
        aitu_id_string: user.id,
      })
      .then(() => {
        window.location.reload();
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4">
      {/* {JSON.stringify(user)} */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto rounded-md"
          src={LogoUrl}
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Привет, {name}
        </h2>
        <p className="mt-2 text-center text-sm font-medium text-gray-600 max-w">
          Здесь ты найдешь, то что искал
        </p>
      </div>
      {inFirstStage ? (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md  animate-fade-in">
          <div className="bg-white py-8 px-4   rounded-lg sm:px-10">
            <form
              className="space-y-6"
              onSubmit={(ev) => {
                setInFirstStage(false);
                ev.preventDefault();
              }}
            >
              <TextField
                label="Возраст"
                type="number"
                required
                fullWidth
                variant="outlined"
                onChange={(e) => setAge(parseInt(e.target.value))}
                //   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />

              <FormControl variant="filled" className="w-full">
                <InputLabel id="demo-simple-select-filled-label">
                  Пол
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={gender}
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    setGender(event.target.value)
                  }
                >
                  <MenuItem value={"man"}>Мужчина</MenuItem>
                  <MenuItem value={"woman"}>Женщина</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Город"
                type="text"
                fullWidth
                variant="outlined"
                onChange={(e) => setCity(e.target.value)}
                //   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <div className="mt-6">
                <label className="block text-sm leading-5 font-medium text-gray-700 mb-2">
                  Фото
                </label>
                <input
                  type="file"
                  onChange={onUploadFile}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Далее
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md transition-all animate-slideInFromRight">
          <div className="bg-white py-8 pt-4 px-4 rounded-lg sm:px-10">
            <h3 className="text-lg font-medium px-2">Выберите интересы:</h3>
            <div className="flex flex-wrap mt-4">
              {tags.map((tag, index) => (
                <div
                  className={cn("rounded-full shadow py-1 px-2 mx-1 mt-1", {
                    "bg-indigo-600 text-white": tag.selected,
                  })}
                  key={`tag-${index}`}
                  onClick={() => {
                    setTags(
                      tags.map((t) => {
                        return tag.id == t.id
                          ? { ...tag, selected: !tag.selected }
                          : t;
                      }),
                    );
                  }}
                >
                  {tag.name}
                </div>
              ))}
            </div>
            <div>
              <button
                type="button"
                onClick={onRegister}
                className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Зарегистрироваться
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationPage;
