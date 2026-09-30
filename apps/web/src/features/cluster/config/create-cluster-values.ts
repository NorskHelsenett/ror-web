import { Region } from '@/features/cluster/types/create-cluster'

export const regions: { key: Region; display: string }[] = [
  { key: 'east', display: 'East (Vitistack Oslo)' },
  { key: 'central', display: 'Center (Vitistack Trondheim)' },
  { key: 'west', display: 'West (Vitistack Bergen)' },
]

export const environments = [
  { key: 'prod', display: 'prod' },
  { key: 'test', display: 'test' },
  { key: 'qa', display: 'qa' },
  { key: 'dev', display: 'dev' },
]

export const sensitivityOptions = [
  { key: '1 - Åpen', display: '1 - Åpen' },
  { key: '2 - Intern', display: '2 - Intern' },
  { key: '3 - Skjermet', display: '3 - Skjermet' },
  { key: '4 - Sterkt skjermed', display: '4 - Sterkt skjermet' },
]

export const criticalityOptions = [
  { key: '1 - Normal', display: '1 - Normal' },
  { key: '2 - Moderat', display: '2 - Moderat' },
  { key: '3 - Høy', display: '3 - Høy' },
  { key: '4 - Kritisk', display: '4 - Kritisk' },
]

export const lcmOptions = [
  { key: 'Dag (i arbeidstid, kl 0800 - 1600)', display: 'Dag (i arbeidstid, kl 0800 - 1600)' },
  { key: 'Kveld (utenfor arbeidstid, kl 1600 - 2359)', display: 'Kveld (utenfor arbeidstid, kl 1600 - 2359)' },
]

export const machineClassOptions = [
  { key: 'Best Effort Medium', display: 'Best Effort Medium - CPU cores 2 - Memory 8Gi' },
  { key: 'GPU', display: 'GPU - CPU cores 4 - Memory Gi' },
  { key: 'Large', display: 'Large - CPU cores 4 - Memory Gi' },
  { key: 'Large CPU', display: 'Large CPU - CPU cores 4 - Memory Gi' },
  { key: 'Large Memory', display: 'Large Memory - CPU cores 4 - Memory Gi' },
  { key: 'Medium', display: 'Medium - CPU cores 4 - Memory Gi' },
  { key: 'Medium CPUBIG', display: 'Medium CPUBIG - CPU cores 6 - Memory Gi' },
  { key: 'Small', display: 'Small - CPU cores 2 - Memory Gi' },
  { key: 'XLarge', display: 'XLarge - CPU cores 4 - Memory Gi' },
  { key: 'Xlarge CPU', display: 'XLarge CPU - CPU cores 8 - Memory Gi' },
  { key: 'XXLarge CPU', display: 'XXLarge CPU - CPU cores 16 - Memory Gi' },
]
