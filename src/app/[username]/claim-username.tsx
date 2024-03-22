import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  username: string;
}

const ClaimUsername = ({username}: Props) => {
  return (
    <div className="min-h-screen min-w-screen flex items-center">
      <div className="w-full max-w-6xl mx-auto">
        <img src="https://placehold.co/100x100" alt="image" 
          className="rounded-xl w-20 h-20 flex mx-auto shadow" 
        />
        <div className="w-fit flex mx-auto bg-gray-50 rounded-xl border p-5 mt-8 relative">
          <div className="text-2xl text-gray-500 font-medium">link.me/</div>
          <div className="text-2xl font-medium">
            {username}
          </div>
          <div className="text-sm text-white bg-green-500 rounded-md px-2 py-1 absolute -top-3 -right-5 rotate-3 shadow">
            Available
          </div>
        </div>
        <div className="text-center text-gray-500 mt-7 leading-3">
          Link is the most beautiful link in bio. <br />
          And it’s all free.
          <Button variant="link" className="p-0 ml-1 text-md text-blue-500">Learn more</Button>
        </div>
        <Link href="register">
          <Button className="mt-5 flex mx-auto text-md">Claim Now</Button>
        </Link>
      </div>
    </div>
  )
}

export default ClaimUsername