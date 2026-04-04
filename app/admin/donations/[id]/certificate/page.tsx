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

export default async function DonationCertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const donation = await getDonation(id);

  if (!donation) notFound();

  return (
    <div className="min-h-screen bg-[#efe7d7] p-6 print:p-0">
      <div className="mx-auto max-w-4xl border-[14px] border-[#b8893b] bg-white shadow print:shadow-none">
        <div className="border-[2px] border-[#d4a853] m-4 px-8 py-14 text-center">
          <p className="text-[#8b6914] uppercase tracking-[0.35em] text-xs">Certificate of Gratitude</p>
          <h1 className="mt-5 font-serif text-5xl text-[#7a5317]">Amma Ashram</h1>
          <p className="mt-8 text-lg text-black/70">This certificate is lovingly presented to</p>
          <p className="mt-5 font-serif text-4xl text-[#2c2417]">{donation.donorName}</p>
          <p className="mt-8 mx-auto max-w-2xl text-base leading-8 text-black/70">
            In heartfelt appreciation for your sacred contribution of
            <span className="font-semibold text-[#8b6914]"> ₹{Number(donation.amountInINR || 0).toLocaleString("en-IN")}</span>
            {" "}towards {String(donation.category || "general").replace(/-/g, " ")} seva. Your generosity supports the spiritual, charitable, and devotional work of the ashram.
          </p>
          <p className="mt-10 text-sm text-black/55">Issued on {new Date(donation.createdAt).toLocaleDateString("en-IN")}</p>
          <div className="mt-14 flex justify-between gap-8 text-sm text-black/60">
            <div className="flex-1 border-t border-black/15 pt-3">Amma Ashram Seal</div>
            <div className="flex-1 border-t border-black/15 pt-3">Authorized Signature</div>
          </div>
        </div>
      </div>
    </div>
  );
}
