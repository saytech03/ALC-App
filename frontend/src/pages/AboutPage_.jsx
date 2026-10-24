import { useState, useRef } from 'react';
import AltNavbar from '../components/AltNavbar';

function AboutPage_() {
  const [imgLoading, setImgLoading] = useState(true);
  const VIDEO_URL = `${import.meta.env.BASE_URL}Founders.mp4`;
  
  return (
    <div className="relative bg-[#0b1020] text-white">
      {imgLoading && (
        <div className="absolute inset-0 z-0 flex h-full w-full items-center justify-center bg-black/70 shimmer" />
      )}

      <AltNavbar />

      <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('./monum.jpg')",
            filter: 'brightness(0.8) contrast(1.08)'
          }}
          onLoad={() => setImgLoading(false)}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 to-black/20" />

        <div className="container relative z-10 mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-black/25 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-md md:p-10">
            <div className="mb-5 inline-flex items-center rounded-full border border-amber-200/30 bg-white/5 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-amber-100/90">
              Our vision
            </div>
            <h1 className="mb-6 text-3xl font-light tracking-[0.18em] text-white md:text-4xl lg:text-5xl">
              OUR VISION
            </h1>
            <div className="space-y-5 text-base leading-relaxed text-slate-100/90 md:text-lg">
              <p className="text-lg italic text-white/90 md:text-xl">
                The secret of getting ahead is getting started.
                <br />~ Mark Twain
              </p>
              <p>
                The Art Law Communion is an initiative started by students of law with the passion for arts for promoting interdisciplinary learning and discourse on the intersection of arts and the law in India and the Global South.
                We aim to promote deeper understanding of art law through academic exploration, advocacy and collaboration, while empowering the public to engage with critical legal issues impacting artists, collectors, cultural institutions and the global art market. This is a space for deliberation and knowledge sharing to equip the next generation of legal professionals with the expertise and insight to navigate and shape the evolving landscape of art law in India, where context-specific legal challenges to the same remain underrepresented in mainstream discourse.
              </p>
              <p>
                We seek to combine legal scholarship with grassroots level empowerment. Our approach blends rigorous research with on-the-ground interaction with art communities: from gallery owners to street performers ensuring that legal access, awareness, and advocacy reach all corners of the creative economy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative flex min-h-screen items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('./photo_mem.jpg')",
            filter: 'brightness(0.8) contrast(1.08)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 to-black/20" />

        <div className="container relative z-10 mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-black/25 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-md md:p-10">
            <div className="mb-5 inline-flex items-center rounded-full border border-amber-200/30 bg-white/5 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-amber-100/90">
              The meaning of art
            </div>
            <h1 className="mb-6 text-3xl font-light tracking-[0.18em] text-white md:text-4xl lg:text-5xl">
              WHAT WE MEAN BY ART?
            </h1>
            <div className="space-y-5 text-base leading-relaxed text-slate-100/90 md:text-lg">
              <p>
                We believe, Art is both expression and resistance, heritage and innovation. From a legal standpoint, Art includes inter alia artistic, literary, musical and dramatic work. It thus entails a wide spectrum of human expression, from folk songs to classical compositions, from ephemeral street performances to enduring sculptures, from indigenous crafts to NFTs, from paintings to AI Generated content, and from sacred rituals to rebellious graffiti. Our understanding of art includes both contemporary creative practices and historical cultural heritage[ Cultural Heritage, an integral part of 'Art' includes both the tangible and intangible aspects that connect us to our past, defines our present and informs our future. It includes traditional knowledge systems, ceremonial practices, oral traditions, historical monuments including the historical artifacts. ] recognizing the legal challenges unique to each while acknowledging their interconnection in shaping India's cultural landscape.
              </p>
              <p>
                Art, we believe transcends canvas and stage. It encompasses the living traditions, gestures, objects, performances, and digital expressions through which individuals and communities shape meaning, identity, and memory. Embracing this plurality, The Art Law Communion recognizes all forms of artistic and cultural expression as worthy of legal attention, critical discourse, and institutional support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative flex min-h-screen items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('./durga_puja.jpg')",
            filter: 'brightness(0.8) contrast(1.08)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 to-black/20" />

        <div className="container relative z-10 mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-black/25 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-md md:p-10">
            <div className="mb-5 inline-flex items-center rounded-full border border-amber-200/30 bg-white/5 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-amber-100/90">
              Stakeholders
            </div>
            <h1 className="mb-6 text-3xl font-light tracking-[0.18em] text-white md:text-4xl lg:text-5xl">
              OUR TARGET STAKEHOLDERS
            </h1>
            <div className="space-y-5 text-base leading-relaxed text-slate-100/90 md:text-lg">
              <p>
                The Art Law Communion seeks to engage a diverse and intersectional range of stakeholders including and not limited to:
              </p>
              <div className="space-y-3 text-left text-slate-100/95 md:space-y-4">
                <p className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <strong>Performers:</strong> includes actors, singers, musicians, dancers, acrobats, jugglers, conjurers, snake charmers, or any other person who makes a performance.
                </p>
                <p className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <strong>Artists:</strong> includes painters, sculptors, photographers, or any other person who creates art.
                </p>
                <p className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <strong>Other stakeholders:</strong> includes dealers, collectors, museums, and trustees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative flex min-h-screen items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('./exhi.jpeg')",
            filter: 'brightness(0.8) contrast(1.08)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 to-black/20" />

        <div className="container relative z-10 mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-black/25 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-md md:p-10">
            <div className="mb-5 inline-flex items-center rounded-full border border-amber-200/30 bg-white/5 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-amber-100/90">
              Founders note
            </div>
            <h1 className="mb-6 text-3xl font-light tracking-[0.18em] text-white md:text-4xl lg:text-5xl">
              OUR FOUNDERS NOTE
            </h1>
            <div className="mt-6">
              <VideoPreview videoUrl={VIDEO_URL} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function VideoPreview({ videoUrl }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = async () => {
    if (!videoRef.current) return;
    try {
      await videoRef.current.play();
      videoRef.current.controls = true;
      setPlaying(true);
    } catch (e) {
      videoRef.current.controls = true;
      setPlaying(true);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      {videoUrl ? (
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/30 shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
          <video
            ref={videoRef}
            src={videoUrl}
            preload="metadata"
            playsInline
            className="block w-full object-contain"
          />

          {!playing && (
            <button
              type="button"
              onClick={handlePlay}
              className="group absolute inset-0 flex items-center justify-center bg-black/20 transition hover:bg-black/30"
              aria-label="Play founders note"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-3xl text-black shadow-[0_10px_30px_rgba(255,255,255,0.35)] transition duration-200 group-hover:scale-105">
                ▶
              </div>
            </button>
          )}
        </div>
      ) : (
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 text-white shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
          <p className="text-lg font-semibold">Video source not set yet.</p>
          <p className="mt-2 text-sm text-slate-300">Add the MOV URL in the code to enable playback.</p>
        </div>
      )}
    </div>
  );
}

export default AboutPage_;