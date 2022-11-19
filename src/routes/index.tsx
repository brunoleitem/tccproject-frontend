import React, { useContext } from 'react';
import { parseCookies } from 'nookies';
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import { AuthContext } from '../hooks/auth';
import * as Pages from '../pages';
import { Header } from '../components/Header/Header';

interface CustomRouteProps extends RouteProps {
    isPrivate?: boolean;
}

const CustomRoute: React.FC<CustomRouteProps> = ({ isPrivate = false, ...rest }) => {
    const { user } = useContext(AuthContext)
    
    const { 'tccproject.token': token } = parseCookies();

    if (isPrivate && !token) {
        return <Redirect to='/' />
    }
    if (!isPrivate && token) {
        return <Redirect to='/dashboard' />
    }

    if (isPrivate) {
        return (
            <>
            <Header />
            <Route {...rest} />
            </>
        )
    }
    
    return (
        <Route {...rest} />
    )
}

function Routes() {
    return (
        <Switch>
            <CustomRoute exact path='/' component={Pages.LoginPage} />
            <CustomRoute isPrivate path='/dashboard' component={Pages.HomePage} />
            <CustomRoute isPrivate path='/patients' component={Pages.PatientsPage} />
            <CustomRoute isPrivate path='/patient/:id' component={Pages.PatientDetailsPage} />
            <CustomRoute isPrivate path='/notes/:id' component={Pages.NotesPage} />
        </Switch>
    );
}
export default Routes;