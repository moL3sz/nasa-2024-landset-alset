



export type TargetItemType = {
    _id:string,
    locationName:string,
    coordinate:{
        lat:number,
        lng:number
    }
    sendMode:string[],
    ISO_alpha2:string,
    passingTime:string
}