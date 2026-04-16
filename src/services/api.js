

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchAPI = async (endpoint, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.status}`);
  }
  return response.json();
};

export const api = {
  // ดึงข้อมูลเครื่องเล่น
  getRides: () => fetchAPI('/rides'),
  getRideById: (id) => fetchAPI(`/rides/${id}`),
  
  // ดึงประวัติการจอง
  getBookings: () => fetchAPI('/bookings'),
  getBookingById: (id) => fetchAPI(`/bookings/${id}`),
  
  // สร้างการจองใหม่
  createBooking: (payload) => fetchAPI('/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }),
  
  // แก้ไขการจอง
  updateBooking: (id, payload) => fetchAPI(`/bookings/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }),
  
  // ลบการจอง
  deleteBooking: (id) => fetchAPI(`/bookings/${id}`, {
    method: 'DELETE'
  }),
};