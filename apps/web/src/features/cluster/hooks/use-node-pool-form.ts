/*
 * FILE OVERVIEW
 *
 * Custom React hook for managing the state and logic of a Kubernetes node pool form.
 * This includes form fields, validation, pricing logic, and submit handling.
 */

'use client'

import { nodePoolFormSchema, type NodePoolFormData } from '../utils/node-pool-form-schema'
import { useState, useMemo, useCallback } from 'react'
import type { KubernetesClusterNodePoolStatusType } from '@ror/js-api-client'
import { createOrUpdateNodePoolAction } from '@/utils/node-pool-actions'
import { toast } from 'sonner'
import { SimplePrice } from '@/types/prices'

/**
 * Custom React hook for managing the state and logic of a Kubernetes node pool form.
 *
 * This hook encapsulates all form fields, validation, pricing logic, and submit handling
 * for creating or editing a node pool within a Kubernetes cluster.
 */
export function useNodePoolForm(
  initialNodePool?: KubernetesClusterNodePoolStatusType,
  simplePrices: SimplePrice[] = []
) {
  // --- Core form fields ---
  const [name, setName] = useState(initialNodePool?.name || '')
  const [provider, setProvider] = useState('')
  const [version, setVersion] = useState('')
  const [nodeCount, setNodeCount] = useState(initialNodePool?.scale || 1)
  const [labels, setLabels] = useState<Record<string, string>>({})
  const [taints, setTaints] = useState<
    Record<string, { value: string; effect: 'NoSchedule' | 'PreferNoSchedule' | 'NoExecute' }>
  >({})

  // --- Temporary UI fields ---
  const [newLabelKey, setNewLabelKey] = useState('')
  const [newLabelValue, setNewLabelValue] = useState('')
  const [newTaintKey, setNewTaintKey] = useState('')
  const [newTaintValue, setNewTaintValue] = useState('')
  const [selectedEffect, setSelectedEffect] = useState<'' | 'NoSchedule' | 'PreferNoSchedule' | 'NoExecute'>('')

  // --- Pricing logic ---
  const [selectedPriceId, setSelectedPriceId] = useState<string>('')
  const priceById = useMemo(() => new Map(simplePrices.map((p) => [p.id, p])), [simplePrices])
  const selectedUnitPrice = priceById.get(selectedPriceId)?.price ?? 0
  const selectedClass = priceById.get(selectedPriceId)?.machineClass ?? ''
  const selectedPrice = selectedUnitPrice * nodeCount

  // --- Validation flags ---
  const [errors, setErrors] = useState({
    name: false,
    provider: false,
    version: false,
    class: false,
  })

  // --- Validation function ---
  const validate = useCallback(
    (isEditMode: boolean, id: string) => {
      const data: NodePoolFormData = {
        id,
        name,
        provider: isEditMode ? provider || undefined : provider,
        version: isEditMode ? version || undefined : version,
        machineClass: selectedPriceId,
        replicas: nodeCount,
        labels,
        taints,
      }

      const result = nodePoolFormSchema.safeParse(data)

      if (!result.success) {
        const invalidFields = new Set(result.error.issues.map((issue) => issue.path[0]))
        const newErrors = {
          name: invalidFields.has('name'),
          provider: invalidFields.has('provider'),
          version: invalidFields.has('version'),
          class: invalidFields.has('machineClass'),
        }
        setErrors(newErrors)
        return { valid: false, data: null }
      }

      setErrors({ name: false, provider: false, version: false, class: false })
      return { valid: true, data: result.data }
    },
    [name, provider, version, selectedPriceId, nodeCount, labels, taints]
  )

  // --- Submit handler ---
  const handleSubmit = useCallback(
    async (e: React.FormEvent, id: string, nodePool?: KubernetesClusterNodePoolStatusType) => {
      e.preventDefault()

      const { valid, data } = validate(!!nodePool, id)
      if (!valid || !data) return

      const formData = new FormData()
      formData.append('id', id)
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value))
      }

      try {
        await createOrUpdateNodePoolAction(formData)
        toast.success(`Node pool "${name}" saved successfully`)
      } catch {
        toast.error('Failed to save node pool')
      }
    },
    [validate, name]
  )

  // --- Return stable object ---
  return useMemo(
    () => ({
      // Form state
      name,
      setName,
      provider,
      setProvider,
      version,
      setVersion,
      nodeCount,
      setNodeCount,
      labels,
      setLabels,
      taints,
      setTaints,

      // Temporary fields
      newLabelKey,
      setNewLabelKey,
      newLabelValue,
      setNewLabelValue,
      newTaintKey,
      setNewTaintKey,
      newTaintValue,
      setNewTaintValue,
      selectedEffect,
      setSelectedEffect,

      // Pricing
      selectedPriceId,
      setSelectedPriceId,
      selectedPrice,
      selectedUnitPrice,
      selectedClass,
      priceById,

      // Validation and actions
      errors,
      validate,
      handleSubmit,
    }),
    [
      name,
      provider,
      version,
      nodeCount,
      labels,
      taints,
      newLabelKey,
      newLabelValue,
      newTaintKey,
      newTaintValue,
      selectedEffect,
      selectedPriceId,
      selectedPrice,
      selectedUnitPrice,
      selectedClass,
      priceById,
      errors,
      validate,
      handleSubmit,
    ]
  )
}
