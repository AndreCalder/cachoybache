import Link from 'next/link'
import React, { ReactNode } from 'react'

function ActionLink(
    {
        href,
        icon,
        text,
        bg
    }
        :
        {
            href: string,
            icon?: ReactNode,
            text?: string,
            bg: string
        }
) {
    return (
        <Link href={href} className={`w-fit h-fit flex gap-x-2 items-center text-xs rounded-md ${bg} text-white py-2 px-2`} >
            {
                icon && icon
            }
            {
                text && text
            }
        </Link>
    )
}

export default ActionLink