---
template: post
title: Role based routes protection in React + MobX app
slug: role-based-routes-protection-react-mobx
draft: true
date: '2019-04-29T12:00:00.000Z'
description: >-
  Almost all admin dashboard apps require some kind of role based access to enable disable access to the features of app based upon the user's role...
category: Front-end
tags:
  - React
  - Javascript
---

>It's quite common feature these days to have multiple user roles and based upon the user role we grant him access to different features of the application. Let's see how to create a similar feature in a React + MobX application along with react-router

Packages used are-

1. react-router
2. mobx
3. mobx-react
4. mobx-react-router

High level steps to follow-

1. Create a json config of all the routes of your application.
2. Create another config of roleAccess.
3. Create a mobx router store.
4. Call the updateAccess() @action of router store with user data. Thus, setting the required access based on the user role.

5. Use react-router and sync it's history with mobx router store using mobx-react-router
6. Setup ProtectedRoutes component which verifies authentication from auth store.

```javascript
export const allPages = {
  home: {
    component: lazy(() => import(/* webpackChunkName: "home" */ '../containers/home')),
    path: '/',
    exact: true,
  },
  about: {
    component: lazy(() => import(/* webpackChunkName: "about" */ '../containers/about')),
    path: '/about',
  },
  contact: {
    component: lazy(() => import(/* webpackChunkName: "contact" */ '../containers/contact')),
    path: '/contact',
  }
}
}```


```javascript
const roleAccess = {
  admin: {
    page: [home, about, contact],
  },
  editor: {
    page: [home, about],
  },
  contributor: {
    page: [home],
  },
}
```

```javascript
class RouterStore extends MobxRouterStore {
  @observable pages = []
  hasAccess = path => this.pages.includes(path)
  @action
  updateAccess = user => {
    const role = (user.role || lastRole).toLowerCase()
    this.pages = roleAccess[role].page
  }
}
```
```javascript
const ReactRouter = props => (
  <Router history={syncHistoryWithStore(createBrowserHistory(), router)}>
    <Switch>
      <Route path="/login" component={Login} {...props} />
      <ProtectedRoutes path="" component={AppRoutes} {...props} />
    </Switch>
  </Router>
)
```

```javascript
const AppRoutes = inject('router')(({ router: { pages } }) => {
  return (
    <App>
      <Suspense fallback={<LoadingSvg />}>
        <Switch>
          <NestedRoutes routes={pages} />
          <Route component={() => <div>Not Found</div>} />
        </Switch>
      </Suspense>
    </App>
  )
})
```

```javascript
const NestedRoutes = ({ routes }) =>
  routes.map(({ component: Component, routes: nestedRoutes, switchRoutes, ...rest }) => {
    const component = props => (
      <>
        <Component {...props} {...rest} />
        {nestedRoutes && <NestedRoutes routes={nestedRoutes} />}
      </>
    )
    return <Route {...rest} render={component} key={rest.path} />
  })
```

```javascript
@inject('auth')
@observer
class ProtectedRoutes extends Component {
  render() {
    const {
      component: Component,
      auth: { isAuthenticated, isAuthenticating },
      ...rest
    } = this.props

    if (isAuthenticating) {
      return null
    }

    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          )
        }
      />
    )
  }
```

```javascript
const GET_ME = gql`
  {
    me {
      email
      firstName
      lastName
      role
      id
    }
  }
`

class AuthStore {
  @observable googleAuthUrl = ZION_AUTH_URL
  @observable isAuthenticated = false
  @observable isAuthenticating = false
  @observable token = null

  setAuthToken = token => {
    let tokenParam
    let currentUrl

    if (!token) {
      currentUrl = new URL(window.location.href)
      tokenParam = currentUrl.searchParams.get('token')
      token = tokenParam || localStorage.get('token')
    }

    if (token) {
      localStorage.set('token', token)
      this.token = token
    }

    // remove tokens from the url
    if (tokenParam) {
      currentUrl.searchParams.delete('token')
      window.history.replaceState(window.history.state, window.title, currentUrl.href)
    }

    return token
  }

  @action
  logout = () => {
    localStorage.remove('token')
    this.isAuthenticated = false
  }

  @action
  checkAuthToken = async () => {
    this.isAuthenticating = true
    // eslint-disable-next-line no-console
    const response = await graphqlClient.query({ query: GET_ME }).catch(err => console.error(err))
    this.isAuthenticated = !!response
    if (this.isAuthenticated) {
      router.updateAccess(response.data.me)
    }
    this.isAuthenticating = false
    return response && response.data && response.data.me
  }
}
```
\- Ayush 🙂
