import request from '@/utils/request'

const commonApiName = 'reservation'

export const reservationInit = data => {
  return request.post(`/${commonApiName}/init`, data)
}

export const reservationEvent = event => {
  return request.post(`/${commonApiName}/event`, {event,url:window.location.href})
}

export const reservationAppointmentEvent = (event,phone) => {
  return request.post(`/${commonApiName}/event`, {event,url:window.location.href,phone})
}

export const reservationPlayerReserve = data => {
  return request.post(`/${commonApiName}/player_reserve`, data)
}

export const reservationPlayerDraw = data => {
  return request.post(`/${commonApiName}/draw`, data)
}

export const reservationFinishTask = data => {
  return request.post(`/${commonApiName}/finish_task`, data)
}

export const reservationAwardlist = data => {
  return request.post(`/${commonApiName}/award_list`, data)
}