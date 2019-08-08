import * as React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import AllEmployees from './components/AllEmployees';
import { Header } from './components/Header';
import SearchById from './components/SearchById';

const AppRouter = () => {
    return (

        <BrowserRouter>
            <div>
                <Header />
                <main>
                    <Route exact={true} path="/" component={AllEmployees} />
                    <Route path="/SearchById" component={SearchById} />
                    <Redirect from='*' to='/' />
                </main>
            </div>
        </BrowserRouter>

    );
}
export default AppRouter;