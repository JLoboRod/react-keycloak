import * as React from 'react'
import hoistStatics from 'hoist-non-react-statics'

import ReactKeycloakContext from './context'

const getDisplayName = name => `WithKeycloak(${name})`

function withKeycloak(WrappedComponent) {
  const Context = ReactKeycloakContext
  const displayName = getDisplayName(
    WrappedComponent.displayName || WrappedComponent.name
  )

  class WithKeycloakComponent extends React.PureComponent {
    renderWrappedComponent = ({ initialized, keycloak }) => (
      <WrappedComponent
        {...this.props}
        keycloak={keycloak}
        keycloakInitialized={initialized}
      />
    )

    render() {
      return <Context.Consumer>{this.renderWrappedComponent}</Context.Consumer>
    }
  }

  WithKeycloakComponent.WrappedComponent = WrappedComponent
  WithKeycloakComponent.displayName = displayName

  return hoistStatics(WithKeycloakComponent, WrappedComponent)
}

export default withKeycloak
