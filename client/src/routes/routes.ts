interface IRoute {
  name: string;
  path: string;
}

const routes: IRoute[] = [
  {name: "home", path: "/"},
  {name: "weather", path: "/weather/:city"},
  {name: "about", path: "/about"}
];

export default routes;
