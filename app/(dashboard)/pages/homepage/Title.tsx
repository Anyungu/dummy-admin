import React from 'react'

type TitleProps = {
    title: string
}

function Title({ title }: TitleProps) {
    return (
        <div className='my-4 ml-6 text-2xl font-bold'>
            {title}
        </div>
    )
}

export default Title