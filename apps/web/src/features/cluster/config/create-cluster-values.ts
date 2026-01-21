import { Option, Region } from '@/features/cluster/types/create-cluster'

export const regions: { key: Region; display: string }[] = [
  { key: 'north', display: 'north' },
  { key: 'east', display: 'east' },
  { key: 'west', display: 'west' },
  { key: 'central', display: 'central' },
  { key: 'south', display: 'south (test)' },
]

export const providers = [
  { key: 'talos', display: 'talos' },
  { key: 'tanzu', display: 'tanzu' },
  { key: 'azure', display: 'azure' },
]

export const environments = [
  { key: 'prod', display: 'prod' },
  { key: 'test', display: 'test' },
  { key: 'qa', display: 'qa' },
  { key: 'dev', display: 'dev' },
]

export const pools = [
  { key: 'best-effort-large', display: 'best-effort-large' },
  { key: 'best-effort-medium', display: 'best-effort-medium' },
  { key: 'best-effort-small', display: 'best-effort-small' },
]

export const networks = [
  { key: 't-test01', display: 't-test01' },
  { key: 't-test02', display: 't-test02' },
]

export const optionsTalos: Option[] = [
  { region: 'north', provider: 'talos', valid: false },
  { region: 'east', provider: 'talos', valid: false },
  { region: 'west', provider: 'talos', valid: true },
  { region: 'central', provider: 'talos', valid: true },
  { region: 'south', provider: 'talos', valid: true },
]

export const optionsTanzu: Option[] = [
  { region: 'north', provider: 'tanzu', valid: false },
  { region: 'east', provider: 'tanzu', valid: true },
  { region: 'west', provider: 'tanzu', valid: false },
  { region: 'central', provider: 'tanzu', valid: true },
  { region: 'south', provider: 'tanzu', valid: false },
]

export const optionsAzure: Option[] = [
  { region: 'north', provider: 'azure', valid: false },
  { region: 'east', provider: 'azure', valid: true },
  { region: 'west', provider: 'azure', valid: true },
  { region: 'central', provider: 'azure', valid: false },
  { region: 'south', provider: 'azure', valid: false },
]

export const options = [...optionsTalos, ...optionsTanzu, ...optionsAzure]
