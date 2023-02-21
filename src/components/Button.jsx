export default function Button(props) {
    return(
        <button onClick={props.onClick} className="bg-[#8875FF] px-6 py-3 rounded-[4px] text-white">{props.text}</button>
    )
}