// routes
import { PATH_DASHBOARD, PATH_AUTH } from "./routes/paths";

import SvgColor from "./components/SvgColor";

export const APP_NAME = "SGM";
export const API_URL = "https://adcl-api.herokuapp.com";
//export const API_URL = "http://127.0.0.1:8000";
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.affaire.root;

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const ICONS = {
  user: icon("ic_user"),
  ecommerce: icon("ic_ecommerce"),
  analytics: icon("ic_analytics"),
  dashboard: icon("ic_dashboard"),
};

export const navConfig = {
  brand: {
    text: APP_NAME,
    image: {
        src: "../public/LOGO-SGM.jpg",
    },
    link: { href: "#pablo" },
  },
  activeColor: "lightBlue",
  items: [
    { divider: true },
    { title: "Affaire" },
    {
      icon: "fas fa-list",
      text: "Liste",
      link: { href: PATH_DASHBOARD.affaire.root },
    },
    { divider: true },
    { title: "Machines" },
    {
      icon: "fas fa-cogs",
      text: "Gestion",
      link: { href: PATH_DASHBOARD.machines.root },
    },
    { divider: true },
    { title: "Planning" },
    {
      icon: "fas fa-tv",
      text: "Machines",
      link: { href: PATH_DASHBOARD.planning.machines },
    },
    //planning with icon calendar
    {
      icon: "fas fa-calendar-alt",
      text: "Zones",
      link: { href: PATH_DASHBOARD.planning.zones },
    },
    { divider: true },
    { title: "Modèles" },
    {
      icon: "fas fa-th-list",
      text: "Fiches Modèles",
      link: { href: PATH_DASHBOARD.modele.root },
    },
    { divider: true },
    {
      icon: "fas fa-sign-out-alt",
      text: "Déconnexion",
      link: { href: PATH_AUTH.logout },
      red: true,
    },
  ],
};
