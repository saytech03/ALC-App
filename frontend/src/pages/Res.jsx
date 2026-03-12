import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronsUpDown, X, Minus, Plus } from 'lucide-react';
import Navbar from '../components/Navbar';

// --- Dictionary for Auto-Hyperlinking ---
const wikiLinks = {
  "Bhimbetka": "https://en.wikipedia.org/wiki/Bhimbetka_rock_shelters",
  "Harappan": "https://en.wikipedia.org/wiki/Indus_Valley_Civilisation",
  "Ajanta": "https://en.wikipedia.org/wiki/Ajanta_Caves",
  "Mughal": "https://en.wikipedia.org/wiki/Mughal_Empire",
  "Rajput": "https://en.wikipedia.org/wiki/Rajput_painting",
  "Pahari": "https://en.wikipedia.org/wiki/Pahari_painting",
  "Deccani": "https://en.wikipedia.org/wiki/Deccan_painting",
  "Tarikh": "https://en.wikipedia.org/wiki/Tarikh",
  "Hamza-nama": "https://en.wikipedia.org/wiki/Hamzanama",
  "Jahangir": "https://en.wikipedia.org/wiki/Jahangir",
  "Shah Jahan": "https://en.wikipedia.org/wiki/Shah_Jahan",
  "Aurangzeb": "https://en.wikipedia.org/wiki/Aurangzeb",
  "Basohli": "https://en.wikipedia.org/wiki/Basohli_painting",
  "Kangra": "https://en.wikipedia.org/wiki/Kangra_painting",
  "Guler": "https://en.wikipedia.org/wiki/Guler_State",
  "Ragamala": "https://en.wikipedia.org/wiki/Ragamala_paintings",
  "Nayaka-Nayika Bheda": "https://en.wikipedia.org/wiki/Ashta_Nayika",
  "Murshidabad": "https://en.wikipedia.org/wiki/Murshidabad_style",
  "Nawab": "https://en.wikipedia.org/wiki/Nawabs_of_Bengal",
  "Alivardi Khan": "https://en.wikipedia.org/wiki/Alivardi_Khan",
  "Siraj-ud-Daulah": "https://en.wikipedia.org/wiki/Siraj_ud-Daulah",
  "Mir Zafar": "https://en.wikipedia.org/wiki/Mir_Jafar",
  "Mir Qasim": "https://en.wikipedia.org/wiki/Mir_Qasim",
  "Mihr Chand": "https://en.wikipedia.org/wiki/Mihr_Chand",
  "Tilly Kettle": "https://en.wikipedia.org/wiki/Tilly_Kettle",
  "Antoine Polier": "https://en.wikipedia.org/wiki/Antoine_Polier",
  "Bhagavata Purana": "https://en.wikipedia.org/wiki/Bhagavata_Purana",
  "Gita Govindam": "https://en.wikipedia.org/wiki/Gita_Govinda",
  "Swadeshi": "https://en.wikipedia.org/wiki/Swadeshi_movement",
  "Abanindranath Tagore": "https://en.wikipedia.org/wiki/Abanindranath_Tagore",
  "E.B. Havell": "https://en.wikipedia.org/wiki/Ernest_Binfield_Havell",
  "Jamini Roy": "https://en.wikipedia.org/wiki/Jamini_Roy",
  "Amrita Sher-Gil": "https://en.wikipedia.org/wiki/Amrita_Sher_Gil",
  "Raja Ravi Varma": "https://en.wikipedia.org/wiki/Raja_Ravi_Varma",
  "Kalighat": "https://en.wikipedia.org/wiki/Kalighat_painting",
  "F.N. Souza": "https://en.wikipedia.org/wiki/F._N._Souza",
  "S.H. Raza": "https://en.wikipedia.org/wiki/S._H._Raza",
  "M.F. Hussain": "https://en.wikipedia.org/wiki/M._F._Husain",
  "Bankim Chandra Chattopadhyay": "https://en.wikipedia.org/wiki/Bankim_Chandra_Chatterjee",
  "Vande Mataram": "https://en.wikipedia.org/wiki/Vande_Mataram",
  "Lithographic": "https://en.wikipedia.org/wiki/Lithography",
  "Oleographs": "https://en.wikipedia.org/wiki/Oleograph",
  "Mir Sayyid Ali": "https://en.wikipedia.org/wiki/Mir_Sayyid_Ali",
  "Abd-as-Samad": "https://en.wikipedia.org/wiki/Abd_al-Samad",
  "Tasbirkhana": "https://en.wikipedia.org/wiki/Mughal_painting#Mughal_atelier",
  "Humayun": "https://en.wikipedia.org/wiki/Humayun",
  "Akbar": "https://en.wikipedia.org/wiki/Akbar"
};

