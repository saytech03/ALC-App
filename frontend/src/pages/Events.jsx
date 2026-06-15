import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Calendar, Clock, MapPin, RefreshCw, Sparkles, User } from 'lucide-react';
import Navbar from '../components/Navbar';
import AltNavbar from '../components/AltNavbar';
import authService from '../store/authService';

const formatDate = (value) => {
  if (!value) return 'Date to be announced';
  return new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
};

const formatTime = (value) => (value ? String(value).slice(0, 5) : '');

const getStatus = (event) => event?.statusLabel?.replace('archieved', 'archived') || (event?.status ? 'upcoming' : 'archived');

const getRegistrationWindow = (event) => ({
  from: event.registrationOpenFrom || event.registration_open_from || event.registration_open_from_time,
  until: event.registrationOpenUntil || event.registration_open_until || event.registration_open_until_time,
});

const parseServerDateTime = (value) => {
  if (!value) return null;
  if (/[zZ]|[+-]\d{2}:\d{2}$/.test(value)) return new Date(value).getTime();
  return new Date(`${value}Z`).getTime();
};

const getDisplayEvent = (event) => ({
  id: event.eventId,
  title: event.eventName || event.archievedEventName || 'Untitled event',
  speaker: event.archievedEventSpeakerName || event.typeOfEvent || 'ArtLawCommunion',
  speakerDesignation: event.archievedEventSpeakerDesignation || '',
  date: event.archievedEventDate || event.eventDate,
  image: event.image || event.image1 || './event1_thumbn.jpg',
  category: event.typeOfEvent || 'Art Law Communion',
  description: event.eventOverview || Object.values(event.archeivedEventDetails || {})[0] || event.eventSpeakerOverview || 'Event details will be updated soon.',
  venue: event.eventType === false ? 'Offline' : 'Online',
  startTime: formatTime(event.eventStartTime),
  endTime: formatTime(event.eventEndTime),
});

const RegistrationTimer = ({ event }) => {
  const [now, setNow] = useState(Date.now());
  const { from, until } = getRegistrationWindow(event);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!from || !until) {
    return <span className="text-xs text-amber-200">Registration schedule will be updated soon.</span>;
  }

  const openFrom = parseServerDateTime(from);
  const openUntil = parseServerDateTime(until);
  if (!Number.isFinite(openFrom) || !Number.isFinite(openUntil)) {
    return <span className="text-xs text-amber-200">Registration schedule will be updated soon.</span>;
  }
  const target = now < openFrom ? openFrom : openUntil;
  const remaining = Math.max(0, target - now);
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  if (now > openUntil) return <span className="text-xs text-red-200">Registration closed.</span>;

  return (
    <span className="text-xs text-amber-100">
      {now < openFrom ? 'Registration opens in ' : 'Registration closes in '}
      <strong>{days}d {hours}h {minutes}m {seconds}s</strong>
    </span>
  );
};

