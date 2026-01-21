export const routes = {
  auth: {
    signIn: {
      label: 'Sign in',
      getHref: () => '/sign-in',
    },
    signOut: {
      label: 'Sign out',
      getHref: () => '/api/auth/signout',
    },
  },
  app: {
    overview: {
      label: 'Overview',
      getHref: () => '/clusters',
    },
    clusters: {
      label: 'Clusters',
      getHref: () => '/clusters',
    },
    cluster: {
      label: 'Cluster',
      getHref: (id: string) => `/clusters/${id}`,
    },
    createCluster: {
      label: 'Create cluster',
      getHref: () => '/clusters/create-cluster',
    },
    clusterIngresses: {
      label: 'Ingresses',
      getHref: (id: string) => `/clusters/${id}/ingresses`,
    },
    clusterNodePools: {
      label: 'Node pools',
      getHref: (id: string) => `/clusters/${id}/node-pools`,
    },
    newNodePool: {
      label: 'Create node pool',
      getHref: (id: string) => `/clusters/${id}/node-pools/new-node-pool`,
    },
    editNodePool: {
      label: 'Edit node pool',
      getHref: (id: string, poolId: string) => `/clusters/${id}/node-pools/${poolId}/edit-node-pool/`,
    },
    nodes: {
      label: 'Nodes',
      getHref: (id: string, poolId: string) => `/clusters/${id}/node-pools/${poolId}/nodes`,
    },
    clusterPolicies: {
      label: 'Policies',
      getHref: (id: string) => `/clusters/${id}/policies`,
    },
    clusterVulnerabilities: {
      label: 'Vulnerabilities',
      getHref: (id: string) => `/clusters/${id}/vulnerabilities`,
    },
    clusterCompliance: {
      label: 'Compliance',
      getHref: (id: string) => `/clusters/${id}/compliance`,
    },
    clusterAbout: {
      label: 'About',
      getHref: (id: string) => `/clusters/${id}/about`,
    },
    clusterRawData: {
      label: 'Raw data',
      getHref: (id: string) => `/clusters/${id}/raw-data`,
    },
    statistics: {
      label: 'Statistics',
      getHref: () => '/statistics',
    },
    priceList: {
      label: 'Price list',
      getHref: () => '/economy/price-list',
    },
    dataCenters: {
      label: 'Data centers',
      getHref: () => '/datacenters',
    },
    policyReports: {
      label: 'Policy reports',
      getHref: () => '/policy-reports',
    },
    adminPriceList: {
      label: 'Price list',
      getHref: () => '/price-list',
    },
    projects: {
      label: 'Projects',
      getHref: () => '/projects',
    },
    vulnerabilityReports: {
      label: 'Vulnerability reports',
      getHref: () => '/admin/vulnerability-reports',
    },
    workspaces: {
      label: 'Workspaces',
      getHref: () => '/workspaces',
    },
    documentation: {
      label: 'Documentation',
      getHref: () => '/help/documentation',
    },
    about: {
      label: 'About',
      getHref: () => '/help/about',
    },
    releaseNotes: {
      label: 'Release notes',
      getHref: () => '/help/release-notes',
    },
    profile: {
      label: 'Profile',
      getHref: () => '/profile',
    },
    error: {
      label: 'Error page',
      getHref: () => '/error',
    },
    vms: {
      label: 'Virtual machines',
      getHref: () => '/vms',
    },
    vm: {
      label: 'Virtual machine',
      getHref: (id: string) => `/vms/${id}`,
    },
    vmRawData: {
      label: 'Raw data',
      getHref: (id: string) => `/vms/${id}/raw-data`,
    },
    vmNetworks: {
      label: 'Networks',
      getHref: (id: string) => `/vms/${id}/networks`,
    },
    vmDisks: {
      label: 'Disks',
      getHref: (id: string) => `/vms/${id}/disks`,
    },
    vmBackup: {
      label: 'Backup',
      getHref: (id: string) => `/vms/${id}/backup`,
    },
    backupRuns: {
      label: 'Backup runs',
      getHref: () => `/vms/backup/backup-runs`,
    },
    backupJobs: {
      label: 'Backup jobs',
      getHref: () => `/vms/backup/backup-jobs`,
    },
  },
} as const
