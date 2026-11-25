interface GatewayMetadata {
  name: string
  namespace?: string
  uid?: string
  resourceVersion?: string
  generation?: number
  creationTimestamp?: string
  annotations?: Record<string, string>
  labels?: Record<string, string>
  finalizers?: string[]
}

interface GatewayRorMetadata {
  version?: string
  hash?: string
  ownerref: {
    scope: string
    subject: string
  }
  action?: string
}

interface GatewayRouteKind {
  group?: string
  kind: string
}

interface GatewayCertificateReference {
  group?: string
  kind?: string
  name: string
  namespace?: string
}

interface GatewayListenerTLS {
  mode?: string
  certificateRefs?: GatewayCertificateReference[]
}

interface GatewayAllowedRoutes {
  namespaces?: {
    from?: string
  }
  kinds?: GatewayRouteKind[]
}

export interface GatewayListener {
  name: string
  hostname?: string
  port: number
  protocol: string
  tls?: GatewayListenerTLS
  allowedRoutes?: GatewayAllowedRoutes
}

interface GatewaySpec {
  gatewayClassName: string
  listeners: GatewayListener[]
  infrastructure?: {
    annotations?: Record<string, string>
  }
}

interface GatewayCondition {
  type: string
  status: string
  observedGeneration?: number
  lastTransitionTime?: string
  reason?: string
  message?: string
}

export interface GatewayStatusAddress {
  type?: string
  value: string
  routability?: string
}

interface GatewayListenerStatus {
  name: string
  supportedKinds?: GatewayRouteKind[]
  attachedRoutes?: number
  conditions?: GatewayCondition[]
}

interface GatewayStatus {
  addresses?: GatewayStatusAddress[]
  conditions?: GatewayCondition[]
  listeners?: GatewayListenerStatus[]
}

/** The Gateway payload stored under the `gateway` key in a ROR Resource. */
export interface Gateway {
  spec: GatewaySpec
  status: GatewayStatus
}

/** Complete Gateway resource returned in the cluster-list-item view. */
export interface GatewayResource {
  kind: 'Gateway'
  apiVersion: 'gateway.networking.k8s.io/v1'
  metadata: GatewayMetadata
  rormeta: GatewayRorMetadata
  gateway: Gateway
}

interface GatewayClassParametersReference {
  group: string
  kind: string
  name: string
  namespace?: string
}

interface GatewayClassSpec {
  controllerName: string
  parametersRef?: GatewayClassParametersReference
  description?: string
}

interface GatewayClassSupportedFeature {
  name: string
}

interface GatewayClassStatus {
  conditions?: GatewayCondition[]
  supportedFeatures?: GatewayClassSupportedFeature[]
}

/** The GatewayClass payload stored under the `gatewayclass` key in a ROR Resource. */
export interface GatewayClass {
  spec: GatewayClassSpec
  status: GatewayClassStatus
}

/** Complete GatewayClass resource returned in the cluster-list-item view. */
export interface GatewayClassResource {
  kind: 'GatewayClass'
  apiVersion: 'gateway.networking.k8s.io/v1'
  metadata: GatewayMetadata
  rormeta: GatewayRorMetadata
  gatewayclass: GatewayClass
}

interface HTTPRouteParentReference {
  group?: string
  kind?: string
  namespace?: string
  name: string
  sectionName?: string
  port?: number
}

interface HTTPRoutePathMatch {
  type?: string
  value?: string
}

interface HTTPRouteHeaderMatch {
  type?: string
  name: string
  value: string
}

interface HTTPRouteQueryParamMatch {
  type?: string
  name: string
  value: string
}

interface HTTPRouteMatch {
  path?: HTTPRoutePathMatch
  headers?: HTTPRouteHeaderMatch[]
  queryParams?: HTTPRouteQueryParamMatch[]
  method?: string
}

interface HTTPRouteBackendReference {
  group?: string
  kind?: string
  namespace?: string
  name: string
  port?: number
  weight?: number
}

interface HTTPRouteRule {
  name?: string
  matches?: HTTPRouteMatch[]
  backendRefs?: HTTPRouteBackendReference[]
}

interface HTTPRouteSpec {
  parentRefs?: HTTPRouteParentReference[]
  hostnames?: string[]
  rules?: HTTPRouteRule[]
}

interface HTTPRouteParentStatus {
  parentRef: HTTPRouteParentReference
  controllerName: string
  conditions?: GatewayCondition[]
}

interface HTTPRouteStatus {
  parents?: HTTPRouteParentStatus[]
}

/** The HTTPRoute payload stored under the `httproute` key in a ROR Resource. */
export interface HTTPRoute {
  spec: HTTPRouteSpec
  status: HTTPRouteStatus
}

/** Complete HTTPRoute resource returned in the cluster-list-item view. */
export interface HTTPRouteResource {
  kind: 'HTTPRoute'
  apiVersion: 'gateway.networking.k8s.io/v1'
  metadata: GatewayMetadata
  rormeta: GatewayRorMetadata
  httproute: HTTPRoute
}
