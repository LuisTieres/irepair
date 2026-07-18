import type { ServiceOrder } from '../types'

interface ServiceCardProps {
  order: ServiceOrder
  clientName: string
}

export function ServiceCard({ order, clientName }: ServiceCardProps) {
  const statusStyles = {
    open: 'bg-green-100 text-green-800 border-green-400',
    in_progress: 'bg-yellow-100 text-yellow-800 border-yellow-400',
    done: 'bg-gray-200 text-gray-700 border-gray-400',
  }

  const statusLabel = {
    open: 'Aberto',
    in_progress: 'Em andamento',
    done: 'Finalizado',
  }

  return (
    <article className="flex flex-col gap-2 rounded-lg border p-4 shadow-sm bg-white">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{clientName}</h2>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full border ${statusStyles[order.status]}`}
        >
          {statusLabel[order.status]}
        </span>
      </div>
      <p className="text-sm text-slate-600">
        <span className="font-medium">Aparelho:</span> {order.device}
      </p>
      <p className="text-sm text-slate-600">
        <span className="font-medium">Defeito:</span> {order.issue}
      </p>
    </article>
  )
}