import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Archive,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  Edit,
  Image,
  Mail,
  Plus,
  RefreshCw,
  Save,
  Search,
  Trash2,
  Upload,
  Users,
  X,
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import AdNavbar from '../components/AdNavbar';
import authService from '../store/authService';

const initialUpcomingForm = {
  image: null,
  typeOfEvent: '',
  eventName: '',
  hostedBy: 'true',
  eventType: 'true',
  eventDate: '',
  eventStartTime: '',
  eventEndTime: '',
  eventOverview: '',
  eventSpeakerOverview: '',
};

const initialArchivedForm = {
  archievedEventName: '',
  archievedEventSpeakerName: '',
  archievedEventSpeakerDesignation: '',
  archievedEventDate: '',
  image1: null,
  image2: null,
};

const toTimeInput = (value) => (value ? String(value).slice(0, 5) : '');
const eventStatus = (event) => event?.statusLabel?.replace('archieved', 'archived') || (event?.status ? 'upcoming' : 'archived');

const readApiMessage = (error, fallback) => {
  if (error?.status === 413) return 'Maximum upload size exceeded. Please use a smaller image.';
  return error?.message || fallback;
};

const inputClass = 'w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100';

const Field = ({ label, children }) => (
  <label className="block text-sm font-medium text-gray-700">
    <span className="mb-2 block">{label}</span>
    {children}
  </label>
);

const UpcomingFields = ({ form, setFormValue, setImageValue, preview, setPreview, createMode = false }) => (
  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
    <Field label="Type of Event *">
      <input className={inputClass} value={form.typeOfEvent} onChange={(e) => setFormValue('typeOfEvent', e.target.value)} placeholder="Workshop" required={createMode} />
    </Field>
    <Field label="Event Name *">
      <input className={inputClass} value={form.eventName} onChange={(e) => setFormValue('eventName', e.target.value)} placeholder="Art & Law Summit" required={createMode} />
    </Field>
    <Field label="Hosted By *">
      <input className={`${inputClass} cursor-not-allowed bg-gray-100 text-gray-600`} value="ArtLawCommunion" readOnly />
    </Field>
    <Field label="Event Type *">
      <select className={inputClass} value={form.eventType} onChange={(e) => setFormValue('eventType', e.target.value)}>
        <option value="true">Online</option>
        <option value="false">Offline</option>
      </select>
    </Field>
    <Field label="Event Date *">
      <input type="date" className={inputClass} value={form.eventDate} onChange={(e) => setFormValue('eventDate', e.target.value)} required={createMode} />
    </Field>
    <div className="grid grid-cols-2 gap-3">
      <Field label="Start Time *">
        <input type="time" className={inputClass} value={form.eventStartTime} onChange={(e) => setFormValue('eventStartTime', e.target.value)} required={createMode} />
      </Field>
      <Field label="End Time *">
        <input type="time" className={inputClass} value={form.eventEndTime} onChange={(e) => setFormValue('eventEndTime', e.target.value)} required={createMode} />
      </Field>
    </div>
    <Field label="Event Overview *">
      <textarea className={inputClass} rows={5} value={form.eventOverview} onChange={(e) => setFormValue('eventOverview', e.target.value)} required={createMode} />
    </Field>
    <Field label="Speaker Overview *">
      <textarea className={inputClass} rows={5} value={form.eventSpeakerOverview} onChange={(e) => setFormValue('eventSpeakerOverview', e.target.value)} required={createMode} />
    </Field>
    <div className="md:col-span-2">
      <Field label={createMode ? 'Event Poster *' : 'Event Poster'}>
        <div className="flex flex-col gap-4 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 md:flex-row md:items-center">
          {preview ? <img src={preview} alt="Event poster preview" className="h-32 w-52 rounded-lg object-cover" /> : <div className="flex h-32 w-52 items-center justify-center rounded-lg bg-white text-gray-400"><Image /></div>}
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white hover:bg-black">
            <Upload className="h-4 w-4" />
            {preview ? 'Replace Poster' : 'Upload Poster'}
            <input type="file" accept="image/*" className="hidden" required={createMode} onChange={(e) => setImageValue('image', e.target.files?.[0], setPreview)} />
          </label>
        </div>
      </Field>
    </div>
  </div>
);

