'use client'

import { Boxes, BriefcaseBusiness, Waypoints } from 'lucide-react'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/shadcn/accordion'

import type { WorkspaceListViewsRowType } from '@ror/js-api-client'
import {
  AccordionContentRow,
  accordionContentStyling,
  accordionItemStyling,
  AccordionTableRow,
  AccordionTriggerRowElement,
  accordionTriggerStyling,
  contentRowsStyling,
  contentTitleStyling,
  triggerOuterDivStyling,
  triggerTitleStyling,
} from '@/components/ui/AccordionTableRow'
import {
  getWorkspaceDatacenterNameView,
  getWorkspaceDefaultMachineClassView,
  getWorkspaceDefaultStorageClassView,
  getWorkspaceNameView,
  getWorkspaceUidView,
} from '../utils/workspace'
import { WorkspaceWithClusters } from '../utils/workspace-actions'
import { ResourceBar } from '@/components/ui/resource-bar'
import {
  getClusterUidView,
  getEnvironmentView,
  getNodePoolsView,
  getNodesView,
  getResourcesCpuUsedMilliView,
  getResourcesCpuUsedPercentNumberView,
  getResourcesCpuView,
  getResourcesMemoryUsedPercentNumberView,
  getResourcesMemoryUsedView,
  getResourcesMemoryView,
} from '@/features/cluster/utils/cluster'
import { EnvironmentTag } from '@/components/ui/environment-tag'
import Link from 'next/link'
import { routes } from '@/config/routes'

// -------------------------
// Workspace row
// -------------------------

interface WorkspaceRowCardProps {
  group: WorkspaceListViewsRowType
  workspaceWithClusters?: WorkspaceWithClusters
}

export const WorkspaceRowCard = ({ group, workspaceWithClusters }: WorkspaceRowCardProps) => {
  return (
    <AccordionTableRow>
      <AccordionItem value={getWorkspaceUidView(group) || 'unknown-workspace'} className={accordionItemStyling}>
        <AccordionTrigger className={accordionTriggerStyling}>
          <div className={triggerOuterDivStyling}>
            <BriefcaseBusiness className='size-4 text-muted-foreground shrink-0' />
            <span className={triggerTitleStyling}>{getWorkspaceNameView(group) || 'Unknown workspace'}</span>
            <AccordionTriggerRowElement
              title='Datacenter'
              text={getWorkspaceDatacenterNameView(group)}
              className='w-28 shrink-0'
            />
            <AccordionTriggerRowElement
              title='Default machine class'
              text={getWorkspaceDefaultMachineClassView(group)}
              className='w-48 shrink-0'
            />
            <AccordionTriggerRowElement
              title='Default storage class'
              text={getWorkspaceDefaultStorageClassView(group)}
              className='w-46 shrink-0'
            />

            <div className='flex-1' />
            <div className='shrink-0 flex items-center gap-2'>
              <span className='flex items-center gap-2 w-32 px-3 py-1.5 border rounded-full'>
                <Boxes size='16' />
                {workspaceWithClusters?.clusters.length} clusters
              </span>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className={accordionContentStyling}>
          <p className={contentTitleStyling}>Clusters</p>
          <div className={contentRowsStyling}>
            {workspaceWithClusters?.clusters.map((c, index) => (
              <Link key={index} href={routes.app.cluster.getHref(getClusterUidView(c))}>
                <AccordionContentRow
                  icon={<Boxes className='size-4 text-muted-foreground shrink-0' />}
                  title={c.clusterName?.fieldValue || 'Unknown name'}
                >
                  <span className='w-12'>
                    <EnvironmentTag environment={getEnvironmentView(c)} />
                  </span>
                  <span className='flex flex-col gap-1'>
                    <b>CPU</b>
                    <span className='w-64'>
                      <ResourceBar
                        capacity={getResourcesCpuView(c)}
                        used={getResourcesCpuUsedMilliView(c)}
                        percentage={getResourcesCpuUsedPercentNumberView(c)}
                        showPercentage={false}
                      />
                    </span>
                  </span>
                  <span className='flex flex-col gap-1'>
                    <b>Memory</b>
                    <span className='w-64'>
                      <ResourceBar
                        capacity={getResourcesMemoryView(c)}
                        used={getResourcesMemoryUsedView(c)}
                        percentage={getResourcesMemoryUsedPercentNumberView(c)}
                        showPercentage={false}
                      />
                    </span>
                  </span>
                  <div className='flex-1' />
                  <span className='shrink-0 flex items-center gap-2 w-44 px-3 py-1.5 border rounded-full'>
                    <Waypoints size='16' />
                    {`${getNodesView(c)} nodes (${getNodePoolsView(c)} pools)`}
                  </span>
                </AccordionContentRow>
              </Link>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </AccordionTableRow>
  )
}
