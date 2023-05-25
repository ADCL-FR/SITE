import "@notus-pro/react/tailwind.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// ----------------------------------------------------------------------

import ReactDOM from 'react-dom/client';
// components


// Check our docs
// https://docs.minimals.cc/authentication/js-version


//
import App from './App';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import reportWebVitals from './reportWebVitals';

// sentry
import * as Sentry from "@sentry/react";

Sentry.init({
    dsn: "https://e8c7fa432d6f4a88a42628aa46d95fee@o4505243547140096.ingest.sentry.io/4505244248702976",
    integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
    beforeSend(event, hint) {
        // Check if it is an exception, and if so, show the report dialog
        if (event.exception) {
            Sentry.showReportDialog({ eventId: event.event_id });
        }
        return event;
    },

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,

    // Capture Replay for 10% of all sessions,
    // plus for 100% of sessions with an error
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
});


// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <DndProvider backend={HTML5Backend}>
    <App />
  </DndProvider>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();



/*
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/

