import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Links = () => {
  const handleCheckActiveLink = (link: { isActive: any; }) => {
    return link.isActive ? "nav-link active" : "nav-link";
  };
  const navigate = useNavigate();

  return (
    <div className="c-header-layout bg-black">
      <div className="container">
        <nav className="navbar navbar-expand-sm bg-black" data-bs-theme="dark">
          <div className="container-fluid px-0">
            <div className="btn-group" role="group" aria-label="Basic example">
              <button type="button" className="btn btn-primary" onClick={() => navigate('/registration')}>Register</button>
              <button type="button" className="btn btn-primary" onClick={() => navigate('/login')}>Login</button>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse justify-content-end navbar-collapse ml-auto"
              id="navbarNavAltMarkup"
            >
              <div className="navbar-nav">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    handleCheckActiveLink({ isActive })
                  }
                >
                  HOME
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    handleCheckActiveLink({ isActive })
                  }
                >
                  PROFILE
                </NavLink>
                <NavLink
                  to="/Friends"
                  className={({ isActive }) =>
                    handleCheckActiveLink({ isActive })
                  }
                >
                  FRIENDS
                </NavLink>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Links;

{/* <div style={{margin: "10px"}}>
<Link to="/" style={{marginRight: "30px"}}>Home</Link>
<Link to="/profile" style={{marginRight: "30px"}}>Profile</Link>
<Link to="/friends" style={{marginRight: "30px"}}>Friends</Link>
</div> */}