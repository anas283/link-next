import Image from "next/image";
import Template1 from "../../../../public/template-1.png";
import Template2 from "../../../../public/template-2.png";

export default function Templates() {
  return (
    <div className="flex min-h-screen">
      <div className="w-full max-w-6xl mx-auto py-20">

        <div>
          <h1 className="text-5xl font-bold text-center max-w-3xl mx-auto">
            A link template for any brand and creator
          </h1>
          <h6 className="text-[15px] text-gray-600 font-normal text-center max-w-xl mx-auto mt-8">
            Discover a variety of Link Apps, integrations, and visual styles to 
            tailor your Link and reflect your unique brand identity. Dive 
            into our collection of custom templates to effortlessly expand 
            your audience reach.
          </h6>
        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-10 mt-20">
          <div className="cursor-pointer">
            <Image src={Template1} alt="template-1" />
            <h6 className="font-semibold mt-3">Music 66</h6>
          </div>
          <div className="cursor-pointer">
            <Image src={Template2} alt="template-2" />
            <h6 className="font-semibold mt-3">Crombo</h6>
          </div>
        </div>

      </div>
    </div>
  )
}