import { GhostButton } from "@/components/shared/GhostButton"
import { Download, FileText } from "lucide-react"

const documents = [
  { title: "Q3 2024 Performance Report", date: "Oct 15, 2024", size: "2.4 MB", type: "REPORT" },
  { title: "Subscription Agreement (Pacific Glass House)", date: "Mar 05, 2024", size: "8.1 MB", type: "AGREEMENT" },
  { title: "Q2 2024 Performance Report", date: "Jul 15, 2024", size: "2.1 MB", type: "REPORT" },
  { title: "2023 Form 1099-DIV", date: "Jan 28, 2024", size: "1.2 MB", type: "TAX" },
  { title: "Subscription Agreement (Miami Estate)", date: "Jan 12, 2024", size: "7.8 MB", type: "AGREEMENT" }
]

export default function DashboardDocumentsPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl text-white mb-8">Document Center</h1>
      
      <div className="bg-[#111] border border-border-dark">
        {documents.map((doc, i) => (
          <div key={i} className={`p-6 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-white/5 transition-colors ${i !== documents.length - 1 ? 'border-b border-border-dark/50' : ''}`}>
             
             <div className="flex items-center space-x-4 mb-4 md:mb-0">
               <div className="w-10 h-10 rounded-full bg-border-dark flex items-center justify-center shrink-0">
                 <FileText className="w-4 h-4 text-gold" />
               </div>
               <div>
                 <p className="font-serif text-lg text-white mb-1">{doc.title}</p>
                 <div className="flex items-center font-mono text-[10px] tracking-widest uppercase text-warmGrey space-x-3">
                   <span className="text-gold">{doc.type}</span>
                   <span>•</span>
                   <span>Uploaded {doc.date}</span>
                   <span>•</span>
                   <span>{doc.size}</span>
                 </div>
               </div>
             </div>

             <GhostButton className="w-full md:w-auto py-2 px-6 text-xs text-white border-border-dark hover:border-gold">
               <Download className="w-3 h-3 mr-2" /> Download File
             </GhostButton>

          </div>
        ))}
      </div>
    
      <div className="mt-8 bg-black/50 p-6 border border-border-dark rounded-sm">
        <p className="font-sans text-xs text-warmGrey leading-relaxed">
          Tax documents required for IRS or relevant international filings (e.g., K-1s, 1099s) are uploaded annually by January 31st for the preceding calendar year. Hard copies are not mailed unless explicitly requested.
        </p>
      </div>
    </div>
  )
}
