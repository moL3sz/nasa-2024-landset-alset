import {OverlayPanel} from "primereact/overlaypanel";
import {forwardRef, useRef} from "react";
import {Button} from "primereact/button";
import {useAppDispatch} from "../../store/hooks.ts";
import {Toast} from "primereact/toast";
import {BASE_API_URL} from "../../config/globals.ts";
import {addTarget} from "../../store/map/map.slice.ts";


type SearchResultsProps = {
    searchResults: any[]
}

export const SearchResults = forwardRef<OverlayPanel, SearchResultsProps>((props, ref) => {


    const dispatch = useAppDispatch();
    const toastRef = useRef<Toast>(null);


    const saveTarget = async (item: any) => {
        const newTarget = {
            locationName: item.formatted,
            coordinate: {
                lat: item.geometry.lat,
                lng: item.geometry.lng
            },
            sendMode: ""
        }

        try {
            const response = await fetch(BASE_API_URL + "/targets", {
                headers:{
                    'Content-Type' : 'application/json'
                },
                method:"POST",
                body:JSON.stringify(newTarget)
            })
            const data = await response.json();
            dispatch(addTarget(data));
            toastRef.current?.show({ severity: 'success', summary: 'Operation', detail: 'Target saved successfully!' });
        } catch (e) {
            toastRef.current?.show({ severity: 'error', summary: 'Operation', detail: 'Something went wrong!' });
        }

    }


    return <>
        <OverlayPanel
            ref={ref}
            className={"bg-opacity-75 w-full p-2"}
            showCloseIcon={true}>

            {
                props.searchResults.length === 0 ? <div>There is no data to display!</div> :
                    <div className={"flex flex-col w-full gap-4"}>
                        {
                            props.searchResults.map((item) => {
                                return <div className={"flex items-center justify-between"}>
                                    <div>{item.formatted}</div>
                                    <Button
                                        onClick={() => saveTarget(item)}
                                        label={"Place on map"}
                                        size={"small"}
                                        severity={"success"}
                                        icon={"pi pi-map-marker"}
                                    />
                                </div>
                            })
                        }
                    </div>
            }


        </OverlayPanel>
        <Toast ref={toastRef} position={"bottom-left"}/>
    </>

});