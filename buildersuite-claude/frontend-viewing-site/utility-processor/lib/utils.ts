export const cn = (...classes: Array<string | null | undefined | false>) => {
  return classes.filter(Boolean).join(' ')
}

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-US').format(value)
}

export const formatPercentage = (value: number) => {
  return `${value.toFixed(1)}%`
}

export const formatDate = (value: string | number | Date) => {
  const date = value instanceof Date ? value : new Date(value)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export const formatRelativeDate = (value: string | number | Date) => {
  const date = value instanceof Date ? value : new Date(value)
  const diffMs = Date.now() - date.getTime()
  const diffMinutes = Math.floor(diffMs / 60000)
  if (diffMinutes < 1) return 'just now'
  if (diffMinutes < 60) return `${diffMinutes}m ago`
  const diffHours = Math.floor(diffMinutes / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays < 7) return `${diffDays}d ago`
  return formatDate(date)
}

export const truncate = (value: string, maxLength = 80) => {
  if (value.length <= maxLength) return value
  return `${value.slice(0, maxLength)}…`
}

export const getInitials = (value: string) => {
  if (!value) return ''
  return value
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const size = bytes / Math.pow(1024, index)
  return `${size.toFixed(size < 10 && index > 0 ? 1 : 0)} ${units[index]}`
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'draft':
      return 'status-badge status-draft'
    case 'scheduled':
      return 'status-badge status-scheduled'
    case 'published':
      return 'status-badge status-published'
    case 'archived':
      return 'status-badge status-archived'
    default:
      return 'status-badge status-default'
  }
}
