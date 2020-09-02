import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { UserEvent, deleteUserEvent, updateUserEvent } from '../../redux/user-events'
import { addZero } from '../../lib/utils'

interface Props {
  event: UserEvent
}

export const EventItem: React.FC<Props> = ({ event }) => {
  const dispatch = useDispatch()
  const handleDeleteClick = () => {
    dispatch(deleteUserEvent(event.id))
  }

  const [editable, setEditable] = useState(false)
  const handleTitleClick = () => {
    setEditable(true)
  }
  
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (editable) {
      inputRef.current?.focus()
    }
  }, [editable])

  const [title, setTitle] = useState(event.title)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleBlur = () => {
    if (title !== event.title) {
      dispatch(updateUserEvent({
        ...event,
        title
      }))
    }
    setEditable(false)
  }

  const firstHour = new Date(event.dateStart)
  const startHour = firstHour.getHours()
  const startMinutes = firstHour.getMinutes()

  const secondHour = new Date(event.dateEnd)
  const endHour = secondHour.getHours()
  const endMinutes = secondHour.getMinutes()

  return (
    <div className='calendar-event' key={event.id}>
      <div className='calendar-info'>
        <div className='calendar-event-time'>
          { addZero(startHour) }:{ addZero(startMinutes) } 
            -
          { addZero(endHour) }:{ addZero(endMinutes) }</div>
        <div className='calendar-event-title'>
          {editable ? (<input type='text' ref={ inputRef } value={ title } onChange={handleChange} onBlur={handleBlur}/>) 
          : (
            <span onClick={handleTitleClick}>{ event.title }</span> 
          )}
        </div>
      </div>
      <button className='calendar-event-delete-button' onClick={handleDeleteClick}>
        &times;
      </button>
    </div>
  )
}