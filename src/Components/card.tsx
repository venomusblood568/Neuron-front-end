import { ShareIcon } from "../icon/shareIcon";
import { NeuronIcon } from "../icon/neuronicon";
import { DeleteIcon } from "../icon/deleteIcon";

interface Cardprops {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export function Card({ title, link, type }: Cardprops) {
    const formattedlink = link.replace("x.com","twitter.com")
    return(
    <>
    <div className="p-4  rounded-md border-gray-500 max-w-72 border min-h-48 min-w-72">
        <div className="flex justify-between text-white">
            {/*start icon and title*/}
            <div className="flex items-center text-md">
                <div className="text-white pr-2">
                    <NeuronIcon/>
                </div>
                <h1>{title}</h1>
            </div>
            {/*both icon*/}
            <div className="flex items-center">
                <div className="pr-2 text-gray-500">
                    <a href={link} target="_blank" className="text-white">
                        <ShareIcon/>
                    </a>
                </div>  
                <div className="text-white">
                    <DeleteIcon/>
                </div>
            </div>
        </div>
        {/* Main Content */}
        <div>
            {/*Youtube thumbnail extraction*/}
            {type === 'youtube' &&(
                <a 
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer">
                        <img
                            className="w-full rounded-md"
                            src = {`https://img.youtube.com/vi/${new URL(link).searchParams.get("v")}/hqdefault.jpg`}
                            alt = "Youtube Thumnail"
                        />
                </a>
            )}
            
            {/* Twiiter embedded extraction*/}
            { type === "twitter" && (
                <blockquote className="twitter-tweet">
                    <a href = {formattedlink}></a>
                </blockquote>
            )}
        </div>
    </div>
  </>
  )
  
}
