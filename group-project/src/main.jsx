import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import UserDashboard from "./UserDashboard.jsx"
import Test from "./components/Test.jsx"
import Error404 from "./components/Error404.jsx"
import Transactions from "./Transactions.jsx"
import TransactionDisplayByID from "./components/TransactionDisplayByID.jsx"
import TransactionAdd from "./components/TransactionAdd.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar.jsx';
import Profile from './Profile.jsx';
import MyTrips from './MyTrips.jsx';
import TransactionSearch from "./components/TransactionSearch.jsx"
import Login from './Login.jsx';
import UserRegistration from './components/UserRegistration.jsx';
import TransactionUpdate from "./components/TransactionUpdate.jsx"
import TransactionDelete from "./components/TransactionDelete.jsx"
import TotalTransactionsChart from "./components/TotalTransactionsChart.jsx"
import ConvertTransactions from "./components/ConvertTransactions.jsx"
import Trips from "./Trips.jsx"
import TripAdd from "./components/TripAdd.jsx"
import TripSearch from "./components/TripSearch.jsx"
import TripByID from "./components/TripByID.jsx"
import TimeSeriesGraph from "./components/TimeSeriesGraph.jsx"
import TripUpdate from "./components/TripUpdate.jsx"
import TripDelete from "./components/TripDelete.jsx"
import ConvertTransactionsCard from './components/ConvertTransactionsCard.jsx';

const router = createBrowserRouter([
    {
            path: "/",
            element: <MyTrips />,
            errorElement: <Error404 />
    },
    {
        path: "/exchangeRates",
        element: <UserDashboard />,
        errorElement: <Error404 />
},

    {
        path: "/test",
        element: <Test />,
    },
    {
        path: "/transactions",
        element: <Transactions />,
//         children: [
//             {
//                 path: "/transactions/:transactionID",
//                 element: <TransactionDisplayByID />,
//             },
//         ]
    },
    {
        path: "/transactions/add",
        element: <TransactionAdd />,
    },
    {
        path: "/profile",
        element: <Profile />,
        errorElement: <Error404 />

    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <UserRegistration />,
    },
    {
        path: "/myTrips",
        element: <MyTrips />,
        errorElement: <Error404 />

    },

    {
        path: "/transactions/search",
        element: <TransactionSearch />,
    },

    {
        path: "/transactions/update/:id",
        element: <TransactionUpdate />,
    },
    {
        path: "/transactions/delete/:id",
        element: <TransactionDelete />,
    },
    {
        path: "transactions/chart",
        element: <TotalTransactionsChart />,
    },
    {
        path: "currency/convert",
        element: <ConvertTransactionsCard/>,
    },
 
    {
        path: "/trips",
        element: <Trips />,
    },
    {
        path: "/trips/add",
        element: <TripAdd />,
    },
    {
         path: "/trips/search",
         element: <TripSearch />,
     },
     {
         path: "/trips/ID/:ID",
         element: <TripByID />,
     },
    {
      path: "/timeSeriesGraph/:userDefaultCurrency/:targetCurrency",
      element: <TimeSeriesGraph />,
  },
    {
        path: "/trips/update/:id",
        element: <TripUpdate />
    },
    {
        path: "/trips/delete/:id",
        element: <TripDelete />,
    },


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>
)
