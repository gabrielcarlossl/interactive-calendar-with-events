
import { DotsVerticalIcon } from '@heroicons/react/outline'
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns'
import { useState } from 'react'

const meetings = [
  {
    id: 1,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-05-11T13:00',
    endDatetime: '2024-05-11T14:30',
  },
  {
    id: 2,
    name: 'Michael Foster',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-05-20T09:00',
    endDatetime: '2024-05-20T11:30',
  },
  {
    id: 3,
    name: 'Dries Vincent',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-05-20T17:00',
    endDatetime: '2024-05-20T18:30',
  },
  {
    id: 4,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-06-09T13:00',
    endDatetime: '2024-06-09T14:30',
  },
  {
    id: 5,
    name: 'Michael Foster',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-05-13T14:00',
    endDatetime: '2024-05-13T14:30',
  },
]

export default function Example() {
  let today = startOfToday()
  let [selectedDay, setSelectedDay] = useState(today)
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  })

  // Objeto para rastrear o número de reuniões por dia
  let meetingsByDay = {};

  // Contar o número de reuniões para cada dia
  meetings.forEach((meeting) => {
    const meetingDay = format(parseISO(meeting.startDatetime), 'yyyy-MM-dd');
    if (!meetingsByDay[meetingDay]) {
      meetingsByDay[meetingDay] = 1;
    } else {
      meetingsByDay[meetingDay]++;
    }
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  let selectedDayMeetings = meetings.filter((meeting) =>
    isSameDay(parseISO(meeting.startDatetime), selectedDay)
  )

  return (
    <div style={{ paddingTop: '4rem' }}>
      <div style={{ maxWidth: '40rem', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '2rem' }}>
          <div style={{ paddingRight: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h2 style={{ flex: 'auto', fontWeight: '600', color: '#374151' }}>
                {format(firstDayCurrentMonth, 'MMMM yyyy')}
              </h2>
              <div className='months-buttons'>
                <button
                  type="button"
                  onClick={previousMonth}
                  style={{
                    margin: '-1.5px 0 0 -1.5px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1.5px',
                    color: '#9CA3AF',
                    cursor: 'pointer',
                    border: 'none',
                    background: 'none'
                  }}
                >
                  <span className='prev-month-icon' style={{ fontSize: '1.3rem', lineHeight: '1rem', textAlign: 'center' }}>‹</span>
                </button>
                <button
                  onClick={nextMonth}
                  type="button"
                  style={{
                    margin: '-1.5px -1.5px 0 0',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1.5px',
                    color: '#9CA3AF',
                    cursor: 'pointer',
                    border: 'none',
                    background: 'none'
                  }}
                >
                  <span className='next-month-icon' style={{ fontSize: '1.3rem', lineHeight: '1rem', textAlign: 'center' }}>›</span>
                </button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', marginTop: '1.5rem', fontSize: '0.875rem', lineHeight: '1.25rem', color: '#6B7280' }}>
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', marginTop: '0.5rem', fontSize: '0.875rem', lineHeight: '1.25rem', color: '#4B5563' }}>
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  style={{
                    gridColumn: dayIdx === 0 && colStartClasses[getDay(day)],
                    padding: '0.375rem 0',
                    textAlign: 'center'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    style={{
                      flexDirection: 'column',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '9999px',
                      border: 'none',
                      cursor: 'pointer',
                      background: isEqual(day, selectedDay) ? (isToday(day) ? '#EF4444' : '#4B5563') : (isToday(day) ? '#FECACA' : (isSameMonth(day, firstDayCurrentMonth) ? '#F3F4F6' : '#E5E7EB')),
                      color: isEqual(day, selectedDay) ? (isToday(day) ? '#FFFFFF' : '#FFFFFF') : (isToday(day) ? '#EF4444' : (isSameMonth(day, firstDayCurrentMonth) ? '#111827' : '#9CA3AF')),
                      fontWeight: isEqual(day, selectedDay) || isToday(day) ? '600' : '400'
                    }}
                  >
                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
                    </time>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {meetingsByDay[format(day, 'yyyy-MM-dd')] &&
                        Array.from(Array(meetingsByDay[format(day, 'yyyy-MM-dd')]), (_, i) => (
                          <div key={i} style={{ width: '0.25rem', height: '0.25rem', borderRadius: '9999px', backgroundColor: '#60A5FA' }}></div>
                        ))}
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <section style={{ marginTop: '1.5rem', paddingLeft: '2rem' }}>
            <h2 style={{ fontWeight: '600', color: '#374151' }}>
              Schedule for{' '}
              <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                {format(selectedDay, 'MMM dd, yyy')}
              </time>
            </h2>
            <ol style={{ marginTop: '0.5rem', marginBottom: '0', listStyle: 'none', paddingLeft: '0' }}>
              {selectedDayMeetings.length > 0 ? (
                selectedDayMeetings.map((meeting) => (
                  <Meeting meeting={meeting} key={meeting.id} />
                ))
              ) : (
                <p style={{ color: '#6B7280' }}>No meetings for today.</p>
              )}
            </ol>
          </section>
        </div>
      </div>
    </div>
  )
}

function Meeting({ meeting }) {
  let startDateTime = parseISO(meeting.startDatetime)
  let endDateTime = parseISO(meeting.endDatetime)

  return (
    <li style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 0', borderRadius: '0.375rem', transition: 'background-color 0.2s', cursor: 'pointer' }}>
      <img
        src={meeting.imageUrl}
        alt=""
        style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px' }}
      />
      <div style={{ flex: 'auto', marginLeft: '1rem' }}>
        <p style={{ margin: '0', color: '#374151' }}>{meeting.name}</p>
        <p style={{ margin: '0.125rem 0 0', color: '#6B7280' }}>
          <time dateTime={meeting.startDatetime}>
            {format(startDateTime, 'h:mm a')}
          </time>{' '}
          -{' '}
          <time dateTime={meeting.endDatetime}>
            {format(endDateTime, 'h:mm a')}
          </time>
        </p>
      </div>
      <div style={{ position: 'relative' }}>
        <button
          type="button"
          style={{
            padding: '0.375rem',
            color: '#9CA3AF',
            transition: 'color 0.2s',
            border: 'none',
            background: 'none'
          }}
        >
          <DotsVerticalIcon style={{ width: '1.5rem', height: '1.5rem' }} aria-hidden="true" />
        </button>
        <div style={{ position: 'absolute', top: '100%', right: '0', zIndex: '10', display: 'none', backgroundColor: '#FFFFFF', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', borderRadius: '0.375rem' }}>
          <a href="#" style={{ display: 'block', padding: '0.5rem 1rem', color: '#111827', textDecoration: 'none', transition: 'background-color 0.2s' }}>Edit</a>
          <a href="#" style={{ display: 'block', padding: '0.5rem 1rem', color: '#111827', textDecoration: 'none', transition: 'background-color 0.2s' }}>Cancel</a>
        </div>
      </div>
    </li>
  )
}

let colStartClasses = [
  '',
  'grid-column-start-2',
  'grid-column-start-3',
  'grid-column-start-4',
  'grid-column-start-5',
  'grid-column-start-6',
  'grid-column-start-7',
]