// Helper function to process text and insert links
const renderContentWithLinks = (text) => {
  if (!text) return null;
  
  // Create a regex pattern from keys, ensuring word boundaries to avoid partial matches
  const pattern = new RegExp(`\\b(${Object.keys(wikiLinks).join('|')})\\b`, 'g');
  
  // Split text by the pattern
  const parts = text.split(pattern);

  return parts.map((part, index) => {
    if (wikiLinks[part]) {
      return (
        <a 
          key={index} 
          href={wikiLinks[part]} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-amber-900 border-b border-amber-800/40 hover:border-amber-900 hover:bg-amber-200/50 transition-colors font-medium decoration-dotted"
          title={`Read more about ${part} on Wikipedia`}
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

// --- Sub-Component for Nested Accordions ---
const SubSection = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-amber-900/20 first:border-t-0 mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-5 text-left group focus:outline-none transition-all duration-300 hover:pl-2 hover:bg-amber-900/5 rounded-lg px-2 -ml-2"
      >
        <span className={`text-lg md:text-xl font-serif font-medium transition-colors duration-300 ${isOpen ? 'text-amber-900' : 'text-stone-700 group-hover:text-amber-900'}`}>
          {title}
        </span>
        <div className={`p-1.5 rounded-full border transition-all duration-300 ${isOpen ? 'border-amber-900 bg-amber-900 text-amber-50' : 'border-stone-400 text-stone-500 group-hover:border-amber-700 group-hover:text-amber-700'}`}>
            {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
        </div>
      </button>

      <div 
        className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
          isOpen ? "grid-rows-[1fr] mb-6" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="prose prose-lg max-w-none text-stone-800 leading-loose text-justify px-2 font-light">
            {renderContentWithLinks(content)}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Data (Unchanged) ---
const sections = [
  {
    id: 1,
    title: "Chapter 1: Introduction",
    image: "./ajanta.jpeg", 
    intro: "India has a long and fairly continuous history of painting, right from the earliest days of civilization. From the cave paintings of Bhimbetka, to painted pottery of the Harappan civilization, to the impressive murals of Ajanta, the use of the brush and paint had evolved steadily over the centuries. And just like any other aspect of the Indian civilization, paintings too imbibed and indigenised influences that had flown into it by virtue of interaction with other cultures, over the millennia. However, no influence, at least in documented history, was as dramatic as that of colonialism. Thus, it creates great curiosity as an artist, to probe into the world of Indian paintings during pre-colonial times of the 17th century and then trace its trajectory down to the modern era, in an attempt to understand the position of contemporary art on the fabric of space and time, and more importantly to try and arrive at an arguable answer to the question, “why do we stand where we do ?” In this article, we shall begin our journey exploring the various painting traditions popular during the 17th century, and chronologically advance over the four centuries and observe how existing traditions give way to new ones with the ebb and flow of patronage. Occasionally, long lost styles bounce back to popularity, responding to changed times and audience. The entire world of paintings in India can be broadly classified into Court Paintings (or later urban ‘commissioned’ paintings) and Folk paintings. While little is known of the latter, much research has gone into understanding the different strands of court paintings (and urban paintings) that occasionally wove into each other and then parted ways, in rhythm with the contemporary dynamics of political power. Court paintings, as they flourished under the roof of their master, received a direct fatal blow with the fall of monarchies and the establishment of Imperial rule in India. Folk paintings on the other hand, being decentralized and often secluded from metropolitan settlements were far more insulated from the wrath of political instability and imperialism up until the early twentieth century when the Imperial influence had drenched every inch of this land and modern Indian painters began to take notice of folk traditions and began to mingle the folk with the mainstream. In our teleological exploration into the evolution of Indian paintings, we shall largely focus on the metropolitan styles of paintings, as it were these schools of art that came directly under the influence of colonialism, and were thus shaped by it."
  },
  {
    id: 2,
    title: "Chapter 2: The Court Paintings of the 17th Century",
    image: "./war.jpeg",
    intro: "Court paintings differ in styles not only due to evolution in allopatry, but due to the ideological differences of their patrons. Speaking of India, we can all but forget the role of religion in shaping ideologies and thus, historians of Art talk about the Hindu and the Islamic patronage. In the context of the 17th century, the Rajput and the Pahari paintings were the ones receiving patronage from Rajas, while the Mughal and the Deccani schools of art flourished under the patronage of Sultans. In the Islamic tradition, time is linear, and thus it was important to record events. This ideology, that led to the t¯arikh tradition of history writing in Sultani and Mughal courts, also led to the commissioning of paintings depicting historical events and court activities. Painters were commissioned to illustrate manuscripts and the paintings were bound with the writing and archived in the form of books. The Hindu tradition on the other hand sees time as cyclical, with four yugas repeating one after the other. Thus, temporal matters were insignificant and historical events took a back seat. Most of the religious texts were transmitted through oral tradition and many had entered the realm of folk-lore. So, there was little need to illustrate manuscripts. Hindu court paintings dealt with religious themes and certain specific aspects of human experience– commonly love and heroism. Many of these paintings did have texts, nonetheless, but this text was often written behind the painting, briefing about the theme and context of the painting, meant for reference in case there be any ambiguity in interpretation. Because, most of the stories on which these paintings were based were well known to all. During the high noon of the Mughal empire, a tradition of Miniature painting spread across Northern India, and subsequently to the Deccan. These paintings were mostly painted with opaque watercolour on paper or silk (cloth) and used bright, bold paints underscored with dark lines. Often, thick, elevated drops of paint were used in the case of jewellery (especially by the Pahari schools). Another characteristic feature of these miniatures was the generous use of metallic gold and silver in ornamentations and embellishments, delicately hammered onto the painting from a thin foil, wherever necessary. It is unclear whether miniatures originated in the Mughal court and then spread elsewhere, or co-evolved independently in different royal ateliers, but the Imperial atelier of the Mughal court certainly functioned like an umbrella over all other painting traditions from Kashmir to as far as the Deccan, from the time of Akbar to Shah Jahan, after which it disintegrated and enriched painting ateliers all across India. Therefore, it makes sense to begin our journey from the Imperial Capital and then shift our attention to other parts of the Empire and beyond.",
    subsections: [
        {
            title: "The Mughal School",
            content: `When Humayun returned from Persia to recapture Delhi, he brought along two of the finest
                      Persian painters to India, Mir Sayyid Ali and Abd-as-Samad. They were the pioneers in
                      setting up the Mughal atelier. Akbar was a great connoisseur of paintings. He set up the
                      Tasbirkhana in his capital Fatehpur Sikri, which brought together a large contingent of
                      superb painters from all across the country, creating the right environment for a rich blend
                      of Indian and Persian styles. The Mughal school is characterised by an appreciation for
                      nature and realism. There is a sense of depth and dimension imparted to each painting.
                      There are less ornamental overtones in and around the painting, but the artist showed a
                      high degree of expertise to provide an exquisite finish to the painting itself. The Tasbirkhana
                      began its functions with illustrating manuscripts, the first of which was the Hamza-nama
                      commissioned by Akbar himself. Later during the reign of Jahangir and Shah Jahan, the
                      size of the atelier was considerably reduced, and the focus shifted towards producing singular
                      works of art. The Mughal school did not limit itself to the production of miniatures, and
                      there was substantial enthusiasm both on the part of painters and patrons for larger, life
                      sized works. Jahangir’s rule also saw a boost towards realism, with the introduction of
                      light and shadow in paintings to depict volume– a technique most likely learnt from the
                      European Renaissance paintings brought to the court of Jahangir by European merchants
                      and travellers. The ateliers’ final years were those during the reign of Shah Jahan, where,
                      even though its size got reduced further, the Tasbirkhana comprised some of the finest
                      portrait painters, excelling in realist traditions. Ever since the reign of Akbar, both the
                      royal patronage and the size of the Mughal atelier had been steadily on the decline. The
                      best of artists were trained during Akbar’s time and thus by the time of Shah Jahan were
                      either very old or deceased. The ascendance of Aurangzeb to the Mughal throne put a death
                      blow on the Tasbirkhana, as by his puritan Islamist ideals, painting the image of a man was
                      considered a crime. Thus, the last of the Mughal painters who lingered towards the end of
                      Shah Jahan now moved out of the Mughal capital in search of patronage elsewhere. It is not
                      surprising, thus, that we see a boom in painting traditions emerging under new patronage,
                      in the courts of the Nawabs, especially in Oudh (Lucknow) and Bengal (Murshidabad),
                      during the early half of the eighteenth century. (Kossak 1997)`
        },
        {
            title: "The Rajput School",
            content: `The Rajputs had maintained a strong political and cultural connection with the Mughals and
                      many Rajput mahar¯aja and noblemen served as Mughal Generals and were members of the
                      Emperor’s court. However, there was not much perceptible Mughal influence in Rajasthani
                      paintings over this significant stretch of time. Then, with the seize of the Mughal throne
                      by Aurangzeb, there came a sudden revolution in Rajasthani Miniature Paintings. What
                      led to this revolution is debated, and was perhaps a combination of retaliatory sentiments
                      against Aurangzeb’s exclusionist policies, and the availability premiere artists from the
                      Mughal atelier who moved to the courts of Rajput states like Bikaner, Kota and Bundi, and
                      adapted to the needs of their new patrons. The old Rajput school was mostly concerned
                      with themes from the Hindu mythology and illustrating religious texts, but from the time
                      of Aurangzeb, the themes drastically shifted to scenes from the Royal courts, hunts, garden
                      parties and glimpses from the life of the Mahar¯aja, increasingly incorporating Mughal motifs
                      and stylisations, alongside the depiction of quintessentially Mughal themes. It is interesting
                      to note how these Hindu courts imbibed and indigenised subjects and stylisations that were
                      essentially born out of Islamic traditions.
                      The painting ateliers of Bikaner, for example, were also influenced a great deal by Deccani
                      Schools, especially those of Bijapur and Golconda. This was likely because the prince of
                      Bikaner Anup Singh served as a General in Aurangzeb’s army and spent long years in the
                      Deccan during Aurangzeb’s conquests against the Marathas. Ruknuddin (whose painting is
                      featured in Figure 3B) is hailed as the finest artist in the Bikaner court, and most of the
                      artists of the Bikaner school who carried it forward were trained by him. (Kossak 1997)`
        },
        {
            title: "The Deccani Schools",
            content: `During the late medieval period, the Deccan plateau was inhabited by a mixed population of
                      Hindus, Indian Muslims, Africans, Persians, and Turks. Following the disintegration of the
                      Bahmani Kingdom, descendants of these foreign races, mainly Persians and Turks, assumed
                      power and declared sovereignty over the area, dividing the Deccan into five major sultanates
                      at the end of the fifteenth century– Bidar, Berar, Ahmednagar, Bijapur, and Golconda.
                      Out of these, Ahmednagar, Bijapur, and Golconda emerged as flourishing centers of art
                      during the sixteenth and the seventeenth centuries. Unlike their northern counterparts,
                      the Deccan sultanas affiliated themselves to the Shia sect of Islam, did not commission
                      much history writing, and were quite idle and pleasure loving. Such an indolent lifestyle
                      has been beautifully documented in the paintings like Siesta (Figure 3A), which show the
                      sultan dozing under a tree with pages tending to his comforts. The Deccani miniature
                      paintings boast a unique ability to delve into the delicate moods of the subject through the
                      use of colour and form. These sumptuous paintings seldom depict court scenes or military
                      processions and almost always choose more emotive subjects that are to be felt with one’s
                      senses rather than just perceived with the eye. Owing to the strong contacts of these
                      sultanates with Persia and Egypt, these paintings have a strong Persian flavour, and were
                      often mistaken as Persian masterpieces during their initial days of discovery. To quote Mark
                      Zebrowski, “Bred in a exotic, multiracial society, Deccan Art has the impossible, fantastic
                      mood of a mirage. The delicate rhythms of Persia, the lush sensuality of Southern India, the
                      restraint of European and Ottoman Turkish portraiture, all contribute to its uniqueness.”
                      The Deccani paintings have proved extremely tricky to identify and date, because unlike
                      their Mughal and Rajput counterparts, these paintings seldom bear signatures of the painter
                      or the date. However, because there are almost no historical manuscripts from the courts
                      of these sultans, these paintings help a great deal to shed light on the Deccan sultanates.
                      (Zebrowski 1983)`
          }
    ]
  },
  {
    id: 3,
    title: "Chapter 3: The New Connoisseurs of the 18th Century",
    image: "./shuja.jpeg", 
    intro: "The weakening of the Imperial Capital, following Aurangzeb’s death, led to the disintegration of the Mughal Empire, with regional administrators and Generals asserting sovereignty. In Bengal, the Mughal Diwan named Mohammad H¯adi, a right-hand man of Aurangzeb, asserted independence in 1717 to become the first Nawab of Bengal, assuming the name Murshid Quli Khan. A similar coup was executed in Awadh when Saadat Khan, a Persian nobleman who was appointed the Niz¯am of Awadh by the then Mughal Emperor Muhammad Shah, declared himself independent, and became the first Nawab of Awadh. These new courts quickly emerged as new cosmopolitan spaces, promoting the bloom of art and architecture. The new patrons soon attracted artists from the Mughal atelier, along with European masters who were ever more frequent to visit these courts, thus grooming an environment for cross fertilisation and genesis of new streams of art.",
    subsections: [
        {
            title: "The Murshidabad School",
            content: `Murshidabad emerged as a center of eminence in arts and culture during the rule of Nawab
                      Murshid Quli Khan. As the capital of Bengal, Murshidabad became a prosperous hub
                      of arts, commerce and industry. Some of the artists from the Mughal atelier arrived in
                      Murshidabad and set up a new atelier for the court of the Nawab, commonly referred to as
                      the Murshidabad School, which rose to eminence during the reign of Nawab Alivardi Khan
                      (1740–1756).
                      The Murshidabad School primarily drew influence from the Mughal School however, with
                      a more pallid palette and poorer finish. During Alivardi’s rule, the paintings were mostly of
                      court and hunting scenes. Action was predominant in the subjects, along with the effects
                      of dimensionality and volume implemented using lights and shadows. The Murshidabad
                      painters had an affinity for colder colours as opposed to the Mughal and even contemporary
                      Awadhi paintings which used vibrant and warm hues. The medium was mostly watercolour
                      or gouache on paper. Interestingly, oil and canvas had still not permeated into the Mur
                      shidabad artists of Bengal, when their Awadhi counterparts had begun using this newly
                      imported western medium.
                      The school reached its zenith under the patronage of Alivardi’s pleasure loving grandson,
                      Siraj-ud-Daulah, even though Siraj ruled as a Nawab for a very brief period (1756–1757).
                      Siraj encouraged paintings of women of the zenana in romantic love scenes and paintings
                      from the r¯agm¯ala, apart from court scenes. Even after the Battle of Plassey (1757), the
                      school continued its existence well towards the end of the century under the patronage of
                      Mir Zafar and Mir Qasim, followed by Company Officials. By the time of Mir Qasim, the
                      school was predominated by artists who had moved to Murshidabad from Lucknow, thus
                      replacing the Mughal affinity of this school with the Lucknow style. Portraits of men of
                      power took a centre stage at this point. The increasing dominance of the English East
                      India Company in Indian politics resulted in an influx of European painters in India, both
                      as travellers and officials, who in turn mingled with the court painters. Also, the court
                      painters now, more often than not, had European patrons, and thus had to meet with new
                      expectations and requirements. This led to the birth of the Company School– a blend of
                      Indian and European styles in painting. (Banglapedia 2025)`
        },
        {
            title: "The Lucknow School",
            content: `The second half of the eighteenth century saw the rise of the Awadh school, following the
                      death of the thirteenth Mughal Emperor Mirza Nasir-ud-din Muhammad Shah. Muhammad
                      Shah was a patron of arts and sciences, and maintained a royal atelier at the Imperial capital.
                      However, following the plunder of Delhi in 1739 by Nadir Shah, the Imperial Empire of the
                      Mughals was brought to its knees. The centuries of accumulated Mughal treasury had
                      been completely looted and the wealth carried away to Iran, leaving the state in an acute
                      f
                      inancial crisis. Thus maintaining a royal atelier became a heaven’s dream, leading to a
                      second wave of dispersion of Mughal school artists in search of regional patronage. One
                      such late Mughal artist was Mihr Chand, regarded as one of the greatest painters of 18th
                      century India (flourished c.1759-86). Chand had come to Allahabad accompanying the
                      Mughal Emperor Shah Alam II, but quickly relocated to Faizabad, the then capital of the
                      Awadh Nawab Asaf-ud-Daulah, to join the private atelier of a English East India Company
                      (EIC) official Antoine Polier. From there, he moved on to the royal atelier of the Nawab of
                      Awadh, slowly setting up a new style of painting– the Lucknow school.
                      The Lucknow school was a graceful communion of Mughal, Rajput and European styles
                      of painting. Not surprisingly so, because European influence was steadily on the rise in the
                      court of Awadh and in their capital city of Lucknow and Indian painters (like Mihr Chand)
                      often worked under European patronage. As Lucknow slowly rose to become the seat of
                      culture and prosperity during the rule of Asaf-ud-Daulah and Suja-ud-Daulah, European
                      painters like Tilly Kettle visited Lucknow, bringing in oil painting and European stylisations.
                      The interaction between masters like Kettle and Chand at Lucknow was seminal in what
                      we may call an adaptive inculcation of European style into Indian painting.
                      At its pinnacle, the Lucknow school produced both full sized portraits and miniature
                      paintings. There was an increasing inclination towards Western Realism and Renaissance
                      ideals of perspective and depth, along with a growing popularity of oil paintings. Masters like
                      Mihr Chand brought out the flavour of European oil with traditional watercolor on paper,
                      decorated with lavish floral embellishments, while occasionally using oil on traditional ivory.
                      (Awasthi 2025; Tornos-India 2025)`
        },
        {
            title: "The Pahari Schools",
            content: `The Pahari Schools began as an offshoot of the Mughal school, during the second half
                      of the seventeenth century. Pahari (literally translating to from the hills) was never
                      a single atelier or a group of painters, but a conglomerate of multiple royal ateliers,
                      namely Basohli, Mankot, Nurpur, Chamba, Kangra, Guler, Mandi, and Garhwal, spanning
                      the Himalayas from Kashmir in the West to Garhwal in the East. The earliest works in Pahari miniature originated in
                      Basohli in the late seventeenth century, distinguished by their thick lines, hot and bold
                      colours. Following the plunder of Delhi by
                      Nadir Shah, there was a period of politi
                      cal instability and social insecurity in the
                      Northern Plains. This led to many Mughal
                      school artists taking refuge in the hills and
                      mingling with the local ateliers, thus result
                      ing in a blend of Mughal and Basohli styles.
                      This confluence can be traced from the
                      subsequent birth of the Kangra and Guler
                      schools, whose miniatures were almost at
                      par with their mughal counterparts in terms
                      of quality and finish. The Kangra school
                      adopted the use of thin and delicate lines
                      accompanied by cooler tones and meticu
                      lous emphasis on details. The main theme
                      of the Kangra paintings was the romance of
                      Radha and Krishna, inspired by the stories
                      of Bh¯agavata Pur¯ana and Jayadev’s G¯ ita
                      Govindam. The Guler school, on the other
                      hand, retained the rich and warm colours of the Basohli school, while bringing in the subtlety
                      of line and expression along with more naturalistic depictions of form. The Pahari schools re
                      mained in prominence well into the early nineteenth century, until European settlers reached
                      the Western Himalayas and the British annexed the Hills from the local royalties. (India
                      2021; Kossak 1997)`
        }
    ]
  },
  {
    id: 4,
    title: "Chapter 4: Art under the British Crown: 19th Century India",
    image: "./brit.jpeg", 
    intro: "Up until the turn of the 19th century, the British had inherited a hen that lays golden eggs from the erstwhile Mughals, and were just reaping its harvest. India left by the Mughals was a well-administered, self-replenishing economy. Thus, when it received Diwani Rights over Bengal after the Battle of Buxar in 1764, the EIC only increased the tax amount manifold, to boost its profit margin, maintaining every other aspect of the system just in place. Therefore, even after the British acquisition of Bengal and Awadh, there was no major setback faced by the painters and craftsmen in general immediately. However, things were to change with the coming of the 19th century. With the Industrial Capitalists replacing the Merchants back in the British Parliament, India was to be transformed from a manufacturer of finished products to a supplier of raw materials, adept at feeding British Industries in Manchester and Lancashire. Thus, the EIC undertook a systematic project to de-industrialise India, completely obliterating the Indian handloom and handicraft industries. Consequently, industrial hubs like Dhaka and Murshidabad collapsed, and craftsmen, stripped of their profession, were forced to look for other sources of income, some going back to an agrarian lifestyle, some joining the army for a fixed wage, while others tried their hands at odd jobs. Some of these craftsmen relocated to the newly emerging urban centers like Calcutta. Here they painted for a livelihood, catering to both European customers as well as the affluent Bengali babu, but living more like a second-class citizen, in the name of ‘bazaar’ painters.",
    subsections: [
        {
            title: "The Government Schools of Art",
            content: `After successfully destroying and crippling the flourishing schools of Indian art, there was
                      an Imperial need to ‘civilise’ the ‘natives’ and inculcate in them the ‘right taste’ for ‘fine
                      arts’. This Imperial mission led to the setting up of four Government Schools of Art at
                      four Presidency towns across the Empire– Calcutta, Madras, Bombay, and Lahore. The
                      Calcutta School of Art, along with the School of Industrial Arts, Madras, was set up in 1854,
                      Sir Jamsetji Jeejibhoy School of Art, Bombay, in 1857, and the Mayo School of Art, Lahore,
                      in 1878. Leaving behind the Imperial narrative, the main objective of these schools was to
                      provide vocational training to potent Indians, so that they could work as skilled draughtsmen
                      in different Government Survey departments, or as lithographers and designers in British
                      industries.
                      There was a pre-existing European distinction between ‘higher arts’ and ‘lesser arts’,
                      where the former included painting portraits and landscapes while the latter comprised
                      industrial design and ornamental art. When Art education was institutionalized in India,
                      this distinction gained a colonial overtone. Indians were considered unfit for practicing ‘high
                      art’ or ‘fine arts’, and thus in Fine Arts exhibitions organised in Calcutta from time to time
                      by European gentry, Indian artists, irrespective of their level of mastery, were exhibited
                      under ‘student’ or ‘native’ category. As Guha-Thakurta beautifully puts it, “...excellence in
                      ‘fine arts’ was set apart as a monopoly of the West; and Indian art, however appreciated, was
                      relegated to the sphere of ‘lesser arts’.” Thus, the government institutions for art education
                      were aimed at producing faithful servants of British Imperialism, proficient in the ‘lesser
                      arts’, which were of industrial and Imperial interest.
                      Nonetheless, the Calcutta School of Arts did manage to become a seat of ‘fine arts’
                      education in India, with an adjoining Fine Arts Gallery founded by Viceroy Lord Northbrook
                      in 1876, populated with European specimens of ‘fine arts’ (a second-grade selection even by
                      contemporary British standards), which were mostly paintings by European painters who
                      visited India along with some Indian replicas of Italian works. The founding principal of
                      the school, H.H. Locke, modelled the school’s course curriculum on the lines of the South
                      Kensington School in London, and thus, Fine Arts was a part of the curriculum from the
                      very beginning. The school produced a new group of Indian artists trained in Western
                      Academic style, adept at copying European masterpieces, thereby ensuring a local, low-cost
                      supply of quality paintings to the zamindars who were keen to decorate their mansions at
                      par Victorian aesthetic standards.This new group of artists re-legitimised the profession of a painter as a respectable social
                      order, setting themselves apart from the bazaar painters, and locating themselves within
                      the premises of the middle class. The art schools also provided for the growing needs of
                      lithographic presses across the country, alongside skilled wood carving artists and designers,
                      essential for the print media and the advertising industry. (Guha-Thakurta 1992)`
        },

        {
            title: "Raja Ravi Varma",
            content: `Raja Ravi Varma was born to an aristo
                      cratic family in Kilimanoor in the Kingdom
                      of Travancore. As was the tradition for chil
                      dren of the moneyed class, Ravi Varma was
                      tutored at his home. Noticing his innate
                      abilities in arts, his father emphasised on a
                      rigorous training in painting. At a young
                      age of thirteen, Ravi made his way into the
                      royal court of Travancore, receiving further
                      training in arts including lessons in oil from
                      court artists. After years of rigorous prac
                      tice, Ravi Varma finally sketched his own
                      career path as a distinguished Artist, akin
                      to both the Indian idioms and iconography
                      and the western techniques of realism.
                      On the scene of Indian Art, Raja
                      Ravi Varma occupies a very special place,
                      much like his younger Bengali counterpart,
                      Abanindranath Tagore. Varma was not
                      trained at any government art institute, but
                      yet he was a master in oil. During his years
                      at the court of Travancore, he had learned
                      much about the Hindu iconography, and it
                      was his pure genius that he put these two
                      together to arrive at his quintessential style.
                      The Raja had more to his accord, he pi
                      oneered the painting of Hindu Gods and
                      Goddesses in the Western Academic style, imparting “life” to the divine. With techni
                      cal support from the German printer Fritz Schleicher, Varma flagged off the Ravi Varma
                      Fine Arts Lithographic Press in 1894 in Bombay, not only making fine arts accessible to a
                      vast majority of Indian households, but also fundamentally changing the way Hindus wor
                      ship, for now every Hindu home could afford to own an image of their deity. (Bayi 2025;
                      Guha-Thakurta 1992)
                      The works of Raja Ravi Varma had a profound impact on the artistic and aesthetic
                      consciousness of the country. Not only were many 20th century painters influenced by his
                      oeuvre, but his works on Hindu iconography and divine representation set in motion an
                      immediate revolution in popular and commercial painting, especially in Calcutta.`
        },
        {
            title: "Rise of the Lithographic Press & The Painting Industry",
            content: `The second half of the nineteenth cen
                      tury saw the introduction of Lithographic
                      Presses across India, primarily in Calcutta,
                      Allahabad, and Bombay. The Calcutta
                      Art Studio, as their official website reads,
                      “was established in 1878 with an inten
                      tion to publish and sell Mythological pic
                      tures in a style of its own, originated by
                      Sri Annadaprasad Bagchi, along with four
                      of his better students, namely, Sri Nabo
                      Coomar Biswas, Phanibhushan Sen, Sri Kr
                      ishna Chandra Pal and Sri Jogendranath
                      Mukhopadhyay.” The Studio, deeply rooted
                      in the aesthetics and stylistics of the Cal
                      cutta School of Arts, produced its own body
                      of Western Academic style Hindu mytholog
                      ical paintings, different from the ones be
                      ing popularised by Raja Ravi Varma in the
                      south. The mythological characters, Gods
                      and Goddesses, had a distinct European
                      f
                      lavour, with certain easily identifiable styli
                      sations like angels heralding from the clouds
                      and partially draped women directly point
                      ing to Biblical scenes by European masters.
                      The Studio, over time, came up with a
                      set formula for the depiction of Indian di
                      vinity, a formula that remained flamboy
                      antly popular throughout the 20th century
                      in calendars and religious texts across Ben
                      gal. The elements of this divine formula has been superbly summed up by Guha-Thakurta,
                      and I quote, “...there emerged, in these pictures, a fixed idealised prototype for female divini
                      ties (fair, plump, drooly-eyed women, in pseudo-medieval Rajput costumes, flaunting gold
                      from head to foot), just as there also evolved a set type of celestial setting for divine episodes
                      (landscapes with flaunting skies and lakes filled with swans and lotuses).” (Guha-Thakurta
                      1992)
                      Thus we see that painting of Hindu religious and mythological subjects makes an epic
                      comeback, this time in Western attire, after it fell out of patronage with British annexation
                      of Indian courts. However, now with the lithographic press, these mythological paintings
                      could reach the vast multitudes of pious Hindus across the country, like never before, thus
                      stimulating popular imagination. Even though the prints of the Calcutta Art Studio and
                      their likes were no where close to the artistic mastery and print quality of the oleographs from
                      Ravi Varma Fine Arts Lithographic Press; the existence and tremendous popularity of these
                      two centers of mythological printing induced the birth of such industries in different parts of
                      the country, thereby deepening the penetration of such divine figurations and encouraging
                      the imaginations of a religious community. It was quite at the same time that the first All
                      India Census was carried out in 1881, quantifying the Indian population on the basis of
                      caste, creed and religion, spearheading the ‘Hindu’ identity. Thus the trajectory taken by
                      Indian paintings during the nineteenth century, had a big role to play in sowing the seeds of 
                      communal politics that ripped the country apart in the twentieth century.`
        }
    ]
  },
  {
    id: 5,
    title: "Chapter 5: New Indian Art of the 20th Century",
    image: "./jamini.jpeg", 
    intro: "The turn of the twentieth century saw a significant shift in Indian politics. The Indian National Congress had come into existence for nearly two decades now, but with the Partition of Bengal in 1905, the national movement had gained momentum. We hear the first resolutions for swaraj and swadeshi at the Calcutta session of the Congress in 1906, and a few years later an Indian lawyer, lately returned from South Africa, M.K. Gandhi, writes his influential title ‘Hind Swaraj’, first published in Gujarati in 1908 and then self-translated into English and published in 1909. Art, as they say, is a reflection of contemporary society, and Indian painters could all but dwell in the romantic delusions of Gods and Goddesses amidst the heat of anti-colonial struggle. The young artist who spearheaded this revivalist movement in Indian art was Abanindranath Tagore, nephew of the Nobel laureate.",
    subsections: [
        {
            title: " Abanindranath & The Bengal School",
            content: `Abanindranath, often hailed as the ‘father of modern Indian art’, was born in 1871 at
                      Jorasanko, the ancestral residence of the Tagores in Calcutta. Growing up in an ambience of
                      art and culture, he nurtured a keen interest in painting. However, he was never professionally
                      trained as a painter in his early days, and went to the Sanskrit College, Calcutta, to take
                      courses in classics. There he learned line sketching and the basics of drawing from his
                      classmate Anukul Chatterjee, finally enrolling himself at the Calcutta School of Arts in
                      1890, during the tenure of the Italian painter Olinto Ghiraldi, who was then the principal
                      of the school. Abanindranath was trained in the Western Academic style by renowned
                      painters like Ghiraldi and Charles Palmer, additionally taking lessons in Japanese painting
                      techniques from Yokoyama Taikan.
                      Abanindranath began his painting career towards the very end of the nineteenth century,
                      when he painted a set of works titled Krishna Lila, based on medieval Bengali Vaishnava
                      verses, which were impressed upon him by his uncle, Rabindranath. Interestingly enough,
                      Krishna Lila is a study in watercolour and reminds us of the pre-modern miniature paintings.
                      From there on, Abanindranath undertook a detailed study of Mughal, Rajput, Persian, Folk,
                      and various other old schools of painting, renouncing oil for watercolour. During this period,
                      Abanindranath revived the techniques of Wash and Tempera.
                      The Ajanta Caves had been discovered back in the year 1819, accidentally, by a group
                      of British military led by Captain John Smith, who were out on the vast wilderness of the
                      Deccan plateau for a hunt. The caves housed stunning Frescoes depicting stories from the
                      Jatakas, a pinnacle of Buddhist painting, from the 4th– 6th century CE, roughly aligning
                      with the Gupta period. By the time of Abanindranath, multiple (mostly failed) attempts
                      had been made by European painters to copy the Ajanta Frescoes to display their riches
                      to the outside world. (Mitter 1992) Abanindranath was marveled by the magnanimity
                      and immense beauty of these fresco paintings, and began to regard them as the zenith of
                      Indian painting, making an attempt to revive such unfathomable mastery over style and
                      colour. In this move towards reviving Indian painting tradition, he also culled out verses
                      from Sanskrit texts and compiled them in some of his essays, for example Bharat Chitre
                      Sharanga (written in Bengali, translates to The Six Elements in Indian Painting), where
                      he underlines the essential elements in Indian form and painting. Abanindranath was ably
                      assisted in his intellectual and artistic quests by his elder brother Gaganendranath and their
                      sister Sunayani Devi, both of them were avant garde painters in their own right.
                      Abanindranath was a teacher at the Calcutta school of Arts for a decade from 1905
                      1915, during which he trained noteworthy students like Asit Kumar Halder, K. Venkatappa
                      and Nandalal Bose, all of whom were to become pioneer painters of modern India. With
                      the establishment of Kala Bhawan (The Institute of Fine Arts) at Tagore’s Shantiniketan,
                      Abanindranath moved there along with Nandalal Bose (who was invited by Rabindranath
                      to head the Institute) and others, training pupils in his revived form of Indian art. Abanin
                      dranath and his students, who practiced and preached paintings in watercolour, taking leads
                      from both the Buddhist Art of Ajanta, and the Mughal, Rajput, and Pahari styles, came to
                      be known as the Bengal School Artists. They were distinguished from the Western School
                      Painters of the time, like Hemendranath Majumdar and Atul Bose by their boycott of oil
                      paintings and strict use of watercolours, tempera, and other traditional methods of painting.
                      (Gallery 2025; Guha-Thakurta 1992)`
        },
        {
            title: "Invoking the Folk – Jamini Roy",
            content: `While the Western Academic Painters and the Bengal School Painters were holding heated
                      debates on the future of Indian Painting, there was another stalwart in Calcutta, equally
                      associated with their proponents yet equally distant from both these schools of thought. To
                      him, Academic Realism, which was studiously followed by art school painters like Hemen
                      Majumdar was long out of fashion (even in the west), and taking inspiration from paintings
                      as distant in space and time as the Frescoes of Ajanta was an equally fruitless endeavour;
                      because art exists in the context of space and time, and the Buddhist Caves of Ajanta,
                      situated in the Deccan traps of Maharashtra from the period of Gupta Empire, had little
                      in common with twentieth century Bengal. This master of fine arts was Jamini Roy.
                      Roy was born in 1887 in the village of Beliatore in the Bankura District of Bengal,
                      and was akin to paintings by village painters and his Santhal neighbours, right from an
                      early age. At the age of sixteen, he took admission into the Calcutta School of Arts. The
                      then principal, Percy Brown, was so impressed by the paintings of this young man that he
                      allowed Jamini to take any course at the institution at his will. Soon, Jamini became one
                      of the most sought-after portrait painters in the city, and a master in oil. However, his own
                      inclinations were towards the contemporary European impressionist and post-impressionist
                      works. During the second and the third decades of the twentieth century, in a search for his
                      own style, Jamini went around the villages of Bengal, collecting pats from traditional folk
                      painters, often staying with them to learn the folk idiom.
                      At the high noon of his artistic career, Jamini gave up painting portraits in oil and
                      instead started painting in his own new style, heavily inspired by traditional folk art. Not
                      only did he change his style but also his painting inventory. He completely renounced colours
                      that were commercially available in the market and started preparing his own paints, from
                      locally available traditional sources. He got rid of the European canvas, replacing it with his
                      ingenious alternative of a framed kh¯adi cloth, tempered with a layer of dung and clay and
                      subsequently whitewashed. He also used vegetable sources of gum, that is usually used by
                      village painters, to bind his pigments. All these innovations, combined with his iconic style,
                      gave his paintings a unique swadeshi flavour, perfectly resonant with the contemporary
                      politics of the thirties and forties. (Ghosh 2022)`
        },  
        {
            title: "Art and Nationalism",
            content: `Speaking of great masters who re-envisioned Indian painting at the dawn of the twentieth
century, it would be incomplete and unjust if we do not delve into the close interaction
between art and nationalism. As the engulfing flame of nationalism constantly moulded the
ideas of contemporary painters, their works in turn played an important role in shaping the
national movement and identity.
Abanindranath felt motivated to revive lost traditions in Indian art at a time when
nationalists like Tilak were revitalising festivals like Ganeshotsav and Shivaji Utsav into
public events in order to mobilise the masses against the British. The Bengal School’s
call to renounce oil painting and shift to water based mediums came at a time when there
was a nationwide campaign to boycott foreign goods and look for indigenous alternatives.
It is to be noted that all oil paints at that time were imported from Europe, and thus
boycotting the medium by the best painters not only dealt a severe blow to its imports
but also showed strong support for the swadeshi movement. Jamini Roy took an even
sterner stand, boycotting all commercially available paints and making his own paints from
traditional pigments. His boycott of the canvas for a kh¯adi based alternative also expresses
his strong Gandhian ideals, as does his choice of the folk idiom. Roy toured the villages of
Bengal in search of art, in much the same way Gandhi toured the villages of India. Roy is
known for his explicit support for Gandhian principles as well as his socialist ideals. Jamini
Roy was against this idea of aristocratic ownership of art and wanted to spread his art across
different sections of the society, especially the middle class. Thus he used to create multiple
copies of his paintings, all bearing his sign (such that none can be identified as an original),
so that he may sell them at a cheaper price, affordable to the middle class customer.
Just as the artists were a product of their times, the art that they produced greatly in
f
luenced the public imagination, and thereby the national movement. In 1905, following the
partition of Bengal, Abanindranath painted Bharat Mata (Figure 9A) as the iconography of
mother India. This painting became so popular among the general audience that it fueled
the imagination of India as a mother in shackles who needed to be set free, much like the
public impact of the song Vande Mataram, written by Bankim Chandra Chattopadhyay.
Jamini Roy’s adoption of folk idioms kindled interest towards folk art both among Euro
peans and Indian artists and art enthusiasts, thereby voicing against their marginalisation
as second-grade artists. Moreover, the emergence of the Bengal School and Jamini Roy
created a new definition of Indian ‘high art’, and presented itself as an antithesis of the pre
vailing notion of European ‘high art’. The idea and imagination that Indian art has its own
masters and does not need to bend low in front of European art provided a great foothold
to consolidate a national consciousness and thereby fueled India’s freedom struggle.`
        },
        {
            title: "Paintings post Independence",
            content: `Indian painting took a very different trajectory post-Independence. A new school of young
painters from Bombay, including F.N. Souza, S.H. Raza and M.F. Hussain came together
to form the Bombay Progressive Artists’ Group in 1947, challenging academic realism and
heralding a more abstract form of modernist art in India. The Bengal School of painters
from Santiniketan and their students, led their quest for traditional modernism forward. The
Baroda School, formed in 1950 at the Faculty of Fine Arts at the University of Baroda, also
emphasised on the integration of modern Western styles with traditional forms and styles.
Figurative abstraction played an important role in modern Indian art movements. To sum
it up, Modern Art in India developed a unique visual tradition, distinct from contempo
rary art movements in the West. Post-independence painters, following the legacy of the
national movement, focused on integrating the folk and indigenous styles of painting within
mainstream ‘modernist’ art, in order to create something quintessentially Indian. India’s
journey through modernism, as like any other phase of Indian art, was mostly regional, with
individuals and groups in different parts of the country choosing their own trajectory, trying
to leave a mark on the history of Indian painting in their own distinctive style. (Fiveable
2025)`
        }
    ]
  },
  {
    id: 6,
    title: "Chapter 6: Conclusion",
    image: "./artgallery.jpeg", 
    intro: `Indian Painting has moulted and metamorphosed multiple times during its journey over the
last four centuries. Even though these transformations due to contemporary socio-political
changes might appear to be drastic or dramatic in close up; given the benefit of hindsight,
Indian Painting seems to have been remarkably resilient to external perturbations. Even if it
was temporarily affected by such changes, those external qualities were quickly internalised
within the broader framework, to produce something quintessentially Indian. Two examples
in favour of this argument might better explain the hypothesis. When Persian art flowed
into the subcontinent with the arrival of Mughals or Persian noblemen (as was the case in
the Deccan), there was an initial rift between traditional Hindu paintings, and state of the
art persian styled paintings. However, within a century or so, the two blended into one
another giving way to the magnificent Rajput and the Deccani paintings. A similar cross
fertilisation took place when the British brought in the oil painting technique. Indians,
who had used watercolour for time immemorial, saw this new medium with contempt. But
once again, the two blended together in the avant garde paintings of Raja Ravi Varma, who
painted oil with an Indian soul. It is interesting to observe how techniques, motifs, and
styles come back again and again, in a slightly different form, at different places and times.
In a country as vast as ours, some might argue that if at all there exists a homogeneous
body of work, which can be called “Indian” painting, surprisingly enough, it does. The
homogeneity arises from the millennia of shared history and the stories from ancient texts,
and the long heritage of practicing art that this country owns. As Zebrowski (1983) rightly
says, even though “...the patrons of arts were either foreigners or descendents of foreigners,
. . . the artists were nearly always Indians,” and thus, the product or the art that comes out
inevitably has that essential Indianness in it.`
  }
];

const Resources = () => {
  const [imgLoading, setImgLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState([]);

  // Fix: Turn off the loading overlay after 1 second
  useEffect(() => {
    const timer = setTimeout(() => setImgLoading(false), 50);
    return () => clearTimeout(timer);
  }, []);

  const toggleSection = (id) => {
    setExpandedSections(prev => 
      prev.includes(id) 
        ? prev.filter(sectionId => sectionId !== id) 
        : [...prev, id]
    );
  };

  const openAll = () => {
    setExpandedSections(sections.map(s => s.id));
  };

  const collapseAll = () => {
    setExpandedSections([]);
  };

  return (
    <div className="relative min-h-screen pb-20">
      
      {/* Background Layer - Grayscale applied ONLY here */}
      <div 
        className="fixed inset-0 res-bg bg-yellow-200 grayscale-[80%] bg-cover bg-center -z-20 pointer-events-none" 
      />

      {/* Loading Overlay */}
      {imgLoading && (
        <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10' />
      )}

      <Navbar />

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-6 pt-32 pb-12">
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">
         Evolution of Indian Painting
        </h1>
         <h1 className="text-2xl md:text-2xl font-serif italic text-white mb-3">
         From Pre-Modern to Modern India
        </h1>
        
        <p className="text-lg text-white leading-relaxed max-w-4xl mb-5 text-justify"> 
          India has a long and fairly continuous history of painting, right from the earliest days of civilization. From the cave paintings of Bhimbetka, to painted pottery of the Harappan
          civilization, to the impressive murals of Ajanta, the use of the brush and paint had evolved steadily over the centuries. In this segment, we take you through the various painting traditions that were popular during the 17th century, through the 18th century, until Independence in 1947.
        </p>

        {/* Buttons - Right Aligned */}
        <div className="flex flex-col md:flex-row md:items-center justify-end border-t border-gray-200/30 pt-4">
          <div className="flex space-x-6 text-sm font-medium text-white">
            <button 
              onClick={openAll}
              className="flex items-center hover:text-black transition-colors"
            >
              <ChevronsUpDown className="w-4 h-4 mr-1" />
              OPEN ALL
            </button>
            <button 
              onClick={collapseAll}
              className="flex items-center hover:text-black transition-colors"
            >
              <X className="w-4 h-4 mr-1" />
              COLLAPSE ALL
            </button>
          </div>
        </div>
      </div>

      {/* Accordion List */}
      <div className="w-full">
        {sections.map((section) => {
          const isOpen = expandedSections.includes(section.id);

          return (
            <div key={section.id} className="border-b border-gray-100 last:border-none">
              
              {/* Clickable Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="group relative w-full h-32 md:h-40 overflow-hidden text-left focus:outline-none"
              >
                {/* Background Image - Focus Adjusted */}
                <div 
                  className="absolute inset-0 bg-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ 
                    backgroundImage: `url(${section.image})`,
                    backgroundPosition: 'center 25%'
                  }}
                />
                
                {/* Dark Overlay - Now a Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent group-hover:from-black/90 group-hover:via-black/50 transition-colors duration-300" />

                {/* Text Content */}
                <div className="absolute inset-0 flex items-center px-6 md:px-12 max-w-5xl mx-auto w-full">
                  <div className="flex items-center text-white">
                    <ChevronRight 
                      className={`w-8 h-8 md:w-10 md:h-10 mr-4 transition-transform duration-300 ${
                        isOpen ? "rotate-90" : "rotate-0"
                      }`} 
                    />
                    <span className="text-2xl md:text-4xl font-light tracking-wide drop-shadow-md">
                      {section.title}
                    </span>
                  </div>
                </div>
              </button>

              {/* Elastic Content Area - UPDATED BG COLOR HERE */}
              <div 
                className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div 
                    className="overflow-hidden shadow-inner"
                    style={{
                        backgroundColor: '#fdf6e3', // Old paper color
                        backgroundImage: `url("https://www.transparenttextures.com/patterns/aged-paper.png")`, // Subtle texture pattern (reliable CDN)
                        boxShadow: 'inset 0 0 60px rgba(160, 82, 45, 0.15)' // Burnt edges vignette
                    }}
                >
                  <div className="max-w-5xl mx-auto px-6 md:px-12 py-10 md:py-14">
                    
                    {/* Main Intro Text */}
                    {section.intro && (
                        <div className="prose prose-lg max-w-none text-stone-800 leading-loose text-justify mb-8 font-light">
                        {renderContentWithLinks(section.intro)}
                        </div>
                    )}

                    {/* Render Subsections if they exist */}
                    {section.subsections && section.subsections.length > 0 && (
                        <div className="mt-8 pl-2 md:pl-4 border-l-2 border-stone-300">
                            {section.subsections.map((sub, index) => (
                                <SubSection 
                                    key={index}
                                    title={sub.title}
                                    content={sub.content}
                                />
                            ))}
                        </div>
                    )}

                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Resources;