import React from 'react'

const SidebarLink = ({Icon, title}) => {
  return (
    <div className='flex items-center justify-center xl:justify-start text-xl space-x-3 hoverEffect px-4 py-2 w-fit    rounded-full hover:bg-gray-200 cursor-pointer transition-all duration-200 group'>
        <Icon className="h-7 w-7" />
        <span className='hidden xl:inline  '>{title}</span>
    </div>
  )
}

export default SidebarLink