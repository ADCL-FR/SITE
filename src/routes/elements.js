import { Suspense, lazy } from "react";
// components
import LoadingScreen from "../components/loading-screen";

// ----------------------------------------------------------------------

const lazyWithRetry = (componentImport) =>
  lazy(async () => {
    const pageHasAlreadyBeenForceRefreshed = JSON.parse(
      window.localStorage.getItem("page-has-been-force-refreshed") || "false"
    );

    try {
      const component = await componentImport();

      window.localStorage.setItem("page-has-been-force-refreshed", "false");

      return component;
    } catch (error) {
      if (!pageHasAlreadyBeenForceRefreshed) {
        // Assuming that the user is not on the latest version of the application.
        // Let's refresh the page immediately.
        window.localStorage.setItem("page-has-been-force-refreshed", "true");
        return window.location.reload();
      }

      // The page has already been reloaded
      // Assuming that user is already using the latest version of the application.
      // Let's let the application crash and raise the error.
      throw error;
    }
  });

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

export const LoginPage = Loadable(
  lazyWithRetry(() => import("../pages/LoginPage"))
);
export const LogoutPage = Loadable(
  lazyWithRetry(() => import("../pages/LogoutPage"))
);
export const NouvelleAffaire = Loadable(
  lazyWithRetry(() => import("../pages/Affaire/NouvelleAffaire"))
);
export const ListeAffaire = Loadable(
  lazyWithRetry(() => import("../pages/Affaire/ListeAffaire"))
);
export const DetailsAffaire = Loadable(
  lazyWithRetry(() => import("../pages/Affaire/AffaireDetail"))
);
export const DetailsFiche = Loadable(
  lazyWithRetry(() => import("../pages/Fiche/FicheDetail"))
);

export const PlanningZone = Loadable(
  lazyWithRetry(() => import("../pages/Planning/Zones"))
);
export const PlanningMachine = Loadable(
  lazyWithRetry(() => import("../pages/Planning/Machines"))
);

export const ListeMachine = Loadable(
  lazyWithRetry(() => import("../pages/Machine/ListeMachines"))
);

export const ListeModele = Loadable(
  lazyWithRetry(() => import("../pages/Modele/ListeModele"))
);
