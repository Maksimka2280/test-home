import { MapPin, Timer } from "lucide-react";

export default function MiniCard() {
    return (
        <div className='flex mt-[30px]'>
            <img src="/img/mini-room-img.png" alt="" className='rounded-[15px]' />
            <div className="px-[15px]">
                <div className="flex items-center gap-[10px]">
                    <h1 className="text-[22px] font-bold">999 999 999 ₽</h1>
                    <input
                        type="checkbox"
                        id="price-checkbox"
                        className="w-[18px] h-[18px] cursor-pointer ml-auto"
                    />
                </div>

                <p>1-комн. кв. · 49,60м² · 17/27 этаж</p>

                <div className="flex flex-wrap gap-[5px] items-center pt-[13px]">
                    <div className="flex gap-[6px] items-center justify-center">
                        <MapPin color="#9D9D9D" size={17} />
                        <p className="text-[16px]">Островская</p>
                    </div>
                    <div className="flex gap-[6px] items-center justify-center">
                        <Timer color="#9D9D9D" size={17} />
                        <p className="text-[16px]">
                            <span className="text-[16px] font-bold">14</span> минут
                        </p>
                    </div>
                    <p className="text-[#BCBCBC]">2-й Амбулаторный проезд, 18</p>
                </div>
            </div>
        </div>
    )
}