import type { Category } from './shop'

export interface CalendarDay {
  id: string
  dayIndex: number
  day: number
  dayFromEnd: number
  weekday: number
  weekdayOrdinal: number
  weekdayOrdinalFromEnd: number
  week: number
  weekFromEnd: number
  weeknumber: number
  month: number
  year: number
  date: Date
  position: number
  label: string
  ariaLabel: string
  weekdayPosition: number
  weekdayPositionFromEnd: number
  weekPosition: number
  isoWeeknumber: number
  startDate: Date
  noonDate: Date
  endDate: Date
  isToday: boolean
  isFirstDay: boolean
  isLastDay: boolean
  isDisabled: boolean
  isFocusable: boolean
  inMonth: boolean
  inPrevMonth: boolean
  inNextMonth: boolean
  onTop: boolean
  onBottom: boolean
  onLeft: boolean
  onRight: boolean
  classes: Array<string | Object>
  [key: string]: any
}

export interface Pagination {
  page: number
  pageSize: number | string
  pageCount: number
  total: number
}

export const initPagination: Pagination = {
  page: 1,
  pageSize: 10,
  pageCount: 1,
  total: 1,
}

export interface Faq {
  question: string
  answer: string
  category: Category
  for_role: Object
}
