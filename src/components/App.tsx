import React from 'react'
import * as firebase from 'firebase'
import {Router, Route, Switch} from 'react-router-dom'
import 'styles/App.scss'
import LandingPage from 'components/landing-page/LandingPage'
import InfographicsBuilder from 'components/builder/InfographicsBuilder'
import history from '../history'
import Board from 'components/board/Board'
import {ERoute} from 'enums/ERoute'
import SharedPreview from 'components/shared-preview/SharedPreview'
import PageNotFoundScreen from 'components/common/PageNotFoundScreen'
import SomethingWentWrongScreen from 'components/common/SomethingWentWrongScreen'

const App = () => {

    const firebaseConfig = {
        apiKey: "AIzaSyCInkkWzHjB7P78kkC3Rsr-P8jfrwhUKJ8",
        authDomain: "infographics-builder.firebaseapp.com",
        databaseURL: "https://infographics-builder.firebaseio.com",
        projectId: "infographics-builder",
        storageBucket: "infographics-builder.appspot.com",
        messagingSenderId: "540331254955",
        appId: "1:540331254955:web:fdf250b146c2c97a5443ee",
        measurementId: "G-4TP3YZS874"
    }
    firebase.initializeApp(firebaseConfig)

    return (
        <div className={'scope__App'}>
            <Router history={history}>
                <Switch>
                    <Route path={ERoute.HOME} exact component={LandingPage} />
                    <Route path={ERoute.BOARD} exact component={Board} />
                    <Route path={ERoute.BUILDER} exact component={InfographicsBuilder} />
                    <Route path={ERoute.BUILDER_EDIT} exact component={InfographicsBuilder} />
                    <Route path={ERoute.PREVIEW_WITH_ID} exact component={SharedPreview} />
                    <Route path={ERoute.ERROR} exact component={SomethingWentWrongScreen} />
                    <Route component={PageNotFoundScreen} />
                </Switch>
            </Router>
        </div>
    )
}

export default App
