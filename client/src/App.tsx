import './App.css'
import 'primeicons/primeicons.css';
import { MegaMenu } from 'primereact/megamenu';
import { Image } from 'primereact/image';
import "primereact/resources/themes/lara-light-teal/theme.css"
function App() {
	return (
		<main className={"w-full"}>
			<MegaMenu

				end={()=>
					<img alt={"NASA"} width={40} height={40}
						 src={"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1224px-NASA_logo.svg.png"}/>
				}
				className={"w-full flex flex-row justify-between bg-primary"}
				style={{borderRadius:0,width:"100%"}}

				model={[
					{id: 1, label:"Panels", icon:"pi pi-box"},
					{id: 1, label:"Modes", icon:"pi pi-globe",  separator:true},
					{id: 1, label:"Scenes", icon:"pi pi-images", },
					{id: 1, label:"Targets", icon:"pi pi-map-marker", }
			]}/>

			<div className={"mx-auto w-fit"}>
				<Image alt={"NASA"}
					   preview={true}
					 src={"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1224px-NASA_logo.svg.png"}/>
			</div>

		</main>
	)
}

export default App
