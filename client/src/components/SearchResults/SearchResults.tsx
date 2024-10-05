import {OverlayPanel} from "primereact/overlaypanel";
import {forwardRef, useRef} from "react";
import {Button} from "primereact/button";
import {useAppDispatch} from "../../store/hooks.ts";
import {Toast} from "primereact/toast";
import {BASE_API_URL} from "../../config/globals.ts";
import {addTarget, setCenterPosition} from "../../store/map/map.slice.ts";
import {ProgressSpinner} from "primereact/progressspinner";


type SearchResultsProps = {
    searchResults: any[],
    loading: boolean
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
            sendMode: ["email"],
            ISO_alpha2: item.components["ISO_3166-1_alpha-2"]?.toLowerCase()
        }

        try {
            const response = await fetch(BASE_API_URL + "/targets", {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(newTarget)
            })
            const data = await response.json();
            dispatch(addTarget(data));
            toastRef.current?.show({severity: 'success', summary: 'Operation', detail: 'Target saved successfully!'});
        } catch (e) {
            toastRef.current?.show({severity: 'error', summary: 'Operation', detail: 'Something went wrong!'});
        }

    }


    const viewOnMap = (item: any) => {
        console.log(item.geometry)
        dispatch(setCenterPosition([item.geometry.lat, item.geometry.lng]))
    }


    return <>
        <OverlayPanel
            ref={ref}
            style={{width: 1200}}
            className={"bg-opacity-75 w-full p-2 mx-auto"}
            showCloseIcon={true}>

            {
                props.loading ?
                    <div className={"flex justify-center w-full"}><ProgressSpinner style={{width: 50, height: 50}}/>
                    </div> : props.searchResults.length === 0 ? <div>There is no data to display!</div> :
                        <div className={"flex flex-col w-full gap-4"}>
                            {
                                props.searchResults.map((item) => {
                                    const flagIcon = item.components["ISO_3166-1_alpha-2"]?.toLowerCase();
                                    return <div
                                        onClick={() => viewOnMap(item)}
                                        className={"flex cursor-pointer items-center justify-between hover:backdrop-brightness-125 p-2 rounded-md transition-colors duration-100"}>
                                        <div className={"flex flex-col"}>

                                            <div className={"flex gap-2"}>
                                                <span className={`flag-icon flag-icon-${flagIcon}`}></span>
                                                <div>{item.formatted}</div>
                                            </div>

                                            <div
                                                className={"mt-1 font-extralight text-sm"}>{item.geometry.lat} - {item.geometry.lng}</div>
                                        </div>

                                        <div>
                                            <Button
                                                onClick={() => saveTarget(item)}
                                                label={"Place"}
                                                size={"small"}
                                                severity={"success"}
                                                icon={"pi pi-map-marker"}
                                                text
                                            />
                                        </div>

                                    </div>
                                })
                            }
                        </div>
            }


        </OverlayPanel>
        <Toast ref={toastRef} position={"bottom-left"}/>
    </>

});