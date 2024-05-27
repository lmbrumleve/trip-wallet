import React, { Component } from 'react';
import {Navbar, Nav, NavDropdown, Form, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom";
import UserDashboard from '../UserDashboard';
import CalculateIcon from '@mui/icons-material/Calculate';
import { CalculateRounded } from '@mui/icons-material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WalletIcon from '@mui/icons-material/Wallet';
import PublicIcon from '@mui/icons-material/Public';


export default class NavBar extends Component {

    render() {

/*logout:
window.localStorage.removeItem('jwtToken');
router.push('/login');
*/
const handleLogout = () => {
    console.log('a1');
//  const navigate = useNavigate();
  // Remove JWT token from localStorage
window.localStorage.removeItem("token");
  // Navigates to the login page
//navigate("/logout");
}



        return (
            // <Router>
            <div>
<Navbar expand="lg" className="bg-body-secondary" fixed="top">
      <Container fluid>
        <Navbar.Brand href="/"><PublicIcon fontSize="large" color="primary"/>Trip Wallet</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavDropdown title="Menu" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/myTrips">My Trips</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/transactions/add">New Transaction</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/transactions">Transaction History</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/transactions/search">Search Transactions</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/profile">My Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav.Link as={Link} to="/exchangeRates"><TrendingUpIcon fontSize="large" color="action"/></Nav.Link>
          <Nav.Link as={Link} to="/currency/convert" className="input-format"><CalculateRounded fontSize="large" color="action"/></Nav.Link>
          <Nav.Link  as={Link} to={"/login"}>
          <Button className="loginbutton btn-outline-primary trip-button" variant="submit">Login</Button>
          <Nav
            className="loginbutton"
          />
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
            </div>

        )
    }
}