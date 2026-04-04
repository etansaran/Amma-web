import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Donation from "@/models/Donation";
import { LOCAL_MODE, readStore } from "@/lib/local-store";

async function getDonation(id: string) {
  if (LOCAL_MODE) {
    const donation = readStore().donations.find((item) => item._id === id);
    return donation || null;
  }

  await connectDB();
  return Donation.findById(id).lean();
}

export default async function DonationReceiptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const donation = await getDonation(id);

  if (!donation) notFound();

  return (
    <div className="min-h-screen bg-[#f5f1e8] p-6 print:p-0">
      <div className="mx-auto max-w-3xl bg-white text-black shadow print:shadow-none rounded-none print:min-h-screen">
        <div className="px-8 py-10">
          <div className="flex items-start justify-between border-b border-black/10 pb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-black/50">Donation Receipt</p>
              <h1 className="mt-2 font-serif text-4xl">Amma Ashram</h1>
              <p className="mt-2 text-sm text-black/70">Siva Sri Thiyaneswar Amma Ashram, Thiruvannamalai</p>
            </div>
            <div className="text-right text-sm">
              <p><span className="text-black/45">Receipt No:</span> {donation.receiptNumber || `DON-${String(id).slice(-6).toUpperCase()}`}</p>
              <p><span className="text-black/45">Date:</span> {new Date(donation.createdAt).toLocaleDateString("en-IN")}</p>
              <p><span className="text-black/45">Status:</span> {donation.status}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-8">
            <div className="border border-black/10 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-black/45 mb-3">Received From</p>
              <p className="font-semibold">{donation.donorName}</p>
              <p>{donation.donorEmail}</p>
              {donation.donorPhone ? <p>{donation.donorPhone}</p> : null}
              <p>{donation.country || "India"}</p>
            </div>
            <div className="border border-black/10 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-black/45 mb-3">Donation Details</p>
              <p>Purpose: {String(donation.category || "general").replace(/-/g, " ")}</p>
              <p>Frequency: {donation.frequency}</p>
              <p>Amount: ₹{Number(donation.amountInINR || 0).toLocaleString("en-IN")}</p>
              <p>Gateway: {donation.paymentGateway || "local"}</p>
            </div>
          </div>

          <div className="border border-black/10 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-black/45 mb-3">Acknowledgement</p>
            <p className="text-sm leading-7 text-black/80">
              With gratitude, we acknowledge the receipt of your generous contribution toward the activities and seva of Amma Ashram.
              May this offering bring peace, merit, and blessings to you and your family.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
