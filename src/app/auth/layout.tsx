import Headers from "../../features/auth/components/Headers"
import Logo from "@/components/Logo"
import { ModeToggle } from "@/components/modeToggler"
import { ReactNode } from "react"

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <div className="">
        <Headers logo={<Logo href="/home/education" />} modeToggler={<ModeToggle />} />
        {children}
      </div>
    </div>

  )
}

export default layout
