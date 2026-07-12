import type { ServiceOrder } from '../types/ServiceOrder'

interface ServiceCardProps {
  order: ServiceOrder
}

export function ServiceCard({ order }: ServiceCardProps) {
  const statusStyles = {
    aberto: 'bg-green-100 text-green-800 border-green-400',
    em_andamento: 'bg-yellow-100 text-yellow-800 border-yellow-400',
    finalizado: 'bg-gray-200 text-gray-700 border-gray-400',
  }

  const statusLabel = {
    aberto: 'Aberto',
    em_andamento: 'Em andamento',
    finalizado: 'Finalizado',
  }

  return (
    <article className="flex flex-col gap-2 rounded-lg border p-4 shadow-sm bg-white">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{order.clientName}</h2>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full border ${statusStyles[order.status]}`}
        >
          {statusLabel[order.status]}
        </span>
      </div>
      <p className="text-sm text-slate-600">
        <span className="font-medium">Aparelho:</span> {order.deviceModel}
      </p>
      <p className="text-sm text-slate-600">
        <span className="font-medium">Defeito:</span> {order.issue}
      </p>
    </article>
  )
}