const CreateEvent = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [loading, setLoading] = useState(false);
  const [createForm, setCreateForm] = useState(initialUpcomingForm);
  const [createPreview, setCreatePreview] = useState('');
  const [createdEvent, setCreatedEvent] = useState(null);

  const [filters, setFilters] = useState({ eventId: '', status: 'all' });
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [upcomingForm, setUpcomingForm] = useState(initialUpcomingForm);
  const [upcomingPreview, setUpcomingPreview] = useState('');
  const [archivedForm, setArchivedForm] = useState(initialArchivedForm);
  const [archivedPreview1, setArchivedPreview1] = useState('');
  const [archivedPreview2, setArchivedPreview2] = useState('');
  const [detailRows, setDetailRows] = useState([{ key: '', value: '' }]);
  const [takeaways, setTakeaways] = useState(['']);
  const [participants, setParticipants] = useState([]);
  const [participantsLoading, setParticipantsLoading] = useState(false);
  const [registrationWindow, setRegistrationWindow] = useState({
    registration_open_from: '',
    registration_open_until: '',
  });
  const [notification, setNotification] = useState({ subject: '', content: '' });

  const selectedEventId = selectedEvent?.eventId || '';
  const selectedStatus = useMemo(() => eventStatus(selectedEvent), [selectedEvent]);
  const isUpcomingEvent = selectedStatus === 'upcoming';
  const isArchivedEvent = selectedStatus === 'archived';

  const setFormValue = (setter, field, value) => {
    setter((current) => ({ ...current, [field]: value }));
  };

  const setImageValue = (setter, previewSetter, field, file) => {
    setter((current) => ({ ...current, [field]: file || null }));
    previewSetter(file ? URL.createObjectURL(file) : '');
  };

  const bindForm = (setter) => (field, value) => {
    setFormValue(setter, field, value);
  };

  const bindImage = (setter) => (field, file, previewSetter) => {
    setImageValue(setter, previewSetter, field, file);
  };

  const buildArchivedPayload = () => ({
    ...archivedForm,
    archeivedEventDetails: JSON.stringify(
      detailRows.reduce((details, row) => {
        if (row.key.trim()) details[row.key.trim()] = row.value.trim();
        return details;
      }, {})
    ),
    archievedEventKeyTakeaways: JSON.stringify(takeaways.map((item) => item.trim()).filter(Boolean)),
  });

  const searchEvents = useCallback(async () => {
    setSearchLoading(true);
    setSearchError('');
    try {
      const response = await authService.searchEvents({
        eventId: filters.eventId.trim(),
        status: filters.status,
      });
      const loadedEvents = response.data || [];
      setEvents(loadedEvents);
      setSelectedEvent((current) => loadedEvents.find((event) => event.eventId === current?.eventId) || loadedEvents[0] || null);
    } catch (error) {
      setEvents([]);
      setSelectedEvent(null);
      setSearchError(readApiMessage(error, 'Unable to load events.'));
    } finally {
      setSearchLoading(false);
    }
  }, [filters.eventId, filters.status]);

  useEffect(() => {
    const eventId = filters.eventId.trim();
    if (!eventId && filters.status === 'all') {
      setEvents([]);
      setSelectedEvent(null);
      setSearchError('');
      return;
    }

    const searchTimer = setTimeout(() => {
      searchEvents();
    }, 450);

    return () => clearTimeout(searchTimer);
  }, [filters.eventId, filters.status, searchEvents]);

  useEffect(() => {
    if (!selectedEvent) return;

    setUpcomingForm({
      image: null,
      typeOfEvent: selectedEvent.typeOfEvent || '',
      eventName: selectedEvent.eventName || '',
      hostedBy: 'true',
      eventType: String(selectedEvent.eventType ?? true),
      eventDate: selectedEvent.eventDate || '',
      eventStartTime: toTimeInput(selectedEvent.eventStartTime),
      eventEndTime: toTimeInput(selectedEvent.eventEndTime),
      eventOverview: selectedEvent.eventOverview || '',
      eventSpeakerOverview: selectedEvent.eventSpeakerOverview || '',
    });
    setUpcomingPreview(selectedEvent.image || '');
    setArchivedForm({
      archievedEventName: selectedEvent.archievedEventName || '',
      archievedEventSpeakerName: selectedEvent.archievedEventSpeakerName || '',
      archievedEventSpeakerDesignation: selectedEvent.archievedEventSpeakerDesignation || '',
      archievedEventDate: selectedEvent.archievedEventDate || '',
      image1: null,
      image2: null,
    });
    setArchivedPreview1(selectedEvent.image1 || '');
    setArchivedPreview2(selectedEvent.image2 || '');
    setDetailRows(
      Object.entries(selectedEvent.archeivedEventDetails || {}).length
        ? Object.entries(selectedEvent.archeivedEventDetails).map(([key, value]) => ({ key, value: String(value ?? '') }))
        : [{ key: '', value: '' }]
    );
    setTakeaways(selectedEvent.archievedEventKeyTakeaways?.length ? selectedEvent.archievedEventKeyTakeaways : ['']);
    setParticipants([]);
  }, [selectedEvent]);

  const handleCreate = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await authService.createUpcomingEvent(createForm);
      setCreatedEvent(response.data);
      setCreateForm(initialUpcomingForm);
      setCreatePreview('');
      toast.success(`${response.message || 'Upcoming event created.'} ID: ${response.data?.eventId}`);
    } catch (error) {
      toast.error(readApiMessage(error, 'Failed to create event.'));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUpcoming = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await authService.updateUpcomingEvent(selectedEventId, upcomingForm);
      setSelectedEvent(response.data);
      toast.success(response.message || 'Upcoming event updated.');
      searchEvents();
    } catch (error) {
      toast.error(readApiMessage(error, 'Failed to update upcoming event.'));
    } finally {
      setLoading(false);
    }
  };

  const handleArchive = async () => {
    if (!selectedEventId) return;
    if (!window.confirm(`Archive event ${selectedEventId}?`)) return;
    setLoading(true);
    try {
      const response = await authService.archiveEvent(selectedEventId);
      setSelectedEvent(response.data);
      toast.success(response.message || 'Event status changed to archived.');
      searchEvents();
    } catch (error) {
      toast.error(readApiMessage(error, 'Failed to archive event.'));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateArchived = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await authService.updateArchivedEvent(selectedEventId, buildArchivedPayload());
      setSelectedEvent(response.data);
      toast.success(response.message || 'Archived event updated.');
      searchEvents();
    } catch (error) {
      toast.error(readApiMessage(error, 'Failed to update archived event.'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedEventId || !window.confirm(`Delete event ${selectedEventId}? This action cannot be undone.`)) return;
    setLoading(true);
    try {
      const response = await authService.deleteEvent(selectedEventId);
      toast.success(response.message || 'Event deleted successfully.');
      setEvents((current) => current.filter((event) => event.eventId !== selectedEventId));
      setSelectedEvent(null);
    } catch (error) {
      toast.error(readApiMessage(error, 'Failed to delete event.'));
    } finally {
      setLoading(false);
    }
  };

  const loadParticipants = async () => {
    if (!selectedEventId) return;
    setParticipantsLoading(true);
    try {
      const response = await authService.getEventParticipants(selectedEventId);
      setParticipants(response.data || []);
      toast.success(response.message || 'Participants loaded.');
    } catch (error) {
      toast.error(readApiMessage(error, 'Unable to load participants.'));
    } finally {
      setParticipantsLoading(false);
    }
  };

  const updateRegistrationWindow = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await authService.updateEventRegistrationWindow(selectedEventId, registrationWindow);
      toast.success(response.message || 'Registration window updated.');
    } catch (error) {
      toast.error(readApiMessage(error, 'Failed to update registration window.'));
    } finally {
      setLoading(false);
    }
  };

  const notifyParticipants = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await authService.notifyEventParticipants(selectedEventId, notification);
      setNotification({ subject: '', content: '' });
      toast.success(response.message || 'Broadcast email queued successfully.');
    } catch (error) {
      toast.error(readApiMessage(error, 'Failed to send notification.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full ai-bg">
      <AdNavbar />
      <main className="mx-auto max-w-7xl px-4 py-8 pt-32 md:px-6">
        <section className="overflow-hidden rounded-2xl bg-white/95 shadow-2xl backdrop-blur-sm">
          <div className="border-b border-gray-200 px-6 pt-6 md:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Events API Admin</h1>
            <div className="mt-6 flex flex-wrap gap-5">
              {[
                ['create', Calendar, 'Create Upcoming Event'],
                ['manage', Search, 'Manage Events'],
              ].map(([key, Icon, label]) => (
                <button key={key} onClick={() => setActiveTab(key)} className={`flex items-center gap-2 border-b-2 px-2 pb-4 text-sm font-semibold ${activeTab === key ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 md:p-8">
            {activeTab === 'create' && (
              <form onSubmit={handleCreate} className="space-y-6">
                {createdEvent?.eventId && (
                  <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-800">
                    <CheckCircle className="h-5 w-5" />
                    <span>Created event ID: <strong>{createdEvent.eventId}</strong></span>
                  </div>
                )}
                <UpcomingFields form={createForm} setFormValue={bindForm(setCreateForm)} setImageValue={bindImage(setCreateForm)} preview={createPreview} setPreview={setCreatePreview} createMode />
                <button disabled={loading} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60">
                  <Save className="h-5 w-5" />
                  {loading ? 'Creating...' : 'Create Upcoming Event'}
                </button>
              </form>
            )}

            {activeTab === 'manage' && (
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_1fr]">
                <aside className="space-y-5">
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                    <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900"><Search className="h-5 w-5" /> Search Events</h2>
                    <div className="space-y-3">
                      <input className={inputClass} value={filters.eventId} onChange={(e) => setFilters((current) => ({ ...current, eventId: e.target.value }))} placeholder="Event ID, e.g. ALCWBEID0005" />
                      <select className={inputClass} value={filters.status} onChange={(e) => setFilters((current) => ({ ...current, status: e.target.value }))}>
                        <option value="all">All Status</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="archived">Archived</option>
                      </select>
                      <button onClick={searchEvents} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-3 font-semibold text-white hover:bg-black">
                        <RefreshCw className={`h-4 w-4 ${searchLoading ? 'animate-spin' : ''}`} />
                        Search
                      </button>
                    </div>
                    {searchError && <p className="mt-3 text-sm text-red-600">{searchError}</p>}
                  </div>

                  <div className="space-y-3">
                    {events.map((event) => (
                      <button key={event.eventId} onClick={() => setSelectedEvent(event)} className={`w-full rounded-xl border p-4 text-left transition ${selectedEvent?.eventId === event.eventId ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                        <div className="flex items-center justify-between gap-3">
                          <strong className="text-gray-900">{event.eventName || event.archievedEventName || 'Untitled event'}</strong>
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${eventStatus(event) === 'upcoming' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>{eventStatus(event)}</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{event.eventId}</p>
                      </button>
                    ))}
                    {!events.length && !searchLoading && <p className="rounded-xl border border-dashed border-gray-300 p-5 text-center text-sm text-gray-500">Search by event ID or status to load events.</p>}
                  </div>
                </aside>

                <section className="space-y-6">
                  {!selectedEvent ? (
                    <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
                      <Search className="mx-auto mb-3 h-10 w-10 opacity-60" />
                      Select an event to edit, archive, notify, view participants, or delete.
                    </div>
                  ) : (
                    <>
                      <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <div>
                            <p className="text-sm font-semibold text-blue-600">{selectedEvent.eventId}</p>
                            <h2 className="text-2xl font-bold text-gray-900">{selectedEvent.eventName || selectedEvent.archievedEventName || 'Event details'}</h2>
                            <p className="text-sm text-gray-500">Current status: {selectedStatus}</p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {selectedStatus === 'upcoming' && (
                              <button onClick={handleArchive} disabled={loading} className="inline-flex items-center gap-2 rounded-lg bg-amber-100 px-4 py-2 font-semibold text-amber-800 hover:bg-amber-200">
                                <Archive className="h-4 w-4" /> Archive
                              </button>
                            )}
                            <button onClick={handleDelete} disabled={loading} className="inline-flex items-center gap-2 rounded-lg bg-red-100 px-4 py-2 font-semibold text-red-700 hover:bg-red-200">
                              <Trash2 className="h-4 w-4" /> Delete
                            </button>
                          </div>
                        </div>
                      </div>

                      {isUpcomingEvent && (
                        <>
                          <form onSubmit={handleUpdateUpcoming} className="space-y-5 rounded-xl border border-gray-200 bg-white p-5">
                            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900"><Edit className="h-5 w-5" /> Edit Upcoming Fields</h3>
                            <UpcomingFields form={upcomingForm} setFormValue={bindForm(setUpcomingForm)} setImageValue={bindImage(setUpcomingForm)} preview={upcomingPreview} setPreview={setUpcomingPreview} />
                            <button disabled={loading} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60">
                              <Save className="h-4 w-4" /> Save Upcoming Changes
                            </button>
                          </form>

                          <form onSubmit={updateRegistrationWindow} className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
                          <h3 className="flex items-center gap-2 text-lg font-semibold"><Clock className="h-5 w-5" /> Registration Window</h3>
                          <p className="text-sm text-gray-500">Enter the registration opening and closing time in IST.</p>
                          <Field label="Open From *"><input type="datetime-local" className={inputClass} value={registrationWindow.registration_open_from} onChange={(e) => setFormValue(setRegistrationWindow, 'registration_open_from', e.target.value)} required /></Field>
                          <Field label="Open Until *"><input type="datetime-local" className={inputClass} value={registrationWindow.registration_open_until} onChange={(e) => setFormValue(setRegistrationWindow, 'registration_open_until', e.target.value)} required /></Field>
                          <button disabled={loading} className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 font-semibold text-white hover:bg-black"><Calendar className="h-4 w-4" /> Set Window</button>
                        </form>
                        </>
                      )}

                      {isArchivedEvent && (
                        <>
                          <form onSubmit={handleUpdateArchived} className="space-y-5 rounded-xl border border-gray-200 bg-white p-5">
                            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900"><Archive className="h-5 w-5" /> Edit Archived Event</h3>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                              <Field label="Archived Event Name *"><input className={inputClass} value={archivedForm.archievedEventName} onChange={(e) => setFormValue(setArchivedForm, 'archievedEventName', e.target.value)} required /></Field>
                              <Field label="Speaker Name *"><input className={inputClass} value={archivedForm.archievedEventSpeakerName} onChange={(e) => setFormValue(setArchivedForm, 'archievedEventSpeakerName', e.target.value)} required /></Field>
                              <Field label="Speaker Designation *"><input className={inputClass} value={archivedForm.archievedEventSpeakerDesignation} onChange={(e) => setFormValue(setArchivedForm, 'archievedEventSpeakerDesignation', e.target.value)} required /></Field>
                              <Field label="Archived Event Date *"><input type="date" className={inputClass} value={archivedForm.archievedEventDate} onChange={(e) => setFormValue(setArchivedForm, 'archievedEventDate', e.target.value)} required /></Field>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                              {[['image1', archivedPreview1, setArchivedPreview1, 'Primary Archive Image *'], ['image2', archivedPreview2, setArchivedPreview2, 'Secondary Archive Image']].map(([field, preview, previewSetter, label]) => (
                                <Field key={field} label={label}>
                                  <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4">
                                    {preview && <img src={preview} alt={label} className="mb-3 h-32 w-full rounded-lg object-cover" />}
                                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white hover:bg-black">
                                      <Upload className="h-4 w-4" /> {preview ? 'Replace Image' : 'Upload Image'}
                                      <input type="file" accept="image/*" className="hidden" onChange={(e) => setImageValue(setArchivedForm, previewSetter, field, e.target.files?.[0])} />
                                    </label>
                                  </div>
                                </Field>
                              ))}
                            </div>

                            <div>
                              <div className="mb-3 flex items-center justify-between">
                                <h4 className="font-semibold text-gray-900">Archived Event Details</h4>
                                <button type="button" onClick={() => setDetailRows((rows) => [...rows, { key: '', value: '' }])} className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600"><Plus className="h-4 w-4" /> Add Detail</button>
                              </div>
                              <div className="space-y-3">
                                {detailRows.map((row, index) => (
                                  <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-3">
                                    <input className={inputClass} value={row.key} onChange={(e) => setDetailRows((rows) => rows.map((item, itemIndex) => itemIndex === index ? { ...item, key: e.target.value } : item))} placeholder="Section name" />
                                    <input className={inputClass} value={row.value} onChange={(e) => setDetailRows((rows) => rows.map((item, itemIndex) => itemIndex === index ? { ...item, value: e.target.value } : item))} placeholder="Section details" />
                                    <button type="button" onClick={() => setDetailRows((rows) => {
                                      const nextRows = rows.filter((_, itemIndex) => itemIndex !== index);
                                      return nextRows.length ? nextRows : [{ key: '', value: '' }];
                                    })} className="rounded-lg border border-gray-300 px-3 text-gray-600 hover:bg-gray-100"><X className="h-4 w-4" /></button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <div className="mb-3 flex items-center justify-between">
                                <h4 className="font-semibold text-gray-900">Key Takeaways</h4>
                                <button type="button" onClick={() => setTakeaways((items) => [...items, ''])} className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600"><Plus className="h-4 w-4" /> Add Point</button>
                              </div>
                              <div className="space-y-3">
                                {takeaways.map((item, index) => (
                                  <div key={index} className="grid grid-cols-[1fr_auto] gap-3">
                                    <input className={inputClass} value={item} onChange={(e) => setTakeaways((items) => items.map((value, itemIndex) => itemIndex === index ? e.target.value : value))} placeholder={`Point ${index + 1}`} />
                                    <button type="button" onClick={() => setTakeaways((items) => {
                                      const nextItems = items.filter((_, itemIndex) => itemIndex !== index);
                                      return nextItems.length ? nextItems : [''];
                                    })} className="rounded-lg border border-gray-300 px-3 text-gray-600 hover:bg-gray-100"><X className="h-4 w-4" /></button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <button disabled={loading} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60">
                              <Save className="h-4 w-4" /> Save Archived Details
                            </button>
                          </form>

                        </>
                      )}

                      {(isUpcomingEvent || isArchivedEvent) && (
                        <>
                          <form onSubmit={notifyParticipants} className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
                            <h3 className="flex items-center gap-2 text-lg font-semibold"><Bell className="h-5 w-5" /> Notify Participants</h3>
                            <Field label="Subject *"><input className={inputClass} value={notification.subject} onChange={(e) => setFormValue(setNotification, 'subject', e.target.value)} required /></Field>
                            <Field label="Content *"><textarea className={inputClass} rows={4} value={notification.content} onChange={(e) => setFormValue(setNotification, 'content', e.target.value)} required /></Field>
                            <button disabled={loading} className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 font-semibold text-white hover:bg-black"><Mail className="h-4 w-4" /> Send Email</button>
                          </form>

                          <div className="rounded-xl border border-gray-200 bg-white p-5">
                            <div className="mb-4 flex items-center justify-between gap-3">
                              <h3 className="flex items-center gap-2 text-lg font-semibold"><Users className="h-5 w-5" /> Participants</h3>
                              <button onClick={loadParticipants} disabled={participantsLoading} className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 font-semibold text-white hover:bg-black">
                                <RefreshCw className={`h-4 w-4 ${participantsLoading ? 'animate-spin' : ''}`} /> Load
                              </button>
                            </div>
                            <div className="overflow-x-auto">
                              <table className="min-w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-600">
                                  <tr><th className="px-3 py-2">Name</th><th className="px-3 py-2">Email</th><th className="px-3 py-2">Contact</th><th className="px-3 py-2">Occupation</th><th className="px-3 py-2">Reason</th></tr>
                                </thead>
                                <tbody>
                                  {participants.map((participant) => (
                                    <tr key={participant.id} className="border-t border-gray-100">
                                      <td className="px-3 py-2">{participant.name}</td>
                                      <td className="px-3 py-2">{participant.emailId}</td>
                                      <td className="px-3 py-2">{participant.contactNumber}</td>
                                      <td className="px-3 py-2">{participant.occupation}</td>
                                      <td className="px-3 py-2">{participant.reason}{participant.otherReason ? `: ${participant.otherReason}` : ''}</td>
                                    </tr>
                                  ))}
                                  {!participants.length && <tr><td colSpan="5" className="px-3 py-6 text-center text-gray-500">No participants loaded.</td></tr>}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </section>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CreateEvent;
