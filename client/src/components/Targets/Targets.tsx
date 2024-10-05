import {forwardRef} from "react";
import {OverlayPanel} from "primereact/overlaypanel";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";


export const Targets = forwardRef<OverlayPanel, any>((props, ref) =>{



    return <OverlayPanel  ref={ref} className={"w-[400px]"}>
        <div className={"flex flex-col w-full gap-4"}>
            <div className={"text-white"}>Add target</div>

            <div>Forward lookup</div>
            <InputText width={"100%"} placeholder={"Enter location"}/>
            <div>Normal</div>
            <div className={"flex w-full"}>
                <InputNumber placeholder={"Latitude"} size={10}/>
                <InputNumber placeholder={"Longitude"}/>
            </div>

            <Button icon={"pi pi-plus"} size={"small"} label={"Add target"} severity={"success"}/>
        </div>

    </OverlayPanel>

});