import { useState } from 'react'
import type { ServiceOrder } from '../types/ServiceOrder'

interface NewServiceFormProps {
  onAddOrder: (order: ServiceOrder) => void
}

export function NewServiceForm({ onAddOrder }: NewServiceFormProps) {
  const [clientName, setClientName] = useState('')
  const [deviceModel, setDeviceModel] = useState('')
  const [issue, setIssue] = useState('')

  function handleSubmit() {
    if (!clientName || !deviceModel || !issue) return

    const newOrder: ServiceOrder = {
      id: crypto.randomUUID(),
      clientName,
      deviceModel,
      issue,
      status: 'aberto',
    }

    onAddOrder(newOrder)

    setClientName('')
    setDeviceModel('')
    setIssue('')
  }

  return (
    <section className="flex flex-col gap-3 rounded-lg border p-4 bg-white shadow-sm">
      <h2 className="text-lg font-semibold">Nova Ordem de Serviço</h2>

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          placeholder="Nome do cliente"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="flex-1 rounded border px-3 py-2 text-sm"
        />
        <input
          type="text"
          placeholder="Modelo do aparelho"
          value={deviceModel}
          onChange={(e) => setDeviceModel(e.target.value)}
          className="flex-1 rounded border px-3 py-2 text-sm"
        />
        <input
          type="text"
          placeholder="Defeito"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          className="flex-1 rounded border px-3 py-2 text-sm"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="self-start rounded bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
      >
        Salvar
      </button>
    </section>
  )
}