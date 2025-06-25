import React, { useState } from 'react';
import { Calendar, Clock, Plus, Bell, MapPin, User, Trash2 } from 'lucide-react';

interface Appointment {
  id: number;
  title: string;
  date: string;
  time: string;
  type: 'checkup' | 'vaccination' | 'scan' | 'other';
  location?: string;
  doctor?: string;
  notes?: string;
}

const defaultAppointments: Appointment[] = [
  {
    id: 1,
    title: 'First Prenatal Checkup',
    date: '2024-02-15',
    time: '10:00',
    type: 'checkup',
    location: 'City Hospital',
    doctor: 'Dr. Smith',
    notes: 'Initial consultation and blood tests'
  },
  {
    id: 2,
    title: 'First Trimester Screening',
    date: '2024-03-10',
    time: '14:30',
    type: 'scan',
    location: 'Ultrasound Clinic',
    doctor: 'Dr. Johnson',
    notes: 'NT scan and blood tests'
  },
  {
    id: 3,
    title: 'Tdap Vaccination',
    date: '2024-04-20',
    time: '11:00',
    type: 'vaccination',
    location: 'Clinic',
    doctor: 'Nurse Mary',
    notes: 'Whooping cough vaccine'
  }
];

const trimesterMilestones = [
  { week: 12, milestone: 'End of First Trimester', description: 'Risk of miscarriage decreases significantly' },
  { week: 20, milestone: 'Anatomy Scan', description: 'Detailed ultrasound to check baby\'s development' },
  { week: 28, milestone: 'Third Trimester Begins', description: 'Final stretch of pregnancy begins' },
  { week: 36, milestone: 'Baby is Full Term', description: 'Baby can be safely delivered' },
  { week: 40, milestone: 'Due Date', description: 'Expected delivery date' }
];

const ImportantDates: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(defaultAppointments);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({
    title: '',
    date: '',
    time: '',
    type: 'checkup',
    location: '',
    doctor: '',
    notes: ''
  });

  const addAppointment = () => {
    if (newAppointment.title && newAppointment.date && newAppointment.time) {
      const appointment: Appointment = {
        id: Date.now(),
        title: newAppointment.title!,
        date: newAppointment.date!,
        time: newAppointment.time!,
        type: newAppointment.type as 'checkup' | 'vaccination' | 'scan' | 'other',
        location: newAppointment.location,
        doctor: newAppointment.doctor,
        notes: newAppointment.notes
      };
      setAppointments([...appointments, appointment].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
      setNewAppointment({
        title: '',
        date: '',
        time: '',
        type: 'checkup',
        location: '',
        doctor: '',
        notes: ''
      });
      setShowAddForm(false);
    }
  };

  const deleteAppointment = (id: number) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'checkup': return 'bg-blue-100 text-blue-600';
      case 'vaccination': return 'bg-green-100 text-green-600';
      case 'scan': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'checkup': return '🩺';
      case 'vaccination': return '💉';
      case 'scan': return '📸';
      default: return '📅';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-orange-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Important Dates</h2>
              <p className="text-gray-600">Track your appointments and milestones</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Appointment</span>
          </button>
        </div>
      </div>

      {/* Add Appointment Form */}
      {showAddForm && (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Appointment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={newAppointment.title || ''}
                onChange={(e) => setNewAppointment({...newAppointment, title: e.target.value})}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Appointment title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={newAppointment.type || 'checkup'}
                onChange={(e) => setNewAppointment({...newAppointment, type: e.target.value as any})}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="checkup">Checkup</option>
                <option value="vaccination">Vaccination</option>
                <option value="scan">Scan</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={newAppointment.date || ''}
                onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
              <input
                type="time"
                value={newAppointment.time || ''}
                onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={newAppointment.location || ''}
                onChange={(e) => setNewAppointment({...newAppointment, location: e.target.value})}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Hospital/Clinic name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Doctor</label>
              <input
                type="text"
                value={newAppointment.doctor || ''}
                onChange={(e) => setNewAppointment({...newAppointment, doctor: e.target.value})}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Doctor's name"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                value={newAppointment.notes || ''}
                onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows={3}
                placeholder="Additional notes"
              />
            </div>
          </div>
          <div className="flex space-x-3 mt-4">
            <button
              onClick={addAppointment}
              className="px-6 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
            >
              Add Appointment
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Upcoming Appointments */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-blue-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Bell className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h3>
        </div>
        
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">{getTypeIcon(appointment.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-gray-800">{appointment.title}</h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(appointment.type)}`}>
                        {appointment.type}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(appointment.date).toLocaleDateString()}</span>
                        <Clock className="w-4 h-4 ml-4" />
                        <span>{appointment.time}</span>
                      </div>
                      
                      {appointment.location && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{appointment.location}</span>
                        </div>
                      )}
                      
                      {appointment.doctor && (
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>{appointment.doctor}</span>
                        </div>
                      )}
                      
                      {appointment.notes && (
                        <p className="text-gray-700 mt-2">{appointment.notes}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => deleteAppointment(appointment.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trimester Milestones */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Pregnancy Milestones</h3>
        </div>
        
        <div className="space-y-4">
          {trimesterMilestones.map((milestone, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-purple-50 rounded-xl">
              <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-700 font-bold text-sm">{milestone.week}w</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{milestone.milestone}</h4>
                <p className="text-gray-600 text-sm">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImportantDates;