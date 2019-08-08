import * as React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <Link to="/"><button>All Employees</button></Link>{' '}
            <Link to="/SearchById"><button>Search By Id</button></Link>
      </header>
    );
}

export default Header;