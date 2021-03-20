import * as React from "react";
import { Api } from "@src/api/Kis";
import { useHistory } from "react-router-dom";
import Button from "@src/components/atoms/Button";
import LogoImageUrl from "@src/assets/img/logo.png";
import { useStoreActions } from "@src/hooks";
import { setKisToken } from "@src/utils/utils";

interface IEnterNamePageProps {}

const LoginPage: React.FunctionComponent<IEnterNamePageProps> = (props) => {
  const api = new Api();
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const currentUserActions = useStoreActions((store) => store.user);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = () => {
    setLoading(true);
    api
      .login({ user: { email, password } })
      .then((user) => {
        setKisToken(user.data.authentication_token);
        currentUserActions.setUser(user.data);
        history.push("account");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src={LogoImageUrl}
          alt="Workflow"
        />
        <h2 className="text-center text-3xl leading-9 font-extrabold text-gray-900">
          WasteZero
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h3 className="text-left text-2xl leading-6 font-extrabold text-gray-900">
            Sign in to your account
          </h3>
          <form
            onSubmit={(ev) => {
              login();
              ev.preventDefault();
            }}
            method="POST"
            className="mt-4"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  type="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mt-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm leading-5 text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm leading-5">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <Button
                  type="submit"
                  disabled={loading}
                  loading={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                >
                  Sign in
                </Button>
              </span>
            </div>
            <p className="mt-2 text-center text-sm leading-5 text-gray-600 max-w">
              Or{" "}
              <a className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                register here
              </a>
            </p>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm leading-5">
                <span className="px-2 bg-white text-gray-500">
                  © WasteZero - 2020
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
