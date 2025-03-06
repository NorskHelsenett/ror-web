'use client'
import { Breadcrumb, BreadcrumbItem } from '@ror/react/components/breadcrumb'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

interface ClusterPageBreadcrumbsProps {
  clusterName: string
  clusterId: string
}

const segmentRouteMap: Record<string, string> = {
  ingresses: 'Ingresses',
  policies: 'Policies',
  vulnerabilities: 'Vulnerabilities',
  compliance: 'Compliance',
  about: 'About',
  'raw-data': 'Raw data',
}

export function ClusterPageBreadcrumbs({ clusterName, clusterId }: ClusterPageBreadcrumbsProps) {
  const segment = useSelectedLayoutSegment()

  const clusterPageActive = clusterId === segment

  return (
    <Breadcrumb noTrailingSlash className='mb-10'>
      <BreadcrumbItem asChild>
        <Link href='/clusters'>Clusters</Link>
      </BreadcrumbItem>
      {segment ? (
        <BreadcrumbItem isCurrentPage={clusterPageActive} asChild>
          <Link href={`/clusters/${clusterId}`}>{clusterName}</Link>
        </BreadcrumbItem>
      ) : (
        <BreadcrumbItem isCurrentPage={clusterPageActive}>{clusterName}</BreadcrumbItem>
      )}
      {segment && segment !== clusterId ? (
        <BreadcrumbItem isCurrentPage={true}>{segmentRouteMap[segment]}</BreadcrumbItem>
      ) : null}
    </Breadcrumb>
  )
}
