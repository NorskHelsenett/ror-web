import { useState } from 'react'
import Norway from '@react-map/norway'

interface LocationButton {
  id: string
  name: string
  x: number
  y: number
  onClick?: () => void
}

type ConfigOption = {
  region: string
  datacenter: string
  provider: string
}

const ConfigOptions: ConfigOption[] = [
  { region: 'trondheim', datacenter: 'trd1', provider: 'Vsphere' },
  { region: 'trondheim', datacenter: 'trd2', provider: 'Vsphere' },
  { region: 'trondheim', datacenter: 'trd3', provider: 'Vsphere' },
  { region: 'oslo', datacenter: 'osl1', provider: 'Vsphere' },
  { region: 'oslo', datacenter: 'osl3', provider: 'Vsphere' },
  { region: 'tromsø', datacenter: 'tromsø1', provider: 'Kubevirt' },
  { region: 'tromsø', datacenter: 'tromsø1', provider: 'Proxmox' },
  { region: 'bergen', datacenter: 'bergen1', provider: 'Kubevirt' },
  { region: 'bergen', datacenter: 'bergen1', provider: 'Proxmox' },
]

function displayConfigOptions(id: string) {
  const options = ConfigOptions.filter((option) => option.region === id)
  if (options.length === 0) return null
  console.log(locations.find((loc) => loc.id === id))
  return (
    <div className='space-y-3'>
      <h3 className='font-semibold text-lg text-gray-800 border-b pb-2'>
        Configuration options in {locations.find((loc) => loc.id === id)?.name}
      </h3>
      <div className='space-y-2'>
        {options.map((option, idx) => (
          <div key={idx} className='p-2 bg-gray-50 rounded border-l-4 border-blue-500'>
            <div className='text-sm'>
              <span className='font-medium text-gray-700'>Datacenter:</span>
              <span className='ml-1 text-gray-900'>{option.datacenter}</span>
            </div>
            <div className='text-sm'>
              <span className='font-medium text-gray-700'>Provider:</span>
              <span className='ml-1 text-gray-900'>{option.provider}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const locations: LocationButton[] = [
  { id: 'oslo', name: 'Oslo', x: 25, y: 90 },
  { id: 'bergen', name: 'Bergen', x: 2, y: 85 },
  { id: 'trondheim', name: 'Trondheim', x: 30, y: 60 },
  { id: 'tromsø', name: 'Tromsø', x: 53, y: 18 },
]

export const NorwayMap = () => {
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null)

  const handleLocationClick = (locationId: string) => {
    setSelectedLocationId(locationId)
  }

  return (
    <div className='relative inline-block'>
      {/* Map container with disabled pointer events */}
      <div style={{ pointerEvents: 'none' }}>
        <Norway
          type='select-single'
          //   strokeWidth={0}
          //   strokeColor="transparent"
          //   hoverColor="inherit"
          //   selectColor="inherit"
        />
      </div>
      {/* Location buttons overlay */}
      {locations.map((location) => (
        <button
          key={location.id}
          onClick={() => handleLocationClick(location.id)}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 
          text-white text-xs 
          px-2 py-1 rounded-full shadow-lg transition-all duration-200
          hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            selectedLocationId === location.id ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
          }`}
          style={{
            left: `${location.x}%`,
            top: `${location.y}%`,
            pointerEvents: 'auto',
          }}
          title={location.name}
        >
          {location.name}
        </button>
      ))}
      {/* Show configuration options only for the selected city */}
      {selectedLocationId && (
        <div
          className='absolute bg-white p-4 rounded-lg shadow-xl border border-gray-200 z-10 min-w-64 max-w-80'
          style={{
            left: '70%',
            top: '40%',
          }}
        >
          {displayConfigOptions(selectedLocationId)}
        </div>
      )}
    </div>
  )
}
