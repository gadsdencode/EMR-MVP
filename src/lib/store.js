// Simple data store using localStorage
class Store {
  constructor() {
    this.patients = JSON.parse(localStorage.getItem('patients') || '[]');
    this.appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    this.messages = JSON.parse(localStorage.getItem('messages') || '[]');
  }

  // Patients
  getPatients() {
    return this.patients;
  }

  addPatient(patient) {
    const newPatient = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...patient
    };
    this.patients.push(newPatient);
    localStorage.setItem('patients', JSON.stringify(this.patients));
    return newPatient;
  }

  updatePatient(id, data) {
    const index = this.patients.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Patient not found');
    
    this.patients[index] = { ...this.patients[index], ...data };
    localStorage.setItem('patients', JSON.stringify(this.patients));
    return this.patients[index];
  }

  deletePatient(id) {
    this.patients = this.patients.filter(p => p.id !== id);
    localStorage.setItem('patients', JSON.stringify(this.patients));
  }

  // Appointments
  getAppointments() {
    return this.appointments;
  }

  addAppointment(appointment) {
    const newAppointment = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'scheduled',
      ...appointment
    };
    this.appointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
    return newAppointment;
  }

  updateAppointment(id, data) {
    const index = this.appointments.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Appointment not found');
    
    this.appointments[index] = { ...this.appointments[index], ...data };
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
    return this.appointments[index];
  }

  deleteAppointment(id) {
    this.appointments = this.appointments.filter(a => a.id !== id);
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }

  // Messages
  getMessages() {
    return this.messages;
  }

  addMessage(message) {
    const newMessage = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'unread',
      ...message
    };
    this.messages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(this.messages));
    return newMessage;
  }

  updateMessage(id, data) {
    const index = this.messages.findIndex(m => m.id === id);
    if (index === -1) throw new Error('Message not found');
    
    this.messages[index] = { ...this.messages[index], ...data };
    localStorage.setItem('messages', JSON.stringify(this.messages));
    return this.messages[index];
  }

  deleteMessage(id) {
    this.messages = this.messages.filter(m => m.id !== id);
    localStorage.setItem('messages', JSON.stringify(this.messages));
  }
}

export const store = new Store();
