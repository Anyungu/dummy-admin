import Sidenav from "./sidenav"


export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <Sidenav />
      <div className="flex-1 bg-gray-100 h-screen overflow-scroll scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80">
        {children}
      </div>
    </div>
  )
}