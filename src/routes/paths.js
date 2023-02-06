// ----------------------------------------------------------------------

function paths(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = "/dashboard";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: "/login",
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  affaire: {
    root: paths(ROOTS_DASHBOARD, "/affaire"),
    new: paths(ROOTS_DASHBOARD, "/affaire/nouvelle"),
    //view: (num) => paths(ROOTS_DASHBOARD, `/affaire/${num}`),
    //edit: (num) => paths(ROOTS_DASHBOARD, `/affaire/${num}/edit`),
  },
  fiche: paths(ROOTS_DASHBOARD, "/fiche"),
  planning: {
    root: paths(ROOTS_DASHBOARD, "/planning"),
    operateur: paths(ROOTS_DASHBOARD, "/planning/operateur"),
    zones: paths(ROOTS_DASHBOARD, "/planning/zones"),
    machines: paths(ROOTS_DASHBOARD, "/planning/machines"),
    // TODO : Zone : fiche vers zone pour machine ajustage
    // planning machine fiche  en fonction des machines nécessaire
    // TODO : ajout / supression utilisateur / employés

    //view: (num) => paths(ROOTS_DASHBOARD, `/affaire/${num}`),
    //edit: (num) => paths(ROOTS_DASHBOARD, `/affaire/${num}/edit`),
  },
  // user: {
  //   root: paths(ROOTS_DASHBOARD, '/user'),
  //   four: paths(ROOTS_DASHBOARD, '/user/four'),
  //   five: paths(ROOTS_DASHBOARD, '/user/five'),
  //   six: paths(ROOTS_DASHBOARD, '/user/six'),
  // },
};
