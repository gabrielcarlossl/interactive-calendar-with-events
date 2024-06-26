
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
    id: 33,
    name: 'Dries Vincent',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-05-20T17:00',
    endDatetime: '2024-05-20T18:30',
  },
  {
    id: 333,
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

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  let today = startOfToday()
  let [selectedDay, setSelectedDay] = useState(today)
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

  console.log('firstDayCurrentMonth', firstDayCurrentMonth)

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

  let colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
  ]
  function Meeting({ meeting }) {
    let startDateTime = parseISO(meeting.startDatetime)
    let endDateTime = parseISO(meeting.endDatetime)

    return (
      <li style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        gap: '1rem',
        borderRadius: '0.375rem',
        '&:focus-within': {
          backgroundColor: '#f3f4f6',
        },
        '&:hover': {
          backgroundColor: '#f3f4f6',
        }
      }}>
        <img
          src={meeting.imageUrl}
          alt=""
          style={{
            flex: 'none',
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%'
          }}
        />
        <div style={{ flex: '1' }}>
          <p style={{ color: '#1a202c' }}>{meeting.name}</p>
          <p style={{ marginTop: '0.125rem' }}>
            <time dateTime={meeting.startDatetime}>
              {format(startDateTime, 'h:mm a')}
            </time>{' '}
            -{' '}
            <time dateTime={meeting.endDatetime}>
              {format(endDateTime, 'h:mm a')}
            </time>
          </p>
        </div>
      </li>
    )
  }

  return (
    <div style={{ paddingTop: '16px' }}>
      <div className="container">
        <div className="containerTwo">
          <div className="containerThree">
            <div style={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <h2 className="month">
                {format(firstDayCurrentMonth, 'MMMM yyyy')}
              </h2>
              <button
                type="button"
                onClick={previousMonth}
                className="prev-month-btn"
              >
                <span
                  style={{
                    position: 'absolute',
                    width: '1px',
                    height: '1px',
                    padding: 0,
                    margin: '-1px',
                    overflow: 'hidden',
                    clip: 'rect(0, 0, 0, 0)',
                    whiteSpace: 'nowrap',
                    borderWidth: 0
                  }}
                >
                  Previous month
                </span>
                &lt;
              </button>
              <button
                onClick={nextMonth}
                type="button"
                className="next-month-btn"
              >
                <span style={{
                  position: 'absolute',
                  width: '1px',
                  height: '1px',
                  padding: 0,
                  margin: '-1px',
                  overflow: 'hidden',
                  clip: 'rect(0, 0, 0, 0)',
                  whiteSpace: 'nowrap',
                  borderWidth: 0
                }}
                >
                  Next month
                </span>
                &gt;
              </button>
            </div>
            <div className="weekDaysContainer">
              <div>Dom</div>
              <div>Seg</div>
              <div>Ter</div>
              <div>Qua</div>
              <div>Qui</div>
              <div>Sex</div>
              <div>Sab</div>
            </div>
            <div className="monthDaysContainer">
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  style={{
                    paddingTop: '0.375rem',
                    paddingBottom: '0.375rem'
                  }}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)]
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    style={{
                      flexDirection: 'column',
                      '&:hover': {
                        cursor: 'pointer'
                      }
                    }}
                    className={classNames(
                      isEqual(day, selectedDay) && 'text-white',
                      !isEqual(day, selectedDay) &&
                      isToday(day) &&
                      'text-red',
                      !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      'text-gray900',
                      !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      !isSameMonth(day, firstDayCurrentMonth) &&
                      'text-gray400',
                      isEqual(day, selectedDay) && isToday(day) && 'bg-red',
                      isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      'bg-gray900',
                      !isEqual(day, selectedDay) && 'bg-hover',
                      (isEqual(day, selectedDay) || isToday(day)) &&
                      'font-semibold',
                      'styles'
                    )}
                  >
                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
                    </time>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {meetingsByDay[format(day, 'yyyy-MM-dd')] &&
                        Array.from(Array(meetingsByDay[format(day, 'yyyy-MM-dd')]), (_, i) => (
                          <div key={i} style={{
                            width: '0.25rem',
                            height: '0.25rem',
                            borderRadius: '50%',
                            backgroundColor: '#60a5fa'
                          }} />
                        ))}
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <section style={{
            marginTop: '3rem',
            paddingLeft: '3.5rem',
            '@media (min-width: 768px)': {
              marginTop: '0',
            }
          }}>
            <h2
              style={{
                fontWeight: 600,
                color: '#1a202c'
              }}
            >
              Schedule for{' '}
              <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                {format(selectedDay, 'MMM dd, yyy')}
              </time>
            </h2>
            <ol style={{ marginTop: '1rem', lineHeight: 1.5, fontSize: '0.875rem', color: '#6b7280' }}>
              {selectedDayMeetings.length > 0 ? (
                selectedDayMeetings.map((meeting) => (
                  <Meeting meeting={meeting} key={meeting.id} />
                ))
              ) : (
                <p>No meetings for today.</p>
              )}
            </ol>
          </section>
        </div>
      </div>
    </div>
  )
}