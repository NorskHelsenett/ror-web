import { authGuard } from '@/features/auth/utils/auth-guard'
import clsxm from '@/utils/clsxm'
import { localizeDate, localizeDistanceDate } from '@/utils/time-and-date'
import {
  SeverityIcon,
  StructuredListBody,
  StructuredListCell,
  StructuredListHead,
  StructuredListRow,
  StructuredListWrapper,
  Tile,
} from '@ror/react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ClusterVulnerabilitiesPageProps {
  params: Promise<{ id: string }>
}

export default async function ClusterVulnerabilitiesPage({ params }: ClusterVulnerabilitiesPageProps) {
  const { id } = await params
  await authGuard()

  return (
    <div className='grid grid-cols-12 gap-5 @container'>
      <Tile className='col-span-12 @2xl:col-span-9'>
        <h2 className='heading-01 px-5 py-4 border-b border-b-(--r-border-subtle)'>Top vulnerabilities</h2>
        <div className='p-5 mb-5'>
          <div className='flex gap-x-8'>
            <div>
              <h3 className='label-02 text-secondary mb-2'>Critical-severity</h3>
              <p className='heading-05'>1</p>
            </div>
            <div>
              <h3 className='label-02 text-secondary mb-2'>High-severity</h3>
              <p className='heading-05'>1</p>
            </div>
            <div>
              <h3 className='label-02 text-secondary mb-2'>Medium to low-severity</h3>
              <p className='heading-05'>19</p>
            </div>
            <div>
              <h3 className='label-02 text-secondary mb-2'>Unknown-severity</h3>
              <p className='heading-05'>4</p>
            </div>
          </div>
        </div>
        <StructuredListWrapper>
          <StructuredListHead>
            <StructuredListRow head>
              <StructuredListCell head>Title</StructuredListCell>
              <StructuredListCell head>Severity</StructuredListCell>
              <StructuredListCell head>Score</StructuredListCell>
              <StructuredListCell head>Identifier</StructuredListCell>
              <StructuredListCell head>Namespace</StructuredListCell>
            </StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            <VulnerabilityListItem
              title='glibc: stack guard protection bypass'
              score={9.8}
              identifier='CVE-2019-1010022'
              namespace='local-path-storage'
            />
            <VulnerabilityListItem
              title='glibc: uncontrolled recursion in function check_dst_limits_calc_pos_1 in posix/regexec.c'
              score={7.5}
              identifier='CVE-2018-20796'
              namespace='local-path-storage'
            />
            <VulnerabilityListItem
              title='glibc: ASLR bypass using cache of thread stack and heap'
              score={5.3}
              identifier='CVE-2019-1010024'
              namespace='local-path-storage'
            />
            <VulnerabilityListItem
              title='openssl: Timing side-channel in ECDSA signature computation'
              score={4.7}
              identifier='CVE-2024-13176'
              namespace='local-path-storage'
            />
            <VulnerabilityListItem
              title='openssl: Unbounded memory growth with session handling in TLSv1.3'
              score={3.7}
              identifier='CVE-2024-2511'
              namespace='local-path-storage'
            />
          </StructuredListBody>
        </StructuredListWrapper>
        <div className='p-5'>
          <Link href={`/clusters/${id}/vulnerabilities/list`} className='text-link inline-flex gap-2 items-center'>
            <span>See all vulnerabilities</span>
            <ArrowRight className='w-5 h-5 text-current' />
          </Link>
        </div>
      </Tile>
      <Tile className='col-span-12 @2xl:col-span-3'>
        <h2 className='heading-01 px-5 py-4 border-b border-b-(--r-border-subtle)'>Recent vulnerabilities</h2>
        <div className='grid grid-cols-[max-content_1fr]'>
          <RecentVulnerability
            title='CVE-2025-31115'
            description='xz: XZ has a heap-use-after-free bug in threaded .xz decoder'
            date='2025-04-03T23:00:00.000Z'
            score={7.5}
          />
          <RecentVulnerability
            title='CVE-2024-45337'
            description='golang.org/x/crypto/ssh: Misuse of ServerConfig.PublicKeyCallback may cause authorization bypass in golang.org/x/crypto'
            date='2024-12-11T23:00:00.000Z'
            score={9.1}
          />
          <RecentVulnerability
            title='CVE-2023-29403'
            description='On Unix platforms, the Go runtime does not behave differently when a binary is run with the setuid/setgid bits. This can be dangerous in certain cases, such as when dumping memory state or assuming the status of standard I/O file descriptors. If a setuid/setgid binary is executed with standard I/O file descriptors closed, opening any files can result in unexpected content being read or written with elevated privileges. Similarly, if a setuid/setgid program is terminated, either via panic or signal, it may leak the contents of its registers.'
            date='2024-12-11T23:00:00.000Z'
            score={9.1}
          />
        </div>
      </Tile>
    </div>
  )
}

interface RecentVulnerabilityProps {
  title: string
  description: string
  score: number
  date: string
  className?: string
}

function RecentVulnerability({ title, description, score, date, className }: RecentVulnerabilityProps) {
  const classes = clsxm(
    'p-5 border-b border-b-(--r-border-subtle) grid grid-cols-subgrid col-span-2 items-start',
    className
  )
  return (
    <div className={classes}>
      <SeverityIcon disableLabel score={score} size='sm' />
      <div>
        <h3 className='heading-01 mb-1'>{title}</h3>
        <p className='line-clamp-2 label-01 text-pretty text-secondary mb-2'>{description}</p>
        <time className='label-01 text-secondary'>{localizeDistanceDate(date, true)}</time>
      </div>
    </div>
  )
}

interface VulnerabilityListItemProps {
  title: string
  score: number
  identifier: string
  namespace: string
}

function VulnerabilityListItem({ title, score, identifier, namespace }: VulnerabilityListItemProps) {
  return (
    <StructuredListRow>
      <StructuredListCell className='w-[22rem]'>
        <span className='line-clamp-1' title={title}>
          {title}
        </span>
      </StructuredListCell>
      <StructuredListCell>
        <SeverityIcon score={score} />
      </StructuredListCell>
      <StructuredListCell>{score}</StructuredListCell>
      <StructuredListCell noWrap>{identifier}</StructuredListCell>
      <StructuredListCell>{namespace}</StructuredListCell>
    </StructuredListRow>
  )
}
