import Sidemenu from "./Sidemenu"

export default function DashboardLayout({
  children, // will be a page or nested layout
  params
}: {
  children: React.ReactNode
  params:{
    id:string
  }
}) {

  
  return (
    <section>
      

      <div className="flex justify-center mt-10 h-screen">
      <div className="w-full">
        <div className="grid grid-cols-8 gap-6  h-full">
          <div className="col-span-2 ">
            <Sidemenu />
          </div>
          <div className="col-span-6 bg-gray-100">
            {children}
          </div>
        </div>
      </div>
    </div>

 
  
    </section>
  )
}