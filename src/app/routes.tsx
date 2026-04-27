import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { LockScreen } from "./pages/LockScreen";
import { TestInterface } from "./pages/TestInterface";
import { SubmissionSuccess } from "./pages/SubmissionSuccess";
import { ResultsLockScreen } from "./pages/ResultsLockScreen";
import { Results } from "./pages/Results";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: LockScreen },
      { path: "test", Component: TestInterface },
      { path: "success", Component: SubmissionSuccess },
      { path: "results-lock", Component: ResultsLockScreen },
      { path: "results", Component: Results },
      { path: "*", Component: NotFound },
    ],
  },
]);
