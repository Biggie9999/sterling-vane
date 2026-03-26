import { GhostButton } from "@/components/shared/GhostButton"
import { GoldButton } from "@/components/shared/GoldButton"

const bookings = [
  { id: "SVR-9482A", property: "The Pacific Glass House", dates: "Dec 15 - Dec 22, 2024", guests: 4, status: "Confirmed", amount: "$14,280" }
]

export default function DashboardBookingsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-3xl text-white">Owner Bookings</h1>
        <GoldButton href="/marketplace?tab=shortlet" className="py-2 px-4 shadow-[0_0_15px_rgba(201,168,76,0.15)] text-[10px]">
          New Reservation
        </GoldButton>
      </div>

      <div className="bg-[#111] border border-border-dark overflow-x-auto">
        <table className="w-full text-left font-sans text-sm">
          <thead className="bg-[#0a0a0a] border-b border-border-dark font-mono text-[10px] uppercase tracking-widest text-warmGrey">
            <tr>
              <th className="px-6 py-4 font-normal text-gold">Ref ID</th>
              <th className="px-6 py-4 font-normal">Property</th>
              <th className="px-6 py-4 font-normal">Dates</th>
              <th className="px-6 py-4 font-normal text-center">Guests</th>
              <th className="px-6 py-4 font-normal">Amount</th>
              <th className="px-6 py-4 font-normal">Status</th>
              <th className="px-6 py-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-dark/50">
            {bookings.length > 0 ? bookings.map((b, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-white uppercase">{b.id}</td>
                <td className="px-6 py-4 text-white font-serif">{b.property}</td>
                <td className="px-6 py-4 text-warmGrey whitespace-nowrap">{b.dates}</td>
                <td className="px-6 py-4 text-warmGrey text-center">{b.guests}</td>
                <td className="px-6 py-4 font-mono text-white">{b.amount}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-success/10 border border-success/20 text-success text-[10px] font-mono tracking-widest uppercase rounded-sm">
                    {b.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <GhostButton className="py-1 px-3 text-[10px] border-border-dark">Modify</GhostButton>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-warmGrey">
                  No upcoming reservations.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 flex items-start space-x-3 text-xs text-warmGrey/60 font-sans max-w-2xl">
        <span className="font-serif text-lg text-gold leading-none">*</span>
        <p>As an active investor, your 15% partner rate is automatically applied to all bookings. Priority holds can be placed up to 9 months in advance.</p>
      </div>

    </div>
  )
}
