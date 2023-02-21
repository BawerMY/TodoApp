import { useState } from 'react'

export default function Task(props) {
    const categories = require('../data.json').categories
    return (
        <div onClick={props.onClick} className="w-full relative bg-[#363636] px-[10px] py-3 rounded-[4px] items-center flex gap-3">
            <div className="w-4 h-4 border-[#ffffffd0] border-[1.5px] rounded-full"></div>
            <div>
                <h3>{props.task.title}</h3>
                <h4 className='text-[#AFAFAF]'>{props.task.time}</h4>
            </div>
            <div className="absolute bottom-1 text-white right-[10px] flex gap-3">
                {props.task.category!==false && <div className={'rounded-[4px] py-[7.5px] px-2 flex gap-[5px] bg-[#'+categories[props.task.category].secondary+']'}>
                    <img className='w-[14px]' src={'images/categories/'+props.task.category+'.svg'} alt=' ' />
                    <span className='leading-[21px] text-[12px]'>{categories[props.task.category].name}</span>
                </div>}
                {props.task.priority!==false && <div className={'rounded-[4px] py-[7.5px] px-2 flex gap-[5px] bg-transparent border-[1px] border-[#8687E7]'}>
                    <img className='w-[14px]' src={'images/app/flag.svg'} />
                    <span className='leading-[21px] text-[12px]'>{props.task.priority}</span>
                </div>}
            </div>
        </div>
    )
}