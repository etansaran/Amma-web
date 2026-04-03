"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

const timeline = [
  { year: "1968", event: "Born in Thiruvannamalai, at the sacred foot of Arunachala" },
  { year: "1985", event: "First spiritual awakening during Shivaratri — a vision of Lord Shiva" },
  { year: "1992", event: "Renounced worldly life; took initiation from a Shaiva adept" },
  { year: "1998", event: "Founded Siva Sri Thiyaneswar Ashram; began daily Annadhanam" },
  { year: "2005", event: "Commenced free Thiyanam classes for all; ashram expanded" },
  { year: "2012", event: "International devotees begin arriving; virtual satsangs introduced" },
  { year: "2018", event: "Ashram serves 500+ meals daily; construction fund launched" },
  { year: "2024", event: "Live darshan connects 50+ countries; new meditation hall planned" },
];

const missionPoints = [
  { icon: "🕉", title: "Spiritual Liberation", desc: "Guide every soul toward moksha through authentic Shaiva meditation practices and the grace of Arunachala." },
  { icon: "🍛", title: "Annadhanam", desc: "Ensure no one goes hungry near Arunachala. Food given with love is the highest worship." },
  { icon: "🌍", title: "Global Outreach", desc: "Make the wisdom of Arunachala accessible to every corner of the world through technology and love." },
  { icon: "📿", title: "Shaiva Teachings", desc: "Preserve and transmit the authentic Shaiva Siddhanta tradition for future generations." },
];

export default function AboutContent() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-center mb-20"
        >
          <p className="font-devanagari text-[#D4A853]/60 tracking-[0.4em] text-sm mb-4">
            ஸ்ரீ சிவ ஸ்ரீ தியானேஸ்வர அம்மா
          </p>
          <h1 className="font-cinzel text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gold-shimmer">About Amma</span>
          </h1>
          <p className="text-[#F5F5F5]/60 font-raleway text-lg max-w-2xl mx-auto leading-relaxed">
            She came as grace incarnate — a mother to all who seek, a lamp in the darkness,
            the living presence of Arunachala&apos;s divine fire.
          </p>
        </motion.div>

        {/* Biography */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <div className="aspect-[3/4] rounded-3xl bg-gradient-to-b from-[#141414] via-[#222222] to-[#0D0D0D] border border-[#D4A853]/20 flex items-center justify-center relative overflow-hidden">
              <div className="text-center p-10 relative z-10">
                <motion.p
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="text-9xl mb-6"
                >
                  🕉
                </motion.p>
                <p className="font-cinzel text-[#D4A853] text-lg mb-1">Siva Sri Thiyaneswar Amma</p>
                <p className="font-raleway text-[#F5F5F5]/40 text-sm">Thiruvannamalai, Tamil Nadu</p>
              </div>
              {/* Sacred geometry */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 400 500">
                <circle cx="200" cy="250" r="180" fill="none" stroke="#D4A853" strokeWidth="1" />
                <circle cx="200" cy="250" r="120" fill="none" stroke="#D4A853" strokeWidth="0.5" />
                <polygon points="200,80 340,340 60,340" fill="none" stroke="#D4A853" strokeWidth="0.5" />
                <polygon points="200,420 60,160 340,160" fill="none" stroke="#D4A853" strokeWidth="0.5" />
              </svg>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-[#D4A853] mb-6">
              A Life of Divine Surrender
            </h2>
            <div className="space-y-4 text-[#F5F5F5]/65 font-raleway leading-relaxed text-base">
              <p>
                Siva Sri Thiyaneswar Amma was born in 1968 in Thiruvannamalai — the sacred town
                at the foot of Arunachala, the holy hill worshipped by Lord Shiva himself. From
                childhood, she exhibited an extraordinary sensitivity to the divine: seeing light
                where others saw only stone, feeling the sacred where others experienced the mundane.
              </p>
              <p>
                At the age of seventeen, during the festival of Shivaratri, Amma experienced a
                profound spiritual awakening — a direct encounter with Lord Shiva that dissolved
                all personal identity and left only boundless awareness. This experience became
                the foundation of all her teachings: that the divine is not distant, but the
                very ground of our being.
              </p>
              <p>
                After years of intense sadhana under the guidance of a realized Shaiva master,
                Amma felt called to serve — to open her heart and the Ashram&apos;s doors to all
                who sought the grace of Arunachala. In 1998, the Ashram was founded, and
                Annadhanam — the sacred practice of feeding all who come — began on the
                very first day.
              </p>
              <p>
                Today, she is a living beacon of Shaiva Siddhanta — a tradition that affirms the
                inseparable unity of the individual soul, the universe, and Lord Shiva. Her
                grace flows equally to a barefoot pilgrim from rural Tamil Nadu and an NRI
                executive in London.
              </p>
            </div>
            <div className="mt-8 flex gap-4">
              <Button href="/appointment" variant="primary">Book Darshan</Button>
              <Button href="/donate" variant="outline">Support the Ashram</Button>
            </div>
          </motion.div>
        </div>

        {/* Mission & Vision */}
        <div className="mb-24">
          <SectionHeader
            sanskritLabel="लक्ष्य • Mission"
            title="Our Sacred Mission"
            subtitle="Every activity at the Ashram serves a single purpose — the awakening of the soul and the upliftment of all beings."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {missionPoints.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl border border-[#D4A853]/15 bg-[#111]/50"
              >
                <span className="text-4xl mb-4 block">{point.icon}</span>
                <h3 className="font-cinzel text-[#D4A853] font-semibold text-base mb-2">{point.title}</h3>
                <p className="text-[#F5F5F5]/50 text-sm font-raleway leading-relaxed">{point.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <SectionHeader
            sanskritLabel="इतिहास • History"
            title="A Journey of Grace"
            center={false}
          />
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#D4A853]/50 via-[#D4A853]/20 to-transparent" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`relative flex ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"} pl-14 md:pl-0`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 top-3 w-4 h-4 rounded-full bg-[#D4A853] border-2 border-[#0D0D0D] md:-translate-x-1/2 shadow-[0_0_10px_rgba(212,168,83,0.5)]" />

                  <div className={`bg-[#111] border border-[#D4A853]/15 rounded-xl p-4 md:max-w-[45%] ${i % 2 === 0 ? "md:mr-auto md:ml-[calc(50%+20px)]" : "md:ml-auto md:mr-[calc(50%+20px)]"}`}>
                    <p className="font-cinzel text-[#D4A853] font-bold text-lg mb-1">{item.year}</p>
                    <p className="text-[#F5F5F5]/65 text-sm font-raleway">{item.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
