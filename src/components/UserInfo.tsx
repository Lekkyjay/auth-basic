import Image from 'next/image'

export default function UserInfo() {
  return (
    <div className="shadow-xl p-8 rounded-md flex flex-col gap-3 bg-yellow-200">
        <Image
          className="rounded-full"
          src={''}
          width={60}
          height={60}
          alt='image'
        />
        <div>
          Name: <span className="font-bold">Name</span>
        </div>
        <div>
          Email: <span className="font-bold">Email</span>
        </div>
      </div>
  )
}