const EventCard = ({ event, activeStatus }) => {
  const display = getDisplayEvent(event);
  const isUpcoming = activeStatus === 'upcoming';

  return (
    <div className={`overflow-hidden rounded-xl border shadow-2xl backdrop-blur-sm transition-all duration-300 ${isUpcoming ? 'border-amber-500/30 bg-gradient-to-br from-gray-800/90 to-gray-900/90 hover:border-amber-400/50' : 'border-gray-700/50 bg-gray-800/70 hover:border-blue-500/30'}`}>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/5 relative overflow-hidden">
          {isUpcoming && (
            <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-xs font-bold text-white shadow-lg">
              <Sparkles className="h-4 w-4" />
              UPCOMING EVENT
            </div>
          )}
          <img src={display.image} alt={display.title} className="h-56 w-full object-cover md:h-full" />
        </div>

        <div className="md:w-3/5 p-6">
          <span className={`${isUpcoming ? 'border border-amber-500/30 bg-amber-600/20 text-amber-300' : 'bg-blue-600 text-white'} rounded-full px-3 py-1 text-xs font-semibold`}>
            {display.category}
          </span>

          <h2 className={`mt-4 text-xl font-light leading-tight text-white md:text-2xl ${isUpcoming ? 'hover:text-amber-300' : 'hover:text-blue-300'} transition-colors`}>
            {display.title}
          </h2>

          <p className={`${isUpcoming ? 'text-amber-300' : 'text-blue-300'} mt-3 flex items-center text-sm font-medium`}>
            <User className="mr-2 h-4 w-4" />
            {display.speaker}
          </p>

          <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-300">
            <span className="flex items-center"><Calendar className="mr-1 h-3 w-3" />{formatDate(display.date)}</span>
            {isUpcoming && <span className="flex items-center"><MapPin className="mr-1 h-3 w-3" />{display.venue}</span>}
            {display.startTime && <span className="flex items-center"><Clock className="mr-1 h-3 w-3" />{display.startTime}{display.endTime ? ` - ${display.endTime}` : ''}</span>}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-gray-200 line-clamp-4">{display.description}</p>

          {isUpcoming && (
            <div className="mt-5 rounded-lg border border-amber-500/20 bg-amber-500/10 px-4 py-3">
              <RegistrationTimer event={event} />
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link to={`/event/${display.id}`} state={{ event }} className={`inline-flex items-center text-sm font-medium transition-colors group ${isUpcoming ? 'text-amber-300 hover:text-amber-200' : 'text-blue-400 hover:text-blue-300'}`}>
              <span>View Event Details</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            {isUpcoming && (
              <Link to={`/eventreg?event_id=${encodeURIComponent(display.id)}`} state={{ event }} className="rounded-lg border border-amber-500/50 px-5 py-2 text-sm font-medium text-amber-300 transition hover:bg-amber-500/10">
                Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const EventsPage = () => {
  const [activeStatus, setActiveStatus] = useState('upcoming');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const NavbarComponent = location.pathname.includes('eventsh') ? AltNavbar : Navbar;

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      setError('');
      try {
        const statusQuery = activeStatus === 'archived' ? 'archieved' : 'upcoming';
        const response = await authService.getPublicEvents(statusQuery);
        setEvents(response.data || []);
      } catch (loadError) {
        setEvents([]);
        setError(loadError.message || 'Unable to load events.');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [activeStatus]);

  const title = useMemo(() => activeStatus === 'upcoming' ? 'UPCOMING EVENTS' : 'ARCHIVED EVENTS', [activeStatus]);

  return (
    <div className="relative min-h-screen bg-gray-900">
      <NavbarComponent />
      <div className="absolute inset-0 z-0 bg-gray-600 opacity-100" style={{ backgroundImage: `url('./pillar.jpg')`, filter: 'brightness(0.9) contrast(1.1)' }} />

      <div className="relative z-10 min-h-screen pt-28">
        <div className="container mx-auto px-4 pb-16">
          <div className="mx-auto max-w-5xl p-4">
            <div className="mb-10 flex justify-center">
              <div className="inline-flex rounded-full border border-white/15 bg-black/40 p-1 backdrop-blur">
                <button onClick={() => setActiveStatus('upcoming')} className={`rounded-full px-5 py-2 text-sm font-semibold transition ${activeStatus === 'upcoming' ? 'bg-amber-500 text-white' : 'text-gray-300 hover:text-white'}`}>Upcoming</button>
                <button onClick={() => setActiveStatus('archived')} className={`rounded-full px-5 py-2 text-sm font-semibold transition ${activeStatus === 'archived' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'}`}>Archived</button>
              </div>
            </div>

            <div className="mb-10 flex items-center justify-center gap-4">
              <div className={`h-px w-16 bg-gradient-to-r from-transparent ${activeStatus === 'upcoming' ? 'to-amber-500/50' : 'to-blue-500/50'}`} />
              <h1 className="text-center text-3xl font-light tracking-wide text-white md:text-4xl">{title}</h1>
              <div className={`h-px w-16 bg-gradient-to-l from-transparent ${activeStatus === 'upcoming' ? 'to-amber-500/50' : 'to-blue-500/50'}`} />
            </div>

            {loading && <div className="flex items-center justify-center gap-2 rounded-xl bg-black/40 p-8 text-white"><RefreshCw className="h-5 w-5 animate-spin" /> Loading events...</div>}
            {error && <div className="rounded-xl border border-red-400/30 bg-red-900/40 p-5 text-red-100">{error}</div>}
            {!loading && !error && !events.length && <div className="rounded-xl border border-white/10 bg-black/40 p-8 text-center text-gray-200">No {activeStatus} events available right now.</div>}

            <div className="space-y-8">
              {events.map((event) => (
                <EventCard key={event.eventId || event.id} event={event} activeStatus={activeStatus} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
