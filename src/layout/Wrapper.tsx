import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"




export const Wrapper = () => {
  return (
    <>
    <div className="relative min-h-screen flex flex-col bg-[#070b0c] text-white">
      {/* Top Navigation */}
      <Header />

      {/* Main Page View */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Bottom Footer */}
      <Footer />
    </div>
    </>
  )
}

export default Wrapper