import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import AltNavbar from '../components/AltNavbar';
import authService from '../store/authService';

const formatDate = (value) => {
  if (!value) return 'Date to be announced';
  return new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
};

const eventStatus = (event) => event?.statusLabel?.replace('archieved', 'archived') || (event?.status ? 'upcoming' : 'archived');

const getBackPath = () => {
  try {
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) return '/events';
    const user = JSON.parse(storedUser);
    const id = user.alc_patronid || user.membershipId || 'user';
    return `/${id}/eventsh`;
  } catch {
    return '/events';
  }
};

const EventDetail = () => {
  const { eventId } = useParams();
  const location = useLocation();
  const [event, setEvent] = useState(location.state?.event || null);
  const [loading, setLoading] = useState(!location.state?.event);
  const [error, setError] = useState('');
  const backPath = useMemo(() => getBackPath(), []);

  useEffect(() => {
    if (event?.eventId === eventId) return;

    const loadEvent = async () => {
      setLoading(true);
      setError('');
      try {
        const [upcomingResponse, archivedResponse] = await Promise.all([
          authService.getPublicEvents('upcoming'),
          authService.getPublicEvents('archieved'),
        ]);
        const allEvents = [...(upcomingResponse.data || []), ...(archivedResponse.data || [])];
        const matchedEvent = allEvents.find((item) => item.eventId === eventId);
        if (!matchedEvent) throw new Error('Event not found.');
        setEvent(matchedEvent);
      } catch (loadError) {
        setError(loadError.message || 'Unable to load event details.');
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [event?.eventId, eventId]);

  const status = eventStatus(event);
  const isArchived = status === 'archived';
  const title = isArchived ? event?.archievedEventName || event?.eventName : event?.eventName;
  const speaker = isArchived ? event?.archievedEventSpeakerName : event?.typeOfEvent;
  const designation = isArchived ? event?.archievedEventSpeakerDesignation : event?.eventType === false ? 'Offline Event' : 'Online Event';
  const date = isArchived ? event?.archievedEventDate : event?.eventDate;
  const primaryImage = isArchived ? event?.image1 || event?.image : event?.image;
  const secondaryImage = isArchived ? event?.image2 : null;
  const detailEntries = Object.entries(event?.archeivedEventDetails || {});
  const takeaways = event?.archievedEventKeyTakeaways || [];

  return (
    <div className="relative min-h-screen bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-blue-400 z-0">
        <div className="absolute inset-0 bg-gray-600 opacity-100 z-0" style={{ backgroundImage: `url('/shrine.jpg')`, filter: 'brightness(0.9) contrast(1.1)' }} />
      </div>

      <AltNavbar />

      <div className="relative z-10 mx-auto max-w-4xl px-4 pb-16 pt-24">
        {loading && <div className="rounded-xl bg-white/90 p-8 text-center text-gray-800">Loading event details...</div>}
        {error && <div className="rounded-xl bg-red-50 p-8 text-center text-red-700">{error}</div>}

        {event && !loading && !error && (
          <>
            <div className="mb-12 text-center">
              <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">{title}</h1>
              <div className="flex flex-col items-center justify-center gap-4 text-gray-600 md:flex-row">
                <p className="text-lg font-medium">{speaker || 'ArtLawCommunion'}</p>
                <span className="hidden md:block">-</span>
                <p className="text-lg">{designation}</p>
                <span className="hidden md:block">-</span>
                <p className="text-lg">{formatDate(date)}</p>
              </div>
            </div>

            {primaryImage && (
              <div className="mb-8 flex items-center justify-center overflow-hidden rounded-lg bg-gray-200">
                <img src={primaryImage} alt={title} className="h-auto w-full object-contain" />
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              {event.eventOverview && <p className="mb-6 leading-relaxed text-gray-700">{event.eventOverview}</p>}
              {event.eventSpeakerOverview && <p className="mb-6 leading-relaxed text-gray-700">{event.eventSpeakerOverview}</p>}

              {detailEntries.map(([heading, detail], index) => (
                <div key={heading} className={`${index % 2 === 0 ? 'border-blue-500 bg-blue-50' : 'border-green-500 bg-green-50'} mb-6 border-l-4 py-4 pl-6`}>
                  <h2 className="mb-2 text-xl font-bold capitalize text-gray-900">{heading}</h2>
                  <p className="text-gray-700">{String(detail)}</p>
                </div>
              ))}

              {secondaryImage && (
                <div className="my-8 flex w-full items-center justify-center overflow-hidden rounded-lg bg-gray-200">
                  <img src={secondaryImage} alt={`${title} gallery`} className="h-auto w-full object-contain" />
                </div>
              )}
            </div>

            {takeaways.length > 0 && (
              <div className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-6">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Key Takeaways</h2>
                <ul className="space-y-3 text-gray-700">
                  {takeaways.map((takeaway) => (
                    <li key={takeaway} className="flex items-start">
                      <span className="mr-3 text-blue-500">-</span>
                      {takeaway}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {status === 'upcoming' && (
              <div className="mt-10 text-center">
                <Link to={`/eventreg?event_id=${encodeURIComponent(event.eventId)}`} state={{ event }} className="inline-block rounded-lg bg-amber-600 px-8 py-4 text-lg font-medium text-white transition-colors duration-200 hover:bg-amber-700">
                  Register for Event
                </Link>
              </div>
            )}

            <div className="mt-12 text-center">
              <Link to={backPath} className="inline-block rounded-lg bg-blue-800 px-8 py-4 text-lg font-medium text-white transition-colors duration-200 hover:bg-blue-900">
                Back to Events
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventDetail;
