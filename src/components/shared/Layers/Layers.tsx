'use client';

import { Layers2, Layers3 } from "lucide-react";

export const Layers = () => {

    return (
        <div>
            <div className="w-[235px] h-[90px] bg-[#0468FF] rounded-[20px] flex justify-center items-center gap-[15px]">
                <div className="w-[68px] h-[68px] bg-[#fff] rounded-[10px] flex justify-center items-center">
                    <Layers3
                        size={30}
                        color={'#0468FF'}
                    />
                </div>
                <div>
                    <p className="text-[#fff] font-bold">Варианты</p>
                    <p className="text-[#fff] font-bold">в сравнении: 3 </p>
                </div>
            </div>
        </div>

    );
};
