'use client'

import { usePathname } from 'next/navigation'

export default function Index({myData}){
  const chapterIndex = usePathname().split("/")[2]
  const chapterData = myData.find((item) => item._id === chapterIndex);

  return (
    <div>
        <span>Chapter {chapterData._id}.</span> {chapterData.title}
    </div>
  )
}