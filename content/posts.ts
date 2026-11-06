/**
 * Blog posts. Each targets one keyword from content/keywords.csv (brief §9.9).
 * Body is a small block list so it can move to a CMS later without rewriting pages.
 *
 * Facts come from ../ashram-website-handoff/content/verified-facts.md only.
 * Anything the ashram states about itself is written as such; miracle claims
 * never go beyond "devotees say"; no post promises a meeting with Maataji.
 */
export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Guide" | "Mounasamy" | "Festivals" | "Ashram life" | "Teachings";
  targetKeyword: string;
  publishedAt: string;
  readMinutes: number;
  image: "arunachalaNight" | "girivalamWalk" | "girivalamMap" | "mounasamyAltar" | "mounasamyGarland" | "maatajiSeva" | "maatajiStudio" | "maatajiPortrait";
  body: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: "karthigai-deepam-2026-tiruvannamalai",
    title: "Karthigai Deepam 2026 in Tiruvannamalai: date and timings",
    excerpt:
      "Tuesday 24 November 2026: Bharani Deepam before dawn, Maha Deepam on the summit at dusk, Pournami Girivalam all night, and where to eat, rest and watch.",
    category: "Festivals",
    targetKeyword: "karthigai deepam 2026",
    publishedAt: "2026-11-05",
    readMinutes: 9,
    image: "arunachalaNight",
    body: [
      {
        type: "p",
        text: "Karthigai Deepam 2026 falls on Tuesday 24 November 2026. It is the one night of the year when the whole of Tiruvannamalai turns towards the summit of Arunachala and waits for the great lamp, the Maha Deepam, to be lit. If you are planning to come, this is what the day looks like, hour by hour, and how the ashram at Adi Annamalai fits into it.",
      },
      { type: "h2", text: "The date and the timings" },
      {
        type: "p",
        text: "The temple publishes its final schedule close to the day, but the shape of Deepam is the same every year. The Bharani Deepam is lit inside the Arunachaleswarar temple before dawn, at about 4 AM. The Maha Deepam on the summit is lit at dusk, at about 6 PM, and can be seen from the whole town and from far along the Girivalam path. The Kartika Purnima tithi begins at 11:42 PM on 23 November and runs until 8:23 PM on 24 November, so the Pournami Girivalam carries on through the night.",
      },
      {
        type: "ul",
        items: [
          "Bharani Deepam: about 4 AM, inside the temple.",
          "Maha Deepam: about 6 PM, on the summit of the hill.",
          "Pournami tithi: 11:42 PM on 23 November to 8:23 PM on 24 November.",
          "Temple hours are extended on the day. Check the temple's own notice before you travel.",
        ],
      },
      { type: "h2", text: "Karthigai Deepam 2026 festival schedule" },
      {
        type: "p",
        text: "The ten-day Karthigai Deepam festival (Thirukarthigai Brahmotsavam) at the Arunachaleswarar temple builds up to the lighting of the lamp. The main days announced for 2026 are below; the temple may adjust times, so confirm locally.",
      },
      {
        type: "ul",
        items: [
          "Sunday 15 November: flag hoisting (dwajarohanam) at the golden flagstaff in the morning — the festival begins.",
          "Saturday 21 November: Maha Ratham — the great chariot procession around the temple streets.",
          "Tuesday 24 November: Bharani Deepam at about 4 AM in front of the sanctum; Maha Deepam on the summit of Arunachala at about 6 PM.",
          "25–27 November: theppal (float) festival; 26 November: Swami Girivalam.",
          "The Maha Deepam keeps burning on the hill for about eleven days.",
        ],
      },
      {
        type: "p",
        text: "In the Tamil calendar, Karthigai Deepam 2026 falls on Karthigai 8 (கார்த்திகை 8) of the Parabhava year — please confirm with your own panchangam. The Krittika nakshatra runs from about 2:02 AM to 11:25 PM on 24 November. Devotees who cannot come can make the ghee-pot (gheepot) offering for the Maha Deepam on the temple's official website, annamalaiyar.hrce.tn.gov.in.",
      },
      { type: "h2", text: "Where to watch the Maha Deepam" },
      {
        type: "p",
        text: "You do not have to be inside the temple to see the lamp. The flame on the summit is visible from any open ground around the hill: the temple precincts, the Girivalam road, and the quieter western side at Adi Annamalai, where the ashram stands. The crowd near the main temple is very heavy on Deepam evening, so many pilgrims choose a spot on the path and wait there together with the walkers.",
      },
      { type: "h2", text: "What the ashram does on Deepam" },
      {
        type: "p",
        text: "Deepam is the largest annadhanam day in the ashram's year. The kitchen starts before dawn and serves hot food to sadhus, pilgrims and the poor who walk around the hill. The ashram reports that on one Karthigai Deepam about one lakh people were fed. Volunteers are needed for cooking, serving and keeping the path clean; the Annadhanam page explains how to join a shift or sponsor the day.",
      },
      { type: "h2", text: "Practical notes for the day" },
      {
        type: "ul",
        items: [
          "Arrive a day early if you can. Roads into town slow to a crawl on Deepam morning.",
          "Chennai airport is about 175 km away. Tiruvannamalai has a railway station, and the bus stand is about 2 km from the temple.",
          "Carry water, wear light clothing and expect to walk barefoot on the Girivalam path.",
          "Mobile networks are congested on the night. Agree a meeting point with your group in advance.",
          "Rooms in town are booked out weeks ahead. See our note on ashram accommodation before you plan.",
        ],
      },
      {
        type: "p",
        text: "Darshan of Mounasamy Siddhar at the ashram continues on Deepam day as on every other day, and the ashram is a natural resting point on the path. The Tiruvannamalai guide on this site keeps the Deepam section and the Girivalam calendar up to date; the Events page has the rest of the festival year.",
      },
    ],
  },
  {
    slug: "who-is-mouna-siddhar-tiruvannamalai",
    title: "Who is Mouna Siddhar of Tiruvannamalai? The ashram's account",
    excerpt:
      "His silence, his altar, his guru Maataji, and where to find him now (not the old peetam on Girivalam Road).",
    category: "Mounasamy",
    targetKeyword: "who is mouna siddhar",
    publishedAt: "2026-11-05",
    readMinutes: 7,
    image: "mounasamyGarland",
    body: [
      {
        type: "p",
        text: "Mouna Siddhar of Tiruvannamalai, also written Mouna Swami, Mounasamy or Vibhuti Siddhar, is the silent sadhu of Arunachala. People who search for him find scattered blog reports and old addresses. This is the ashram's own account, written because he lives here, at Siva Sri Thiyaneswar Amma Ashram in Adi Annamalai.",
      },
      { type: "h2", text: "What is known about him" },
      {
        type: "ul",
        items: [
          "He has kept a vow of silence, mouna, for more than fifteen years. Nobody keeps an exact count, and he does not speak of it.",
          "He sits before his altar day and night and does not lie down to sleep.",
          "He is covered in vibhuti, sacred ash, and his matted hair reaches his knees.",
          "Devotees who knew him earlier say he sold milk in Chennai before taking to this life, and that he served a guru for about ten years.",
        ],
      },
      { type: "h2", text: "His guru" },
      {
        type: "p",
        text: "The ashram holds that Maataji, Sathguru Siva Sri Thiyaneswar Amma, is his guru, and that his sadhana was shaped under her guidance. He is her shishya, and today he lives at the ashram in her care. The guru–shishya story is told in full on its own page, in the words of the people who were there.",
      },
      { type: "h2", text: "Where he is now" },
      {
        type: "p",
        text: "For some years he sat at the Sri Mouna Swami Peetam on Girivalam Road, and many online directions still point there. He has moved. He now lives at Siva Sri Thiyaneswar Amma Ashram, Thiyaneswar Veedhi, Vediyappanur Road, Adi Annamalai, Tiruvannamalai 606604, on the quieter western side of the hill. Darshan is open every day and there is no fee; he stands to give darshan every evening from 7 to 8 PM.",
      },
      { type: "h2", text: "What devotees say" },
      {
        type: "p",
        text: "Devotees say that silent prayers made in front of him are answered, and that sitting with him brings a stillness that stays for days. The ashram does not make claims on his behalf. What we can say is simple: he is here, he is silent, and anyone may come and sit.",
      },
      { type: "h2", text: "How to visit" },
      {
        type: "ul",
        items: [
          "Come in silence, and keep it in the hall. There is nothing you need to bring.",
          "Ask a volunteer before photographing him; devotees may be in prayer around you.",
          "Mornings are the calmest. Pournami days and festivals draw large crowds.",
          "The ashram office can be reached on +91 87781 68013 for directions.",
        ],
      },
      {
        type: "p",
        text: "The Mounasamy pages on this site hold everything in one place: his story, the guru–shishya account, and the darshan page with the map, timings and frequently asked questions. Start at the Mounasamy hub and go on from there.",
      },
    ],
  },
  {
    slug: "girivalam-dates-2026-2027-how-to-walk",
    title: "Girivalam dates 2026–2027 and how to walk the Pournami path",
    excerpt:
      "The next full-moon dates with the hours the tithi runs, the eight Ashta Lingams in order, and what the ashram does each Pournami.",
    category: "Guide",
    targetKeyword: "girivalam dates 2026",
    publishedAt: "2026-11-05",
    readMinutes: 6,
    image: "girivalamWalk",
    body: [
      {
        type: "p",
        text: "Girivalam dates for 2026 and 2027 follow the full moon, Pournami. On each Pournami night lakhs of pilgrims walk the 14 km path around Arunachala, barefoot and clockwise, keeping the hill on their right. This post gives the next dates with the hours the tithi runs, explains how the walk is done, and tells you what the ashram at Adi Annamalai offers along the way.",
      },
      { type: "h2", text: "The next Girivalam dates" },
      {
        type: "ul",
        items: [
          "Tuesday 24 November 2026: Kartika Purnima, the same night as Karthigai Deepam. The tithi runs from 11:42 PM on 23 November to 8:23 PM on 24 November.",
          "Wednesday 23 December 2026: Margashirsha Purnima. The tithi runs from 10:47 AM on 23 December to 6:57 AM on 24 December. Thiruvadhirai, Arudra Darshan, follows on Thursday 24 December.",
          "Saturday 6 March 2027: Maha Shivaratri, when the path is walked through the night even though it is not a Pournami.",
        ],
      },
      {
        type: "p",
        text: "The complete month-by-month table for 2027, with the tithi start and end for each Pournami, is kept on the Tiruvannamalai guide page and updated as the panchangam for the year is confirmed. Pilgrims generally begin walking once the tithi has started and finish before it ends.",
      },
      { type: "h2", text: "How the walk is done" },
      {
        type: "p",
        text: "Girivalam starts and ends at the Arunachaleswarar temple, and the path is a tarred road that circles the hill. The eight Ashta Lingams mark the eight directions along the way: Indra Lingam, Agni Lingam, Yama Lingam, Niruthi Lingam, Varuna Lingam, Vayu Lingam, Kubera Lingam and Esanya Lingam. Walkers pause at each one. Adi Annamalai, with its own ancient temple, lies on the western stretch between the Varuna and Vayu Lingams, and the ashram is just off the path here.",
      },
      {
        type: "ul",
        items: [
          "Walk barefoot if you can; the path is paved and most pilgrims do.",
          "Keep the hill on your right and walk at an unhurried pace. Three to four hours is usual.",
          "Pournami nights are crowded from evening until the small hours. Early morning on an ordinary day is the quietest walk.",
          "Carry water. Shops and resting places line the road, and annadhanam is offered at many points.",
        ],
      },
      { type: "h2", text: "What the ashram does on Pournami" },
      {
        type: "p",
        text: "The ashram states that it holds a pooja on every Pournami night and serves annadhanam to the walkers who pass Adi Annamalai, continuing the daily meal for sadhus that it has kept for more than twenty-five years. Darshan of Mounasamy Siddhar is open as usual. A sankalpa for the Pournami pooja can be requested through the pooja booking page.",
      },
      {
        type: "p",
        text: "For the full calendar, temple timings and a map of the route, see the Tiruvannamalai guide. For the ashram's own festival year, see the Events page. And if you plan to rest at Adi Annamalai during your walk, the Mounasamy darshan page tells you exactly where to turn off the road.",
      },
    ],
  },
  {
    slug: "tiruvannamalai-temple-timings",
    title: "Tiruvannamalai temple timings, pooja schedule and tickets",
    excerpt:
      "Morning and evening hours of the Arunachaleswarar temple, what changes on Pournami and festival days, darshan tickets, and how far the ashram is.",
    category: "Guide",
    targetKeyword: "tiruvannamalai temple timings",
    publishedAt: "2026-11-05",
    readMinutes: 4,
    image: "girivalamMap",
    body: [
      {
        type: "p",
        text: "Tiruvannamalai temple timings are the first thing most pilgrims look up before a trip. The Arunachaleswarar temple, the great Shiva temple at the foot of Arunachala, is open for darshan from 5:30 AM to 8:00 PM, according to the temple's official website (annamalaiyar.hrce.tn.gov.in). On Saturdays, Sundays, Pournami, holidays and crowded days it closes at 7:30 PM. Festival days such as Karthigai Deepam follow their own schedule.",
      },
      { type: "h2", text: "Daily timings at a glance" },
      {
        type: "ul",
        items: [
          "Monday to Friday: 5:30 AM to 8:00 PM.",
          "Saturday, Sunday, Pournami, holidays and crowded days: 5:30 AM to 7:30 PM.",
          "Entrances: the east Rajagopuram and the north Ammani Amman gopuram.",
          "Festival days such as Karthigai Deepam: special schedule announced by the temple.",
        ],
      },
      { type: "h2", text: "Pooja schedule" },
      {
        type: "p",
        text: "Like other large Shiva temples in Tamil Nadu, Arunachaleswarar follows a daily cycle of poojas from the early morning opening through to the night closing. The exact times of each kala pooja are set by the temple and are displayed at the entrance; on festival days the schedule changes. We do not reproduce the pooja times here because they are revised by the temple, and a wrong hour on a website is worse than none. Ask at the temple office or check its notice board on the day.",
      },
      { type: "h2", text: "Darshan tickets" },
      {
        type: "p",
        text: "General darshan is free. The ₹50 special darshan ticket was ordered stopped by the HR&CE department in July 2023 so that more devotees could have darshan, and a paid 'break darshan' announced in 2025 had not been confirmed as running when we last checked. Abhishekam is arranged at the temple counter. Before you travel, check the official website, annamalaiyar.hrce.tn.gov.in, or ask at the temple office.",
      },
      { type: "h2", text: "Getting to the temple, and from the temple to the ashram" },
      {
        type: "ul",
        items: [
          "Chennai airport is about 175 km away; most visitors come by road or by train to Tiruvannamalai railway station.",
          "The bus stand is about 2 km from the temple, with autos and shared rides outside.",
          "The ashram is at Adi Annamalai on the western side of the hill, on the Girivalam path, a short drive from the temple by the Girivalam road. The map on the darshan page shows the turning at Vediyappanur Road.",
        ],
      },
      {
        type: "p",
        text: "The Tiruvannamalai guide on this site has the quick-answer timings box, the Girivalam calendar and the Deepam section in one place. If you are coming for Mounasamy Siddhar's darshan, the Mounasamy hub tells you the hours at the ashram, which are separate from the temple's.",
      },
    ],
  },
  {
    slug: "tiruvannamalai-ashram-accommodation",
    title: "Tiruvannamalai ashram accommodation: what to expect",
    excerpt:
      "A plain guide to staying in Tiruvannamalai: how ashram stays usually work, when the town books out, and how to ask about a stay at Adi Annamalai.",
    category: "Guide",
    targetKeyword: "tiruvannamalai ashram accommodation",
    publishedAt: "2026-10-30",
    readMinutes: 5,
    image: "girivalamWalk",
    body: [
      {
        type: "p",
        text: "Tiruvannamalai ashram accommodation is one of the most common questions we receive, and the honest answer is that it depends on the ashram, the date and how early you ask. This guide explains how stays usually work in the town, when rooms disappear, and the right way to ask about staying at Siva Sri Thiyaneswar Amma Ashram in Adi Annamalai.",
      },
      { type: "h2", text: "How ashram stays work in Tiruvannamalai" },
      {
        type: "ul",
        items: [
          "Most ashrams give rooms to devotees who write well in advance, and they say no when they are full. A written request is the norm; walking in with luggage is not.",
          "Stays are simple: a clean room, a fan, shared or attached bathrooms, and an expectation that you join the ashram's rhythm of early mornings, meals at set times and quiet.",
          "Ashrams are not hotels. Many do not take payment for rooms but welcome a donation; others have a fixed, modest charge. Ask when you write.",
          "Guests are usually asked to keep to the rules of the place: no smoking or alcohol, modest dress, silence in halls.",
        ],
      },
      { type: "h2", text: "When the town books out" },
      {
        type: "p",
        text: "Pournami weekends, Karthigai Deepam week in November, Maha Shivaratri and the December to February season fill every room in town, ashram and hotel alike. If your dates fall on any of these, ask two to three months ahead and have a second plan. Lodges near the temple and the bus stand, and guesthouses along the Girivalam road, are the usual alternatives.",
      },
      { type: "h2", text: "Staying at Adi Annamalai" },
      {
        type: "p",
        text: "Siva Sri Thiyaneswar Amma Ashram is first a place of seva and sadhana: daily annadhanam for sadhus, Mounasamy Siddhar's darshan, pooja and satsang. Whether a simple stay can be arranged for a visitor depends on the date and the number of people, and the office answers each request individually. We do not list rooms, rates or guarantees on this site because we would rather tell you plainly what is possible on your dates than promise something general.",
      },
      {
        type: "ul",
        items: [
          "Use the Book a visit page and tell us your dates, your group size and the purpose of your visit.",
          "The office replies with a clear yes, no or alternative. Nothing is confirmed until you receive that reply.",
          "If a stay is not possible, we will still welcome you for darshan, annadhanam and the Pournami pooja, and we can point you to nearby places to sleep.",
        ],
      },
      { type: "h2", text: "A note on expectations" },
      {
        type: "p",
        text: "Visitors sometimes ask whether staying at the ashram brings a meeting with Maataji. It does not, and no stay anywhere should be booked on that hope. What a stay offers is proximity: the hill at your door, the Girivalam path a few steps away, and a kitchen that feeds sadhus every morning. That is the ashram's daily life, and guests are welcome to be part of it.",
      },
      {
        type: "p",
        text: "For the town's other ashrams, temple timings and the Girivalam calendar, see the Tiruvannamalai guide. To ask about a stay, go to Book a visit, and to learn about the silent sadhu who lives here, see the Mounasamy hub.",
      },
    ],
  },
  {
    slug: "annadhanam-adi-annamalai-day-in-the-ashram-kitchen",
    title: "Annadhanam at Adi Annamalai: a day in the ashram kitchen",
    excerpt:
      "How the ashram cooks and serves a hot meal for sadhus and pilgrims on the Girivalam road every day, what happens on Pournami and Deepam, and how to help.",
    category: "Ashram life",
    targetKeyword: "annadhanam tiruvannamalai",
    publishedAt: "2026-10-26",
    readMinutes: 5,
    image: "maatajiSeva",
    body: [
      {
        type: "p",
        text: "Annadhanam in Tiruvannamalai is older than any of the ashrams that offer it, and at Siva Sri Thiyaneswar Amma Ashram it is the centre of the day. The ashram states that it serves a hot meal to sadhus, pilgrims and the poor on the Girivalam road every day of the year, continuing a tradition of feeding that Maataji has kept for more than twenty-five years. This is what that looks like from inside the kitchen.",
      },
      { type: "h2", text: "Before dawn" },
      {
        type: "p",
        text: "The kitchen lights its fires early. Rice, sambar, a vegetable and buttermilk or rasam are the usual meal, cooked in large vessels by volunteers and the ashram's own helpers. Vegetables are cut the evening before. By the time the first sadhus walk past Adi Annamalai on their morning round of the hill, the food is ready.",
      },
      { type: "h2", text: "Who eats" },
      {
        type: "ul",
        items: [
          "Sadhus who live on and around the hill and depend on the town for their one meal.",
          "Pilgrims walking Girivalam, especially those who began before sunrise.",
          "Local people in need. Nobody is asked who they are or why they have come.",
        ],
      },
      {
        type: "p",
        text: "Food is served on leaves or plates, seated, with the simple courtesy that Maataji insists on: the sadhu is Shiva at your door, and he is served first. Maheswara Poojai, the formal honouring of sadhus with a meal and vastram, is held on special days through the year, and the ashram has offered saffron cloth to sadhus on the Girivalam road as part of this seva.",
      },
      { type: "h2", text: "Pournami and Deepam" },
      {
        type: "p",
        text: "On Pournami nights the line stretches down the road, because lakhs of people are walking the path and Adi Annamalai is a natural halt on the western side. On Karthigai Deepam the kitchen runs through the day and night; the ashram reports that about one lakh people were fed on one Deepam. These are the days when extra hands matter most.",
      },
      { type: "h2", text: "How to help" },
      {
        type: "ul",
        items: [
          "Volunteer for a morning or a month: cutting vegetables, cooking, serving, washing, or keeping the path clean. The Annadhanam page has the sign-up.",
          "Sponsor a day of annadhanam in the name of a family member or an occasion. The office will tell you what one day costs and send a receipt.",
          "Bring rice, dal, oil or vegetables if you are coming in person. Tell the office first so nothing is wasted.",
        ],
      },
      {
        type: "p",
        text: "The ashram's registration as a charitable trust is 63/BK4/2017, and every contribution is receipted. To join or support the seva, see the Annadhanam page; to see the rest of what happens here each day, see the About the ashram page; and to meet the silent sadhu whom this kitchen also feeds, see the Mounasamy hub.",
      },
    ],
  },
  {
    slug: "why-amma-says-thiruvannamalai-is-thirukailayam",
    title: "Why Amma says Thiruvannamalai itself is Thirukailayam",
    excerpt:
      "A note on how Maataji sees the hill, her motto 'Anbe Sivam, Aduve Thavam', and how to walk Girivalam as a pilgrimage of the heart.",
    category: "Teachings",
    targetKeyword: "thiyaneswar amma",
    publishedAt: "2026-10-22",
    readMinutes: 5,
    image: "maatajiPortrait",
    body: [
      {
        type: "p",
        text: "Maataji, Sathguru Siva Sri Thiyaneswar Amma, built her ashram at Adi Annamalai beside a hill she does not call Arunachala alone. She calls it Thirukailayam, the abode of Shiva itself. For a pilgrim who has travelled a long way to walk around a mountain, this is worth pausing on, because it changes what the walk is for.",
      },
      { type: "h2", text: "Kailasa is not somewhere else" },
      {
        type: "p",
        text: "In the tradition Maataji teaches, Shiva's home is not a far peak that a few can reach but the place where devotion is complete. The hill at Tiruvannamalai, worshipped for centuries as Shiva in the form of fire, is that place for anyone who comes to it with love. The pilgrim does not need to go to the Himalayas; Kailasa has come to the foot of the Girivalam road, and the walk around it is the walk around Shiva.",
      },
      { type: "h2", text: "The motto on the seal" },
      {
        type: "quote",
        text: "Anbe Sivam, Aduve Thavam. Love is Shiva; that itself is tapas.",
      },
      {
        type: "p",
        text: "These words are on the ashram's seal and are the measure of everything that happens there. They draw on the old Tamil Saiva saying that love itself is Shiva. Maataji's addition is the second half: love is not only the goal but the practice. There is no austerity higher than loving, and no pooja that outranks feeding the sadhu at the gate. This is why the ashram's day is built around annadhanam and why she asks devotees to see Shiva in every person they serve.",
      },
      { type: "h2", text: "Girivalam as a pilgrimage of the heart" },
      {
        type: "ul",
        items: [
          "Walk with the hill on your right and your attention on the hill, not on the distance left.",
          "At each of the eight Ashta Lingams, pause and offer one thing you are holding on to.",
          "Treat every sadhu and every tired walker you pass as the one you came to see.",
          "Carry a line of Thiruvasagam or the name of Shiva, and let it set the pace of your feet.",
        ],
      },
      {
        type: "p",
        text: "Maataji teaches Thiruvasagam, the hymns of Manikkavasagar, in the ashram's classes, and the ashram's Sivayogam practice follows the same path of devotion before technique. The books she has written say the same thing in many ways: that the hill is Thirukailayam, that Shiva is love, and that the simplest act of service is the highest form of tapas.",
      },
      {
        type: "p",
        text: "More of her teachings, books, songs and talks are gathered on the Teachings page, with her own story on the Maataji page. To see the teaching lived rather than read, come to the ashram at Adi Annamalai, sit for Mounasamy Siddhar's darshan, and stay for the morning meal.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
